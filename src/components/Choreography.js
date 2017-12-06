import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux'; 
import { addPose, resetPoses } from '../actions/poses'; 
import { fetchChoreography } from '../services/choreoApi'; 
import PlaybackContainer from '../containers/PlaybackContainer';
import '../style/Choreography.css'

class Choreography extends React.Component {
  state = {
    name: ''
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetchChoreography(id).then(choreo => {
      this.setState({name: choreo.name})
      const poses = JSON.parse(choreo.poses_json)
      poses.forEach(pose => {
        this.props.addPose(pose.lines)
      })
    })
  }
  
  render() {
    return (
      <div className='choreography-playback-wrapper'>
        <div className='choreography-playback'>
          <h1 className='choreo-title'>Choreography Title: {this.state.name}</h1>
          <PlaybackContainer playbackSpeed={75}/>
          <NavLink className='back' to='/choreographies'>Back To All</NavLink> 
        </div>
      </div>
    )
  }
}; 

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPose: addPose,
    resetPoses: resetPoses
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Choreography);