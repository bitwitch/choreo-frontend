import React from 'react'; 
import PoseList from '../components/PoseList';
import { removePose, resetPoses, movePose } from '../actions/poses'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { saveChoreography } from '../services/choreoApi'; 
import SaveChoreoModal from '../components/SaveChoreoModal';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { spotifyRedirect } from '../services/choreoApi';

class ChoreographyContainer extends React.Component {

  state = {
    showModal: false
  }

  componentWillUnmount() {
    this.props.resetPoses()
  }

  handleSave = (name) => {
    saveChoreography(localStorage.getItem('user_id'), name, this.props.poses)
  }

  showModal = () => {
    this.setState({
      showModal: true
    })
  }

  hideModal = () => {
    this.setState({
      showModal: false
    })
  }

  spotifyLogin = () => {
    spotifyRedirect()
  }

  render() {
    return (
      <div className='choreography-container'>
        <PoseList poses={this.props.poses} removePose={this.props.removePose} movePose={this.props.movePose}/>
        {this.props.poses.length > 0 ? <button onClick={this.showModal}>Save</button> : null }
        {this.state.showModal ? <SaveChoreoModal onSave={this.handleSave} hideModal={this.hideModal}/> : null }
        
        <button onClick={this.spotifyLogin}>Test Spotify OAuth</button>
     </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    poses: state.poses.list
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removePose: removePose,
    movePose: movePose,
    resetPoses: resetPoses
  }, dispatch)
};

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(ChoreographyContainer));