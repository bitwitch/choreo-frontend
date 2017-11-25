import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'; 
import { AuthAdapter as Auth } from '../services/choreoApi';
import FigureContainer from '../containers/FigureContainer';
import ChoreographyContainer from '../containers/ChoreographyContainer';
import Navbar from './Navbar'; 
import PlaybackContainer from '../containers/PlaybackContainer'; 
import ProfilePage from '../containers/ProfileContainer';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux'; 
import { login_user, logout_user } from '../actions/auth'; 
import LoginForm from './LoginForm'; 

class App extends React.Component {
  
  login = (loginParams) => {
    Auth.login(loginParams)
    .then(user => {
      if (!user.error){
        this.props.login_user(user) // dispatch action to redux store 
        localStorage.setItem('jwt', user.jwt)
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
    // this.login({username: 'Jon', password: 'password'})
    // if (localStorage.getItem('jwt')) {
    //    Auth.currentUser()
    //    .then(user => {
    //      if (!user.error) {
    //        console.log("fetch user");
    //        this.props.login_user(user) // dispatch action to redux store
    //      }
    //    })
    //  }
  }

  render() {
    return (
      <div className='app'>
        <Navbar />

        <div className='main'>
          {this.loggedIn() ? <Redirect to='/choreo' /> : <Redirect to='/login'/>}
          <Route path='/login' render={() => <LoginForm login={this.login} />} />

          <Route path='/profile' render={props => <ProfilePage props={props} />} /> 
          <Route path='/choreo' render={props => 
            <div>
              <FigureContainer />
              <PlaybackContainer />
              <ChoreographyContainer />
            </div>}>
          </Route>
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

