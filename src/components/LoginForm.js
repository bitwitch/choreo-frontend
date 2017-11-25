import React from 'react'; 

class LoginForm extends React.Component {
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
    this.props.login(this.state)

    this.setState({
      username: '',
      password: '' 
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
        <input type='text' onChange={this.handleUsername} placeholder='username' value={this.state.username}/>
        <input type='password' onChange={this.handlePassword} placeholder='password' value={this.state.password}/>
        <input type='submit' value='Login'/>
      </form>
    )
  }
}; 

export default LoginForm;