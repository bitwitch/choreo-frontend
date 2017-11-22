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
      findPivot={this.findPivot}
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
    let pivot, scale; 

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


  findPivot = (jointName) => {
    let pivotX, pivotY, radius;

    switch(jointName) {
      case 'headTop': 
        pivotX = this.props.joints.headBottom.x;
        pivotY = this.props.joints.headBottom.y;
        radius = 20; 
        break;
      case 'headBottom': 
        pivotX = this.props.joints.neck.x;
        pivotY = this.props.joints.neck.y;
        radius = 10; 
        break;
      case 'neck': 
        pivotX = this.props.joints.pelvis.x;
        pivotY = this.props.joints.pelvis.y;
        radius = 95;
        break; 
      case 'shoulderLeft': 
      case 'shoulderRight':
        pivotX = this.props.joints.neck.x;
        pivotY = this.props.joints.neck.y;
        radius = 24; 
        break;
      case 'elbowLeft':
        pivotX = this.props.joints.shoulderLeft.x;
        pivotY = this.props.joints.shoulderLeft.y;
        radius = 62; 
        break;
      case 'elbowRight':
        pivotX = this.props.joints.shoulderRight.x;
        pivotY = this.props.joints.shoulderRight.y;
        radius = 62; 
        break;
      case 'handLeft': 
        pivotX = this.props.joints.elbowLeft.x;
        pivotY = this.props.joints.elbowLeft.y;
        radius = 62; 
        break;
      case 'handRight':
        pivotX = this.props.joints.elbowRight.x;
        pivotY = this.props.joints.elbowRight.y;
        radius = 62; 
        break;
      case 'hipLeft':
      case 'hipRight':
        pivotX = this.props.joints.pelvis.x;
        pivotY = this.props.joints.pelvis.y;
        radius = 25; 
        break;
      case 'kneeLeft':
        pivotX = this.props.joints.hipLeft.x;
        pivotY = this.props.joints.hipLeft.y;
        radius = 79; 
        break;
      case 'kneeRight':
        pivotX = this.props.joints.hipRight.x;
        pivotY = this.props.joints.hipRight.y;
        radius = 79; 
        break;
      case 'footLeft':
        pivotX = this.props.joints.kneeLeft.x;
        pivotY = this.props.joints.kneeLeft.y;
        radius = 67; 
        break;
      case 'footRight':
        pivotX = this.props.joints.kneeRight.x;
        pivotY = this.props.joints.kneeRight.y;
        radius = 67; 
        break;
    }

    return {x: pivotX, y: pivotY, radius: radius}
  }

  dragBound = function(pos) {
     // Find pivot position 
    // if the distance from the current joint to its pivot is greater than the length of the appendage
      // dont let the joint move any more
      // in other words, draw a boundary around the pivot the length of the appendage 
    // else proceed 

    let newX, newY; 
    const pivot = this.attrs.findPivot(this.attrs.name);
    const scale = pivot.radius / Math.sqrt(Math.pow(pos.x - pivot.x, 2) + Math.pow(pos.y - pivot.y, 2));

    if(scale !== 1) {
      return {
        y: Math.round((pos.y - pivot.y) * scale + pivot.y),
        x: Math.round((pos.x - pivot.x) * scale + pivot.x)
      }
    } else {
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