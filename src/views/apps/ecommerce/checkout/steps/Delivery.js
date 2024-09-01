// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Badge,
  FormFeedback,
  Alert,
} from 'reactstrap'
import { ghanaRegions } from '../../../../../utility/Utils'
import { AlertCircle } from 'react-feather'

const Payment = ({ stepper, store }) => {
  return (
    <Form
      className='list-view product-checkout'
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className='payment-type'>
        <Card>
          <CardHeader className='flex-column align-items-start'>
            <CardTitle tag='h4'>Delivery options</CardTitle>
            <CardText className='text-muted mt-25'>
              Be sure about delivery option
            </CardText>
          </CardHeader>
          <CardBody>
            <ul className='other-payment-options list-unstyled'>
              {store.selectedAddress.region === '241' ? (
                <li className='py-50'>
                  <div className='form-check'>
                    <Input
                      type='radio'
                      name='deliveryMethod'
                      id='door-delivery'
                      disable={store.selectedAddress.digitalAddress === ''}
                    />
                    <Label className='form-label' for='door-delivery'>
                      <p className='h5'>Door Delivery</p>
                    </Label>
                    <Alert color='info'>
                      <div className='alert-body'>
                        <span className='fw-bold'>
                          Items will be sent to your provided Digital Address
                        </span>
                      </div>
                    </Alert>
                    {store.selectedAddress.digitalAddress === '' && (
                      <div className='mb-2'>
                        <Label for='digitalAddress'>
                          <p className='h6'>Digital Address:</p>
                        </Label>
                        <Input
                          type='text '
                          id='digitalAddress'
                          placeholder='XX-XXX-XXXX'
                        ></Input>
                        <FormFeedback>'error msg'</FormFeedback>
                      </div>
                    )}
                  </div>
                </li>
              ) : (
                <Alert color='danger'>
                  <div className='alert-body'>
                    <AlertCircle size={15} />{' '}
                    <span className='fw-bold'>
                      Door Delivery Only within Greater Accra
                    </span>
                  </div>
                </Alert>
              )}
              <li className='py-50'>
                <div className='form-check'>
                  <Input type='radio' name='deliveryMethod' id='pick-up' />
                  <Label className='form-label' for='pick-up'>
                    <p className='h5'>Pickup at Nearest Store</p>
                  </Label>
                  <Alert color='info'>
                    <div className='alert-body'>
                      <span className='fw-bold'>
                        Order will be processed at the pick-up store{' '}
                      </span>
                    </div>
                  </Alert>
                  <div>
                    <Label className='form-label' for='pick-up'>
                      <p className='h6'>Select Pick-up Store:</p>
                    </Label>
                    <Input type='select' name='pick-up' id='pick-up'>
                      <option value='' disabled>
                        Please select
                      </option>
                      <option value='253'>Kasoa - New Markek Road</option>
                      <option value='242'>Madina - Zongo Junction</option>
                      <option value='251'>Kumasi - Central Market</option>
                      <option value='252'>Osu - Oxford Street</option>
                      <option value='244'>Circle - Odo Rice</option>
                      <option value='245'>Winneba - Winnesec</option>
                      <option value='241'>Accra - Kanta</option>
                    </Input>
                  </div>
                </div>
              </li>
            </ul>
            <Button
              block
              color='primary'
              onClick={() => stepper.next()}
              classnames='btn-next place-order'
            >
              Proceed
            </Button>
          </CardBody>
        </Card>
      </div>
      {!!store && (
        <div className='amount-payable checkout-options'>
          {Object.keys(store.selectedAddress).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>
                  {store.selectedAddress.receiverName}
                </CardTitle>
                <Badge color='light-primary' className='ms-1  fs-6'>
                  Delivery Address
                </Badge>
              </CardHeader>
              <CardBody>
                <CardText className='mb-0'>
                  {store.selectedAddress.address}
                </CardText>
                <CardText>{store.selectedAddress.city}</CardText>
                <CardText>{store.selectedAddress.digitalAddress}</CardText>
                <CardText>
                  {ghanaRegions[store.selectedAddress.region]}
                </CardText>
                <CardText>{store.selectedAddress.number}</CardText>
              </CardBody>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Price Details</CardTitle>
            </CardHeader>
            <CardBody>
              <div className='price-details'>
                <ul className='list-unstyled'>
                  <li className='price-detail'>
                    <div className='detail-title'>Price of Items</div>
                    <div className='detail-amt'>
                      $
                      {store.totalAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </li>
                  {store.couponDiscount > 0 && (
                    <li className='price-detail'>
                      <div className='detail-title'>Coupon Discount</div>
                      <div className='detail-amt discount-amt '>
                        $
                        {store.couponDiscount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </li>
                  )}
                  {store.discount > 0 && (
                    <li className='price-detail'>
                      <div className='detail-title'>Discount</div>
                      <div className='detail-amt discount-amt '>
                        $
                        {store.discount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </li>
                  )}
                  <li className='price-detail'>
                    <div className='detail-title'>Delivery Charges</div>
                    {store.deliveryCharges > 0 ? (
                      <div className='detail-amt '>
                        $
                        {store.deliveryCharges.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    ) : (
                      <div className='detail-amt discount-amt text-success'>
                        Free
                      </div>
                    )}
                  </li>
                  {store.savedOnDelivery > 0 && (
                    <li className='price-detail'>
                      <div className='detail-title'>Free Delivery</div>
                      <div className='detail-amt '>
                        - $
                        {store.savedOnDelivery.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </li>
                  )}
                </ul>
                <hr />
                <ul className='list-unstyled'>
                  <li className='price-detail'>
                    <div className='detail-title detail-total'>
                      Amount Payable
                    </div>
                    <div className='detail-amt fw-bolder text-success'>
                      $
                      {store.overallTotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </Form>
  )
}

export default Payment
