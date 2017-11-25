import React from 'react'; 
import { connect } from 'react-redux'; 
import { Line, Ellipse } from 'react-konva'; 

class PlaybackContainer extends React.Component {

  resizePose = (lines) => {
    let i = 0;
    return lines.map(line => {
      if (line.type === 'Ellipse') {
        const newCenterX = line.props.x * 2;
        const newCenterY = line.props.y * 2; 
        return <Ellipse key={++i} x={newCenterX} y={newCenterY} radius={{x: 10, y: 14}} stroke='#000' strokeWidth={4}/>;
      } else {
        const newPoints = line.props.points.map(point => point*2); 
        return <Line key={++i} points={newPoints} stroke='#000' strokeWidth={4} />;
      }
    });
  }

  render() {
    return (
      <div className="playback-container"> 

        <button>Play</button>
        <button>Pause</button>
        <button>Stop</button>
      </div> 
    )
  }
}; 

function mapStateToProps(state) {
  return {
    poses: state.poses
  }
}

export default connect(mapStateToProps)(PlaybackContainer);