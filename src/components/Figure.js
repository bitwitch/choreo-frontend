import React from 'react'; 
import { Stage } from 'react-konva'; 
import JointLayer from './JointLayer';
import LineLayer from './LineLayer'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux'; 
import { moveJoint } from '../actions/joints';

const Figure = (props) => {
  
  return (
    <Stage width={300} height={300}> 
      <LineLayer joints={props.joints} setCurrentPose={props.setCurrentPose} />
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

