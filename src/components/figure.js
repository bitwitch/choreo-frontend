import React from 'react'; 
import { Stage, Layer, Circle } from 'react-konva'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux'; 
import JointLayer from './JointLayer';
import LineLayer from './LineLayer'; 
import moveJoint from '../actions/joints'

const Figure = (props) => {

  const findDist = (start, stop) => {
    return Math.floor(Math.sqrt( (Math.abs(stop.x - start.x)**2 + (Math.abs(stop.y - start.y)**2) )));
  }

  const distanceCheck = (bodyPart, start, stop) => {
    const dist = findDist(start, stop); 
    let maxDist;
    if (bodyPart === 'armLeft' || bodyPart === 'armRight') {
      maxDist = 100; 
    }
  }

  return (
    <Stage width={300} height={300}> 
      <LineLayer joints={props.joints} />
      <JointLayer moveJoint={props.moveJoint} joints={props.joints} />
    </Stage>
  )
}

function mapStateToProps(state) {
  return {
    joints: state.joints
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveJoint: moveJoint
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Figure); 








