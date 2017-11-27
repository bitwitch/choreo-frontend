import React from 'react'; 
import { NavLink } from 'react-router-dom';

class FavoritesCard extends React.Component {
  render() {

    const likes = this.props.likes.slice(0, 15).map((like, i) => {
     return <li key={i}><NavLink to={`profile/favs/${like.choreography_id}`}>{like}</NavLink></li>
    })
    return (
      <div className='card-container'>
        <h4>Favs</h4>
        <ul>
          {likes}
        </ul>
      </div> 
    )
  }
};

export default FavoritesCard;