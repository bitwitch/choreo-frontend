import React from 'react'; 
import { NavLink } from 'react-router-dom'; 

class Navbar extends React.Component {
  render() {
    return (
      <div className='nav'>
        <ul>
          <li><NavLink to='/home'>Home</NavLink></li>
          <li><NavLink to='/profile'>Profile</NavLink></li>
        </ul> 
      </div>
    )
  }
}; 

export default Navbar;