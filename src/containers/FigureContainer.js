import React from 'react'; 
import Figure from '../components/Figure'; 
import { moveJoint, reset } from '../actions/joints';
import { addPose, setCurrentPose, resetPoses } from '../actions/poses';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux'; 
import { Line, Ellipse } from 'react-konva'; 
import '../style/FigureContainer.css';
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
        const newPoints = line.props.points.map(point => point/2); 
        return <Line key={++i} points={newPoints} stroke='#000' strokeWidth={3} />;
      }
    });
  } 

  componentWillMount() {
    this.props.resetPoses()
  }

  render() {
    return (
      <div className='figure-container'> 
        <div className='figure-buttons'>
          <button id='add-pose' onClick={this.onAddPose}>+</button>
          <button id='reset-pose' onClick={this.props.reset}>↺</button>
        </div>
        <div className='figure-wrapper'>
          <Figure setCurrentPose={this.props.setCurrentPose} />
        </div>
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
    setCurrentPose: setCurrentPose,
    reset: reset,
    resetPoses: resetPoses
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FigureContainer);