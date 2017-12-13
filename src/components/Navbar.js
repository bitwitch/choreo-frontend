import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { play, stop } from '../actions/player'
import '../style/NavBar.css'

class Navbar extends React.Component {
  handleClick = (e) => {
    e.preventDefault()
    this.props.logout()
  }

  handlePause = () => {
    this.props.player.instance.togglePlay() 
    this.props.stop()
  }

  handlePlay = () => {
    this.props.player.instance.togglePlay()
    this.props.play()
  }

  handleStop = () => {
    if (this.props.player.playing) {
      this.props.player.instance.togglePlay()
      this.props.player.instance.seek(0)
      this.props.stop()
    }
  }

  render() {
    const playPauseButton = (this.props.player.playing) ? 
      <button onClick={this.handlePause}>
        <img height={20} width={20} src='https://i.imgur.com/Qo6uE4L.png' alt='Pause'/>
      </button>
    :
      <button onClick={this.handlePlay}>
        <img height={20} width={20} src='https://i.imgur.com/NTz3SDu.png' alt='Play'/>
      </button>
    ;

    return (
      <div className='nav'>
        <ul>
          <li><NavLink to='/choreo'>Choreo</NavLink></li>
          <li><NavLink to='/profile'>Profile</NavLink></li>
          <li><NavLink to='/trending'>Trending</NavLink></li>
          <li><NavLink to='/demo1'>Demo 1</NavLink></li>
          <li><NavLink to='/demo2'>Demo 2</NavLink></li>
          <li id='title'>Shaker Maker</li>
          <li id='logout'><NavLink onClick={this.handleClick} to='/logout'>Logout</NavLink></li>
          {this.props.player.instance ? 
            <li id='player'>
              <div>
                {playPauseButton}
                <button onClick={this.handleStop}>
                  <img height={20} width={20} src='https://i.imgur.com/unx98ZO.png' alt='Stop'/>
                </button>
              </div>
            </li>
          : null}
        </ul> 
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.player 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    play,
    stop
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

