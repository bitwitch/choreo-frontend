import React from 'react'; 
import PoseList from '../components/PoseList';
import { removePose } from '../actions/poses'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { saveChoreography } from '../services/choreoBackendApi'; 

class ChoreographyContainer extends React.Component {


  handleSave = () => {
    // make a post request to the backend 
    // HARD CODED USER_ID AS ONE CURRENTLY!!!
    saveChoreography(1, this.props.poses)
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
    removePose: removePose
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoreographyContainer);