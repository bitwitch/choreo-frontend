import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'; 
import { AuthAdapter as Auth } from '../services/choreoApi';
import Navbar from './Navbar'; 
import CreatorContainer from '../containers/CreatorContainer'; 
import ProfilePage from '../containers/ProfileContainer';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux'; 
import { login_user, logout_user } from '../actions/auth'; 
import LoginForm from './LoginForm'; 
import authorize from './authorize'; 

class App extends React.Component {
  
  login = (loginParams) => {
    Auth.login(loginParams)
    .then(user => {
      if (!user.error){
        this.props.login_user(user) // dispatch action to redux store 
        localStorage.setItem('jwt', user.jwt)
        this.props.history.push('/choreo')
      }
    })
  }

  logout = () => {
    localStorage.removeItem('jwt')
    this.props.logout_user() // dispatch action to redux store 
  }

  loggedIn = () => {
    return !!localStorage.getItem('jwt')
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
       Auth.currentUser()
       .then(user => {
         if (!user.error) {
           console.log("fetch user");
           console.log(user)
           this.props.login_user(user) // dispatch action to redux store
         }
       })
     }
  }

  render() {
    console.log('auth: ', this.props.auth)

    const AuthLoginForm = authorize(LoginForm)
    const AuthProfilePage = authorize(ProfilePage)
    const AuthCreatorContainer = authorize(CreatorContainer)
    return (
      <div className='app'>
        <Navbar />
        <div className='main'>
          <Route exact path='/login' render={(props) => <AuthLoginForm login={this.login} {...props}/>} />
          <Route exact path='/profile' render={props => <AuthProfilePage user={this.props.auth.user} {...props}/>} /> 
          <Route exact path='/choreo' render={props => <AuthCreatorContainer {...props}/>} />
        </div>
      </div>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

