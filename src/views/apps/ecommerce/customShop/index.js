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

  // ** Filter Products
  const pathname = window.location.pathname

  // Normalize the search term
  const filterWord = pathname.substring(pathname.lastIndexOf('/') + 1)

  // Define the fields you want to search across dynamically, including tags
  const searchFields = ['category', 'subCategory', 'tags', 'name', 'brand']

  // Use a Set to track unique product IDs
  const seenProductIds = new Set()

  // Filter products based on dynamic fields with partial match, error handling, and avoiding duplicates
  const filteredProducts = store.allProducts.filter((product) => {
    // Skip the product if it has already been added
    if (seenProductIds.has(product.id)) {
      return false
    }

    // Check if the product matches any of the search fields
    const matches = searchFields.some((field) => {
      const fieldValue = product[field]

      if (!fieldValue) return false // Skip if the field doesn't exist in the product

      if (Array.isArray(fieldValue)) {
        // Handle arrays (like tags)
        return fieldValue.some((tag) =>
          tag.toLowerCase().replace(/\s+/g, '').includes(filterWord)
        )
      } else {
        // Handle string fields (like category and subCategory)
        return fieldValue.toLowerCase().replace(/\s+/g, '').includes(filterWord)
      }
    })

    // If a match is found, add the product ID to the Set and include the product
    if (matches) {
      seenProductIds.add(product.id)
      return true
    }

    return false // Exclude products that don't match
  })

  return (
    <Fragment>
      <Breadcrumbs
        title='Shop'
        data={[{ title: 'eCommerce' }, { title: `${filterWord}` }]}
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
