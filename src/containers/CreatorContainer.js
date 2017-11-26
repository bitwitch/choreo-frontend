import React from 'react'; 
import FigureContainer from './FigureContainer';
import PlaybackContainer from './PlaybackContainer'; 
import ChoreographyContainer from './ChoreographyContainer'; 

function CreatorContainer(props) {
  return (
    <div className='creator'> 
      <FigureContainer />
      <PlaybackContainer />
      <ChoreographyContainer />
    </div> 
  )
}; 

export default CreatorContainer;