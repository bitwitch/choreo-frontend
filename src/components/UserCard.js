import React from 'react' 
import '../style/UserCard.css'

class UserCard extends React.Component {
  render() {
    const {photo, name, age, location} = this.props.info
    const src = photo.url ? photo.url : 'https://i.imgur.com/7v1z6QJ.jpg' 
    return (
      <div className='user-card-container'>
        <div className='user-card'>
          <img className='profile-pic' height={300} width={300} src={src} alt='user-card' />
          <p>{name}</p>
          <p>{age}</p>
          <p>{location}</p>
        </div> 
      </div>
    )
  }
} 

export default UserCard