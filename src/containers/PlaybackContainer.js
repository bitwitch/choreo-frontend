import React from 'react'; 
import { connect } from 'react-redux'; 
import { Line, Ellipse, Stage, Layer } from 'react-konva'; 
import '../style/PlaybackContainer.css'; 

class PlaybackContainer extends React.Component {
  state = {
    frames: [],
    frameCounter: 0
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.poses.list.length !== this.props.poses.list.length) {
      const frames = nextProps.poses.list.map(pose => {
        return this.resizePose(pose.lines); 
      });

      this.setState({
        frames
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.frameCounter !== this.state.frameCounter) return true;
    return nextProps.poses.list.length === this.props.poses.list.length ? false : true;
  }

  resizePose = (lines) => {
    let i = 0;
    return lines.map(line => {
      if (line.type === 'Ellipse') {
        const newCenterX = line.props.x * 2;
        const newCenterY = line.props.y * 2; 
        return <Ellipse key={++i} x={newCenterX} y={newCenterY} radius={{x: 10, y: 14}} stroke='#000' strokeWidth={4}/>;
      } else {
        const newPoints = line.props.points.map(point => point*2); 
        return <Line key={++i} points={newPoints} stroke='#000' strokeWidth={4} />;
      }
    });
  }

  handlePlay = () => {
    if (this.state.frames.length === 0) return false; 
    
    this.play = setInterval(() => {
      const newFrameCount = this.state.frameCounter === this.state.frames.length - 1 ? 0 : this.state.frameCounter + 1;
      this.setState({frameCounter: newFrameCount})
    }, 300)
  }

  handleStop = () => {
    clearInterval(this.play);
    this.setState({frameCounter: 0})
  }

  handlePause = () => {
    clearInterval(this.play);
  }

  render() {
    const currentFrame = this.state.frames[this.state.frameCounter];

    return (
      <div className="playback-container"> 
        Count: {this.state.frameCounter + 1}
        <Stage width={300} height={300}>
          <Layer>
            {currentFrame}
          </Layer> 
        </Stage>
        <button onClick={this.handlePlay}>Play</button>
        <button onClick={this.handlePause}>Pause</button>
        <button onClick={this.handleStop}>Stop</button>
      </div> 
    )
  }
}; 

function mapStateToProps(state) {
  return {
    poses: state.poses
  }
}

export default connect(mapStateToProps)(PlaybackContainer);