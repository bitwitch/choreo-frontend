import React from 'react'; 
import { Stage, Layer, Circle } from 'react-konva'; 
import ArmLeft from './ArmLeft';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux'; 
import JointLayer from './JointLayer';
import LineLayer from './LineLayer'; 
import moveJoint from '../actions/joints'

class Figure extends React.Component {

  componentDidMount() {
    setTimeout(this.drawLines, 200); 
  }

  findDist = (start, stop) => {
    return Math.floor(Math.sqrt( (Math.abs(stop.x - start.x)**2 + (Math.abs(stop.y - start.y)**2) )));
  }

  distanceCheck = (bodyPart, start, stop) => {
    const dist = this.findDist(start, stop); 
    let maxDist;
    if (bodyPart === 'armLeft' || bodyPart === 'armRight') {
      maxDist = 100; 
    }
  }

  // drawLines = () => {
  //   const appendages = ['armLeft'];
  //   const context = this.refs.lineLayer.getContext();
  //   context.clear(); 

  //   appendages.forEach(appendage => {
  //     this.drawLine(this.state[appendage].start, this.state[appendage].stop)
  //   })
  // }

  // drawLine = (start, stop) => {
  //   const context = this.refs.lineLayer.getContext();
  //   context.beginPath();
  //   context.moveTo(start.x, start.y);
  //   context.lineTo(stop.x, stop.y);
  //   context.setAttr('strokeStyle', 'red');
  //   context.setAttr('lineWidth', 4);
  //   context.stroke();
  // }

  render() {
    return(
      <Stage width={500} height={500}> 
        <LineLayer joints={this.props.joints} />
        <JointLayer moveJoint={this.props.moveJoint} joints={this.props.joints} />
      </Stage>
    )
  }
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








