import React from 'react'; 
import { Layer, Circle } from 'react-konva'; 

const JointLayer = (props) => {

  // shouldComponentUpdate(nextProps, nextState) { // CAN UNCOMMENT TO PREVENT RERENDERING JOINTS IF PERFORMANCE NEEDED
  //   return false;                               // Component will need to be changed back to a class 
  // }

  const renderJoints = () => {
    const joints = props.joints;
    const jointElements = [];
    for(let jointName in joints) {
      jointElements.push(buildJoint({name: jointName, ...joints[jointName]}))
    }

    return jointElements;
  }

  const buildJoint = ({name, x, y}) => {
    return <Circle
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