// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Firebase imports
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'

// ** Configs
import { db } from '../../../../configs/firebase'

// ** Utils
import { generateRandomId, getUserData } from '../../../../utility/Utils'
import { paginateArray } from '../../../../utility/HelperFunctions'

// ** GET ALL PRODUCTS
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

        // const paginatedData = paginateArray(sortedData, perPage, page)

        dispatch({
          type: 'appEcommerce/getProductsSuccess',
          payload: {
            params,
            products: sortedData,
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

// ** GET SINGLE PRODUCT
export const getProduct = createAsyncThunk(
  'appEcommerce/getProduct',
  async (id) => {
    const productRef = doc(db, 'products', id)
    const productSnap = await getDoc(productRef)

    if (productSnap.exists()) {
      return productSnap.data()
    } else {
      console.log('No such document!')
    }
  }
)

// ** GET CART ITEMS
export const getCartItems = createAsyncThunk(
  'appEcommerce/getCartItems',
  async (_, { dispatch, getState }) => {
    // ** Get Login user id
    const userId = getState().auth.userData.id

    if (!userId) {
      console.log('No user is signed in - GETCARTITMES ')
      return
    }

    try {
      let allProducts = []
      allProducts = getState().ecommerce.allProducts

      if (!allProducts || allProducts.length === 0) {
        const productsRef = collection(db, 'products')

        const querySnapshot = await getDocs(productsRef)
        allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      }

      if (!allProducts || allProducts.length === 0) {
        console.log('All products are empty @ ~Cart')
        return
      }

      const cartRef = doc(db, 'cart', userId)
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        if (snapshot.exists()) {
          // ** Get the data from the database
          const cartData = snapshot.data()
          if (!cartData || !cartData.cartItems) {
            console.log('No cartItems found in cart data')
            return
          }

          // ** Get the array only
          const cartArray = cartData.cartItems

          // ** Map to get the products in the cartArray
          const cartItems = cartArray
            .map((cartProduct) => {
              const product = allProducts.find(
                (p) => p.id === cartProduct.productId
              )
              if (product) {
                return {
                  ...product,
                  addedAt: cartProduct.addedAt,
                  isInCart: true,
                  qty: cartProduct.qty,
                }
              }
              console.log(
                `Product not found for productId: ${cartProduct.productId}`
              )
              return null
            })
            .filter(Boolean) // Remove any null values in case no matching product was found
            .sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt)) // Ensure addedAt is a valid date object

          dispatch({
            type: 'appEcommerce/getCartItemsSuccess',
            payload: {
              cartArray,
              cartItems,
              unsubscribe,
            },
          })
          dispatch(appEcommerceSlice.actions.cartCalculations())
          dispatch(appEcommerceSlice.actions.discountCalculation())
          dispatch(getCoupons())
          dispatch(appEcommerceSlice.actions.deliveryChargesCalculation())
        } else {
          console.log('Cart document does not exist')
        }
      })

      return Promise.resolve()
    } catch (error) {
      console.log('Error Fetching Cart Items', error)
    }
  }
)

// ** GET COUPONS
export const getCoupons = createAsyncThunk(
  'appEcommerce/getCoupons',
  async () => {
    const couponRef = collection(db, 'coupons')

    try {
      let coupons = []
      const querySnapshot = await getDocs(couponRef)
      coupons = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      return coupons
    } catch (error) {
      console.log('Error fetching coupons', error)
      throw error
    }
  }
)

// ** ACTION TO UPDATE PRODUCT IN REDUX
export const updateProductInCart = (productId) => ({
  type: 'appEcommerce/updateProductInCart',
  payload: productId,
})

// ** DELETE ITEM FROM CART
export const deleteCartItem = createAsyncThunk(
  'appEcommerce/deleteCartItem',
  async (productId, { dispatch, getState }) => {
    console.log('Cart Item ID', productId)
    // ** Get Login user id
    const userId = getState().auth.userData.id

    const state = getState().ecommerce
    const cartArray = state.cartArray
    console.log('Cart Array', cartArray)
    // ** Cart Ref
    const cartRef = doc(db, 'cart', userId)

    const cartItem = cartArray.find((item) => item.productId === productId)

    console.log('Cart cartItem  ', cartItem)
    try {
      // ** Remove Item from the cart
      await updateDoc(cartRef, {
        cartItems: arrayRemove(cartItem),
      })

      dispatch(getCartItems())
      dispatch(appEcommerceSlice.actions.cartCalculations())
    } catch (error) {
      console.log('Error Updating the cart Item', error)
    }
  }
)

