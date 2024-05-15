// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { collection, onSnapshot } from 'firebase/firestore'
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

        dispatch({
          type: 'appEcommerce/getProductsSuccess',
          payload: {
            params,
            products: paginatedData,
            allProducts: allData,
            total: filteredData.length,
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

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    cart: [],
    params: {},
    products: [],
    allProducts: [],
    wishlist: [],
    totalProducts: 0,
    productDetail: {},
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
        console.log('<<<<<<<Products>>>>>>>>>', action.payload)
        state.productDetail = action.payload.product
      })
  },
})

export default appEcommerceSlice.reducer
