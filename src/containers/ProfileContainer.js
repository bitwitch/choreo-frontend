import React from 'react';  
import UserCard from '../components/UserCard'; 
import ChoreographiesCard from '../components/ChoreographiesCard'; 
import FriendsCard from '../components/FriendsCard'; 
import FavoritesCard from '../components/FavoritesCard'; 
import '../style/ProfileContainer.css'; 

class ProfileContainer extends React.Component {

  render() {
    const user = this.props.user 

    return (
      <div className='profile-wrapper'> 
        <div className='profile-container'>
          <UserCard info={user.info} />
          <ChoreographiesCard choreographies={user.choreographies}/>
          <FriendsCard friends={user.friends}/>
          <FavoritesCard likes={user.likes}/>
        </div>
        <button>Edit Profile</button>
      </div>
    )
  }
}; 

export default ProfileContainer;

