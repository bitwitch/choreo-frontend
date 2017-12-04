import React from 'react'; 
import { NavLink } from 'react-router-dom'; 

class AllFriends extends React.Component {
  render() {
    const friends = this.props.friends.map((friend, i) => {
      return <li key={i}><NavLink to={`/friends/${friend.id}`}>{friend.name || 'no-name'}</NavLink></li>
    })

    return (
      <div className='all-friends'>
        <h4>Friends</h4>
        <ul>
          {friends}
        </ul>
      </div> 
    )
  }
}; 

export default AllFriends;