import React from 'react'; 
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux'; 
import { addPose, resetPoses } from '../actions/poses'; 
import { fetchChoreography } from '../services/choreoApi'; 
import PlaybackContainer from '../containers/PlaybackContainer';

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
      <div>
        Choreography: {this.state.name}
        <PlaybackContainer />
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