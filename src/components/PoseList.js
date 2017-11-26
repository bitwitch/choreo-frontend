import React from 'react'; 
import Pose from './Pose'; 
import '../style/PoseList.css'

class PoseList extends React.Component {

  renderPoses = () => {
    return this.props.poses.map((pose, i) => (
      <li className='pose' key={i}><Pose pose={pose} removePose={this.props.removePose}/></li> 
    ));
  }

  render() {
    return (
      <ul className='pose-list'> 
        {this.renderPoses()}
      </ul>
    )
  }
}; 

export default PoseList;