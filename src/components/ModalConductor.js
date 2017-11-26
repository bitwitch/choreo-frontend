import React from 'react';
import SaveChoreoModal from './SaveChoreoModal'; 

const ModalConductor = props => {
  switch (props.currentModal) {
    case 'SAVE_CHOREOGRAPHY':
      return <SaveChoreoModal {...props}/>;

    default:
      return null;
  }
};

export default ModalConductor;