// ** React Imports
import { Link, useParams } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Send, Edit2, Star, Info, Trash, Bell } from 'react-feather'

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge } from 'reactstrap'

const Sidebar = (props) => {
  // ** Props
  const {
    store,
    sidebarOpen,
    toggleCompose,
    dispatch,
    getMails,
    resetSelectedMail,
    setSidebarOpen,
    setOpenMail,
  } = props

  // ** Vars
  const params = useParams()

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {
    setOpenMail(false)
    dispatch(getMails({ ...store.params, folder }))
    dispatch(resetSelectedMail())
  }

  const handleComposeClick = () => {
    toggleCompose()
    setSidebarOpen(false)
  }

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if (
      (params.folder && params.folder === value) ||
      (params.label && params.label === value)
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen,
      })}
    >
      <div className='sidebar'>
        <div className='sidebar-content email-app-sidebar'>
          <div className='email-app-menu'>
            <div className='form-group-compose text-center compose-btn'>
              <Button
                className='compose-email'
                color='primary'
                block
                onClick={handleComposeClick}
              >
                Send Message
              </Button>
            </div>
            <PerfectScrollbar
              className='sidebar-menu-list'
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag='div' className='list-group-messages'>
                <ListGroupItem
                  tag={Link}
                  to='/inbox'
                  onClick={() => handleFolder('inbox')}
                  action
                  active={
                    !Object.keys(params).length || handleActiveItem('inbox')
                  }
                >
                  <Mail size={18} className='me-75' />
                  <span className='align-middle'>Inbox</span>
                  {store?.emailsMeta?.inbox ? (
                    <Badge className='float-end' color='light-primary' pill>
                      {store?.emailsMeta?.inbox}
                    </Badge>
                  ) : null}
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to='/inbox/sent'
                  onClick={() => handleFolder('sent')}
                  action
                  active={handleActiveItem('sent')}
                >
                  <Send size={18} className='me-75' />
                  <span className='align-middle'>Sent</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to='/inbox/notifications'
                  onClick={() => handleFolder('trash')}
                  action
                  active={handleActiveItem('trash')}
                >
                  <Bell size={18} className='me-75' />
                  <span className='align-middle'>Notifications</span>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
