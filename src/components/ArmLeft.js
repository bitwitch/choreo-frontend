import React from 'react'; 
import { Layer, Circle } from 'react-konva'; 

class ArmLeft extends React.Component {

  render() {
    const {start, stop} = this.props.armLeft;
    return ( 
      <Layer>
        {this.props.buildAnchor('armLeft', 'start', start.x, start.y)}
        {this.props.buildAnchor('armLeft', 'stop', stop.x, stop.y)}
      </Layer> 
    )
  }
}; 

export default ArmLeft;