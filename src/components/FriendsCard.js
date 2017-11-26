import React from 'react'; 

class FriendsCard extends React.Component {
  render() {
    const friends = this.props.friends.map((friend, i) => <li key={i}>{friend.username}</li>)

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