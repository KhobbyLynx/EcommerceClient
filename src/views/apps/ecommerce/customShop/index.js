// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Shop Components
import Products from '../shop/Products'

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
} from '../shop/store'

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

  // ** Custom Products
  const { id } = useParams()

  console.log('Params from Custom Page', id)
  return (
    <Fragment>
      <Breadcrumbs
        title='Shop'
        data={[{ title: 'eCommerce' }, { title: 'Shop' }]}
      />

      <Products
        store={store}
        products={store.products}
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
