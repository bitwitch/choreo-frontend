import React from 'react'; 
import { Layer, Line } from 'react-konva'; 
import { bodyMap } from '../data/bodyPartsJointsMap'; 

const LineLayer = (props) => {

  const drawLines = () => {
    const joints = props.joints; 
    const lines = []; 
    for(let part in bodyMap) {
      const {start, stop} = bodyMap[part]; 
      const points = [joints[start].x, joints[start].y, joints[stop].x, joints[stop].y];
      lines.push(<Line points={points} stroke='#000' strokeWidth={4} />)
    }

    return lines;
  }

  return (
    <Layer> 
      {drawLines()}
    </Layer>
  )
}; 

export default LineLayer;