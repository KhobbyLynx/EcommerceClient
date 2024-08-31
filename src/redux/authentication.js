// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider } from '../configs/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

// ** Utils
import {
  ToastContentLogin,
  ToastContentRegister,
  logoutFirebase,
  splitEmail,
} from '../utility/Utils'

// ** Toast
import toast from 'react-hot-toast'

// ** Default Avatar
import DefaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

// **  Intial collections data
const wishlistItems = []
const cartItems = []
const orders = []
const notifications = []

// ** REGISTER NEW USER
export const handleRegisterUser = createAsyncThunk(
  'appEcommerce/handleRegisterUser',
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData
    logoutFirebase()
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredentials.user

      const { email: authEmail, uid: userId, photoURL, displayName } = user
      const { accessToken, refreshToken } = user.stsTokenManager
      const { createdAt, lastLoginAt } = user.metadata
      const { username: name } = splitEmail(authEmail)
      const username = displayName ? displayName : name

      const createdUserData = {
        email: authEmail,
        id: userId,
        accessToken,
        refreshToken,
        role: 'client',
        avatar: photoURL,
        username,
        createdAt,
        lastLoginAt,
        address: [],
        status: 'online',
        fullname: '',
      }

      const localUserData = {
        email: authEmail,
        id: userId,
        accessToken,
        refreshToken,
        role: 'client',
        avatar: photoURL,
        username,
        address: [],
        status: 'online',
        fullname: '',
      }

      await setDoc(doc(db, 'profiles', userId), createdUserData)
      await setDoc(doc(db, 'wishlist', userId), { wishlistItems })
      await setDoc(doc(db, 'cart', userId), { cartItems })
      await setDoc(doc(db, 'orders', userId), { orders })
      await setDoc(doc(db, 'notifications', userId), { notifications })

      console.log('User created successfully', user, createdUserData)
      toast((t) => (
        <ToastContentRegister
          t={t}
          role={localUserData.role}
          name={localUserData.username}
        />
      ))
      console.log('localUserData', localUserData)

      return localUserData
    } catch (error) {
      console.log('Error creating user account', error.code, error.message)
      // Pass error message to rejectWithValue
      return rejectWithValue(error.message)
    }
  }
)

// ** GOOGLE AUTH
export const handleGoogleAuth = createAsyncThunk(
  'appEcommerce/handleGoogleAuth',
  async () => {
    logoutFirebase()
    try {
      // ** get pathname
      const pathname = window.location.pathname
      const urlPath = pathname.substring(pathname.lastIndexOf('/') + 1)

      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const { email: authEmail, uid: userId, photoURL, displayName } = user
      const { accessToken, refreshToken } = user.stsTokenManager
      const { createdAt, lastLoginAt } = user.metadata
      const username = displayName

      let createdUserData = {}
      let localUserData = {}

      console.log('URL PATHNAME', urlPath)
      if (urlPath === 'register') {
        createdUserData = {
          email: authEmail,
          id: userId,
          accessToken,
          refreshToken,
          role: 'client',
          avatar: photoURL,
          username,
          createdAt,
          lastLoginAt,
          address: [],
          status: 'online',
          fullname: '',
        }

        localUserData = {
          email: authEmail,
          id: userId,
          accessToken,
          refreshToken,
          role: 'client',
          avatar: photoURL,
          username,
          address: [],
          status: 'online',
          fullname: '',
        }

        await setDoc(doc(db, 'profiles', userId), createdUserData)
        await setDoc(doc(db, 'wishlist', userId), { wishlistItems })
        await setDoc(doc(db, 'cart', userId), { cartItems })
        await setDoc(doc(db, 'orders', userId), { orders })
        await setDoc(doc(db, 'notifications', userId), { notifications })

        toast((t) => (
          <ToastContentRegister
            t={t}
            role={localUserData.role}
            name={localUserData.username}
          />
        ))

        return localUserData
      } else if (urlPath === 'login') {
        // ** users collections ref
        const userCollectionRef = collection(db, 'profiles')

        // ** single user ref
        const userRef = doc(userCollectionRef, userId)

        // ** get user data
        const userFromFirebaseDocs = await getDoc(userRef)
        const userData = userFromFirebaseDocs.data()

        // ** Set Avatar
        const avatar = photoURL ? photoURL : DefaultAvatar

        localUserData = {
          email: authEmail,
          id: userId,
          accessToken,
          refreshToken,
          role: userData?.role,
          avatar,
          username,
          address: userData?.address,
          fullname: userData?.fullname,
          status: 'online',
        }

        await setDoc(doc(db, 'notifications', userId), { notifications })

        toast((t) => (
          <ToastContentLogin
            t={t}
            role={localUserData.role}
            name={localUserData.username}
          />
        ))

        return localUserData
      } else {
        console.log('Couldnot Determine path')
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('Error Google Auth', errorMessage, errorCode)
      setErrorMsg(errorMessage)
    }
  }
)

const initialUser = () => {
  const item = window.localStorage.getItem('userData')

  // Check if the item is null or "undefined" string
  if (item === null || item === 'undefined') {
    return null // Return an empty object if no data is found
  }

  try {
    // Attempt to parse the JSON string
    const parsedItem = JSON.parse(item)

    // Return the parsed item if it's valid
    return parsedItem !== undefined ? parsedItem : null
  } catch (error) {
    // Handle JSON parsing errors (e.g., corrupted data)
    console.error('Error parsing JSON from localStorage:', error)
    return null // Return an empty object if parsing fails
  }
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    handleLogout: (state) => {
      state.userData = {}

      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
    },
    updateAddresses: (state, action) => {
      state.userData.address = action.payload
    },
    updateUserName: (state, action) => {
      state.userData.fullname = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleRegisterUser.fulfilled, (state, action) => {
        state.userData = action.payload
        localStorage.setItem('userData', JSON.stringify(action.payload))
      })
      .addCase(handleGoogleAuth.fulfilled, (state, action) => {
        state.userData = action.payload
        localStorage.setItem('userData', JSON.stringify(action.payload))
      })
  },
})

export const { handleLogin, handleLogout, updateAddresses, updateUserName } =
  authSlice.actions

export default authSlice.reducer
