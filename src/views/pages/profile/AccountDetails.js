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
import { getUserId, ToastContentSuccess } from '../../../utility/Utils'

// ** Firebase imports
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../configs/firebase'

// ** Redux Imports
import { updateAddresses, updateUserName } from '../../../redux/authentication'

// ** React Hook Form
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'

const AccountDetails = ({ data }) => {
  // ** States
  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')
  const [submitting, setSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // ** Hooks
  const dispatch = useDispatch()

  const addressInfo =
    data.address.length > 0 && data.address.find((ad) => ad.default === true)

  // const profileSchema = yup.object().shape({
  //   firstName: yup.string().required('First name is required'),
  //   lastName: yup.string().required('Last name is required'),
  //   phone: yup
  //     .string()
  //     .required('Mobile Number is required')
  //     .matches(
  //       /^0\d{9}$/,
  //       'Mobile number must be 10 digits starting with zero eg. 0234567891'
  //     ),
  //   addressInfo: yup.string().required('Address is required'),
  //   city: yup.string().required('City is required'),
  //   region: yup
  //     .string()
  //     .required('Region is required')
  //     .oneOf(
  //       [
  //         '253',
  //         '242',
  //         '251',
  //         '252',
  //         '244',
  //         '245',
  //         '241',
  //         '254',
  //         '246',
  //         '257',
  //         '255',
  //         '248',
  //         '258',
  //         '247',
  //         '250',
  //         '256',
  //       ],
  //       'Please select a valid region'
  //     ),
  //   digitalAddress: yup
  //     .string()
  //     .notRequired()
  //     .nullable()
  //     .test(
  //       'matches-regex',
  //       'Digital address must be in the format XX-000-0000',
  //       (value) => {
  //         // If the value is empty or null, skip validation
  //         if (!value) return true
  //         // Otherwise, validate against regex pattern
  //         return /^[A-Za-z]{2}-\d{3}-\d{4}$/.test(value)
  //       }
  //     ),
  // })

  // ** Hooks
  const defaultValues = {
    address: addressInfo?.address,
    region: addressInfo?.region,
    city: addressInfo?.city,
    digitalAddress: addressInfo?.digitalAddress,
    phone: addressInfo?.number,
    lastName: data.fullname && data.fullname.split(' ')[1],
    firstName: data.fullname && data.fullname.split(' ')[0],
  }

  const { control, handleSubmit, reset } = useForm({ defaultValues })

  // Watche for change in form
  const watchedValues = useWatch({ control })

  // State to track if form has changed
  const [hasChanged, setHasChanged] = useState(false)

  console.log('WATCH', hasChanged, watchedValues)

  // Effect to check if watched values have changed from default values
  useEffect(() => {
    const isFormChanged =
      JSON.stringify(watchedValues) !== JSON.stringify(defaultValues)
    setHasChanged(isFormChanged)
    console.log('WATCH IN', hasChanged, watchedValues)
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
    console.log('PROFILE DATA', data)
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
        region,
        city,
        phone,
        lastName,
        firstName,
        digitalAddress,
      } = data
      const userId = getUserId()
      const userProfileRef = doc(db, 'profiles', userId)

      const docSnap = await getDoc(userProfileRef)

      if (!docSnap.exists()) {
        console.log('User Not Found! - PROFILE')
        return
      }
      // Updated name
      const updatedName = `${firstName.trim()} ${lastName.trim()}`

      // Get the existing data
      const userData = docSnap.data()
      const exitingAddress = userData.address || []

      // Update name in Database
      await updateDoc(userProfileRef, {
        ...userData,
        fullname: updatedName,
        updatedAt: new Date(),
      })

      // Update name in redux
      dispatch(updateUserName(updatedName))

      const defaultAddress = exitingAddress.find((ad) => ad.default === true)
      const otherAddress = exitingAddress.filter((ad) => ad.default === false)

      // New Address
      const updatedAddress = {
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

      // Update the array (add the new address)
      const updatedAddresses = [...otherAddress, updatedAddress]

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
    setAvatar(data.avatar)
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
                  defaultValue={data.email}
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
