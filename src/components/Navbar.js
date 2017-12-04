import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
import '../style/NavBar.css'

class Navbar extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    return (
      <div className='nav'>
        <ul>
          <li><NavLink to='/choreo'>Choreo</NavLink></li>
          <li><NavLink to='/profile'>Profile</NavLink></li>
          <li><NavLink to='/trending'>Trending</NavLink></li>
          <li id='title'>Shaker Maker</li>
          <li id='logout'><NavLink onClick={this.handleClick} to='/logout'>Logout</NavLink></li>

          <li id='player'>
            <div>
              <button>Play</button>
              <button>Stop</button>
            </div>
          </li>

        </ul> 
      </div>
    )
  }
}; 

export default Navbar;