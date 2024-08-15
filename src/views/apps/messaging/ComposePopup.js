// ** React Imports
import { useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg'
import Select, { components } from 'react-select'
import {
  Minus,
  X,
  Maximize2,
  Paperclip,
  MoreVertical,
  Trash,
} from 'react-feather'

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Modal,
  Button,
  ModalBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
} from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

// ** User Avatars
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg'
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg'
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg'
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg'
import img6 from '@src/assets/images/portrait/small/avatar-s-11.jpg'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'

const ComposePopup = (props) => {
  // ** Props & Custom Hooks
  const { composeOpen, toggleCompose } = props

  // ** States
  const [ccOpen, setCCOpen] = useState(false)
  const [bccOpen, setBCCOpen] = useState(false)

  // ** User Select Options & Components
  const selectOptions = [
    { value: 'pheobe', label: 'Pheobe Buffay', img: img1 },
    { value: 'chandler', label: 'Chandler Bing', img: img2 },
    { value: 'ross', label: 'Ross Geller', img: img3 },
    { value: 'monica', label: 'Monica Geller', img: img4 },
    { value: 'joey', label: 'Joey Tribbiani', img: img5 },
    { value: 'Rachel', label: 'Rachel Green', img: img6 },
  ]

  const SelectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className='d-flex flex-wrap align-items-center'>
          <Avatar className='my-0 me-50' size='sm' img={data.img} />
          {data.label}
        </div>
      </components.Option>
    )
  }

  // ** Toggles Compose POPUP
  const togglePopUp = (e) => {
    e.preventDefault()
    toggleCompose()
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
      isOpen={composeOpen}
      contentClassName='p-0'
      toggle={toggleCompose}
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
              <Button color='primary' onClick={toggleCompose}>
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

export default ComposePopup
