import React, { Suspense, useEffect } from 'react'

// ** Spinner
import Spinner from '@components/spinner/Loading-spinner'

// ** Router Import
import Router from './router/Router'

// ** Redux Imports
import { useDispatch } from 'react-redux'
import {
  getCartItems,
  getProducts,
  getWishlistItems,
} from './views/apps/ecommerce/store'
import { getAllMessages, getNotifications } from './views/apps/messaging/store'

const App = () => {
  // ** Hook
  const dispatch = useDispatch()

  // ** Get Initial Data
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1,
      })
    )
    dispatch(getCartItems())
    dispatch(getWishlistItems())
    dispatch(getAllMessages())
    dispatch(getNotifications())
  }, [])
  return (
    <Suspense fallback={<Spinner />}>
      <Router />
    </Suspense>
  )
}

export default App
