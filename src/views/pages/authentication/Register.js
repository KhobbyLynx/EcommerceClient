// ** React Imports
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Icons Imports
import { FcGoogle } from 'react-icons/fc'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
  Spinner,
} from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import themeConfig from '../../../configs/themeConfig'

// ** Hooks
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  handleGoogleAuth,
  handleRegisterUser,
} from '../../../redux/authentication'

// ** Loader
import SpinnerModal from './SpinnerModal'

const defaultValues = {
  email: '',
  password: '',
}

const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password cannot be more than 20 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  terms: yup
    .bool()
    .test(
      'is-true',
      'Please accept terms and conditions',
      (value) => value === true
    )
    .required('Please accept terms and conditions'),
})

const RegisterBasic = () => {
  // ** State
  const [errorMsg, setErrorMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg('')
    }, 3500)
  }, [errorMsg])

  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(RegisterSchema) })

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      // Await the dispatch call and ensure it completes successfully
      const resultAction = await dispatch(handleRegisterUser(data))

      // Check if the action was fulfilled or rejected
      if (handleRegisterUser.fulfilled.match(resultAction)) {
        // Navigate only if the dispatch was successful
        navigate('/home')
      } else {
        // Handle the case where the action was rejected
        if (resultAction.payload.includes('auth/email-already-in-use')) {
          setErrorMsg('Email Already In Use - Login')
        } else if (
          resultAction.payload.includes('auth/network-request-failed')
        ) {
          setErrorMsg('Network Error')
        } else {
          setErrorMsg('Registration failed. Please try again.')
        }
      }
    } catch (error) {
      // Handle errors
      setErrorMsg('An unexpected error occurred.')
      console.log('Error At Register Page', error, error.code)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateAccountWithGoogle = async () => {
    await dispatch(handleGoogleAuth())
    navigate('/home')
  }

  return (
    <>
      <SpinnerModal submitting={submitting} page='register' />
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
                Just Shop it! 🚀
              </CardTitle>
              <CardText className='mb-2'>Get it delivered now!</CardText>
              <Form
                className='auth-register-form mt-2'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='mb-1'>
                  <Label className='form-label' for='email'>
                    Email
                  </Label>
                  <Controller
                    id='email'
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <Input
                        type='email'
                        placeholder='john@gmail.com'
                        invalid={errors.email && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.email ? (
                    <FormFeedback>{errors.email.message}</FormFeedback>
                  ) : null}
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='password'>
                    Password
                  </Label>
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
                  {errors.password ? (
                    <FormFeedback>{errors.password.message}</FormFeedback>
                  ) : null}
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='confirm-password'>
                    Confirm Password
                  </Label>
                  <Controller
                    id='confirm-password'
                    name='passwordConfirm'
                    control={control}
                    render={({ field }) => (
                      <InputPasswordToggle
                        className='input-group-merge'
                        invalid={errors.passwordConfirm && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.passwordConfirm ? (
                    <FormFeedback>
                      {errors.passwordConfirm.message}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className='form-check mb-1'>
                  <Controller
                    name='terms'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id='terms'
                        type='checkbox'
                        checked={field.value}
                        invalid={errors.terms && true}
                      />
                    )}
                  />
                  <Label className='form-check-label' for='terms'>
                    I agree to
                    <a
                      className='ms-25'
                      href='/'
                      onClick={(e) => e.preventDefault()}
                    >
                      privacy policy & terms
                    </a>
                  </Label>
                  {errors.terms ? (
                    <FormFeedback>{errors.terms.message}</FormFeedback>
                  ) : null}
                </div>
                <Button color='primary' block disabled={submitting}>
                  {submitting ? (
                    <>
                      <Spinner
                        className='me-25 text-center'
                        color='white'
                        size='sm'
                      />
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>
              {errorMsg && (
                <p className='mt-1 text-danger text-center'>{errorMsg}</p>
              )}
              <p className='text-center mt-2'>
                <span className='me-25'>Already have an account?</span>
                <Link to='/login'>
                  <span>Sign in instead</span>
                </Link>
              </p>
              <div className='divider my-2'>
                <div className='divider-text'>or</div>
              </div>
              <div className='auth-footer-btn d-flex justify-content-center'>
                <div className='auth-footer-btn d-flex justify-content-center'>
                  <Button
                    color='google'
                    className='d-flex align-items-center justify-content-center'
                    onClick={() => {
                      handleCreateAccountWithGoogle()
                      setSubmitting(true)
                    }}
                  >
                    <h6 className='m-0 pe-1 text-white'>Google</h6>
                    <FcGoogle size={14} />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default RegisterBasic
