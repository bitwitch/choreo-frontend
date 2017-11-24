import React from 'react'; 
import Pose from './Pose'; 

class PoseList extends React.Component {

  renderPoses = () => {
    return this.props.poses.map((pose, i) => (
      <li key={i}><Pose pose={pose} removePose={this.props.removePose}/></li> 
    ));
  }

  render() {
    return (
      <ul style={{'listStyle': 'none'}}> 
        {this.renderPoses()}
      </ul>
    )
  }
}; 

export default PoseList;