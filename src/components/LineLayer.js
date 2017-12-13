import React from 'react' 
import { Layer, Line, Ellipse } from 'react-konva' 
import { bodyMap } from '../data/bodyPartsJointsMap' 

const LineLayer = (props) => {

  const drawLines = () => {
    const joints = props.joints
    const lines = []
    let i = 0

    for(let part in bodyMap) {
      const {start, stop} = bodyMap[part] 

      if (part === 'head') {
        const centerX = (joints[stop].x + joints[start].x) / 2
        const centerY = (joints[stop].y + joints[start].y) / 2

        lines.push(
          <Ellipse 
            key={++i} 
            x={centerX} 
            y={centerY} 
            radius={{x: 10, y: 13}} 
            stroke='#000' 
            strokeWidth={4}
          />
        )

      } else {
        const points = [
          joints[start].x, 
          joints[start].y, 
          joints[stop].x, 
          joints[stop].y
        ]
        lines.push(
          <Line 
            key={++i} 
            points={points} 
            stroke='#000' 
            strokeWidth={4} 
          />
        )
      }
    }

    props.setCurrentPose(lines)
    return lines
  }

  return (
    <Layer> 
      {drawLines()}
    </Layer>
  )
} 

export default LineLayer