import React from 'react'; 
import { NavLink } from 'react-router-dom';

class FavoritesCard extends React.Component {
  render() {

    const likes = this.props.likes.slice(0, 15).map((like, i) => {
     return <li key={i}><NavLink to={`/likes/${like.choreography_id}`}>Like</NavLink></li>
    })
    return (
      <div className='card-container'>
        <h4>Favs</h4>
        <ul>
          {likes}
        </ul>

        <div className='card-footer'> 
          <NavLink className='footer-link' to='/likes'>SHOW ALL</NavLink> 
        </div> 
      </div> 
    )
  }
};

export default FavoritesCard;