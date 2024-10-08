// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import { useDispatch } from 'react-redux'
import { useForm, Controller, useWatch } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from 'reactstrap'

// ** Utils
import { ToastContentError, ToastContentSuccess } from '../../../utility/Utils'

// ** Firebase imports
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../configs/firebase'

// ** Redux Imports
import { updateAddresses, updateUserName } from '../../../redux/authentication'

// ** Default Avatar
import DefaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

import toast from 'react-hot-toast'

const AccountDetails = ({ currentUser }) => {
  // ** States
  const [avatar, setAvatar] = useState(
    currentUser && currentUser.avatar ? currentUser.avatar : DefaultAvatar
  )
  const [submitting, setSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // ** Hooks
  const dispatch = useDispatch()

  const addressInfo =
    currentUser?.address?.length > 0 &&
    currentUser?.address?.find((ad) => ad.default === true)

  const defaultValues = {
    address: addressInfo?.address,
    region: addressInfo?.region,
    city: addressInfo?.city,
    digitalAddress: addressInfo?.digitalAddress,
    phone: addressInfo?.number,
    lastName: currentUser?.fullname && currentUser.fullname.split(' ')[1],
    firstName: currentUser?.fullname && currentUser.fullname.split(' ')[0],
  }

  const { control, handleSubmit, reset } = useForm({ defaultValues })

  // Watche for change in form
  const watchedValues = useWatch({ control })

  // State to track if form has changed
  const [hasChanged, setHasChanged] = useState(false)

  // Effect to check if watched values have changed from default values
  useEffect(() => {
    const isFormChanged =
      JSON.stringify(watchedValues) !== JSON.stringify(defaultValues)
    setHasChanged(isFormChanged)
    console.log('Passed User Data', currentUser)
  }, [watchedValues, defaultValues])

  // Avatar Change
  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = async (data) => {
    console.log('User Id @ Account Details', currentUser?.id)
    setSubmitting(true)

    // Custom validation
    const errors = {}
    if (!data.firstName.trim()) errors.firstName = 'First name is required'
    if (!data.lastName.trim()) errors.lastName = 'Last name is required'
    if (!/^0\d{9}$/.test(data.phone))
      errors.phone = 'Mobile number must be 10 digits starting with zero'
    if (!data.address.trim()) errors.address = 'Address is required'
    if (!data.city.trim()) errors.city = 'City is required'
    if (!data.region) errors.region = 'Region is required'
    if (
      data.digitalAddress &&
      !/^[A-Za-z]{2}-\d{3}-\d{4}$/.test(data.digitalAddress)
    )
      errors.digitalAddress =
        'Digital address must be in the format XX-000-0000'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setSubmitting(false)
      return
    }

    try {
      const {
        address,
        region = '',
        city = '',
        phone = '',
        lastName = '',
        firstName = '',
        digitalAddress = '',
      } = data

      console.log('PROFILE UPDATE DATA', currentUser)

      const userProfileRef = doc(db, 'profiles', currentUser.id)

      const docSnap = await getDoc(userProfileRef)

      if (!docSnap.exists()) {
        console.log('User Not Found! - PROFILE')
        return
      }

      console.log('PROFILE FOUND')

      // Get the existing data
      const userData = docSnap.data()

      // Updated name
      const updatedName = `${firstName.trim()} ${lastName.trim()}`

      // Only Updated the name if firstName and lastName has a value
      if (firstName || lastName) {
        // Check if the existing fullname was edited
        if (userData?.fullname !== updatedName) {
          // Update name in Database
          await updateDoc(userProfileRef, {
            ...userData,
            fullname: updatedName,
            updatedAt: new Date(),
          })

          // Update name in redux
          dispatch(updateUserName(updatedName))
        }
      }

      const exitingAddress = userData.address || []
      const defaultAddress = exitingAddress.find((ad) => ad.default === true)
      const otherAddress = exitingAddress.filter((ad) => ad.default === false)

      console.log('Default Address', defaultAddress)
      console.log('exitingAddress Address', exitingAddress)

      // New Address
      let updatedAddress
      if (defaultAddress) {
        updatedAddress = {
          ...defaultAddress,
          digitalAddress: digitalAddress
            ? digitalAddress
            : defaultAddress.digitalAddress,
          region: region ? region : defaultAddress.region,
          city: city ? city : defaultAddress.city,
          address: address ? address : defaultAddress.city,
          number: phone ? phone : defaultAddress.phone,
          updatedAt: new Date(),
        }
      } else {
        updatedAddress = {
          fullname: updatedName,
          default: true,
          digitalAddress,
          region,
          city,
          address,
          number: phone,
          createdAt: new Date(),
        }
      }

      // Update the array (add the new address)
      const updatedAddresses = [...otherAddress, updatedAddress]

      console.log('updatedAddresses', updatedAddresses)

      // Write the updated array back to Firestore
      await updateDoc(userProfileRef, { address: updatedAddresses })

      dispatch(updateAddresses(updatedAddresses))

      toast((t) => (
        <ToastContentSuccess
          t={t}
          msg='Profile Update Successfully'
          title='Success'
        />
      ))
      setSubmitting(false)
    } catch (error) {
      toast((t) => (
        <ToastContentError t={t} msg='Error Updating Profile' title='Error' />
      ))
      setSubmitting(false)
      console.log('ERROR SUBMITTING DATA', error)
    }
  }

  const handleImgReset = () => {
    setAvatar(currentUser && currentUser.avatar)
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Profile Details</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <div className='d-flex'>
            <div className='me-25'>
              <img
                className='rounded me-50'
                src={avatar}
                alt='Generic placeholder image'
                height='100'
                width='100'
              />
            </div>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <Button
                  tag={Label}
                  className='mb-75 me-75'
                  size='sm'
                  color='primary'
                >
                  Upload
                  <Input
                    type='file'
                    onChange={onChange}
                    hidden
                    accept='image/*'
                  />
                </Button>
                <Button
                  className='mb-75'
                  color='secondary'
                  size='sm'
                  outline
                  onClick={handleImgReset}
                >
                  Reset
                </Button>
                <p className='mb-0'>
                  Allowed JPG, GIF or PNG. Max size of 800kB
                </p>
              </div>
            </div>
          </div>
          <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                <Controller
                  name='firstName'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='firstName'
                      placeholder='John'
                      invalid={!!formErrors.firstName}
                      {...field}
                    />
                  )}
                />
                {formErrors.firstName && (
                  <FormFeedback>{formErrors.firstName}</FormFeedback>
                )}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='lastName'
                      placeholder='Doe'
                      invalid={!!formErrors.lastName}
                      {...field}
                    />
                  )}
                />
                {formErrors.lastName && (
                  <FormFeedback>{formErrors.lastName}</FormFeedback>
                )}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='emailInput'>
                  E-mail
                </Label>
                <Input
                  id='emailInput'
                  type='email'
                  name='email'
                  placeholder='Email'
                  defaultValue={currentUser && currentUser.email}
                  disabled
                />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='phone'>
                  Mobile Number:
                </Label>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <Input
                      type='number'
                      id='phone'
                      placeholder='023 456 7891'
                      invalid={!!formErrors.phone}
                      {...field}
                    />
                  )}
                />
                {formErrors.phone && (
                  <FormFeedback>{formErrors.phone}</FormFeedback>
                )}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='address'>
                  Address
                </Label>
                <Controller
                  name='address'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='address'
                      placeholder='Adenta, Frafraha'
                      invalid={!!formErrors.address}
                      {...field}
                    />
                  )}
                />
                {formErrors.address && (
                  <FormFeedback>{formErrors.address}</FormFeedback>
                )}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='digitalAddress'>
                  Digital Address:
                </Label>
                <Controller
                  control={control}
                  name='digitalAddress'
                  render={({ field }) => (
                    <Input
                      id='digitalAddress'
                      placeholder='XX-XXX-XXXX'
                      invalid={formErrors.digitalAddress && true}
                      {...field}
                    />
                  )}
                />
                {formErrors.digitalAddress && (
                  <FormFeedback>{formErrors.digitalAddress}</FormFeedback>
                )}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='city'>
                  City
                </Label>
                <Controller
                  name='city'
                  control={control}
                  render={({ field }) => (
                    <Input
                      id='city'
                      placeholder='Adenta'
                      invalid={formErrors.city && true}
                      {...field}
                    />
                  )}
                />
                {formErrors.city && (
                  <FormFeedback>{formErrors.city}</FormFeedback>
                )}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='add-type'>
                  Region:
                </Label>
                <Controller
                  control={control}
                  name='region'
                  render={({ field }) => (
                    <Input
                      type='select'
                      name='region'
                      id='add-type'
                      invalid={!!formErrors.region}
                      {...field}
                    >
                      <option value='' disabled>
                        Please select
                      </option>
                      <option value='253'>Ahafo</option>
                      <option value='242'>Ashanti</option>
                      <option value='251'>Bono</option>
                      <option value='252'>Bono East</option>
                      <option value='244'>Central</option>
                      <option value='245'>Eastern</option>
                      <option value='241'>Greater Accra</option>
                      <option value='254'>North East</option>
                      <option value='246'>Northern</option>
                      <option value='257'>Oti</option>
                      <option value='255'>Savannah</option>
                      <option value='248'>Upper East</option>
                      <option value='258'>Upper West</option>
                      <option value='247'>Volta</option>
                      <option value='250'>Western</option>
                      <option value='256'>Western North</option>
                    </Input>
                  )}
                />
                {formErrors.region && (
                  <FormFeedback>{formErrors.region}</FormFeedback>
                )}
              </Col>

              <Col className='mt-2' sm='12'>
                <Button
                  type='submit'
                  className='me-1'
                  color='primary'
                  disabled={!hasChanged || submitting}
                >
                  {submitting ? 'Saving...' : 'Save changes'}
                </Button>
                <Button color='secondary' outline onClick={() => reset()}>
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AccountDetails
