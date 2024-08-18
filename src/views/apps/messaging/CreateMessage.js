// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg'
import { X, Paperclip } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Modal, Button, ModalBody } from 'reactstrap'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'

const CreateMessage = (props) => {
  // ** Props & Custom Hooks
  const { createMsgOpen, toggleCreateMsg } = props

  // ** Toggles Compose POPUP
  const togglePopUp = (e) => {
    e.preventDefault()
    toggleCreateMsg()
  }

  return (
    <Modal
      scrollable
      fade={false}
      keyboard={false}
      backdrop={false}
      id='compose-mail'
      container='.content-body'
      className='modal-lg'
      isOpen={createMsgOpen}
      contentClassName='p-0'
      toggle={toggleCreateMsg}
      modalClassName='modal-sticky'
    >
      <div className='modal-header'>
        <h5 className='modal-title'>Create Message</h5>
        <div className='modal-actions'>
          <a href='/' className='text-body' onClick={togglePopUp}>
            <X size={14} />
          </a>
        </div>
      </div>
      <ModalBody className='flex-grow-1 p-0'>
        <Form className='compose-form' onSubmit={(e) => e.preventDefault()}>
          <div className='compose-mail-form-field'>
            <Label for='email-subject' className='form-label'>
              Title:
            </Label>
            <Input id='email-subject' placeholder='Title' />
          </div>
          <div id='message-editor'>
            <Editor
              placeholder='Message'
              toolbarClassName='rounded-0'
              wrapperClassName='toolbar-bottom'
              editorClassName='rounded-0 border-0'
              toolbar={{
                options: ['inline', 'textAlign'],
                inline: {
                  inDropdown: false,
                  options: ['bold', 'italic', 'underline', 'strikethrough'],
                },
              }}
            />
          </div>
          <div className='compose-footer-wrapper'>
            <div className='btn-wrapper d-flex align-items-center'>
              <Button color='primary' onClick={toggleCreateMsg}>
                Send
              </Button>
              <Label className='mb-0' for='attach-email-item'>
                <Paperclip className='cursor-pointer ms-50' size={18} />
                <input
                  type='file'
                  name='attach-email-item'
                  id='attach-email-item'
                  hidden
                />
              </Label>
            </div>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default CreateMessage
