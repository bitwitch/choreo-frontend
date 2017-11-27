import React from 'react'; 
import { NavLink } from 'react-router-dom'; 

class FriendsCard extends React.Component {
  render() {
    const friends = this.props.friends.slice(0, 15).map((friend, i) => {
      return <li key={i}><NavLink to={`/friends/${friend.id}`}>{friend.username}</NavLink></li>
    })

    return (
      <div className='card-container'>
        <h4>Friends</h4>
        <ul>
          {friends}
        </ul>
      </div> 
    )
  }
}; 

export default FriendsCard;