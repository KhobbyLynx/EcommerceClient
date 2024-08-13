// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
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

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ecommerce)
  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1,
      })
    )
  }, [dispatch])

  const pathname = window.location.pathname
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1)

  // ** Filter Products
  const filteredProducts = store.allProducts.filter(
    (product) => product.category.toLowerCase() === lastSegment
  )

  console.log('store.allProducts', store.allProducts)
  console.log('filteredProducts', filteredProducts)
  return (
    <Fragment>
      <Breadcrumbs
        title='Shop'
        data={[{ title: 'eCommerce' }, { title: `${lastSegment}` }]}
      />

      <Products
        store={store}
        products={filteredProducts}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        getProducts={getProducts}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
    </Fragment>
  )
}
export default Shop
