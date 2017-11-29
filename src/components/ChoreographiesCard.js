import React from 'react';
import { NavLink } from 'react-router-dom'; 

class ChoreographiesCard extends React.Component {
  render() {

    const choreographies = this.props.choreographies.slice(0,15).map((choreo, i) => {
      return <li key={i}><NavLink to={`/choreographies/${choreo.id}`}>{choreo.name || 'no-name'}</NavLink></li>
    })

    return (
      <div className='card-container'>
        <h4>Choreographies</h4>
        <ul>
          {choreographies}
        </ul>

        <div className='card-footer'> 
          <NavLink className='footer-link' to='/choreographies'>SHOW ALL</NavLink> 
        </div> 
      </div> 
    )
  }
}; 

export default ChoreographiesCard;