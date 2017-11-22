import React from 'react'; 
import { Stage, Layer } from 'react-konva'; 

class Pose extends React.Component {
  render() {
    return (
      <Stage width={150} height={150}> 
        <Layer>
          {this.props.pose.lines}
        </Layer>
      </Stage>
    )
  }
}; 

export default Pose;