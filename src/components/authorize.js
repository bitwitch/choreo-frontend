import React from 'react'; 
import { Redirect } from 'react-router-dom'; 

function authorize(RenderedComponent) {
  return class extends React.Component {

    loggedIn() {
      return !!localStorage.getItem('jwt')
    }

    render() {
      const { pathname } = this.props.location
      if (this.loggedIn() && pathname === '/login') {
        return <Redirect to='/choreo'/>
      } else if (!this.loggedIn() && pathname !== '/login') {
        return <Redirect to='/login' />
      } else {
        return (
          <div className='authorize'>
            <RenderedComponent {...this.props}/>
          </div>
        )
      }
    }
  }
}

export default authorize;