// ** ADD TO CART
export const addToCart = createAsyncThunk(
  'appEcommerce/addToCart',
  async (productId, { dispatch, getState }) => {
    // ** Check if item is already in cart
    const existingItem = getState().ecommerce.cart.find(
      (item) => item.id === productId
    )
    if (existingItem) {
      return
    }

    // ** Get Login user id
    const userId = getState().auth.userData.id

    if (!userId) {
      console.log('No user is signed in addToCart')
      return
    }

    // ** Cart Ref
    const cartRef = doc(db, 'cart', userId)

    const cartItem = {
      id: generateRandomId(),
      productId,
      qty: 1,
      addedAt: new Date(),
    }

    try {
      await updateDoc(cartRef, {
        cartItems: arrayUnion(cartItem),
      })

      // ** Dispatch action to update the product in the Redux state
      dispatch(updateProductInCart(productId))
      dispatch(appEcommerceSlice.actions.cartCalculations())
    } catch (error) {
      console.log('Error adding Item to the cart', error)
    }
  }
)

// ** UPDATE CART ITEM
export const updateCartItems = createAsyncThunk(
  'appEcommerce/updateCartItems',
  async (props, { dispatch, getState }) => {
    const { newQty, productId } = props

    // ** Get Login user id
    const userId = getState().auth.userData.id

    const state = getState().ecommerce
    const cartArray = state.cartArray

    // ** Cart Ref
    const cartRef = doc(db, 'cart', userId)

    try {
      // ** Update the quantity directly in the Firestore document
      await updateDoc(cartRef, {
        cartItems: cartArray.map((item) =>
          item.productId === productId ? { ...item, qty: newQty } : item
        ),
      })

      // ** Fetch the updated cart items
      dispatch(getCartItems())
      dispatch(appEcommerceSlice.actions.cartCalculations())
    } catch (error) {
      console.log('Error Updating the cart Item', error)
    }
  }
)

// ** GET WISHLIST ITEMS
export const getWishlistItems = createAsyncThunk(
  'appEcommerce/getWishlistItems',
  async (_, { dispatch, getState }) => {
    // ** Get Login user id
    const userId = getUserData().id

    if (!userId) {
      return
    }

    try {
      let allProducts = []

      allProducts = getState().ecommerce.allProducts

      if (!allProducts || allProducts.length === 0) {
        const productsRef = collection(db, 'products')

        const querySnapshot = await getDocs(productsRef)
        allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      }

      if (!allProducts || allProducts.length === 0) {
        return
      }

      const wishlistRef = doc(db, 'wishlist', userId)
      const unsubscribe = onSnapshot(wishlistRef, (snapshot) => {
        if (snapshot.exists()) {
          // ** Get wishlist data from the database
          const wishlistData = snapshot.data()

          if (!wishlistData || !wishlistData.wishlistItems) {
            return
          }

          // ** Get the array only
          const wishlistArray = wishlistData.wishlistItems

          // ** Map to get the products in the wishlist
          const wishlistItems = wishlistArray
            .map((wishlistProduct) => {
              const product = allProducts.find(
                (p) => p.id === wishlistProduct.productId
              )
              if (product) {
                return {
                  ...product,
                  addedAt: wishlistProduct.addedAt,
                  isInWishlist: true,
                }
              }
            })
            .filter(Boolean) // Remove any null values in case no matching product was found
            .sort((a, b) => a.addedAt - b.addedAt)

          dispatch({
            type: 'appEcommerce/getWishlistItemsSuccess',
            payload: {
              wishlistItems,
              wishlistArray,
              unsubscribe,
            },
          })
        } else {
          console.log('Wishlist document does not exist')
        }
      })

      return Promise.resolve()
    } catch (error) {
      console.log('Error Fetching Wishlist Items', error)
    }
  }
)

// ** DELETE ITEMS FROM WISHLIST
export const deleteWishlistItem = createAsyncThunk(
  'appEcommerce/deleteWishlistItem',
  async (productId, { dispatch, getState }) => {
    // ** Get Login user id
    const userId = getState().auth.userData.id

    const state = getState().ecommerce
    const wishlistArray = state.wishlistArray
    console.log('Cart Array', wishlistArray)
    // ** Wishlist Ref
    const wishlistRef = doc(db, 'wishlist', userId)

    const wishlistItem = wishlistArray.find(
      (item) => item.productId === productId
    )

    console.log('Wishlist wishlistItem  ', wishlistItem)
    try {
      // ** Remove Item from the cart
      await updateDoc(wishlistRef, {
        wishlistItems: arrayRemove(wishlistItem),
      })

      dispatch(getWishlistItems())
    } catch (error) {
      console.log('Error Updating the Wishlist Item', error)
    }
  }
)

