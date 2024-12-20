// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem,
} from '../store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'
import { useParams } from 'react-router-dom'
import { getAllMessages } from '../../messaging/store'

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ecommerce)
  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
      })
    )
    dispatch(getAllMessages())
  }, [dispatch])

  return (
    <Fragment>
      <Breadcrumbs
        title='Shop'
        data={[{ title: 'eCommerce' }, { title: 'Shop' }]}
      />
      {/* // ** Products on shop page */}
      <Products
        store={store}
        products={store.products}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
      {/* // ** Shop Page Filtering Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />
    </Fragment>
  )
}
export default Shop
