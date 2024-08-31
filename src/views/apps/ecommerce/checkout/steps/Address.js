// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Reactstrap Imports
import {
  Form,
  Input,
  Card,
  Label,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
  FormFeedback,
  Badge,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  generateRandomId,
  getUserId,
  ghanaRegions,
} from '../../../../../utility/Utils'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../configs/firebase'

// ** Icons
import { MdDelete, MdEdit } from 'react-icons/md'
import ConfirmationModal from '../ConfirmationModal'
import { useState } from 'react'
import { updateAddresses } from '../../../../../redux/authentication'
import { selectDeliveryAddress } from '../../store'

const defaultValues = {
  receiverName: '',
  city: '',
  phone: '',
  addressInfo: '',
  digitalAddress: '',
  region: '',
}

const AddressSchema = yup.object().shape({
  receiverName: yup
    .string()
    .required("Enter Receiver's name, required for verification"),
  phone: yup
    .string()
    .required('Mobile Number is required')
    .matches(
      /^0\d{9}$/,
      'Mobile number must be 10 digits starting with zero eg. 0234567891'
    ),
  addressInfo: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  region: yup
    .string()
    .required('Region is required')
    .oneOf(
      [
        '253',
        '242',
        '251',
        '252',
        '244',
        '245',
        '241',
        '254',
        '246',
        '257',
        '255',
        '248',
        '258',
        '247',
        '250',
        '256',
      ],
      'Please select a valid region'
    ),
  digitalAddress: yup
    .string()
    .notRequired()
    .nullable()
    .test(
      'matches-regex',
      'Digital address must be in the format XX-000-0000',
      (value) => {
        // If the value is empty or null, skip validation
        if (!value) return true
        // Otherwise, validate against regex pattern
        return /^[A-Za-z]{2}-\d{3}-\d{4}$/.test(value)
      }
    ),
})

