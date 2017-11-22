import React from 'react'; 
import { Layer, Circle } from 'react-konva'; 

const JointLayer = (props) => {

  // shouldComponentUpdate(nextProps, nextState) { // CAN UNCOMMENT TO PREVENT RERENDERING JOINTS IF PERFORMANCE NEEDED
  //   return false;                               // Component will need to be changed back to a class 
  // }

  const renderJoints = () => {
    const joints = props.joints;
    const jointElements = [];
    let i = 0; 
    
    for(let jointName in joints) {
      jointElements.push(buildJoint(++i, {name: jointName, ...joints[jointName]}))
    }
    return jointElements;
  }

  const buildJoint = (key, {name, x, y}) => {
    return <Circle
      key={key}
      name={name}
      x={x}
      y={y}
      radius={7}
      stroke='#666666'
      fill='#dddddd'
      strokeWidth={2}
      draggable={true}
      dragBoundFunc={dragBound}
      onDragMove={onDragMove}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />;
  }

  const onMouseOver = () => {
    document.body.style.cursor = 'pointer';
  }

  const onMouseOut = () => {
    document.body.style.cursor = 'default';
  }

  const onDragMove = (e) => {
    const {name, x, y} = e.target.attrs;
    const {movementX, movementY} = e.evt;

    switch(name) {
      case 'headBottom':
        props.moveJoint('headTop', movementX + props.joints.headTop.x, movementY + props.joints.headTop.y);
        break;
      case 'pelvis':
        props.moveJoint('neck', movementX + props.joints.neck.x, movementY + props.joints.neck.y);
        props.moveJoint('hipLeft', movementX + props.joints.hipLeft.x, movementY + props.joints.hipLeft.y);
        props.moveJoint('kneeLeft', movementX + props.joints.kneeLeft.x, movementY + props.joints.kneeLeft.y);
        props.moveJoint('footLeft', movementX + props.joints.footLeft.x, movementY + props.joints.footLeft.y);
        props.moveJoint('hipRight', movementX + props.joints.hipRight.x, movementY + props.joints.hipRight.y);
        props.moveJoint('kneeRight', movementX + props.joints.kneeRight.x, movementY + props.joints.kneeRight.y);
        props.moveJoint('footRight', movementX + props.joints.footRight.x, movementY + props.joints.footRight.y);
      case 'neck': 
        props.moveJoint('headTop', movementX + props.joints.headTop.x, movementY + props.joints.headTop.y);
        props.moveJoint('headBottom', movementX + props.joints.headBottom.x, movementY + props.joints.headBottom.y);
        props.moveJoint('shoulderLeft', movementX + props.joints.shoulderLeft.x, movementY + props.joints.shoulderLeft.y);
        props.moveJoint('elbowLeft', movementX + props.joints.elbowLeft.x, movementY + props.joints.elbowLeft.y);
        props.moveJoint('handLeft', movementX + props.joints.handLeft.x, movementY + props.joints.handLeft.y);
        props.moveJoint('shoulderRight', movementX + props.joints.shoulderRight.x, movementY + props.joints.shoulderRight.y);
        props.moveJoint('elbowRight', movementX + props.joints.elbowRight.x, movementY + props.joints.elbowRight.y);
        props.moveJoint('handRight', movementX + props.joints.handRight.x, movementY + props.joints.handRight.y);
        break;

      case 'shoulderLeft':
        props.moveJoint('elbowLeft', movementX + props.joints.elbowLeft.x, movementY + props.joints.elbowLeft.y);
      case 'elbowLeft': 
        props.moveJoint('handLeft', movementX + props.joints.handLeft.x, movementY + props.joints.handLeft.y);
        break;
      case 'hipLeft':
        props.moveJoint('kneeLeft', movementX + props.joints.kneeLeft.x, movementY + props.joints.kneeLeft.y);
      case 'kneeLeft': 
        props.moveJoint('footLeft', movementX + props.joints.footLeft.x, movementY + props.joints.footLeft.y);
        break;

      case 'shoulderRight':
        props.moveJoint('elbowRight', movementX + props.joints.elbowRight.x, movementY + props.joints.elbowRight.y);
      case 'elbowRight': 
        props.moveJoint('handRight', movementX + props.joints.handRight.x, movementY + props.joints.handRight.y);
        break;
      case 'hipRight':
        props.moveJoint('kneeRight', movementX + props.joints.kneeRight.x, movementY + props.joints.kneeRight.y);
      case 'kneeRight': 
        props.moveJoint('footRight', movementX + props.joints.footRight.x, movementY + props.joints.footRight.y);
        break;

    }

    props.moveJoint(name, x, y); 
  }

  const dragBound = (pos) => {
    let newX, newY; 

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

  return (
    <Layer>
      {renderJoints()}
    </Layer> 
  )
  
}; 

export default JointLayer;