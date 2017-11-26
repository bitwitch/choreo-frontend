import React from 'react'; 
import ModalWrapper from './ModalWrapper'; 
import '../style/Modal.css' 

class SaveChoreoModal extends React.Component {

  handleSave = () => {
    this.props.hideModal()
    this.props.onSave()
  }

  render() {
    return (
      <ModalWrapper title='Save Choreography' width={400} showOk={false} {...this.props}>
        <button className='modal-button' onClick={this.handleSave}>Save</button>
      </ModalWrapper> 
    )
  }
}; 

export default SaveChoreoModal;