import React from 'react'
import CreatorContainer from '../containers/CreatorContainer'
import { fetchChoreography } from '../services/choreoApi'
import { addPose } from '../actions/poses'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux' 
import { Line, Ellipse } from 'react-konva'

class Demo1 extends React.Component {

  componentDidMount() {
    const id = 44
    fetchChoreography(id).then(choreo => {
      const poses = JSON.parse(choreo.poses_json)
      let i = 0
      poses.forEach(pose => {
        const lines = pose.lines.map(line => {
          if (line.type === 'Ellipse') {
            return (
              <Ellipse 
                key={++i} 
                x={line.props.x} 
                y={line.props.y} 
                radius={{x: 5, y: 7}} 
                stroke='#000' 
                strokeWidth={3}
              />
            )
          } else {
            return <Line key={++i} points={line.props.points} stroke='#000' strokeWidth={3} />
          }
        })

        this.props.addPose(lines)
      })
    })
  }

  render() {
    return (
      <CreatorContainer />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPose
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Demo1)