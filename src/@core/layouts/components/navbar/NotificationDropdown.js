// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'

// ** Reactstrap Imports
import {
  Button,
  Badge,
  Input,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import {
  getNotifications,
  markNotificationAsRead,
} from '../../../../views/apps/messaging/store'
import {
  FaCheck,
  FaExclamation,
  FaInfoCircle,
  FaQuestionCircle,
  FaTimes,
} from 'react-icons/fa'

const NotificationDropdown = () => {
  useEffect(() => {
    getNotifications()
  }, [])

  // ** Hooks
  const dispatch = useDispatch()
  // ** Notifications
  const store = useSelector((state) => state.messaging)
  const notificationsArray = store.notifications
  const unReadNotifications = store.unseenNotes

  const handleReadAllNotifications = () => {
    const allNotificationsId = notificationsArray
      .filter((note) => !note.isRead) // Filter out unread notifications
      .map((note) => note.id) // Extract their IDs

    console.log('handleReadAllNotifications clicked', allNotificationsId)
    if (allNotificationsId.length > 0) {
      dispatch(markNotificationAsRead(allNotificationsId)) // Pass the array of IDs to the function
    }
  }

  const handleNotificationClick = (noteId) => {
    // markNotificationAsRead takes an array not strings
    dispatch(markNotificationAsRead([noteId]))
  }

  // Icons
  const statusIconMap = {
    close: <FaTimes style={{ color: 'red' }} />,
    done: <FaCheck style={{ color: 'green' }} />,
    warning: <FaExclamation style={{ color: 'orange' }} />,
    info: <FaInfoCircle style={{ color: 'blue' }} />,
    // Add other statuses and their icons here
  }

  const StatusIcon = ({ status }) => {
    return (
      <div>
        {statusIconMap[status] || (
          <FaQuestionCircle style={{ color: 'gray' }} />
        )}
      </div>
    )
  }

  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false,
        }}
      >
        {notificationsArray.map((item, index) => {
          return (
            <a
              key={index}
              className='d-flex'
              onClick={() => handleNotificationClick(item.id)}
            >
              <div
                className={classnames('list-item d-flex align-items-start', {
                  'is-read': item.isRead,
                })}
              >
                <>
                  <div className='me-1'>
                    <Avatar
                      {...(item.img
                        ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                        : item.avatarContent
                        ? {
                            content: item.avatarContent,
                            color: item.color,
                          }
                        : item.avatarIcon
                        ? {
                            icon: <StatusIcon status={item.avatarIcon} />,
                            color: item.color,
                          }
                        : null)}
                    />
                  </div>
                  <div className='list-item-body flex-grow-1'>
                    <p className='media-heading'>
                      <span className='fw-bolder'> {item.title}</span>
                    </p>
                    <small className='notification-text'>{item.subtitle}</small>
                  </div>
                </>
              </div>
            </a>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown
      tag='li'
      className='dropdown-notification nav-item me-25'
    >
      <DropdownToggle
        tag='a'
        className='nav-link'
        href='/'
        onClick={(e) => e.preventDefault()}
      >
        <Bell className='ficon' />
        {unReadNotifications > 0 && (
          <Badge pill color='danger' className='badge-up'>
            {unReadNotifications}
          </Badge>
        )}
      </DropdownToggle>
      <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {unReadNotifications ? `${unReadNotifications} new` : null}
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className='dropdown-menu-footer'>
          <Button color='primary' block onClick={handleReadAllNotifications}>
            Read all notifications
          </Button>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
