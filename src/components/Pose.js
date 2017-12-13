import React from 'react' 
import { Stage, Layer, Text } from 'react-konva'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom' 
import { DragSource, DropTarget } from 'react-dnd'

const poseSource = {
  beginDrag(props) {
    return {
      index: props.index
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

    // Dragging right
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return
    }
    // Dragging left
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return
    }

    props.movePose(dragIndex, hoverIndex) 
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
    this.props.removePose(this.props.pose.id)
  }

  render() {
    const { connectDragSource, connectDropTarget, isDragging, pose } = this.props
    return connectDropTarget(
      connectDragSource(
        <div className='pose' style={{ opacity: isDragging ? 0.5 : 1 }}>
          <Stage width={150} height={150}> 
            <Layer>
              {pose.lines}
              <Text 
                text='X'
                fill='red'
                fontSize={18}
                x={130}
                y={5}
                onClick={this.handleRemovePose}
              />
            </Layer>
          </Stage>

          <div className='move-wrapper'>
            <p className='move'>⟸&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;⟹</p>
          </div>
        </div>
      )
    )
  }
} 

Pose.propTypes = {
  pose: PropTypes.object,
  removePose: PropTypes.func,
  movePose: PropTypes.func,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DropTarget('pose', poseTarget, targetCollect)(DragSource('pose', poseSource, sourceCollect)(Pose))



