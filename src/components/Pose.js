import React from 'react'; 
import { Stage, Layer } from 'react-konva'; 


class Pose extends React.Component {

  handleRemovePose = () => {
    this.props.removePose(this.props.pose.id);
  }

  render() {
    return (
      <div>
        <Stage width={150} height={150}> 
          <Layer>
            {this.props.pose.lines}
          </Layer>
        </Stage>
        <button onClick={this.handleRemovePose}>Delete</button> 
      </div>
    )
  }
}; 

export default Pose;