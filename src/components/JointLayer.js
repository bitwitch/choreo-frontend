import React from 'react'; 
import { Layer, Circle } from 'react-konva'; 

class JointLayer extends React.Component {

  // shouldComponentUpdate(nextProps, nextState) { // CAN UNCOMMENT TO PREVENT RERENDERING JOINTS IF PERFORMANCE NEEDED
  //   return false; 
  // }

  renderJoints = () => {
    const joints = this.props.joints;
    const jointElements = [];
    for(let jointName in joints) {
      jointElements.push(this.buildJoint({name: jointName, ...joints[jointName]}))
    }
    // return this.props.joints.map(joint => (
    //   this.buildJoint(joint)
    // ));

    return jointElements;
  }

  buildJoint = ({name, x, y}) => {
    return <Circle
      name={name}
      x={x}
      y={y}
      radius={7}
      stroke='#666666'
      fill='#dddddd'
      strokeWidth={2}
      draggable={true}
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
    // dispatch a moveJoint action 
    this.props.moveJoint(name, x, y); 
  }

  render() {
    console.log('rendering')
    return (
      <Layer>
        {this.renderJoints()}
      </Layer> 
    )
  }
}; 

export default JointLayer;