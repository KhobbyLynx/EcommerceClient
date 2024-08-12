// // ** Redux Imports
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// const calculateTotalAmount = (itemsList) => {
//   let totalAmount = 0
//   itemsList.forEach((item) => {
//     totalAmount += item.price * item.quantity
//   })
//   localStorage.setItem('sumTotal', JSON.stringify(totalAmount))
//   return totalAmount
// }

// export const checkoutSlice = createSlice({
//   name: 'checkout',
//   initialState: {
//     cartItems: [],
//     cartArray: [],
//     totalAmount: 0,
//     discount: 0,
//     couponDiscount: 0,
//     deliveryCharges: 0,
//     address: [],
//     overallTotal: 0,

//     totalQuantity: 0,
//   },
//   reducers: {
//     updateCartItems(state, action) {
//       const newItem = action.payload

//       const existingItem = state.itemsList.find(
//         (item) => item.id === newItem.id
//       )

//       if (existingItem) {
//         state.itemsList = state.itemsList.filter(
//           (item) => item.id !== newItem.id
//         )

//         state.totalQuantity--
//         existingItem.totalPrice -= existingItem.price
//       } else {
//         state.itemsList.push({
//           ...newItem,
//           qty: 1,
//           isInCart: true,
//           totalPrice: newItem.price,
//         })

//         state.totalQuantity++
//       }

//       if (state.itemsList.length > 30) {
//         state.itemsList.shift() // Remove the oldest product (first element)
//       }
//     },

//     removeFromCart(state, action) {
//       const id = action.payload
//       state.itemsList = state.itemsList.filter((item) => item.id !== id)
//       state.totalQuantity--

//       // Recalculate totalAmount and overallTotal
//       state.totalAmount = calculateTotalAmount(state.itemsList)
//       state.overallTotal =
//         state.totalAmount +
//         state.couponDiscount +
//         state.discount +
//         state.deliveryCharges
//     },

//     updateQuantity(state, action) {
//       const { id, quantity } = action.payload
//       const item = state.itemsList.find((item) => item.id === id)

//       if (item) {
//         item.quantity = quantity
//       }

//       // Recalculate totalAmount and overallTotal
//       state.totalAmount = calculateTotalAmount(state.itemsList)
//       state.overallTotal = state.totalAmount + state.shippingFee
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getBookmarks.fulfilled, (state, action) => {
//       state.suggestions = action.payload.data
//       state.bookmarks = action.payload.bookmarks
//     })
//   },
// })

// export const { updateCartItems, removeFromCart, updateQuantity } =
//   checkoutSlice.actions

// export default checkoutSlice.reducer
