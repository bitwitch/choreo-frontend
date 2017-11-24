import React from 'react'; 
import Figure from '../components/Figure'; 
import moveJoint from '../actions/joints';
import { addPose, setCurrentPose } from '../actions/poses';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux'; 
import { Line, Ellipse } from 'react-konva'; 

class FigureContainer extends React.Component {

  onAddPose = () => {
    const newPose = this.resizePose(this.props.currentPose); 
    this.props.addPose(newPose);
  }

  resizePose = (lines) => {
    let i = 0;
    return lines.map(line => {
      if (line.type === 'Ellipse') {
        const newCenterX = line.props.x / 2;
        const newCenterY = line.props.y / 2; 
        return <Ellipse key={++i} x={newCenterX} y={newCenterY} radius={{x: 5, y: 7}} stroke='#000' strokeWidth={3}/>;
      } else {
        const newPoints = line.props.points.map(point => Math.floor(point/2)); 
        return <Line key={++i} points={newPoints} stroke='#000' strokeWidth={3} />;
      }
    });
  }

  render() {
    return (
      <div> 
        <Figure joints={this.props.joints} moveJoint={this.props.moveJoint} setCurrentPose={this.props.setCurrentPose} />
        <button onClick={this.onAddPose}>Add Pose</button>
      </div> 
    )
  }
}; 

function mapStateToProps(state) {
  return {
    joints: state.joints,
    currentPose: state.poses.currentPose
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveJoint: moveJoint,
    addPose: addPose,
    setCurrentPose: setCurrentPose
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FigureContainer);