const Address = (props) => {
  // ** Props
  const { stepper } = props

  // ** States
  const [modal, setModal] = useState(false)
  const [addressId, setAddressId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const userData = useSelector((state) => state.auth.userData)
  console.log('ERRRH', userData)

  // ** Hooks
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(AddressSchema) })

  // ** On form submit if there are no errors then go to next step
  const onSubmit = async (data) => {
    setSubmitting(true)

    const { receiverName, city, phone, addressInfo, digitalAddress, region } =
      data
    const newAddress = {
      id: generateRandomId(),
      address: addressInfo,
      region,
      city,
      number: phone,
      receiverName,
      digitalAddress,
      default: false,
    }

    try {
      const userId = getUserId()
      const userProfileRef = doc(db, 'profiles', userId)

      const docSnap = await getDoc(userProfileRef)

      if (!docSnap.exists()) {
        console.log('No such document, Address!')
        return
      }

      // Get the existing data
      const data = docSnap.data()
      const address = data.address || []

      // Update the array (add the new address)
      const updatedAddresses = [...address, newAddress]

      // Write the updated array back to Firestore
      await updateDoc(userProfileRef, { address: updatedAddresses })

      dispatch(updateAddresses(updatedAddresses))

      // Set delivery address to redux
      dispatch(selectDeliveryAddress(newAddress))

      stepper.next()
      setSubmitting(false)
    } catch (error) {
      setSubmitting(false)
      console.log('Error Adding Address', error)
      throw error
    }
  }

  const handleDeleteAddress = async (addressId) => {
    const userId = getUserId()
    const userProfileRef = doc(db, 'profiles', userId)

    try {
      // Fetch document
      const docSnap = await getDoc(userProfileRef)

      if (!docSnap.exists()) {
        console.log('No such document!')
        return
      }

      // Get the existing data
      const data = docSnap.data()
      const address = data.address || []

      // Filter out the address to remove
      const updatedAddresses = address.filter((ad) => ad.id !== addressId)

      // Write the updated array back to Firestore
      await updateDoc(userProfileRef, { address: updatedAddresses })

      dispatch(updateAddresses(updatedAddresses))

      console.log('Document successfully updated!')
    } catch (error) {
      console.error('Error updating document: ', error)
      throw error
    }
  }

  // ** Select Delivery Address
  const handleSelectAddress = (ad) => {
    const receiverName = ad.default ? userData.fullname : ad.receiverName

    const selAddress = {
      ...ad,
      receiverName,
    }

    // Set delivery address to redux
    dispatch(selectDeliveryAddress(selAddress))
    stepper.next()
  }

  const openModal = (id) => {
    setModal(true)
    setAddressId(id)
  }
  const handleEditAddress = async (id) => {}
  return (
    <>
      <Form
        className='list-view product-checkout'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader className='flex-column align-items-start'>
            <CardTitle tag='h4'>Add New Address</CardTitle>
            <CardText className='text-muted mt-25'>
              Be sure to check "Deliver to this address" when you have finished
            </CardText>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md='6' sm='12'>
                <div className='mb-2'>
                  <Label className='form-label' for='receiverName'>
                    Receiver's Name:
                  </Label>
                  <Controller
                    control={control}
                    name='receiverName'
                    render={({ field }) => (
                      <Input
                        id='receiverName'
                        placeholder='John Doe'
                        invalid={!!errors.receiverName}
                        {...field}
                      />
                    )}
                  />
                  {errors.receiverName ? (
                    <FormFeedback>{errors.receiverName.message}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-2'>
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
                        placeholder='0234567891'
                        invalid={!!errors.phone}
                        {...field}
                      />
                    )}
                  />
                  {errors.phone ? (
                    <FormFeedback>{errors.phone.message}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-2'>
                  <Label className='form-label' for='addressInfo'>
                    Address:
                  </Label>
                  <Controller
                    control={control}
                    name='addressInfo'
                    render={({ field }) => (
                      <Input
                        id='addressInfo'
                        placeholder='eg. Madina, Atomic'
                        invalid={!!errors.addressInfo}
                        {...field}
                      />
                    )}
                  />
                  {errors.addressInfo ? (
                    <FormFeedback>{errors.addressInfo.message}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-2'>
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
                        invalid={errors.digitalAddress && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.digitalAddress ? (
                    <FormFeedback>{errors.digitalAddress.message}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-2'>
                  <Label className='form-label' for='city'>
                    City:
                  </Label>
                  <Controller
                    control={control}
                    name='city'
                    render={({ field }) => (
                      <Input
                        id='city'
                        placeholder='Los Angeles'
                        invalid={!!errors.city}
                        {...field}
                      />
                    )}
                  />
                  {errors.city ? (
                    <FormFeedback>{errors.city.message}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-2'>
                  <Label className='form-label' for='add-type'>
                    Region:
                  </Label>
                  <Controller
                    control={control}
                    name='region'
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        type='select'
                        name='region'
                        id='add-type'
                        invalid={!!errors.region}
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
                  {errors.region ? (
                    <FormFeedback>{errors.region.message}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm='12'>
                <Button
                  type='submit'
                  className='btn-next delivery-address'
                  color='primary'
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : ` Save And Deliver Here`}
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <div className='customer-card'>
          {userData.address?.length > 0 &&
            userData.address.map((ad) => (
              <Card>
                <CardHeader>
                  <CardTitle tag='h4'>
                    {ad.default ? (
                      <>
                        {userData.fullname}
                        <Badge color='light-primary' className='ms-1  fs-6'>
                          default
                        </Badge>
                      </>
                    ) : (
                      ad.receiverName
                    )}
                  </CardTitle>
                  <div>
                    <MdEdit size={24} onClick={handleEditAddress} />{' '}
                    {!ad.default && (
                      <MdDelete
                        size={24}
                        color='#ce3b30'
                        onClick={() => openModal(ad.id)}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardBody>
                  <CardText className='mb-0'>{ad.address}</CardText>
                  <CardText>{ad.city}</CardText>
                  <CardText>{ad.digitalAddress}</CardText>
                  <CardText>{ghanaRegions[ad.region]}</CardText>
                  <CardText>{ad.number}</CardText>
                  <Button
                    block
                    type='button'
                    color='primary'
                    onClick={() => handleSelectAddress(ad)}
                    className='btn-next delivery-address mt-2'
                  >
                    Deliver To This Address
                  </Button>
                </CardBody>
              </Card>
            ))}
        </div>
        <ConfirmationModal
          modal={modal}
          setModal={setModal}
          id={addressId}
          title='Confirm'
          msg='Do you want to Delete address'
          btnText1='Cancel'
          btnText2='Delete'
          modalColor='modal-danger'
          btnColor='danger'
          confirmFunction={handleDeleteAddress}
        />
      </Form>
    </>
  )
}

export default Address
