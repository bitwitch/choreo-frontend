import React from 'react'; 
import { Stage, Layer } from 'react-konva';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'; 
import { DragSource, DropTarget } from 'react-dnd';

const poseSource = {
  beginDrag(props) {
    return {
      index: props.index,
      pose: props.pose, 
      removePose: props.removePose,
      movePose: props.movePose
    }
  }
}

const poseTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging right
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return
    }

    // Dragging left
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return
    }

    // Time to actually perform the action
    props.movePose(dragIndex, hoverIndex) // dispatch action to Redux store

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}


class Pose extends React.Component {

  handleRemovePose = () => {
    this.props.removePose(this.props.pose.id);
  }

  render() {
    const { connectDragSource, connectDropTarget, isDragging, pose } = this.props;
    return connectDropTarget(
      connectDragSource(
        <div style={{ opacity: isDragging ? 0.5 : 1 }}>
          <Stage width={150} height={150}> 
            <Layer>
              {pose.lines}
            </Layer>
          </Stage>
          <button onClick={this.handleRemovePose}>Delete</button> 
        </div>
      )
    )
  }
}; 

Pose.propTypes = {
  pose: PropTypes.object,
  removePose: PropTypes.func,
  movePose: PropTypes.func,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DropTarget('pose', poseTarget, targetCollect)(DragSource('pose', poseSource, sourceCollect)(Pose));



