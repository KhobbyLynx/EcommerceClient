import { handlePaymentRequest } from '../../../../../utility/api/requestFunctions'
import { images } from '/src/constants'

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
  Alert,
} from 'reactstrap'

const Payment = ({ store }) => {
  return (
    <>
      <Form
        className='list-view product-checkout'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className='payment-type'>
          <Card>
            <CardHeader className='flex-column align-items-start'>
              <CardTitle tag='h4'>Payment options</CardTitle>
              <CardText className='text-muted mt-25'>
                Be sure to click on correct payment option
              </CardText>
            </CardHeader>
            <CardBody>
              <ul className='other-payment-options list-unstyled'>
                <li className='py-50'>
                  <div className='form-check'>
                    <Input
                      type='radio'
                      name='paymentMethod'
                      id='mobile-money'
                    />
                    <Label className='form-label fw-bold' for='mobile-money'>
                      Mobile Money
                    </Label>
                  </div>
                </li>
                <li className='py-50'>
                  <div className='form-check'>
                    <Input type='radio' name='paymentMethod' id='credit-card' />
                    <Label className='form-label fw-bold' for='credit-card'>
                      Credit / Debit Card
                    </Label>
                  </div>
                </li>
                <li className='py-50'>
                  <div>
                    <div className='form-check'>
                      <Input
                        type='radio'
                        name='paymentMethod'
                        id='payment-cod'
                      />
                      <Label className='form-label fw-bold' for='payment-cod'>
                        Cash On Delivery
                      </Label>
                      <Alert color='info'>
                        <div className='alert-body'>
                          <span>
                            20% advance payment required before processing cash
                            on delivery orders.
                          </span>
                        </div>
                      </Alert>
                    </div>
                  </div>
                </li>
              </ul>
              <hr className='my-2' />
              <div className='mb-25'>
                <img src={images.pay} alt='' />
              </div>
            </CardBody>
          </Card>
        </div>
        {!!store && (
          <div className='amount-payable checkout-options'>
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
                  <Button
                    block
                    color='primary'
                    classnames='btn-next place-order'
                    onClick={(e) => {
                      e.preventDefault()
                      handlePaymentRequest(store.overallTotal)
                    }}
                  >
                    Confirm Order
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </Form>
    </>
  )
}

export default Payment
