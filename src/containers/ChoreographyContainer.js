import React from 'react'; 
import PoseList from '../components/PoseList';
import { removePose } from '../actions/poses'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux'

class ChoreographyContainer extends React.Component {

  render() {
    return (
      <div>
        <PoseList poses={this.props.poses} removePose={this.props.removePose}/>
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