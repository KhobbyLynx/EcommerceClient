// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import * as Icon from 'react-feather'
import { ImSearch } from 'react-icons/im'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleSearchQuery } from '@store/navbar'

// ** Custom Components
import Autocomplete from '@components/autocomplete'
import { useNavigate } from 'react-router-dom'

const NavbarSearch = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ** States
  const [suggestions, setSuggestions] = useState([])
  const [navbarSearch, setNavbarSearch] = useState(false)

  const searchQuery = useSelector((state) => state.navbar.query)

  const store = useSelector((state) => state.ecommerce)

  useEffect(() => {
    setSuggestions([
      {
        groupTitle: 'Pages',
        searchLimit: 2,
        data: [
          {
            id: 1,
            name: 'wishist',
            title: 'WishList',
            icon: 'Heart',
            link: '/wishlist',
          },
          {
            id: 2,
            name: 'cart',
            title: 'Cart',
            icon: 'ShoppingCart',
            link: '/cart',
          },
          {
            id: 3,
            name: 'about',
            title: 'About',
            icon: 'BookOpen',
            link: '/about',
          },
          {
            id: 4,
            name: 'contact',
            title: 'Contact',
            icon: 'Phone',
            link: '/contact',
          },
          {
            id: 5,
            name: 'shop',
            title: 'Shop',
            icon: 'ShoppingCart',
            link: '/shop',
          },
          {
            id: 6,
            name: 'profile',
            title: 'My Profile',
            icon: 'File',
            link: '/profile',
          },

          {
            id: 7,
            name: 'inboxmessageschat',
            title: 'Inbox',
            icon: 'Inbox',
            link: '/inbox',
          },
          {
            id: 8,
            name: 'allproducts',
            title: 'All Products',
            icon: 'ShoppingCart',
            link: '/shop',
          },
          {
            id: 9,
            name: 'settings',
            title: 'Settings',
            icon: 'Settings',
            link: '/settings',
          },
          {
            id: 10,
            name: 'faqfrequentlyaskedquestions',
            title: 'FAQ',
            icon: 'Info',
            link: '/faq',
          },
        ],
      },
      {
        groupTitle: 'Products',
        searchLimit: 5,
        data: store.allProducts,
      },
    ])
  }, [store.allProducts])

  const dispatchSearch = () => {
    if (navbarSearch && searchQuery) {
      navigate(`/q/${searchQuery}`)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }

  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(''))

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (navbarSearch === true) {
      setNavbarSearch(false)
      handleClearQueryInStore()
    }
  }

  // ** Function to clear input value
  const handleClearInput = (setUserInput) => {
    if (!navbarSearch) {
      setUserInput('')
      handleClearQueryInStore()
    }
  }

  // ** Function to close search on ESC & ENTER Click
  // Enter key not working sometimes hence the async
  // Enter Key Code 13
  // Esc key code 27
  const onKeyDown = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()

      await dispatchSearch()
      setNavbarSearch(false)
      handleClearQueryInStore()
    }
  }

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = () => {
    setNavbarSearch(false)
    handleClearQueryInStore()
  }

  // ** Function to handle search list Click
  const handleListItemClick = (func, link, e, productId, brand) => {
    // get brand to check if item is product not page

    if (brand) {
      func(`product-detail/${productId}`, e)
    } else {
      func(link, e)
    }

    setTimeout(() => {
      setNavbarSearch(false)
    }, 1)
    handleClearQueryInStore()
  }

  return (
    <NavItem className='nav-search' onClick={() => setNavbarSearch(true)}>
      <NavLink className='nav-link-search'>
        <ImSearch className='ficon' />
      </NavLink>
      <div
        className={classnames('search-input', {
          open: navbarSearch === true,
        })}
      >
        <div className='search-input-icon'>
          <Icon.Search />
        </div>
        {navbarSearch ? (
          <Autocomplete
            className='form-control'
            suggestions={suggestions}
            filterKey='name'
            filterHeaderKey='groupTitle'
            placeholder='What are you looking for?...'
            autoFocus={true}
            onSuggestionItemClick={handleSuggestionItemClick}
            externalClick={handleExternalClick}
            clearInput={(userInput, setUserInput) =>
              handleClearInput(setUserInput)
            }
            onKeyDown={onKeyDown}
            onChange={(e) => dispatch(handleSearchQuery(e.target.value))}
            customRender={(
              item,
              i,
              filteredData,
              activeSuggestion,
              onSuggestionItemClick,
              onSuggestionItemHover
            ) => {
              const IconTag = Icon[item.icon ? item.icon : 'X']
              return (
                <li
                  className={classnames('suggestion-item', {
                    active: filteredData.indexOf(item) === activeSuggestion,
                  })}
                  key={i}
                  onClick={(e) =>
                    handleListItemClick(
                      onSuggestionItemClick,
                      item.link,
                      e,
                      item.id,
                      item.brand
                    )
                  }
                  onMouseEnter={() =>
                    onSuggestionItemHover(filteredData.indexOf(item))
                  }
                >
                  <div
                    className={classnames({
                      'd-flex justify-content-between align-items-center':
                        item.productImgs,
                    })}
                  >
                    <div className='item-container d-flex'>
                      {item.icon ? (
                        <IconTag size={17} />
                      ) : item.productImgs ? (
                        <img
                          src={item.productImgs[0]}
                          height='36'
                          width='28'
                          alt={item.name}
                        />
                      ) : null}
                      <div className='item-info ms-1'>
                        <p className='align-middle mb-0'>{item.title}</p>
                        {item.salePrice ? (
                          <>
                            <p className='align-middle mb-0'>{item.name}</p>
                            <small className='text-muted'>{item.brand}</small>
                          </>
                        ) : null}
                      </div>
                    </div>
                    {item.salePrice && (
                      <div className='meta-container'>
                        <small>
                          $
                          {item.salePrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </small>
                      </div>
                    )}
                  </div>
                </li>
              )
            }}
          />
        ) : null}
        <div className='search-input-close'>
          {searchQuery && (
            <Icon.ArrowRightCircle
              className='ficon'
              onClick={(e) => {
                e.stopPropagation()
                setNavbarSearch(false)
                handleClearQueryInStore()
              }}
            />
          )}
        </div>
      </div>
    </NavItem>
  )
}

export default NavbarSearch
