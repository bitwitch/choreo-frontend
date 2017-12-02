import React from 'react'
import FigureContainer from './FigureContainer'
import PlaybackContainer from './PlaybackContainer'
import ChoreographyContainer from './ChoreographyContainer'
import SearchResultsModal from '../components/SearchResultsModal'
import { waitForSpotify } from '../services/choreoApi'
import { fetchSpotifySearch } from '../services/spotifyApi'
import { setAccessTokens } from '../actions/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../style/CreatorContainer.css'

class CreatorContainer extends React.Component {
  state = {
    songTitle: '',
    songs: [],
    showModal: false,
    currentSong: {id: '', title: '', tempo: null},
    playbackSpeed: 75
  }

  handleSongTitle = (e) => {
    this.setState({
      songTitle: e.target.value
    })
  }

  createInterval = () => {
    this.interval = setInterval(this.spotifyWait, 3000)
  }

  spotifyWait = () => {
    console.log('waiting for spotify...')
    waitForSpotify().then(json => {
      if (json.access_token && json.refresh_token) {
        clearInterval(this.interval)
        this.props.setAccessTokens(json.access_token, json.refresh_token) // dispatch action to redux store
        console.log('spotify tokens received')
      }
    }) 
  }

  spotifySearch = () => {
    fetchSpotifySearch(this.state.songTitle, this.props.tokens.access)
      .then(json => this.setState({songs: json.tracks.items}, this.showModal))
    this.setState({songTitle: ''})
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
  }

  matchBPM = () => {
    const {tempo} = this.state.currentSong
    const timeInterval =  1 / (tempo / 60000)
    const playbackSpeed = Math.round( 100 - (timeInterval / 10) )
    this.setState({
      playbackSpeed
    })
  }

  render() {
    const client_id = 'd59d3b99ecf54e6b8fbff1da8c7f11c6'
    const redirect_uri = "http://localhost:3000/api/v1/auth/spotify/callback/"
    const scope = 'user-library-read%20streaming%20user-read-birthdate%20user-read-email%20user-read-private'
    const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`

    return (
      <div className='creator'> 
        <div className='spotify-container'>
          {(this.props.tokens.access && this.props.tokens.refresh) ? 
            <div>
              <input onChange={this.handleSongTitle} type='text' placeholder='enter a song title' value={this.state.songTitle}/>
              <input onClick={this.spotifySearch} type='submit' value='Search'/>
              {this.state.showModal ? <SearchResultsModal songs={this.state.songs} tokens={this.props.tokens} setCurrentSong={this.setCurrentSong} hideModal={this.hideModal}/> : null }
            </div>
          : 
            <a onClick={this.createInterval} target='_blank' href={redirect}>Test Spotify OAuth</a>
          }
        </div>

        { this.state.currentSong.tempo ? 
          <div className='song-data'>
            <p>{this.state.currentSong.title} </p>
            <p>{Math.round(this.state.currentSong.tempo)} BPM</p>
            <button onClick={this.matchBPM}>Match Choreography</button>
          </div>
        : null}

        <div className='creator-top'>
          <FigureContainer />
          <PlaybackContainer playbackSpeed={this.state.playbackSpeed}/>
        </div>
        <ChoreographyContainer />
      </div> 
    )
  }
}

function mapStateToProps(state) {
  return { 
    tokens: state.auth.tokens
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAccessTokens
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatorContainer)