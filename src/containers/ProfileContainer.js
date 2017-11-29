import React from 'react';  
import UserCard from '../components/UserCard'; 
import ChoreographiesCard from '../components/ChoreographiesCard'; 
import FriendsCard from '../components/FriendsCard'; 
import FavoritesCard from '../components/FavoritesCard'; 
import '../style/ProfileContainer.css'; 
import { AuthAdapter as Auth } from '../services/choreoApi';

class ProfileContainer extends React.Component {
  state = {
    user: {
      info: {
        photo: {url: null},
        name: null,
        age: null, 
        location: null
      },
      friends: [],
      likes: [], 
      choreographies: []
    }
  } 

  componentDidMount() {
    Auth.currentUser().then(user => 
      this.setState({
        user
      })
    )
  }

  render() {
    const user = this.state.user

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

