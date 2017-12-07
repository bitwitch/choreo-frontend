import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AuthAdapter as Auth } from '../services/choreoApi'
import Navbar from './Navbar'
import CreatorContainer from '../containers/CreatorContainer'
import ProfileContainer from '../containers/ProfileContainer'
import TrendingContainer from '../containers/TrendingContainer'
import Demo1 from './Demo1'
import Demo2 from './Demo2'
import Friend from './Friend'
import Choreography from './Choreography'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login_user, logout_user } from '../actions/auth'
import AllChoreographies from './AllChoreographies'
import AllFriends from './AllFriends'
import AllLikes from './AllLikes'
import WelcomeContainer from '../containers/WelcomeContainer'
import authorize from './authorize'

class App extends React.Component {
  login = (loginParams) => {
    Auth.login(loginParams)
    .then(user => {
      if (!user.error){
        this.props.login_user(user) // dispatch action to redux store 
        localStorage.setItem('jwt', user.jwt)
        localStorage.setItem('user_id', user.info.id)
        this.props.history.push('/choreo')
      }
    })
  }

  logout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user_id')
    this.props.logout_user() // dispatch action to redux store 
  }

  loggedIn = () => {
    return !!localStorage.getItem('jwt')
  }

  signUp = (signUpParams) => {
    Auth.signUp(signUpParams)
    .then(user => {
      if (!user.error){
        this.props.login_user(user) // dispatch action to redux store 
        localStorage.setItem('jwt', user.jwt)
        localStorage.setItem('user_id', user.info.id)
        this.props.history.push('/choreo')
      }
    })
  }

  componentDidMount() {
    Auth.currentUser().then(user => {
      if (!user.error) {
        this.props.login_user(user)
      }
    })
  }

  render() {
    const AuthWelcomeContainer  = authorize(WelcomeContainer)
    const AuthProfileContainer  = authorize(ProfileContainer)
    const AuthCreatorContainer  = authorize(CreatorContainer)
    const AuthChoreography      = authorize(Choreography)
    const AuthFriend            = authorize(Friend)
    const AuthAllChoreographies = authorize(AllChoreographies)
    const AuthAllFriends        = authorize(AllFriends) 
    const AuthAllLikes          = authorize(AllLikes)  

    return (
      <div className='app'>
        <Navbar logout={this.logout} auth={this.props.auth}/>
        <div className='main'>
          <Route exact path='/' render={props => this.loggedIn() ? <Redirect to='/choreo' {...props}/> : <Redirect to='/login' {...props}/> }/>
          <Route exact path='/login' render={props => <AuthWelcomeContainer login={this.login} signUp={this.signUp} {...props}/>} />
          <Route exact path='/profile' render={props => <AuthProfileContainer user={this.props.auth.user} {...props}/>} /> 
          <Route exact path='/choreo' render={props => <AuthCreatorContainer {...props}/>} />
          <Route exact path='/trending' render={props => <TrendingContainer {...props}/>} />
          <Route exact path='/demo1' render={props => <Demo1 {...props}/>} />
          <Route exact path='/demo2' render={props => <Demo2 {...props}/>} />

          {/* Profile Page Routes*/}
          <Route exact path='/choreographies/:id' render={props => <AuthChoreography {...props} />}/>
          <Route exact path='/friends/:id' render={props => <AuthFriend {...props} />}/>
          <Route exact path='/likes/:id' render={props => <AuthChoreography {...props} />}/>
          <Route exact path='/choreographies' render={props => <AuthAllChoreographies choreographies={this.props.auth.user.choreographies} {...props} />} /> 
          <Route exact path='/friends' render={props => <AuthAllFriends friends={this.props.auth.user.friends} {...props} />} /> 
          <Route exact path='/likes' render={props => <AuthAllLikes likes={this.props.auth.user.likes} {...props} />} /> 

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login_user: login_user,
    logout_user: logout_user
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

