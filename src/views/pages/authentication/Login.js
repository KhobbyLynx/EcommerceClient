// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Icons Imports
import { FcGoogle } from 'react-icons/fc'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Modal
import SpinnerModal from './SpinnerModal'

// ** Hooks
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Default Avatar
import DefaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
  Card,
  CardBody,
  Spinner,
} from 'reactstrap'
import themeConfig from '../../../configs/themeConfig'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

// ** Auth
import { handleGoogleAuth, handleLogin } from '../../../redux/authentication'
import {
  browserSessionPersistence,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  ToastContentLogin,
  // logoutFirebase,
  splitEmail,
} from '../../../utility/Utils'
import { useDispatch } from 'react-redux'
import { collection, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../../configs/firebase'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Login Schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

const LoginBasic = () => {
  // ** States
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  // ** Login Function
  const handleLoginFunc = async (user) => {
    // logoutFirebase()
    try {
      const { email: authEmail, uid: userId, photoURL } = user
      const { accessToken, refreshToken } = user.stsTokenManager

      // ** users collections ref
      const userCollectionRef = collection(db, 'profiles')

      // ** single user ref
      const userRef = doc(userCollectionRef, userId)

      // ** get single user data
      const userFromFirebaseDocs = await getDoc(userRef)

      // user data
      let userDataFromDB

      // ** role conditionals
      if (userFromFirebaseDocs.exists()) {
        const userData = userFromFirebaseDocs.data()
        userDataFromDB = userData

        if (userData.role !== 'client' && userData.role !== 'admin') {
          setErrorMsg('Account is not valid')
          // logoutFirebase()
          return
        }
      }

      // ** Set Avatar
      const avatar = photoURL ? photoURL : DefaultAvatar

      const loginData = {
        ...userDataFromDB,
        email: authEmail,
        id: userId,
        accessToken,
        refreshToken,
        avatar,
      }

      dispatch(handleLogin(loginData))
      navigate('/home')
      toast((t) => (
        <ToastContentLogin
          t={t}
          role={loginData.role}
          name={loginData.username}
        />
      ))
    } catch (error) {
      setErrorMsg('Error Logging in')
      console.log('LogIn error', error)
    }
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    const { email, password } = data
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email)
      console.log('signInMethods 1', signInMethods)

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredentials.user

      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          console.log('@browserSessionPersistence')
        })
        .catch((error) => {
          console.error('Error setting persistence:', error)
        })

      handleLoginFunc(user)
      setSubmitting(false)
    } catch (error) {
      setSubmitting(false)
      console.log('Error', error)
      if (error.message.includes('auth/wrong-password')) {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email)
        console.log('signInMethods', signInMethods)

        if (signInMethods.length === 0) {
          setErrorMsg('Invalid User Credentials')
        } else {
          setErrorMsg('User Registered with Google')
        }
      } else if (error.message.includes('auth/network-request-failed')) {
        setErrorMsg('Network Error')
      } else if (error.message.includes('auth/invalid-credential')) {
        setErrorMsg('Invalid User Credentials')
      } else if (error.message.includes('auth/user-not-found')) {
        setErrorMsg('Invalid User Credentials')
      } else {
        setErrorMsg('Error Logging In')
      }
    }
  }

  // ** useEfects
  useEffect(() => {
    // ** onAuthStateChange
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user)
      } else {
        console.log('User is signed out')
      }
    })

    // ** Timer
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 3500)

    // ** Cleaner Func.
    return () => {
      clearTimeout(timer)
      unsubscribe()
    }
  }, [auth, errorMsg])

  const handleCreateAccountWithGoogle = async () => {
    try {
      await dispatch(handleGoogleAuth())
      navigate('/home')
    } catch (error) {
      console.log('Login Google Auth error', error)
      if (error.message.includes('auth/popup-closed-by-user')) {
        setErrorMsg('Google Auth Popup Closed')
      } else {
        setErrorMsg('Error Logging In')
      }
    }
  }

  return (
    <>
      <SpinnerModal submitting={submitting} page='login' />
      <div className='auth-wrapper auth-basic px-2'>
        <div className='auth-inner my-2'>
          <Card className='mb-0'>
            <CardBody>
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
              <CardTitle tag='h4' className='mb-1'>
                Welcome to {themeConfig.app.appName}! 👋
              </CardTitle>
              <CardText className='mb-2'>
                Please sign-in to your account and start shoping
              </CardText>
              <Form
                className='auth-login-form mt-2'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='mb-1'>
                  <Label className='form-label' for='login-email'>
                    Email
                  </Label>
                  <Controller
                    id='email'
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='email'
                        placeholder='john@example.com'
                        invalid={errors.email && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.email && (
                    <FormFeedback>
                      <div>{errors.email.message}</div>
                    </FormFeedback>
                  )}
                </div>
                <div className='mb-1'>
                  <div className='d-flex justify-content-between'>
                    <Label className='form-label' for='login-password'>
                      Password
                    </Label>
                    <Link to='/forgot-password'>
                      <small>Forgot Password?</small>
                    </Link>
                  </div>
                  <Controller
                    id='password'
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <InputPasswordToggle
                        className='input-group-merge'
                        invalid={errors.password && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.password && (
                    <span className='text-danger'>
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className='form-check mb-1'>
                  <Input type='checkbox' id='remember-me' />
                  <Label className='form-check-label' for='remember-me'>
                    Remember Me
                  </Label>
                </div>
                <Button
                  type='submit'
                  color='primary'
                  block
                  disabled={submitting}
                >
                  {submitting ? (
                    <Spinner
                      className='me-25 text-center'
                      color='white'
                      size='sm'
                    />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>
              {errorMsg && (
                <p className='mt-1 text-danger text-center'>{errorMsg}</p>
              )}
              <p className='text-center mt-2'>
                <span className='me-25'>New here ?</span>
                <Link to='/register'>
                  <span>Create an account</span>
                </Link>
              </p>
              <div className='divider my-2'>
                <div className='divider-text'>or</div>
              </div>
              <div className='auth-footer-btn d-flex justify-content-center'>
                <Button
                  color='google'
                  className='d-flex align-items-center justify-content-center'
                  onClick={() => {
                    handleCreateAccountWithGoogle()
                    setSubmitting(true)
                  }}
                  disabled={submitting}
                >
                  <h6 className='m-0 pe-1 text-white'>Google</h6>
                  <FcGoogle size={14} />
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default LoginBasic
