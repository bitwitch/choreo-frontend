import React from 'react'; 
import ModalWrapper from './ModalWrapper'; 
import '../style/Modal.css';

class SaveChoreoModal extends React.Component {

  state = {
    name: ''
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleSave = () => {
    this.props.onSave(this.state.name)
    this.setState({
      name: ''
    })
    this.props.hideModal()
  }

  render() {
    return (
      <ModalWrapper title='Save Choreography' width={400} showOk={false} {...this.props}>
        <input onChange={this.handleName} type='text' placeholder='Title' value={this.state.name} />
        <button className='modal-button' onClick={this.handleSave}>Save</button>
      </ModalWrapper> 
    )
  }
}; 

export default SaveChoreoModal;