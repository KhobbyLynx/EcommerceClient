// ** React Imports
import { Fragment } from 'react'

// ** Mail Components Imports
import MessageCard from './MessageCard'
import MessageDetails from './MessageDetails'
import CreateMessage from './CreateMessage'

// ** Utils
import { formatDateToMonthShort } from '@utils'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Button, Input, Label } from 'reactstrap'
import { isMessageReply, markAsRead } from './store'

const Messages = (props) => {
  // ** Props
  const {
    store,
    currentUser,
    adminAvatar,
    openMessage,
    createMsgOpen,
    setOpenMessage,
    selectedMessages,
    toggleCreateMsg,
    dispatch,
    selectMessage,
    selectAllMessage,
    resetSelectedMessage,
    setSidebarOpen,
  } = props

  const { messages } = store

  // ** States

  // ** Variables
  const labelColors = {
    manual: 'success',
    auto: 'primary',
    important: 'warning',
    private: 'danger',
  }

  // ** Handles Update Functions
  const handleMessageClick = () => {
    setOpenMessage(true)
    resetSelectedMessage()
  }

  // ** Handles SelectAll
  const handleSelectAll = (e) => {
    dispatch(selectAllMessage(e.target.checked))
  }

  /*eslint-disable */

  // ** Handles Folder Update
  const handleFolderUpdate = (e, folder, ids = selectedMessages) => {
    e.preventDefault()
    dispatch(resetSelectedMessage())
  }

  // ** Handles Label Update
  const handleLabelsUpdate = (e, label, ids = selectedMessages) => {
    e.preventDefault()
    dispatch(resetSelectedMessage())
  }

  // ** Handles Mail Read Update
  const handleMailReadUpdate = (arr) => {
    dispatch(markAsRead(arr)).then(() => dispatch(resetSelectedMessage()))
    dispatch(selectAllMessage(false))
  }

  // ** Handles Move to Trash
  const handleMailToTrash = (ids) => {
    dispatch(resetSelectedMessage())
  }
  /*eslint-enable */

  // ** Handles Toggle Create Message
  const handleCreateMsg = () => {
    // Call with Empty string to set isReply: false
    dispatch(isMessageReply(''))
    toggleCreateMsg()
    setSidebarOpen(false)
  }

  // ** Renders Mail
  const renderMessages = () => {
    if (messages?.length) {
      return messages.map((message, index) => {
        return (
          <MessageCard
            currentUser={currentUser}
            adminAvatar={adminAvatar}
            message={message}
            resetSelectedMessage={resetSelectedMessage}
            key={index}
            dispatch={dispatch}
            selectMessage={selectMessage}
            labelColors={labelColors}
            selectedMessages={selectedMessages}
            handleMessageClick={handleMessageClick}
            handleMailReadUpdate={handleMailReadUpdate}
            formatDateToMonthShort={formatDateToMonthShort}
          />
        )
      })
    }
  }

  return (
    <Fragment>
      <div className='email-app-list'>
        <div className='app-action'>
          <div className='form-group-compose text-center compose-btn d-lg-none'>
            <Button
              className='compose-email'
              color='primary'
              block
              onClick={handleCreateMsg}
            >
              Send Message
            </Button>
          </div>
          <div className='action-left form-check'>
            <Input
              type='checkbox'
              id='select-all'
              onChange={handleSelectAll}
              checked={
                selectedMessages?.length &&
                selectedMessages?.length === messages?.length
              }
            />
            <Label
              className='form-check-label fw-bolder ps-25 mb-0'
              for='select-all'
            >
              Select All
            </Label>
          </div>
          {selectedMessages?.length ? (
            <div className='action-right'>
              <ul className='list-inline m-0'>
                <li className='list-inline-item me-1'>
                  <span
                    className='action-icon'
                    onClick={() => handleMailReadUpdate(selectedMessages)}
                  >
                    <Mail size={18} />
                  </span>
                </li>
                <li className='list-inline-item'>
                  <span
                    className='action-icon'
                    onClick={() => handleMailToTrash(selectedMessages)}
                  >
                    <Trash size={18} />
                  </span>
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        <PerfectScrollbar
          className='email-user-list'
          options={{ wheelPropagation: false }}
        >
          {messages?.length ? (
            <ul className='email-media-list'>{renderMessages()}</ul>
          ) : (
            <div className='no-results d-block'>
              <h5>No Messages Found</h5>
            </div>
          )}
        </PerfectScrollbar>
      </div>
      <MessageDetails
        toggleCreateMsg={toggleCreateMsg}
        currentUser={currentUser}
        adminAvatar={adminAvatar}
        openMessage={openMessage}
        dispatch={dispatch}
        message={store.selectedMessage}
        labelColors={labelColors}
        setOpenMessage={setOpenMessage}
        handleMailToTrash={handleMailToTrash}
        handleFolderUpdate={handleFolderUpdate}
        handleLabelsUpdate={handleLabelsUpdate}
        handleMailReadUpdate={handleMailReadUpdate}
        formatDateToMonthShort={formatDateToMonthShort}
      />
      <CreateMessage
        createMsgOpen={createMsgOpen}
        toggleCreateMsg={toggleCreateMsg}
      />
    </Fragment>
  )
}

export default Messages
