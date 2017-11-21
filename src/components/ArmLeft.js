import React from 'react'; 
import { Layer, Circle } from 'react-konva'; 

class ArmLeft extends React.Component {

  render() {
    const {start, stop} = this.props.armLeft;
    return ( 
      <Layer>
        {this.props.buildJoint('armLeft', 'start', start.x, start.y)}
        {this.props.buildJoint('armLeft', 'stop', stop.x, stop.y)}
      </Layer> 
    )
  }
}; 

export default ArmLeft;