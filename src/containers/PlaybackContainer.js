import React from 'react'; 
import { connect } from 'react-redux'; 
import { Line, Ellipse, Stage, Layer } from 'react-konva'; 
import '../style/PlaybackContainer.css'; 

class PlaybackContainer extends React.Component {
  state = {
    frames: [],
    frameCounter: 0,
    playing: false
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
    if (nextState.frameCounter !== this.state.frameCounter || nextState.playing !== this.state.playing) return true;
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
    if (this.state.frames.length === 0 || this.state.playing) return false; 
    
    this.setState({
      playing: true
    })

    this.play = setInterval(() => {
      const newFrameCount = this.state.frameCounter === this.state.frames.length - 1 ? 0 : this.state.frameCounter + 1;
      this.setState({frameCounter: newFrameCount})
    }, 300)
  }

  handleStop = () => {
    clearInterval(this.play);
    this.setState({
      frameCounter: 0,
      playing: false
    })
  }

  handlePause = () => {
    clearInterval(this.play);
    this.setState({
      playing: false
    })
  }

  render() {
    const currentFrame = this.state.frames[this.state.frameCounter];
    const playPauseButton = this.state.playing ? 
      <button onClick={this.handlePause}><img height={20} width={20} src='https://i.imgur.com/Qo6uE4L.png' alt='Pause'/></button>
    :
      <button onClick={this.handlePlay}><img height={20} width={20} src='https://i.imgur.com/NTz3SDu.png' alt='Play'/></button>
    ;

    return (
      <div className='playback-container'> 
        Count: {this.state.frameCounter + 1}
        <Stage className='playback-stage' width={300} height={300}>
          <Layer>
            {currentFrame}
          </Layer> 
        </Stage>
        <div className='button-container'>
          {playPauseButton}
          <button onClick={this.handleStop}><img height={20} width={20} src='https://i.imgur.com/unx98ZO.png' alt='Stop'/></button>
        </div>
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