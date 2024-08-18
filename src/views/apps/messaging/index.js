// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Email App Component Imports
import Messages from './Messages'
import Sidebar from './Sidebar'

// ** Third Party Components
import classnames from 'classnames'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  selectMessage,
  selectAllMessage,
  resetSelectedMessage,
  getAllMessages,
} from './store'

// ** Styles
import '@styles/react/apps/app-email.scss'

// Demo Avatar
import avatar1 from '@src/assets/images/avatars/1.png'

// ** Utils
import { getUserData } from '../../../utility/Utils'

const MessageApp = () => {
  const currentUser = getUserData()

  // ** States
  const [openMessage, setOpenMessage] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [createMsgOpen, setCreateMsgOpen] = useState(false)

  // ** Toggle Compose Function
  const toggleCreateMsg = () => setCreateMsgOpen(!createMsgOpen)

  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector((state) => state.messaging)

  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    dispatch(getAllMessages())
  }, [dispatch])

  return (
    <Fragment>
      <Sidebar
        store={store}
        dispatch={dispatch}
        setOpenMessage={setOpenMessage}
        sidebarOpen={sidebarOpen}
        toggleCreateMsg={toggleCreateMsg}
        setSidebarOpen={setSidebarOpen}
        resetSelectedMessage={resetSelectedMessage}
      />
      <div className='content-right'>
        <div className='content-body'>
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen,
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <Messages
            currentUser={currentUser}
            adminAvatar={avatar1}
            store={store}
            dispatch={dispatch}
            selectedMessages={store.selectedMessages}
            openMessage={openMessage}
            selectMessage={selectMessage}
            setOpenMessage={setOpenMessage}
            createMsgOpen={createMsgOpen}
            selectAllMessage={selectAllMessage}
            toggleCreateMsg={toggleCreateMsg}
            setSidebarOpen={setSidebarOpen}
            resetSelectedMessage={resetSelectedMessage}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default MessageApp
