// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  Settings,
  HelpCircle,
  Power,
  ShoppingCart,
} from 'react-feather'
import { BsBagHeartFill } from 'react-icons/bs'

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle
        href='/'
        tag='a'
        className='nav-link dropdown-user-link'
        onClick={(e) => e.preventDefault()}
      >
        <Avatar
          img={userAvatar}
          imgHeight='36'
          imgWidth='36'
          status='online'
          className='avatar-border'
        />
      </DropdownToggle>
      <DropdownMenu>
        <div className='p-1 gap-1 d-flex align-item-center justify-content-center'>
          <div>
            <Avatar
              img={userAvatar}
              imgHeight='36'
              imgWidth='36'
              status='online'
              className='avatar-border'
            />
          </div>
          <div className='user-info-dropdown d-flex flex-column align-item-center justify-content-center '>
            <p className='user-name fw-bold h6'>
              {(userData && userData['username']) || 'John Doe'}
            </p>
            <p className='user-status h6 text-success'>
              {(userData && userData.role) || 'Admin'}
            </p>
          </div>
        </div>

        <DropdownItem divider />
        <DropdownItem tag={Link} to='/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/inbox'>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/wishlist'>
          <BsBagHeartFill size={14} className='me-75' />
          <span className='align-middle'>Wishlist</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/cart'>
          <ShoppingCart size={14} className='me-75' />
          <span className='align-middle'>Cart</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/settings'>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/faq'>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem>
        <DropdownItem
          tag={Link}
          to='/home'
          onClick={() => dispatch(handleLogout())}
        >
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
