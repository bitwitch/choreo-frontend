import React from 'react'; 
import LoginModal from '../components/LoginModal'; 
import SignUpModal from '../components/SignUpModal'; 

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
      <div> 
        WelcomeContainer
        
      {/* Each button triggers a modal with respective forms */}

        <button modal='loginModal' onClick={this.showLoginModal}>Login</button>
        <button modal='signUpModal' onClick={this.showSignUpModal}>Sign Up</button>

        {this.state.loginModal ? <LoginModal onLogin={this.props.login} hideModal={this.hideLoginModal}/> : null }
        {this.state.signUpModal ? <SignUpModal onSignUp={this.props.signUp} hideModal={this.hideSignUpModal}/> : null }
      </div>
    )
  }
}; 

export default WelcomeContainer;