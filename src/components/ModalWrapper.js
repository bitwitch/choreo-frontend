import React from 'react'

const ModalWrapper = props => {
  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) props.hideModal()
  }

  return (
    <div className='modal' onClick={handleBackgroundClick}>
      <div className='modal-content' style={{width: props.width}}>
        <header>
          <h1>{props.title}</h1>
        </header>
        {props.children}
      </div>
    </div>
  )
}

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400
}

export default ModalWrapper