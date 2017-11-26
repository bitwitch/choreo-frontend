import React from 'react'; 

class ProfileContainer extends React.Component {

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div> 
        Profile Page
        <img src='#' alt='profile photo'/>
      </div>
    )
  }
}; 

export default ProfileContainer;

