// ** React Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Reactstrap Imports
import { Alert, Button, Col, Row } from 'reactstrap'

// ** Components
import Breadcrumbs from '@components/breadcrumbs'
import AccountDetails from './AccountDetails'
import OrderHistory from './OrderHistory'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

// ** Icon
import { AlertCircle } from 'react-feather'
import { auth } from '../../../configs/firebase'
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
import toast from 'react-hot-toast'
import {
  GeneralToastContent,
  ToastContentError,
  ToastContentSuccess,
} from '../../../utility/Utils'
import { useEffect } from 'react'
import { createNotification } from '../../apps/messaging/store'

const AccountSettings = () => {
  // ** States
  const currentUser = useSelector((state) => state.auth.userData)
  const user = auth.currentUser

  const dispatch = useDispatch()

  useEffect(() => {
    const reloadUser = async () => {
      if (user) {
        try {
          await user.reload()
          console.log('User reloaded successfully', currentUser)
        } catch (error) {
          console.error('Error reloading user:', error)
        }
      }
    }

    reloadUser()
  }, [user])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User @ Profile Account', user)
        // User is signed in
      } else {
        console.log('No user is signed in')
        // No user is signed in
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const handleVerifyEmail = async () => {
    if (user) {
      try {
        sendEmailVerification(user)
        delete console.log('Verification email sent successfully')

        dispatch(
          createNotification({
            title: 'Email Verification',
            subtitle: `Verification email sent successfully to your email ${user.email}`,
            avatarIcon: 'done',
          })
        )

        toast((t) => (
          <ToastContentSuccess
            t={t}
            title='Email Verification'
            msg='Verification email sent successfully'
          />
        ))
      } catch (error) {
        console.error('Error sending verification email:', error)

        toast((t) => (
          <ToastContentError
            t={t}
            title='Email Verification'
            msg='Error sending verification email'
          />
        ))
      }
    } else {
      console.log('No user is signed in')

      toast((t) => (
        <ToastContentError
          t={t}
          title='Email Verification'
          msg='Error sending verification email'
        />
      ))
    }
  }

  return (
    <>
      <Breadcrumbs
        title='Profile Settings'
        data={[{ title: 'User Details' }]}
      />
      <Row>
        <Col xs={12}>
          {user && !user.emailVerified ? (
            <Alert color='warning'>
              <div className='alert-body d-flex align-items-center'>
                <AlertCircle size={15} />
                <span className='ms-1'>
                  Your <strong>Email</strong> is not Verified
                </span>
                <Button
                  color='gradient-warning'
                  className='ms-auto'
                  onClick={handleVerifyEmail}
                >
                  Verify Now
                </Button>
              </div>
            </Alert>
          ) : (
            <Alert color='success'>
              <div className='alert-body d-flex align-items-center'>
                <AlertCircle size={15} />
                <span className='ms-1'>
                  Your <strong>Email</strong> is Verified
                </span>
              </div>
            </Alert>
          )}
          <AccountDetails currentUser={currentUser} />
          {/* <OrderHistory /> */}
        </Col>
      </Row>
    </>
  )
}

export default AccountSettings
