import { DefaultRoute } from '../router/routes'

// ** UUID
import { v4 as uuidv4 } from 'uuid'

// ** Icon
import { Coffee, LogIn, LogOut, X, MessageCircle } from 'react-feather'
import { BiCart, BiHeart } from 'react-icons/bi'

// ** Custom Components
import Avatar from '@components/avatar'
import toast from 'react-hot-toast'
import { signOut } from 'firebase/auth'
import { auth } from '../configs/firebase'

// ** Firebase Logout Func
export const logoutFirebase = async () => {
  try {
    await signOut(auth)
    console.log('Firebase SignOut Successful')
  } catch (error) {
    console.log('Error Logging Out', error)
  }
}

// ** Ghana Regions
export const ghanaRegions = {
  253: 'Ahafo',
  242: 'Ashanti',
  251: 'Bono',
  252: 'Bono East',
  244: 'Central',
  245: 'Eastern',
  241: 'Greater Accra',
  254: 'North East',
  246: 'Northern',
  257: 'Oti',
  255: 'Savannah',
  248: 'Upper East',
  258: 'Upper West',
  247: 'Volta',
  250: 'Western',
  256: 'Western North',
}

// ** Generate Random ID
export const generateRandomId = () => {
  const uuid = uuidv4()
  return uuid.slice(0, 8).toUpperCase()
}

// ** Get User ID
export const getUserId = () => {
  const user = auth.currentUser

  if (user) {
    // User is signed in, return the user ID
    return user.uid
  } else {
    // No user is signed in
    return null
  }
}

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: 'short', day: 'numeric', year: 'numeric' }
) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === 'client') return DefaultRoute
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed', // for input hover border-color
  },
})

// ** getUsername
export function splitEmail(email) {
  const atIndex = email.indexOf('@') // Find the index of the @ symbol
  if (atIndex === -1) {
    // If no @ symbol is found, return null
    return null
  }
  const username = email.slice(0, atIndex)
  const domain = email.slice(atIndex + 1)
  return { username, domain }
}

export const ToastContentRegister = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>
            <strong>{name}</strong>
          </h6>
          <X
            size={12}
            className='cursor-pointer'
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <p>
          Your <strong className='text-success'>{role}</strong> account have
          been successfully created. Explore and Shop with fun. Enjoy!
        </p>
      </div>
    </div>
  )
}
export const ToastContentLogin = ({ t, name }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<LogIn size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>
            <strong>{name}</strong>
          </h6>
          <X
            size={12}
            className='cursor-pointer'
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <p>Account Logged In successfully. Explore and Shop with fun!</p>
      </div>
    </div>
  )
}

export const ToastContentLogout = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<LogOut size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>
            <strong>{name}</strong>
          </h6>
          <X
            size={12}
            className='cursor-pointer'
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <p>
          Your <strong className='text-success'>{role}</strong> account have
          been Logged out.
        </p>
      </div>
    </div>
  )
}

export const GeneralToastContent = ({ t, title, msg }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar
          size='sm'
          color='success'
          icon={
            title === 'Cart' ? (
              <BiCart size={12} />
            ) : title === 'Wishlist' ? (
              <BiHeart size={12} />
            ) : (
              <MessageCircle size={12} />
            )
          }
        />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>
            <strong>{title}</strong>
          </h6>
          <X
            size={12}
            className='cursor-pointer'
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <p>{msg}</p>
      </div>
    </div>
  )
}