// ** ACTION TO UPDATE PRODUCT IN REDUX
export const updateProductInWishlist = (productId) => ({
  type: 'appEcommerce/updateProductInWishlist',
  payload: productId,
})

// ** ADD ITEM TO WISHLIST
export const addToWishlist = createAsyncThunk(
  'appEcommerce/addToWishlist',
  async (productId, { dispatch, getState }) => {
    // ** Check if item is already in wishlist
    const existingItem = getState().ecommerce.wishlist.find(
      (item) => item.id === productId
    )
    if (existingItem) {
      dispatch(deleteWishlistItem(productId))
      return
    }

    // ** Get Login user id
    const userId = getState().auth.userData.id

    if (!userId) {
      return
    }

    // ** Cart Ref
    const wishlistRef = doc(db, 'wishlist', userId)

    const wishlistItem = {
      id: generateRandomId(),
      productId,
      addedAt: new Date(),
    }

    console.log('Add To Wishlist Logs', productId, wishlistItem)
    try {
      await updateDoc(wishlistRef, {
        wishlistItems: arrayUnion(wishlistItem),
      })

      // ** Dispatch action to update the product in the Redux state
      dispatch(updateProductInWishlist(productId))
    } catch (error) {
      console.log('Error adding Item to the Wishlist', error)
    }
  }
)

// ** FETCH CATEGORIES
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

// ** FETCH BRANDS
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

// ** FILTER BY PRICE
export const filterProductsByPrice = createAsyncThunk(
  'appEcommerce/filterProductsByPrice',
  async (priceRange, { getState }) => {
    const state = getState()

    const params = state.ecommerce.params
    const { sortBy } = params
    let sortedData = state.ecommerce.allProducts
    if (sortBy === 'price-desc') {
      sortedData = filteredData.sort((a, b) => b.salePrice - a.salePrice)
    } else if (sortBy === 'price-asc') {
      sortedData = filteredData.sort((a, b) => a.salePrice - b.salePrice)
    }

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
    return {
      filteredProducts,
      totalFilteredProducts: filteredProducts.length,
    }
  }
)

// ** FILTER BY BRANDS
export const filterProductsByBrands = createAsyncThunk(
  'appEcommerce/filterProductsByBrands',
  async (selecedBrands, { getState }) => {
    // ** Get current State of the redux store
    const state = getState()
    const filteredProducts = state.ecommerce.allProducts.filter((product) =>
      selecedBrands.includes(product.brand)
    )

    return {
      filteredProducts,
      totalFilteredProducts: filteredProducts.length,
    }
  }
)

// ** FILTER BY CATEGORY
export const filterProductsByCategory = createAsyncThunk(
  'appEcommerce/filterProductsByCategory',
  async (category, { getState }) => {
    // ** Get the values of the current redux state
    const state = getState()
    const filteredProducts = state.ecommerce.allProducts.filter(
      (product) => product.category === category
    )

    return {
      filteredProducts,
      totalFilteredProducts: filteredProducts.length,
    }
  }
)

// ** Helper Functions
const calculateTotalAmount = (cartItems) => {
  let totalAmount = 0

  cartItems.forEach((item) => {
    totalAmount += item.salePrice * item.qty
  })
  return totalAmount
}

const calculateDiscount = (cartItems) => {
  let totalDiscount = 0

  // Get all discounted products
  const discountedProducts = cartItems.filter((item) => item.discounted !== '')

  // Calculate total discount
  discountedProducts.forEach((item) => {
    if (item.discounted === 'fixed') {
      totalDiscount += item.discount * item.qty
    } else if (item.discounted === 'percent') {
      totalDiscount += (item.discount / 100) * item.salePrice * item.qty
    }
  })

  return totalDiscount
}

const calculateDeliveryCharges = (cartItems) => {
  let totalAmountPaid = 0
  let totalAmountsaved = 0
  const hasFreeDelivery = cartItems.filter(
    (item) => item.hasFreeShipping === false
  )
  hasFreeDelivery.forEach((item) => {
    totalAmountPaid += item.salePrice * item.qty
  })

  const noFreeDelivery = cartItems.filter(
    (item) => item.hasFreeShipping === true
  )
  noFreeDelivery.forEach((item) => {
    totalAmountsaved += item.salePrice * item.qty
  })

  const deliveryCharges = totalAmountPaid * 0.015 // 15%
  const deliverySaved = totalAmountsaved * 0.015 // 15%

  return {
    deliveryCharges,
    deliverySaved,
  }
}

