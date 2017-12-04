import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import '../style/NavBar.css'

class Navbar extends React.Component {
  state = {
    playing: false
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.logout()
  }

  handlePause = () => {
    this.props.player.togglePlay() 
    this.setState({playing: false})
  }

  handlePlay = () => {
    this.props.player.togglePlay()
    this.setState({playing: true})
  }

  handleStop = () => {
    this.props.player.togglePlay()
    this.props.player.seek(0)
    this.setState({playing: false})
  }

  render() {

    if (this.props.player) console.log(this.props.player)

    const playPauseButton = (this.state.playing) ? 
      <button onClick={this.handlePause}><img height={20} width={20} src='https://i.imgur.com/Qo6uE4L.png' alt='Pause'/></button>
    :
      <button onClick={this.handlePlay}><img height={20} width={20} src='https://i.imgur.com/NTz3SDu.png' alt='Play'/></button>
    ;

    return (
      <div className='nav'>
        <ul>
          <li><NavLink to='/choreo'>Choreo</NavLink></li>
          <li><NavLink to='/profile'>Profile</NavLink></li>
          <li><NavLink to='/trending'>Trending</NavLink></li>
          <li id='title'>Shaker Maker</li>
          <li id='logout'><NavLink onClick={this.handleClick} to='/logout'>Logout</NavLink></li>
          {this.props.player ? 
            <li id='player'>
              <div>
                {playPauseButton}
                <button onClick={this.handleStop}><img height={20} width={20} src='https://i.imgur.com/unx98ZO.png' alt='Stop'/></button>
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

export default connect(mapStateToProps)(Navbar)







