import React from 'react'; 
import ModalWrapper from './ModalWrapper'; 
import '../style/AuthModal.css';

class LoginModal extends React.Component {

  state = {
    username: '',
    password: ''
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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onLogin(this.state)
  }

  render() {
    return (
      <ModalWrapper title='Login' width={300} showOk={false} {...this.props}>
        <form onSubmit={this.handleSubmit}> 
          <input className='input' type='text' onChange={this.handleUsername} placeholder='username' value={this.state.username}/>
          <input className='input' type='password' onChange={this.handlePassword} placeholder='password' value={this.state.password}/>
          <input className='submit' type='submit' value='Login'/>
        </form>
      </ModalWrapper> 
    )
  }
}; 

export default LoginModal;