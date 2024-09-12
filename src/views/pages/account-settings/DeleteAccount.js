// ** Reactstrap Imports
import {
  Card,
  Button,
  CardHeader,
  CardTitle,
  CardBody,
  Alert,
  Form,
  Input,
  Label,
  FormFeedback,
  Spinner,
} from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Styles
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import { deleteUser, getAuth, onAuthStateChanged } from 'firebase/auth'
// import { auth } from '../../../configs/firebase'
import toast from 'react-hot-toast'
import {
  logoutFirebase,
  ToastContentError,
  ToastContentSuccess,
} from '../../../utility/Utils'
import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../configs/firebase'

const defaultValues = {
  confirmCheckbox: false,
}

const MySwal = withReactContent(Swal)

const DeleteAccount = () => {
  const [pending, setPending] = useState(false)
  const navigate = useNavigate()

  const auth = getAuth()

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    const user = auth.currentUser

    console.log('User @ Delete Account', user)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User @ Delete Account', user)
        // User is signed in
      } else {
        console.log('No user is signed in')
        // No user is signed in
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const firebaseDeleteAccount = async () => {
    const user = auth.currentUser

    console.log('User @ Delete Account', user)
    if (user) {
      try {
        // Delete user dataset
        const userRef = doc(db, 'profiles', user.uid)
        const notificationRef = doc(db, 'notifications', user.uid)
        const cartRef = doc(db, 'cart', user.uid)
        const Wishlist = doc(db, 'wishlist', user.uid)
        const orders = doc(db, 'orders', user.uid)
        const messaging = doc(db, 'messaging', user.uid)

        localStorage.removeItem('userData')

        deleteDoc(userRef)
        deleteDoc(notificationRef)
        deleteDoc(cartRef)
        deleteDoc(Wishlist)
        deleteDoc(orders)
        deleteDoc(messaging)

        await deleteUser(user)

        logoutFirebase()

        navigate('/home')
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

        toast((t) => (
          <ToastContentSuccess
            t={t}
            title='Deactivate Account'
            msg='Your account has been deactivated.'
          />
        ))
      } catch (error) {
        console.log('Error Deleting Account', error)

        toast((t) => (
          <ToastContentError
            t={t}
            title='Deactivate Account'
            msg='Error Deactivating Account'
          />
        ))
      } finally {
        setPending(false)
      }
    } else {
      setPending(false)
      console.log('User not found')

      toast((t) => (
        <ToastContentError
          t={t}
          title='Deactivate Account'
          msg='Error Deactivating Account'
        />
      ))
    }
  }

  const handleConfirmDelete = () => {
    setPending(true)

    return MySwal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you would like to deactivate your account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-danger outline',
        cancelButton: 'btn btn-primary  ms-1',
      },
      buttonsStyling: false,
    }).then(async function (result) {
      if (result.value) {
        // Run delete function
        await firebaseDeleteAccount()

        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your account has been deactivated.',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Deactivation Cancelled!!',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })

        setPending(false)
      }
    })
  }

  const onSubmit = (data) => {
    if (data.confirmCheckbox === true) {
      handleConfirmDelete()
    } else {
      setError('confirmCheckbox', { type: 'manual' })
    }
  }

  return (
    <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Delete Account</CardTitle>
      </CardHeader>
      <CardBody className='py-2 my-25'>
        <Alert color='warning'>
          <h4 className='alert-heading'>
            Are you sure you want to delete your account?
          </h4>
          <div className='alert-body fw-normal'>
            Once you delete your account, there is no going back. Please be
            certain.
          </div>
        </Alert>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-check'>
            <Controller
              control={control}
              name='confirmCheckbox'
              render={({ field }) => (
                <Input
                  {...field}
                  type='checkbox'
                  id='confirmCheckbox'
                  checked={field.value}
                  invalid={errors.confirmCheckbox && true}
                />
              )}
            />
            <Label
              for='confirmCheckbox'
              className={classnames('form-check-label', {
                'text-danger': errors && errors.confirmCheckbox,
              })}
            >
              I confirm my account deactivation
            </Label>
            {errors && errors.confirmCheckbox && (
              <FormFeedback>
                Please confirm that you want to delete account
              </FormFeedback>
            )}
          </div>
          <div className='mt-1'>
            <Button color='danger'>
              {pending ? (
                <>
                  <Spinner
                    className='me-25 text-center'
                    color='white'
                    size='sm'
                  />{' '}
                  Loading...
                </>
              ) : (
                'Deactivate Account'
              )}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default DeleteAccount
