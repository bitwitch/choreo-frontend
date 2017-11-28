import React from 'react'; 
import LoginModal from '../components/LoginModal'; 
import SignUpModal from '../components/SignUpModal'; 
import '../style/WelcomeContainer.css'

class WelcomeContainer extends React.Component {

  state = {
    loginModal: false,
    signUpModal: false
  }

  showLoginModal = () => {
    this.setState( {loginModal: true} )
  }

  showSignUpModal = () => {
    this.setState( {signUpModal: true} )
  }

  hideLoginModal = () => {
    this.setState( {loginModal: false})
  }

  hideSignUpModal = () => {
    this.setState( {signUpModal: false})
  }

  render() {
    return (
      <div className='welcome-container'> 
        
      {/* Each button triggers a modal with respective forms */}
        <div className='buttons'>
          <button className='auth-button' modal='loginModal' onClick={this.showLoginModal}>Login</button>
          <button className='auth-button' modal='signUpModal' onClick={this.showSignUpModal}>Sign Up</button>
        </div>

        {this.state.loginModal ? <LoginModal onLogin={this.props.login} hideModal={this.hideLoginModal}/> : null }
        {this.state.signUpModal ? <SignUpModal onSignUp={this.props.signUp} hideModal={this.hideSignUpModal}/> : null }
      </div>
    )
  }
}; 

export default WelcomeContainer;