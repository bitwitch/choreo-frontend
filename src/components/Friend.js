import React from 'react'
import { NavLink } from 'react-router-dom' 
import { fetchFriend } from '../services/choreoApi'

class Friend extends React.Component {
  state = {
    friend: {
      name: null,
      age: null, 
      location: null, 
      choreographies: []
    } 
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetchFriend(id).then(friend => {
      if (!friend.error) {
        this.setState({
          friend: {...friend.info, choreographies: friend.choreographies}
        }) 
      }
    })
  }

  render() {
    const {username, age, location, choreographies} = this.state.friend
    const choreos = choreographies.map((choreo,i) => (
      <li key={i}>
        <NavLink to={`/choreographies/${choreo.id}`}>{choreo.name || 'no-name'}</NavLink>
      </li>
    ))
    
    return (
      <div> 
        <p>{username}</p>
        <p>{age}</p> 
        <p>{location}</p> 
        <ul>{choreos}</ul> 
      </div>
    )
  }
} 

export default Friend