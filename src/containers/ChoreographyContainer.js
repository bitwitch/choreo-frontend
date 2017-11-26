import React from 'react'; 
import PoseList from '../components/PoseList';
import { removePose, resetPoses } from '../actions/poses'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { saveChoreography } from '../services/choreoApi'; 

class ChoreographyContainer extends React.Component {
  
  componentWillUnmount() {
    this.props.resetPoses()
  }

  handleSave = () => {
    // make a post request to the backend 
    saveChoreography(localStorage.getItem('user_id'), this.props.poses)
  }

  render() {
    return (
      <div>
        <PoseList poses={this.props.poses} removePose={this.props.removePose}/>
        {this.props.poses.length > 0 ? <button onClick={this.handleSave}>Save</button> : null }
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