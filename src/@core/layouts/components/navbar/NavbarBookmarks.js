// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import * as Icon from 'react-feather'

// ** Component
import NavbarSearch from './NavbarSearch'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'

const NavbarBookmarks = (props) => {
  // ** Props
  const { setMenuVisibility } = props

  return (
    <Fragment>
      <ul className='nav navbar-nav bookmark-icons align-items-center '>
        <NavItem className='mobile-menu me-auto d-flex'>
          <NavLink
            className='nav-menu-main menu-toggle hidden-xs is-active d-xl-none'
            onClick={() => setMenuVisibility(true)}
          >
            <Icon.Menu className='ficon' />
          </NavLink>
          <NavbarSearch />
        </NavItem>
      </ul>
    </Fragment>
  )
}

export default NavbarBookmarks
