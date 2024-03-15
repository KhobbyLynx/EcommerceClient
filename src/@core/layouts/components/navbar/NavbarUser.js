// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import UserDropdown from './UserDropdown'

import NotificationDropdown from './NotificationDropdown'

// ** Third Party Components
import { CiLight } from 'react-icons/ci'
import { CgDarkMode } from 'react-icons/cg'
import { MdDarkMode } from 'react-icons/md'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'
import CartDropdown from './CartDropdown'
import { Heart } from 'react-feather'

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark/SemiDark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <CiLight className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <MdDarkMode className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ms-auto gap-1'>
      {/* <IntlDropdown /> */}
      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <CartDropdown />
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
