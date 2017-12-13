import React from 'react'
import { NavLink } from 'react-router-dom'

class AllChoreographies extends React.Component {
  render() {
    const choreographies = this.props.choreographies.map((choreo, i) => {
      return (
        <li key={i}>
          <NavLink to={`/choreographies/${choreo.id}`}>{choreo.name || 'no-name'}</NavLink>
        </li>
      )
    })

    return (
      <div className='all-choreographies'>
        <h4>Choreographies</h4>
        <ul>
          {choreographies}
        </ul>
      </div> 
    )
  }
}

export default AllChoreographies