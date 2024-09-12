// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider } from '../configs/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

// ** Utils
import {
  ToastContentError,
  ToastContentLogin,
  ToastContentRegister,
  getUserData,
  logoutFirebase,
  splitEmail,
} from '../utility/Utils'

// ** Toast
import toast from 'react-hot-toast'

// ** Default Avatar
import DefaultAvatar from '@src/assets/images/avatars/user.svg'

// **  Intial collections data
const wishlistItems = []
const cartItems = []
const orders = []
const notifications = []
const chat = []

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
      await setDoc(doc(db, 'messaging', userId), { chat })

      toast((t) => (
        <ToastContentRegister
          t={t}
          role={localUserData.role}
          name={localUserData.username}
        />
      ))

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

      // ** Profiles ref
      const userRef = doc(db, 'profiles', userId)

      // ** Get user data
      const userFromFirebaseDocs = await getDoc(userRef)

      // Determines which function to run
      // Either register or login
      let authType // login || register

      // Check if the user is new
      // If user is new it will have no data in the profiles
      if (!userFromFirebaseDocs.exists()) {
        // Unregistered Users using google auth at Login will get a toast prompting them
        // their email is not register so a new account was created for them
        if (urlPath === 'login') {
          toast((t) => (
            <ToastContentError
              t={t}
              title='Account'
              msg={`No account registered with email - ${authEmail}, Creating New Account...`}
            />
          ))
        }

        authType = 'register'
      } else {
        authType = 'login'
      }

      let createdUserData = {}
      let localUserData = {}

      if (authType === 'register') {
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
        await setDoc(doc(db, 'messaging', userId), { chat })

        toast((t) => (
          <ToastContentRegister
            t={t}
            role={localUserData.role}
            name={localUserData.username}
          />
        ))

        return localUserData
      } else if (authType === 'login') {
        // Get User Data
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
    }
  }
)

const initialUser = () => {
  const userData = getUserData()

  return userData
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
