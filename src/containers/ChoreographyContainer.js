import React from 'react'; 
import PoseList from '../components/PoseList';
import { connect } from 'react-redux'

class ChoreographyContainer extends React.Component {

  render() {
    return (
      <div>
        <PoseList poses={this.props.poses} />
      </div>
    )
  }
}; 

function mapStateToProps(state) {
  return {
    poses: state.poses.list
  }
}

export default connect(mapStateToProps)(ChoreographyContainer);