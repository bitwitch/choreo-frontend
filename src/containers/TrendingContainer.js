import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { storeChoreographies } from '../actions/choreographies'
import { fetchAllChoreographies } from '../services/choreoApi'

class TrendingContainer extends React.Component {

  componentDidMount() {
    fetchAllChoreographies()
      .then(json => this.props.storeChoreographies(json.choreographies))
  }

  render() {
    const names = ["Luke", "David", "Alice", "Izzy"]
    const trending = this.props.allChoreographies.map((choreo, i) => {
      return <li key={i}><NavLink to={`/choreographies/${choreo.id}`}>{choreo.name || 'no-name'}</NavLink> - by {names[Math.floor(Math.random() * names.length)]}</li>
    })

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