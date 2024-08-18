// ** React Imports
import { Link, useParams } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Send, Bell } from 'react-feather'

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge } from 'reactstrap'

const Sidebar = (props) => {
  // ** Props
  const { store, sidebarOpen, toggleCreateMsg, setSidebarOpen } = props

  // ** Vars
  const params = useParams()

  const handleCreateMsg = () => {
    toggleCreateMsg()
    setSidebarOpen(false)
  }

  console.log('PARAMS', params)
  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if (params.folder && params.folder === value) {
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
                onClick={handleCreateMsg}
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
                  action
                  active={
                    !Object.keys(params).length || handleActiveItem('inbox')
                  }
                >
                  <Mail size={18} className='me-75' />
                  <span className='align-middle'>Inbox</span>
                  {store?.unseenMsgs ? (
                    <Badge className='float-end' color='light-primary' pill>
                      {store?.unseenMsgs}
                    </Badge>
                  ) : null}
                </ListGroupItem>
                {/* <ListGroupItem
                  tag={Link}
                  to='/inbox/notifications'
                  action
                  active={handleActiveItem('notifications')}
                >
                  <Bell size={18} className='me-75' />
                  <span className='align-middle'>Notifications</span>
                </ListGroupItem> */}
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
