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
} from '../utility/Utils'
import toast from 'react-hot-toast'

// **  Intial collections data
const wishlistItems = []
const cartItems = []
const orders = []
const notifications = [
  {
    id: 'FHJRIE24',
    isRead: false,
    avatarIcon: 'read',
    subtitle: 'Won the monthly best seller badge.',
    title: 'Congratulation Sam 🎉</span>winner!',
  },
  {
    id: 'SLKPWN93',
    isRead: false,
    avatarIcon: 'message',
    subtitle: 'You have 10 unread messages.',
    title: 'New message</span>&nbsp;received',
  },
  {
    id: 'WOQPDN94',
    isRead: false,
    avatarContent: 'MD',
    subtitle: 'MD Inc. order updated',
    title: 'Revised Order 👋 checkout',
  },
  {
    id: 'WIDNPO00',
    isRead: true,
    avatarIcon: 'close',
    subtitle: 'USA Server is down due to hight CPU usage',
    title: 'Server down registered',
  },
  {
    id: 'BSONRP89',
    isRead: true,
    avatarIcon: 'done',
    subtitle: 'Last month sales report generated',
    title: 'Sales report generated',
  },
  {
    id: 'GPOSBE20',
    isRead: true,
    avatarIcon: 'warning',
    subtitle: 'BLR Server using high memory',
    title: 'High memory usage',
  },
]

// ** REGISTER NEW USER
export const handleRegisterUser = createAsyncThunk(
  'appEcommerce/handleRegisterUser',
  async (userData) => {
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
      const username = displayName

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

      console.log('User created success', user, createdUserData)
      toast((t) => (
        <ToastContentRegister
          t={t}
          role={localUserData.role}
          name={localUserData.username}
        />
      ))

      return localUserData
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message

      console.log('Error creating user Account', errorCode, errorMessage)
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

        console.log('USER DATA IN FUNC', userData)

        localUserData = {
          email: authEmail,
          id: userId,
          accessToken,
          refreshToken,
          role: 'client',
          avatar: photoURL,
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
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
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
