// ** React Imports
import React, { useState } from 'react'

// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import { X, Paperclip } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Modal, Button, ModalBody } from 'reactstrap'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'

// ** Redux Imports
import { createMessage, replyMessage } from './store'
import { useDispatch, useSelector } from 'react-redux'

const CreateMessage = (props) => {
  // ** Props & Custom Hooks
  const { createMsgOpen, toggleCreateMsg } = props

  // ** States
  const [errorMsg, setErrorMsg] = useState('')
  const [pending, setPending] = useState(false)
  const [title, setTitle] = useState('')
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  )

  function clearForm() {
    // Clear Form
    setTitle('')
    setEditorState(EditorState.createEmpty())
    setPending(false)
  }

  // ** Dispatch
  const dispatch = useDispatch()
  const store = useSelector((state) => state.messaging)
  const isReply = store.isReply

  setTimeout(() => {
    setErrorMsg('')
  }, 3000)

  // ** Toggles Compose POPUP
  const togglePopUp = (e) => {
    e.preventDefault()
    toggleCreateMsg()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPending(true)

    // Check if title is empty
    if (!title) {
      setPending(false)
      setErrorMsg('Title of message is required!')
      return
    }

    // Extract the message body from the editor state
    const contentState = editorState.getCurrentContent()
    const messageBody = contentState.getPlainText()

    // Check if Body is empty
    if (!messageBody) {
      setPending(false)
      setErrorMsg('Write a message to send!')
      return
    }

    toggleCreateMsg()
    // Combine title and editor content
    const formData = {
      title,
      message: messageBody,
    }

    if (isReply) {
      const msgId = store.msgToReplyId
      dispatch(replyMessage({ ...formData, msgId }))
      isMessageReply('') // Reset the reply state
    } else {
      dispatch(createMessage(formData)) // Create a new message
    }

    clearForm() // Clear the form after sending
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
        <Form className='compose-form' onSubmit={handleSubmit}>
          <div className='compose-mail-form-field'>
            <Label for='title' className='form-label'>
              Title:
            </Label>
            <Input
              id='title'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {errorMsg && (
            <div className='text-center'>
              <span style={{ color: 'red' }}>{errorMsg}</span>
            </div>
          )}
          <div id='message-editor'>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
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
              <Button color='primary' type='submit' disabled={pending}>
                Send
              </Button>
              <Label className='mb-0' for='attach-email-item'>
                <Paperclip className='cursor-pointer ms-50' size={18} />
                <input
                  type='file'
                  name='attach-email-item'
                  id='attach-email-item'
                  hidden
                  disabled
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
