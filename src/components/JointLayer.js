import React from 'react'; 
import { Layer, Circle } from 'react-konva'; 

class JointLayer extends React.Component {

  // shouldComponentUpdate(nextProps, nextState) { // CAN UNCOMMENT AND ADD CONDITIONS TO PREVENT 
  //   return false;                               // RERENDERING JOINTS IF PERFORMANCE NEEDED
  // }

  renderJoints = () => {
    const joints = this.props.joints;
    const jointElements = [];
    let i = 0; 
    
    for(let jointName in joints) {
      jointElements.push(this.buildJoint(++i, {name: jointName, ...joints[jointName]}))
    }
    return jointElements;
  }

  buildJoint = (key, {name, x, y}) => {
    return <Circle
      key={key}
      name={name}
      ref={name}
      x={x}
      y={y}
      radius={7}
      stroke='#666666'
      fill='#dddddd'
      strokeWidth={2}
      draggable={true}
      findPivotPos={this.findPivotPos}
      dragBoundFunc={this.dragBound}
      onDragMove={this.onDragMove}
      onMouseOver={this.onMouseOver}
      onMouseOut={this.onMouseOut}
    />;
  }

  onMouseOver = () => {
    document.body.style.cursor = 'pointer';
  }

  onMouseOut = () => {
    document.body.style.cursor = 'default';
  }

  onDragMove = (e) => {
    const {name, x, y} = e.target.attrs;
    const {movementX, movementY} = e.evt;

    switch(name) {
      case 'headBottom':
        this.props.moveJoint('headTop', movementX + this.props.joints.headTop.x, movementY + this.props.joints.headTop.y);
        break;
      case 'pelvis':
        this.props.moveJoint('neck', movementX + this.props.joints.neck.x, movementY + this.props.joints.neck.y);
        this.props.moveJoint('hipLeft', movementX + this.props.joints.hipLeft.x, movementY + this.props.joints.hipLeft.y);
        this.props.moveJoint('kneeLeft', movementX + this.props.joints.kneeLeft.x, movementY + this.props.joints.kneeLeft.y);
        this.props.moveJoint('footLeft', movementX + this.props.joints.footLeft.x, movementY + this.props.joints.footLeft.y);
        this.props.moveJoint('hipRight', movementX + this.props.joints.hipRight.x, movementY + this.props.joints.hipRight.y);
        this.props.moveJoint('kneeRight', movementX + this.props.joints.kneeRight.x, movementY + this.props.joints.kneeRight.y);
        this.props.moveJoint('footRight', movementX + this.props.joints.footRight.x, movementY + this.props.joints.footRight.y);
      case 'neck': 
        this.props.moveJoint('headTop', movementX + this.props.joints.headTop.x, movementY + this.props.joints.headTop.y);
        this.props.moveJoint('headBottom', movementX + this.props.joints.headBottom.x, movementY + this.props.joints.headBottom.y);
        this.props.moveJoint('shoulderLeft', movementX + this.props.joints.shoulderLeft.x, movementY + this.props.joints.shoulderLeft.y);
        this.props.moveJoint('elbowLeft', movementX + this.props.joints.elbowLeft.x, movementY + this.props.joints.elbowLeft.y);
        this.props.moveJoint('handLeft', movementX + this.props.joints.handLeft.x, movementY + this.props.joints.handLeft.y);
        this.props.moveJoint('shoulderRight', movementX + this.props.joints.shoulderRight.x, movementY + this.props.joints.shoulderRight.y);
        this.props.moveJoint('elbowRight', movementX + this.props.joints.elbowRight.x, movementY + this.props.joints.elbowRight.y);
        this.props.moveJoint('handRight', movementX + this.props.joints.handRight.x, movementY + this.props.joints.handRight.y);
        break;

      case 'shoulderLeft':
        this.props.moveJoint('elbowLeft', movementX + this.props.joints.elbowLeft.x, movementY + this.props.joints.elbowLeft.y);
      case 'elbowLeft': 
        this.props.moveJoint('handLeft', movementX + this.props.joints.handLeft.x, movementY + this.props.joints.handLeft.y);
        break;
      case 'hipLeft':
        this.props.moveJoint('kneeLeft', movementX + this.props.joints.kneeLeft.x, movementY + this.props.joints.kneeLeft.y);
      case 'kneeLeft': 
        this.props.moveJoint('footLeft', movementX + this.props.joints.footLeft.x, movementY + this.props.joints.footLeft.y);
        break;

      case 'shoulderRight':
        this.props.moveJoint('elbowRight', movementX + this.props.joints.elbowRight.x, movementY + this.props.joints.elbowRight.y);
      case 'elbowRight': 
        this.props.moveJoint('handRight', movementX + this.props.joints.handRight.x, movementY + this.props.joints.handRight.y);
        break;
      case 'hipRight':
        this.props.moveJoint('kneeRight', movementX + this.props.joints.kneeRight.x, movementY + this.props.joints.kneeRight.y);
      case 'kneeRight': 
        this.props.moveJoint('footRight', movementX + this.props.joints.footRight.x, movementY + this.props.joints.footRight.y);
        break;
      default: break;
    }

    this.props.moveJoint(name, x, y); 
  }


  findDist = (x1, y1, x2, y2) => {
    return Math.floor(Math.sqrt( (Math.abs(x2 - x1)**2 + (Math.abs(y2 - y1)**2) )));
  }

  // const distanceCheck = (bodyPart, start, stop) => {
  //   const dist = findDist(start, stop); 
  //   let maxDist;
  //   if (bodyPart === 'armLeft' || bodyPart === 'armRight') {
  //     maxDist = 100; 
  //   }
  // }

  findPivotPos = (jointName, x, y) => {
    let pivotX, pivotY, dist;

    switch(jointName) {
      case 'headTop': 
        pivotX = this.props.joints.headBottom.x;
        pivotY = this.props.joints.headBottom.y;
        return {x: pivotX, y: pivotY}
    }

    return true;
  }

  dragBound = function(pos) {
    let newX, newY; 

    // const pivotPos = this.attrs.findPivotPos(this.attrs.name, pos.x, pos.y);

    // Find pivot position 
    // if the distance from the current joint to its pivot is greater than the length of the appendage
      // dont let the joint move any more
    // else proceed 

    if (pos.x < 5) {
      newX = 5;
    } else if (pos.x > 295) {
      newX = 295; 
    } else {
      newX = pos.x;
    }

    if (pos.y < 5) {
      newY = 5;
    } else if (pos.y > 295) {
      newY = 295; 
    } else {
      newY = pos.y;
    }

    return {
      x: newX, 
      y: newY  
    }
  }

  render() {
    return (
      <Layer>
        {this.renderJoints()}
      </Layer> 
    );
  }
}; 

export default JointLayer;