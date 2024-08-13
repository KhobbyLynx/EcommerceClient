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
} from 'reactstrap'
import { ghanaRegions } from '../../../../../utility/Utils'

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
              <li className='py-50'>
                <div className='form-check'>
                  <Input
                    type='radio'
                    name='deliveryMethod'
                    id='door-delivery'
                  />
                  <Label className='form-label' for='door-delivery'>
                    Door Delivery
                  </Label>
                </div>
              </li>
              <li className='py-50'>
                <div className='form-check'>
                  <Input type='radio' name='deliveryMethod' id='pick-up' />
                  <Label className='form-label' for='pick-up'>
                    Pickup at Nearest Store
                  </Label>
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
