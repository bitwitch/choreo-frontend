import React from 'react'; 
import ModalWrapper from './ModalWrapper';  

class SaveChoreoModal extends React.Component {

  handleSave = () => {
    this.props.hideModal()
    this.props.onSave()
  }

  render() {
    return (
      <ModalWrapper title='Save Choreography' width={400} showOk={false} {...props}>
        <p>Save Choreography</p>
        <button onClick={this.handleSave}>Save</button>
      </ModalWrapper> 
    )
  }
}; 

export default SaveChoreoModal;