// ** ECOMMERCE SLICE
export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    cart: [],
    cartArray: [],
    params: {},
    products: [],
    allProducts: [],
    wishlist: [],
    wishlistArray: [],
    totalProducts: 0,
    totalFilteredProducts: 0,
    productDetail: {},
    selectedCategory: '',
    selectedBrands: [],
    categories: [],
    brands: [],
    unsubscribeProducts: null,
    unsubscribeCart: null,
    unsubscribeWishlist: null,

    // ** Checkout
    overallTotal: 0,
    totalAmount: 0,
    discount: 0,
    deliveryCharges: 0,
    savedOnDelivery: 0,
    selectedAddress: {},

    // ** Coupons
    coupons: [],
    couponDiscount: 0,
  },
  reducers: {
    updateProductInCart: (state, action) => {
      state.allProducts = state.allProducts.map((product) =>
        product.id === action.payload ? { ...product, isInCart: true } : product
      )
    },
    updateProductInWishlist: (state, action) => {
      state.allProducts = state.allProducts.map((product) =>
        product.id === action.payload
          ? { ...product, isInWishlist: true }
          : product
      )
    },
    resetFilter: (state) => {
      state.products = state.allProducts
      state.totalProducts = state.products.length
      state.selectedCategory = ''
      state.selectedBrands = []
    },
    clearCartAndWishlist: (state) => {
      state.cart = []
      state.cartArray = []
      state.wishlist = []
      state.wishlistArray = []
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    filterByCategory: (state, action) => {
      const category = action.payload
      state.products = state.allProducts.filter(
        (product) => product.category === category
      )
      state.totalProducts = state.products.length
    },
    removeCategory: (state, action) => {
      return state.selectedCategory.filter(
        (category) => category !== action.payload
      )
    },
    addBrand: (state, action) => {
      if (!state.selectedBrands.includes(action.payload)) {
        state.selectedBrands.push(action.payload)
      }
    },
    removeBrand: (state, action) => {
      return state.selectedBrands.filter((brand) => brand !== action.payload)
    },
    cartCalculations: (state) => {
      state.totalAmount = calculateTotalAmount(state.cart)
      state.overallTotal =
        state.totalAmount +
        state.deliveryCharges -
        state.discount -
        state.couponDiscount
    },
    updateCouponDiscount: (state, action) => {
      state.couponDiscount = action.payload
      state.overallTotal =
        state.totalAmount +
        state.deliveryCharges -
        state.discount -
        state.couponDiscount
    },
    discountCalculation: (state) => {
      state.discount = calculateDiscount(state.cart)
      state.overallTotal =
        state.totalAmount +
        state.deliveryCharges -
        state.discount -
        state.couponDiscount
    },
    deliveryChargesCalculation: (state) => {
      const deliveryChargesData = calculateDeliveryCharges(state.cart)
      state.deliveryCharges = deliveryChargesData.deliveryCharges
      state.savedOnDelivery = deliveryChargesData.deliverySaved
      state.overallTotal =
        state.totalAmount +
        state.deliveryCharges -
        state.discount -
        state.couponDiscount
    },
    selectDeliveryAddress: (state, action) => {
      state.selectedAddress = action.payload
    },
  },
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
      .addCase('appEcommerce/getWishlistItemsSuccess', (state, action) => {
        state.wishlist = action.payload.wishlistItems
        state.wishlistArray = action.payload.wishlistArray

        if (state.unsubscribeWishlist) {
          state.unsubscribeWishlist()
        }

        state.unsubscribeWishlist = action.payload.unsubscribe
      })
      .addCase('appEcommerce/getCartItemsSuccess', (state, action) => {
        state.cart = action.payload.cartItems
        state.cartArray = action.payload.cartArray

        if (state.unsubscribeCart) {
          state.unsubscribeCart()
        }

        state.unsubscribeCart = action.payload.unsubscribe
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload
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
      .addCase(filterProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload.filteredProducts
        state.totalFilteredProducts = action.payload.totalFilteredProducts
      })
      .addCase(filterProductsByBrands.fulfilled, (state, action) => {
        state.products = action.payload.filteredProducts
        state.totalFilteredProducts = action.payload.totalFilteredProducts
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload
      })
  },
})

export const {
  clearCartAndWishlist,
  filterByCategory,
  resetFilter,
  selectCategory,
  removeCategory,
  addBrand,
  removeBrand,
  cartCalculations,
  updateCouponDiscount,
  discountCalculation,
  deliveryChargesCalculation,
  selectDeliveryAddress,
} = appEcommerceSlice.actions
export default appEcommerceSlice.reducer
