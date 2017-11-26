import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'; 
import { AuthAdapter as Auth } from '../services/choreoApi';
import Navbar from './Navbar'; 
import CreatorContainer from '../containers/CreatorContainer'; 
import ProfileContainer from '../containers/ProfileContainer';
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
        // localStorage.setItem('user_id', user.info.id)
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

  render() {
    const AuthLoginForm = authorize(LoginForm)
    const AuthProfileContainer = authorize(ProfileContainer)
    const AuthCreatorContainer = authorize(CreatorContainer)
    return (
      <div className='app'>
        <Navbar />
        <div className='main'>
          <Route exact path='/' render={props => this.loggedIn() ? <Redirect to='/choreo' {...props}/> : <Redirect to='/login' {...props}/> }/>
          <Route exact path='/login' render={(props) => <AuthLoginForm login={this.login} {...props}/>} />
          <Route exact path='/profile' render={props => <AuthProfileContainer {...props}/>} /> 
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

