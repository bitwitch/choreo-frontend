import React from 'react'; 

class FavoritesCard extends React.Component {
  render() {

    const likes = this.props.likes.map((like, i) => <li key={i}>{like}</li>)
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