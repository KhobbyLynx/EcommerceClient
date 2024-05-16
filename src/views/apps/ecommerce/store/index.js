// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../../../../configs/firebase'
import { paginateArray } from '../../../../utility/HelperFunctions'

export const getProducts = createAsyncThunk(
  'appEcommerce/getProducts',
  async (params, { dispatch }) => {
    const { q = '', sortBy = 'featured', perPage = 9, page = 1 } = params
    try {
      const queryLowered = q.toLowerCase()

      const productsRef = collection(db, 'products')
      const unsubscribe = onSnapshot(productsRef, (snapshot) => {
        const allData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => b.createdAt - a.createdAt)

        const filteredData = allData.filter((product) =>
          product.name.toLowerCase().includes(queryLowered)
        )

        let sortedData = filteredData
        if (sortBy === 'price-desc') {
          sortedData = filteredData.sort((a, b) => b.salePrice - a.salePrice)
        } else if (sortBy === 'price-asc') {
          sortedData = filteredData.sort((a, b) => a.salePrice - b.salePrice)
        }

        const paginatedData = paginateArray(sortedData, perPage, page)

        console.log('@Products', paginatedData)
        console.log('@AllProducts', allData)

        dispatch({
          type: 'appEcommerce/getProductsSuccess',
          payload: {
            params,
            products: paginatedData,
            allProducts: allData,
            total: filteredData.length,
            totalFilteredProducts: allData.length,
            unsubscribe,
          },
        })
      })

      return Promise.resolve()
    } catch (error) {
      console.log('Error Fetching Products', error)
    }
  }
)

export const addToCart = createAsyncThunk(
  'appEcommerce/addToCart',
  async (id, { dispatch, getState }) => {
    const response = await axios.post('/apps/ecommerce/cart', { productId: id })
    await dispatch(getProducts(getState().ecommerce.params))
    return response.data
  }
)

export const getWishlistItems = createAsyncThunk(
  'appEcommerce/getWishlistItems',
  async () => {
    const response = await axios.get('/apps/ecommerce/wishlist')
    return response.data
  }
)

export const deleteWishlistItem = createAsyncThunk(
  'appEcommerce/deleteWishlistItem',
  async (id, { dispatch }) => {
    const response = await axios.delete(`/apps/ecommerce/wishlist/${id}`)
    dispatch(getWishlistItems())
    return response.data
  }
)

export const getCartItems = createAsyncThunk(
  'appEcommerce/getCartItems',
  async () => {
    const response = await axios.get('/apps/ecommerce/cart')
    return response.data
  }
)

export const getProduct = createAsyncThunk(
  'appEcommerce/getProduct',
  async (slug) => {
    const response = await axios.get(`/apps/ecommerce/products/${slug}`)
    return response.data
  }
)

export const addToWishlist = createAsyncThunk(
  'appEcommerce/addToWishlist',
  async (id) => {
    await axios.post('/apps/ecommerce/wishlist', { productId: id })
    return id
  }
)

export const deleteCartItem = createAsyncThunk(
  'appEcommerce/deleteCartItem',
  async (id, { dispatch }) => {
    await axios.delete(`/apps/ecommerce/cart/${id}`)
    dispatch(getCartItems())
    return id
  }
)

// ** Fetch Category
export const fetchCategories = createAsyncThunk(
  'appEcommerce/fetchCategories',
  async () => {
    const categoriesCollection = collection(db, 'categories')
    const categoriesSnapshot = await getDocs(categoriesCollection)

    if (!categoriesSnapshot.empty) {
      const data = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      return {
        categories: data,
      }
    }
  }
)

// ** Fetch Brands
export const fetchBrands = createAsyncThunk(
  'appEcommerce/fetchBrands',
  async () => {
    const brandsCollection = collection(db, 'brands')
    const brandsSnapshot = await getDocs(brandsCollection)

    if (!brandsSnapshot.empty) {
      const data = brandsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      return {
        brands: data,
      }
    }
  }
)

export const filterProductsByPrice = createAsyncThunk(
  'appEcommerce/filterProductsByPrice',
  async (priceRange, { getState }) => {
    const state = getState()

    const params = state.ecommerce.params
    const { sortBy, perPage, page } = params
    console.log('^Params', sortBy, perPage, page)
    let sortedData = state.ecommerce.allProducts
    if (sortBy === 'price-desc') {
      sortedData = filteredData.sort((a, b) => b.salePrice - a.salePrice)
    } else if (sortBy === 'price-asc') {
      sortedData = filteredData.sort((a, b) => a.salePrice - b.salePrice)
    }

    console.log('#PriceRange', priceRange)
    console.log('#Products', state.ecommerce.allProducts)
    console.log('#All Filter', paginateArray(sortedData, perPage, page))
    const filteredProducts = state.ecommerce.allProducts.filter((product) => {
      switch (priceRange) {
        case 'below-500':
          return product.salePrice < 500
        case '500-1000':
          return product.salePrice >= 500 && product.salePrice < 1001
        case '1000-5000':
          return product.salePrice >= 1000 && product.salePrice < 5001
        case '5000':
          return product.salePrice >= 5000
        default:
          return true
      }
    })
    console.log('@ filteredProducts', filteredProducts)
    return {
      filteredProducts,
      totalFilteredProducts: filteredProducts.length,
    }
  }
)

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    cart: [],
    params: {},
    products: [],
    allProducts: [],
    wishlist: [],
    totalProducts: 0,
    totalFilteredProducts: 0,
    productDetail: {},
    categories: [],
    brands: [],
    unsubscribeProducts: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('appEcommerce/getProductsSuccess', (state, action) => {
        state.params = action.payload.params
        state.products = action.payload.products
        state.allProducts = action.payload.allProducts
        state.totalProducts = action.payload.total
        state.totalFilteredProducts = action.payload.totalFilteredProducts

        if (state.unsubscribeProducts) {
          state.unsubscribeProducts()
        }

        state.unsubscribeProducts = action.payload.unsubscribe
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.products
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload.products
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload.brands
      })
      .addCase(filterProductsByPrice.fulfilled, (state, action) => {
        state.products = action.payload.filteredProducts
        state.totalFilteredProducts = action.payload.totalFilteredProducts
      })
  },
})

export default appEcommerceSlice.reducer
