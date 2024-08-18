// ** React Imports
import { Fragment, useState } from 'react'

// ** Utils
import { formatDate } from '@utils'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'

import {
  Star,
  Tag,
  Mail,
  Info,
  Trash,
  Edit2,
  Folder,
  Trash2,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CornerUpLeft,
  CornerUpRight,
} from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Badge,
  Card,
  Table,
  CardBody,
  CardFooter,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap'
import { markAsRead, resetSelectedMessage } from './store'

const MessageDetails = (props) => {
  // ** Props
  const {
    toggleCreateMsg,
    message,
    currentUser,
    adminAvatar,
    openMessage,
    dispatch,
    labelColors,
    setOpenMessage,
    handleFolderUpdate,
    handleMailReadUpdate,
    formatDateToMonthShort,
  } = props

  // ** States
  const [showReplies, setShowReplies] = useState(false)

  // ** Renders Messages
  const renderMessage = (obj) => {
    console.log('CURRR', currentUser, obj, 'MSG', message)
    return (
      <Card>
        <CardHeader className='email-detail-head'>
          <div className='user-details d-flex justify-content-between align-items-center flex-wrap'>
            <Avatar
              img={
                obj.senderId === currentUser.id
                  ? currentUser.avatar
                  : adminAvatar
              }
            />
            <div className='mail-items'>
              <h5 className='mb-25'>
                {obj.senderId !== currentUser.id
                  ? 'Admin'
                  : currentUser.username}
              </h5>
              <UncontrolledDropdown className='email-info-dropup'>
                <DropdownToggle
                  className='font-small-3 text-muted cursor-pointer'
                  tag='span'
                  caret
                >
                  <span className='me-25'>
                    {obj.senderId !== currentUser.id
                      ? 'support@lynx.com'
                      : currentUser.email}
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  <Table className='font-small-3' size='sm' borderless>
                    <tbody>
                      <tr>
                        <td className='text-end text-muted align-top'>From:</td>
                        <td>
                          {obj.senderId !== currentUser.id
                            ? 'Admin'
                            : currentUser.username}
                        </td>
                      </tr>
                      <tr>
                        <td className='text-end text-muted align-top'>To:</td>
                        <td>
                          {' '}
                          {obj.senderId === currentUser.id
                            ? 'Admin'
                            : currentUser.username}
                        </td>
                      </tr>
                      <tr>
                        <td className='text-end text-muted align-top'>Date:</td>
                        <td>
                          {/* {formatDateToMonthShort(obj.time)},{' '}
                          {formatDateToMonthShort(obj.time, false)} */}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className='mail-meta-item d-flex align-items-center'>
            <small className='mail-date-time text-muted'>
              {/* {formatDate(obj.time)} */}
            </small>
            <UncontrolledDropdown className='ms-50'>
              <DropdownToggle className='cursor-pointer' tag='span'>
                <MoreVertical size={14} />
              </DropdownToggle>
              <DropdownMenu end>
                {message.respond && (
                  <DropdownItem
                    className='d-flex align-items-center w-100'
                    onClick={() => toggleCreateMsg()}
                  >
                    <CornerUpLeft className='me-50' size={14} />
                    Reply
                  </DropdownItem>
                )}
                <DropdownItem className='d-flex align-items-center w-100'>
                  <Trash2 className='me-50' size={14} />
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </CardHeader>
        <CardBody className='mail-message-wrapper pt-2'>
          <div
            className='mail-message'
            dangerouslySetInnerHTML={{ __html: obj.message }}
          ></div>
        </CardBody>
      </Card>
    )
  }

  // ** Renders Replies
  const renderReplies = (arr) => {
    if (arr.length && showReplies === true) {
      return arr.map((obj, index) => (
        <Row key={index}>
          <Col sm='12'>{renderMessage(obj)}</Col>
        </Row>
      ))
    }
  }

  // ** Handle show replies, go back, folder & read click functions
  const handleShowReplies = (e) => {
    e.preventDefault()
    setShowReplies(true)
  }

  const handleGoBack = () => {
    setOpenMessage(false)
    resetSelectedMessage()
  }

  const handleFolderClick = (e, folder, id) => {
    handleFolderUpdate(e, folder, [id])
    handleGoBack()
  }

  const handleReadClick = () => {
    markAsRead(message.id)
    handleGoBack()
  }

  return (
    <div
      className={classnames('email-app-details', {
        show: openMessage,
      })}
    >
      {message !== null && message !== undefined ? (
        <Fragment>
          <div className='email-detail-header'>
            <div className='email-header-left d-flex align-items-center'>
              <span className='go-back me-1' onClick={handleGoBack}>
                <ChevronLeft size={20} />
              </span>
              <h4 className='email-subject mb-0'>{message.title}</h4>
            </div>
            <div className='email-header-right ms-2 ps-1'>
              <ul className='list-inline m-0'>
                <li className='list-inline-item me-1'>
                  <span className='action-icon' onClick={handleReadClick}>
                    <Mail size={18} />
                  </span>
                </li>
                <li className='list-inline-item me-1'>
                  <span
                    className='action-icon'
                    // onClick={() => {
                    //   handleMailToTrash([message.id])
                    //   handleGoBack()
                    // }}
                  >
                    <Trash size={18} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <PerfectScrollbar
            className='email-scroll-area'
            options={{ wheelPropagation: false }}
          >
            <Row>
              <Col sm='12'>
                <div className='email-label'>
                  <Badge
                    color={`light-${labelColors[message.type]}`}
                    className='me-50 text-capitalize'
                    pill
                  >
                    {message.type}
                  </Badge>
                </div>
              </Col>
            </Row>
            {message.reply && message.reply.length ? (
              <Fragment>
                {showReplies === false ? (
                  <Row className='mb-1'>
                    <Col sm='12'>
                      <a
                        className='fw-bold'
                        href='/'
                        onClick={handleShowReplies}
                      >
                        View {message.reply.length} Earlier Messages
                      </a>
                    </Col>
                  </Row>
                ) : null}

                {renderReplies(message.reply)}
              </Fragment>
            ) : null}
            <Row>
              <Col sm='12'>{renderMessage(message)}</Col>
            </Row>
            {message.respond && (
              <Row>
                <Col sm='12'>
                  <Card>
                    <CardBody>
                      <h5 className='mb-0'>
                        Click here to{' '}
                        <a
                          href='/'
                          onClick={(e) => {
                            e.preventDefault()
                            toggleCreateMsg()
                          }}
                        >
                          Reply
                        </a>{' '}
                      </h5>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          </PerfectScrollbar>
        </Fragment>
      ) : null}
    </div>
  )
}

export default MessageDetails
