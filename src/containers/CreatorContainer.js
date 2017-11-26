import React from 'react'; 
import FigureContainer from './FigureContainer';
import PlaybackContainer from './PlaybackContainer'; 
import ChoreographyContainer from './ChoreographyContainer'; 
import '../style/CreatorContainer.css';

function CreatorContainer(props) {
  return (
    <div className='creator'> 
      <div className='creator-top'>
        <FigureContainer />
        <PlaybackContainer />
      </div>
      <ChoreographyContainer />
    </div> 
  )
}; 

export default CreatorContainer;