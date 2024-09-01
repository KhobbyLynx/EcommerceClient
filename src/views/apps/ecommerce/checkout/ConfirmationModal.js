import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalConfig = [
  {
    id: 1,
    title: 'Primary',
    modalColor: 'modal-primary',
    btnColor: 'primary',
  },
]

const ConfirmationModal = ({
  id,
  title = 'Confirm',
  msg,
  btnText1,
  btnText2,
  modalColor = 'modal-danger',
  btnColor = 'danger',
  confirmFunction,
  modal,
  setModal,
}) => {
  const handleAccept = (id) => {
    confirmFunction(id)
    setModal(!modal)
  }

  return (
    <div className={'theme-{modalColor}'}>
      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className='modal-dialog-centered'
        modalClassName={modalColor}
      >
        <ModalHeader toggle={() => setModal(!modal)}>{title}</ModalHeader>
        <ModalBody>{msg}</ModalBody>
        <ModalFooter>
          <Button color={btnColor} onClick={() => setModal(!modal)}>
            {btnText1}
          </Button>
          <Button color={btnColor} onClick={() => handleAccept(id)}>
            {btnText2}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default ConfirmationModal
