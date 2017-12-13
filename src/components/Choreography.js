import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addPose, resetPoses } from '../actions/poses'
import { fetchChoreography, refreshToken } from '../services/choreoApi'
import { fetchSpotifySearch, playSong } from '../services/spotifyApi'
import PlaybackContainer from '../containers/PlaybackContainer'
import SearchResultsModal from './SearchResultsModal'
import '../style/Choreography.css'
import '../style/CreatorContainer.css'

class Choreography extends React.Component {
  state = {
    name: '',
    songTitle: '',
    songs: [],
    showModal: false,
    currentSong: {id: '', title: '', tempo: null},
    playbackSpeed: 75,
    switch: false
  }

  handleSongTitle = (e) => {
    this.setState({
      songTitle: e.target.value
    })
  }

  spotifySearch = () => {
    if (this.state.songTitle) {
      fetchSpotifySearch(this.state.songTitle, this.props.tokens.access)
      .then(json => {
        if (json.tracks) {
          this.setState({songs: json.tracks.items, songTitle: ''}, this.showModal)
        } else {
          refreshToken(this.props.tokens.refresh).then(json => {
            if (json.access_token) {
              this.props.setAccessTokens(json.access_token, this.props.tokens.refresh)
            }
          })

          this.setState({songTitle: 'Error: Try Again'})
        }
      })
    }
  }

  showModal = () => {
    this.setState({
      showModal: true
    })
  }

  hideModal = () => {
    this.setState({
      showModal: false
    })
  }

  setCurrentSong = (id, title, tempo) => {
    this.setState({
      currentSong: {
        id, 
        title, 
        tempo
      }
    })

    const currentTrack = this.state.songs.find(song => song.id === id)
    playSong(this.props.player.instance._options.id, currentTrack.uri, this.props.tokens.access)
  }

  matchBPM = () => {
    const {tempo} = this.state.currentSong
    const timeInterval =  1 / (tempo / 60000)
    const playbackSpeed = Math.round( 100 - (timeInterval / 10) )
    this.setState({switch: !this.state.switch}, () => 
      this.setState({
        playbackSpeed
      }))
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetchChoreography(id).then(choreo => {
      this.setState({name: choreo.name})
      const poses = JSON.parse(choreo.poses_json)
      poses.forEach(pose => {
        this.props.addPose(pose.lines)
      })
    })
  }
  
  render() {
    return (
      <div>
        <div className='spotify-container'>
          {(this.props.tokens.access && this.props.tokens.refresh) ? 
            <div className='song-search'>
              <input 
                onChange={this.handleSongTitle} 
                type='text' 
                placeholder='enter a song title' 
                value={this.state.songTitle}
              />
              <input onClick={this.spotifySearch} type='submit' value='Search'/>

              {this.state.showModal ? 
                <SearchResultsModal 
                  songs={this.state.songs} 
                  tokens={this.props.tokens} 
                  setCurrentSong={this.setCurrentSong} 
                  setAccessTokens={this.props.setAccessTokens} 
                  hideModal={this.hideModal}
                /> 
              : null }

            </div>
          : null}
        </div>

        { this.state.currentSong.tempo ? 
          <div className='song-data'>
            <div className='flex-song-data'></div>
            <div className='flex-song-data'></div>
            <div className='flex-song-data three'>
              <p>{this.state.currentSong.title} </p>
              <p>{Math.round(this.state.currentSong.tempo)} BPM</p>
              <button onClick={this.matchBPM}>Match Choreography</button>
            </div>
          </div>
        : null}

        <div className='choreography-playback-wrapper'>
          <div className='choreography-playback'>
            <h1 className='choreo-title'>Choreography Title: {this.state.name}</h1>
            <PlaybackContainer 
              switch={this.state.switch} 
              playbackSpeed={this.state.playbackSpeed}
            />
            <NavLink className='back' to='/choreographies'>Back To All</NavLink> 
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tokens: state.auth.tokens,
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPose: addPose,
    resetPoses: resetPoses
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Choreography)