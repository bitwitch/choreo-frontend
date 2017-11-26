import React from 'react'; 
import PoseList from '../components/PoseList';
import { removePose, resetPoses } from '../actions/poses'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { saveChoreography } from '../services/choreoApi'; 
import SaveChoreoModal from '../components/SaveChoreoModal';

class ChoreographyContainer extends React.Component {

  state = {
    showModal: false
  }

  componentWillUnmount() {
    this.props.resetPoses()
  }

  handleSave = () => {
    saveChoreography(localStorage.getItem('user_id'), this.props.poses)
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

  render() {
    return (
      <div>
        <PoseList poses={this.props.poses} removePose={this.props.removePose}/>
        {this.props.poses.length > 0 ? <button onClick={this.showModal}>Save</button> : null }
        {this.state.showModal ? <SaveChoreoModal onSave={this.handleSave} hideModal={this.hideModal}/> : null }
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    poses: state.poses.list
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removePose: removePose,
    resetPoses: resetPoses
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoreographyContainer);