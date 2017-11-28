import React from 'react'; 
import ModalWrapper from './ModalWrapper';
import '../style/AuthModal.css';

class SignUpModal extends React.Component {
  state = {
    username: '',
    password: '',
    confirmation: ''
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleConfirmation = (e) => {
    this.setState({
      confirmation: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSignUp(this.state)

    this.setState({
      username: '',
      password: '',
      confirmation: ''
    })
  }

  render() {
    return (
      <ModalWrapper title='Sign Up' width={400} showOk={false} {...this.props}>
        <form onSubmit={this.handleSubmit}> 
          <input className='input' type='text' onChange={this.handleUsername} placeholder='username' value={this.state.username}/>
          <input className='input' type='password' onChange={this.handlePassword} placeholder='password' value={this.state.password}/>
          <input className='input' type='password' onChange={this.handleConfirmation} placeholder='password confirmation' value={this.state.confirmation}/>
          <input className='submit' type='submit' value='Sign Up'/>
        </form>
      </ModalWrapper> 
    )
  }
}; 

export default SignUpModal;