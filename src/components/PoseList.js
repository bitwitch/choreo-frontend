import React from 'react'; 
import Pose from './Pose';
import '../style/PoseList.css';

class PoseList extends React.Component {

  renderPoses = () => {
    return this.props.poses.map((pose, i) => (
      <li className='pose-wrapper' key={i}><Pose index={i} pose={pose} removePose={this.props.removePose} movePose={this.props.movePose}/></li> 
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