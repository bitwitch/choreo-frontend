import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { storeChoreographies } from '../actions/choreographies'
import { fetchAllChoreographies } from '../services/choreoApi'

class TrendingContainer extends React.Component {

  componentDidMount() {
    fetchAllChoreographies()
      // .then(json => console.log(json))
  }

  render() {
    const popular  = this.props.allChoreographies.sort((a,b) => a.likes.length - b.likes.length)
    const trending = popular.map((choreo, i) => {
      return <li key={i}><NavLink to={`/choreographies/${choreo.id}`}>{choreo.name || 'no-name'}</NavLink></li>
    })

    console.log(this.props.allChoreographies)

    return (
      <div className='all-choreographies'>
        <h4>Choreographies</h4>
        <ul>
          {trending}
        </ul>
      </div> 
    )
  }
}

function mapStateToProps(state) {
  return {
    allChoreographies: state.allChoreographies
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    storeChoreographies
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingContainer) 