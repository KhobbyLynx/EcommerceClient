// ** Custom Components & Plugins
import classnames from 'classnames'
import { Star, Paperclip } from 'react-feather'

// ** Custom Component Import
import Avatar from '@components/avatar'

// ** Utils
import { htmlToString } from '@utils'

// ** Reactstrap Imports
import { Input, Label } from 'reactstrap'
import { checkMessage } from './store'

const MessageCard = (props) => {
  // ** Props
  const {
    message,
    currentUser,
    dispatch,
    adminAvatar,
    selectMessage,
    labelColors,
    selectedMessages,
    handleMessageClick,
    handleMailReadUpdate,
    formatDateToMonthShort,
  } = props

  // ** Function to handle read & mail click
  const onMailClick = () => {
    handleMessageClick(message.id)
    dispatch(selectMessage(message.id))
  }

  return (
    <li
      onClick={() => onMailClick(message.id)}
      className={classnames('d-flex user-mail', {
        'mail-read': !message?.isRead,
      })}
    >
      <div className='mail-left pe-50'>
        <Avatar
          img={message.type === 'client' ? currentUser.avatar : adminAvatar}
        />
        <div className='user-action'>
          <div className='form-check'>
            <Input
              type='checkbox'
              id={message.id}
              onChange={(e) => e.stopPropagation()}
              checked={selectedMessages.includes(message.id)}
              onClick={(e) => {
                e.stopPropagation()
                dispatch(checkMessage(message.id))
              }}
            />
            <Label
              onClick={(e) => e.stopPropagation()}
              for={message.id}
            ></Label>
          </div>
        </div>
      </div>
      <div className='mail-body'>
        <div className='mail-details'>
          <div className='mail-items'>
            <h5 className='mb-25'>
              {message.type === 'client' ? currentUser.username : 'Admin'}
            </h5>
            <span className='text-truncate'>{message.title}</span>
          </div>
          <div className='mail-meta-item'>
            <span
              className={`bullet bullet-${
                labelColors[message.type]
              } bullet-sm mx-50`}
            ></span>
            <span className='mail-date'>
              {/* {formatDateToMonthShort(message.time)} */}
            </span>
          </div>
        </div>
        <div className='mail-message'>
          <p className='text-truncate mb-0'>{htmlToString(message.message)}</p>
        </div>
      </div>
    </li>
  )
}

export default MessageCard
