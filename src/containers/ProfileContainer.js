import React from 'react';  
import UserCard from '../components/UserCard'; 
import ChoreographiesCard from '../components/ChoreographiesCard'; 
import FriendsCard from '../components/FriendsCard'; 
import FavoritesCard from '../components/FavoritesCard'; 

class ProfileContainer extends React.Component {

  render() {
    if (this.props.user) {
      const user = this.props.user.info
      const {photo, name, age, location} = user
      const info = {photo, name, age, location}

      return (
        <div className='profile-container'> 
          <UserCard info={info} />
          <ChoreographiesCard choreographies={user.choreographies}/>
          <FriendsCard friends={user.friends}/>
          <FavoritesCard likes={user.likes}/>
        </div>
      )
    } else {
      return <div />
    }
  }
}; 

export default ProfileContainer;

