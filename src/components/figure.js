import React from 'react'; 
import { Stage, Layer, Circle } from 'react-konva'; 
import ArmLeft from './ArmLeft';

class Figure extends React.Component {

  state = {
    armLeft: {
      start: { x: 100, y: 100 },
      stop: { x: 150, y: 50 }
    }
  }

  componentDidMount() {
    setTimeout(this.drawLines, 50); 
  }



  buildAnchor = (bodyPart, type, x, y) => {
    return <Circle
      bodyPart={bodyPart}
      type={type}
      x={x}
      y={y}
      radius={7}
      stroke='#666666'
      fill='#dddddd'
      strokeWidth={2}
      draggable={true}
      onDragMove={this.onDragMove}
      onMouseOver={this.onMouseOver}
      onMouseOut={this.onMouseOut}
    />;
  }

 onMouseOver = () => {
    document.body.style.cursor = 'pointer';
  }

  onMouseOut = () => {
    document.body.style.cursor = 'default';
  }

  onDragMove = (e) => {
    const {bodyPart, type, x, y} = e.target.attrs;
    let newState; 

    switch(type) {
      case 'start': 
        newState = {
          [bodyPart]: {
            ...this.state[bodyPart],
            start: {x, y}
          }
        }
        break;

      case 'stop':
        newState = {
          [bodyPart]: {
            ...this.state[bodyPart],
            stop: {x, y}
          }
        }
        break;

      default: 
        console.log("invalid type passed to onDragMove (figure.js): expected stop or start")  
        break;
    }

    this.setState({
      ...this.state, 
      ...newState
    });

    this.drawLines();
  }


  drawLines = () => {
    const appendages = ['armLeft'];
    const context = this.refs.lineLayer.getContext();
    context.clear(); 

    appendages.forEach(appendage => {
      this.drawLine(this.state[appendage].start, this.state[appendage].stop)
    })
  }

  drawLine = (start, stop) => {
    const context = this.refs.lineLayer.getContext();
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(stop.x, stop.y);
    context.setAttr('strokeStyle', 'red');
    context.setAttr('lineWidth', 4);
    context.stroke();
  }

  render() {
    return(
      <Stage width={500} height={500}> 
        <ArmLeft 
          ref='armLeft' 
          buildAnchor={this.buildAnchor} 
          armLeft={this.state.armLeft}
          drawLines={this.drawLines}
          />
  
        <Layer ref='lineLayer' />
      </Stage>
    )
  }
}

export default Figure; 








