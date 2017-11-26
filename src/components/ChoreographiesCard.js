import React from 'react'; 

class ChoreographiesCard extends React.Component {
  render() {

    const choreographies = this.props.choreographies.slice(0,15).map((choreo, i) => <li key={i}>{choreo.name || 'no-name'}</li>)

    return (
      <div className='card-container'>
        <h4>Choreographies</h4>
        <ul>
          {choreographies}
        </ul>
      </div> 
    )
  }
}; 

export default ChoreographiesCard;