// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '@utils'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/not-authorized.svg'
import illustrationsDark from '@src/assets/images/pages/not-authorized-dark.svg'

// ** Styles
import '@styles/base/pages/page-misc.scss'
import themeConfig from '../../../configs/themeConfig'

const NotAuthorized = () => {
  // ** Hooks
  const { skin } = useSkin()

  // ** Vars
  const user = getUserData()

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  return (
    <div className='misc-wrapper'>
      <Link className='brand-logo' to='/'>
        <img
          src={themeConfig.app.appLogoImage}
          alt=''
          style={{ maxWidth: '36px', maxHeight: '32px' }}
        />
        <h2 className='brand-text text-primary ms-1'>
          {themeConfig.app.appName}
        </h2>
      </Link>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>You are not authorized! 🔐</h2>
          <p className='mb-2'>
            The Webtrends Marketing Lab website in IIS uses the default IUSR
            account credentials to access the web pages it serves.
          </p>
          <Button
            tag={Link}
            color='primary'
            className='btn-sm-block mb-1'
            to={user ? getHomeRouteForLoggedInUser(user.role) : '/'}
          >
            Back to Home
          </Button>
          <img className='img-fluid' src={source} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
