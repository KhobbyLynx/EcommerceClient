// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap'

const SpinnerModal = ({ submitting, page }) => {
  return (
    <div className='demo-inline-spacing'>
      <div className='vertically-centered-modal'>
        <Modal isOpen={submitting} className='modal-dialog-centered'>
          <ModalHeader>
            Account {page === 'register' ? 'Sign Up' : 'Sign In'}
          </ModalHeader>
          <ModalBody>
            <Spinner className='me-25 text-center' color='success' size='sm' />
            <span className='ms-50'>
              {page === 'register' ? 'Signing Up...' : 'Logging In...'}
            </span>
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}
export default SpinnerModal
