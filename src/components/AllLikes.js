import React from 'react'; 
import { NavLink } from 'react-router-dom'; 

class AllLikes extends React.Component {
  render() {
    const likes = this.props.likes.map((like, i) => {
     return <li key={i}><NavLink to={`/likes/${like.choreography_id}`}>Like</NavLink></li>
    })

    console.log(this.props.likees)

    return (
      <div className='all-likees'>
        <h4>Likes</h4>
        <ul>
          {likes}
        </ul>
      </div> 
    )
  }
}; 

export default AllLikes;
