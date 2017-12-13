import React from 'react'
import FigureContainer from './FigureContainer'
import PlaybackContainer from './PlaybackContainer'
import ChoreographyContainer from './ChoreographyContainer'
import SearchResultsModal from '../components/SearchResultsModal'
import { waitForSpotify, refreshToken } from '../services/choreoApi'
import { fetchSpotifySearch, playSong } from '../services/spotifyApi'
import { setAccessTokens } from '../actions/auth'
import { addPlayer, play } from '../actions/player'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Script from 'react-load-script' 
import '../style/CreatorContainer.css'

class CreatorContainer extends React.Component {
  state = {
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

  createInterval = () => {
    this.interval = setInterval(this.spotifyWait, 3000)
    setTimeout(() => {
      if (this.interval) clearInterval(this.interval)
    }, 300000)
  }

  spotifyWait = () => {
    console.log('waiting for spotify...')
    waitForSpotify().then(json => {
      if (json.access_token && json.refresh_token) {
        clearInterval(this.interval)
        this.props.setAccessTokens(json.access_token, json.refresh_token)
        console.log('spotify tokens received')
      }
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
    this.props.play()
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

  handleScriptError = () => {
    console.log("Error loading Spotify Playback SDK")
  }

  handleScriptLoad = () => {
    const token = this.props.tokens.access
    const player = new window.Spotify.Player({
      name: 'Shaker Maker Player',
      getOAuthToken: cb => { cb(token) }
    })

    // Error handling
    player.on('initialization_error', e => console.error(e))
    player.on('authentication_error', e => console.error(e))
    player.on('account_error', e => console.error(e))
    player.on('playback_error', e => console.error(e))

    // Playback status updates
    player.on('player_state_changed', state => console.log('player state: ', state))

    // Ready
    player.on('ready', data => {
      console.log('Ready with Device ID', data.device_id)
    })

    player.on("player_state_ready", function (playbackState) {
      const current_track = playbackState.track_window.current_track;
      const current_position = playbackState.position;
      const current_song_duration = playbackState.duration;

      console.log("Currently Playing", current_track);
      console.log("Position in Song", current_position);
      console.log("Duration of Song", current_song_duration);
    });

    player.connect()

    this.props.addPlayer(player)
  }

  render() {
    const client_id = 'd59d3b99ecf54e6b8fbff1da8c7f11c6'
    const redirect_uri = "http://localhost:3000/api/v1/auth/spotify/callback/"
    const scope = 'user-library-read%20streaming%20user-read-birthdate%20user-read-email%20user-read-private%20user-modify-playback-state'
    const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`

    const creatorTopStyle = this.props.player.playing ? 
      { 
        animationName: 'color_cycle',
        animationDuration: '5s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
      } 
    : 
      {backgroundColor: '#fff'} 
    ;

    return (
      <div className='creator'> 
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
              
              {/*  Load in Web Playback SDK script */}
              <Script 
                url="https://sdk.scdn.co/spotify-player.js" 
                onError={this.handleScriptError} 
                onLoad={this.handleScriptLoad}
              />

            </div>
          : 
            <a onClick={this.createInterval} target='_blank' href={redirect}>Play Music</a>
          }
        </div>

        { this.state.currentSong.tempo ? 
          <div className='song-data' style={creatorTopStyle}>
            <div className='flex-song-data'></div>
            <div className='flex-song-data'></div>
            <div className='flex-song-data three'>
              <p>{this.state.currentSong.title} </p>
              <p>{Math.round(this.state.currentSong.tempo)} BPM</p>
              <button onClick={this.matchBPM}>Match Choreography</button>
            </div>
          </div>
        : null}

        <div className='creator-top' style={creatorTopStyle}>
          <FigureContainer/>
          <PlaybackContainer 
            switch={this.state.switch} 
            playbackSpeed={this.state.playbackSpeed}
          />
        </div>
        <ChoreographyContainer />
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
    setAccessTokens,
    addPlayer,
    play
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatorContainer)