// ** React Imports
import { Fragment, useState, useRef } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Icons
import { CiLight } from 'react-icons/ci'
import { MdDarkMode } from 'react-icons/md'

// ** Hooks
import { useSkin } from '@hooks/useSkin'

// ** Vertical Menu Components
import VerticalMenuHeader from './VerticalMenuHeader'
import VerticalNavMenuItems from './VerticalNavMenuItems'

const Sidebar = (props) => {
  // ** Props
  const { menuCollapsed, menu, menuData } = props

  // ** States
  const [groupOpen, setGroupOpen] = useState([])
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])
  const [activeItem, setActiveItem] = useState(null)

  // ** Custom Hook
  const { skin, setSkin } = useSkin()

  const ThemeToggler = () => {
    if (skin === 'dark') {
      return (
        <CiLight size={24} className='ficon' onClick={() => setSkin('light')} />
      )
    } else {
      return (
        <MdDarkMode
          size={24}
          className='ficon'
          onClick={() => setSkin('dark')}
        />
      )
    }
  }

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false)

  // ** Ref
  const shadowRef = useRef(null)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true)
  }

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block')
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block')
      }
    }
  }

  return (
    <Fragment>
      <div
        className={classnames(
          'main-menu menu-fixed menu-accordion menu-shadow',
          {
            expanded: menuHover || menuCollapsed === false,
            'menu-light': skin !== 'semi-dark' && skin !== 'dark',
            'menu-dark': skin === 'semi-dark' || skin === 'dark',
          }
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu({ ...props })
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader
              setGroupOpen={setGroupOpen}
              menuHover={menuHover}
              {...props}
            />
            {/* Vertical Menu Header Shadow */}
            {/* <div className='shadow-bottom' ref={shadowRef}></div> */}
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className='main-menu-content'
              options={{ wheelPropagation: false }}
              onScrollY={(container) => scrollMenu(container)}
            >
              <ul className='navigation navigation-main'>
                <VerticalNavMenuItems
                  items={menuData}
                  menuData={menuData}
                  menuHover={menuHover}
                  groupOpen={groupOpen}
                  activeItem={activeItem}
                  groupActive={groupActive}
                  setGroupOpen={setGroupOpen}
                  menuCollapsed={menuCollapsed}
                  setActiveItem={setActiveItem}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                />
              </ul>
              <div className='mobile-theme'>
                <ThemeToggler />
              </div>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default Sidebar
