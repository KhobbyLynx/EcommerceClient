// ** React Imports
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import InputNumber from 'rc-input-number'
import { X, Heart, Star, Plus, Minus } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  Button,
  Badge,
  InputGroup,
  Input,
  InputGroupText,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/input-number/input-number.scss'
import { getUserData } from '../../../../../utility/Utils'

const Cart = (props) => {
  // ** Props
  const {
    products,
    stepper,
    deleteCartItem,
    dispatch,
    addToWishlist,
    deleteWishlistItem,
    getCartItems,
  } = props

  // ** States
  const [coupon, setCoupon] = useState('')
  const [validCoupon, setValidCoupon] = useState('')

  const handleInputChange = (e) => {
    setCoupon(e.target.value.toUpperCase().trim())
  }

  // ** Hooks
  const navigate = useNavigate()

  // ** Function to convert Date
  // const formatDate = (
  //   value,
  //   formatting = { month: 'short', day: 'numeric', year: 'numeric' }
  // ) => {
  //   if (!value) return value
  //   return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  // }
  // ** Functions
  const handleCheckout = () => {
    const user = getUserData()
    if (!user) {
      navigate('/login')
    } else {
      stepper.next()
    }
  }

  const handleWishlistClick = (id, val) => {
    const user = getUserData()
    if (!user) {
      navigate('/login')
      return
    }
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getCartItems())
  }

  const handleApplyCoupon = (coupon) => {
    if (coupon === '') return
    setValidCoupon(coupon)
    setCoupon('')
    console.log('@Coupon', coupon)
  }

  // ** Render cart items
  const renderCart = () => {
    return products.map((item) => {
      // ** Available Offers
      let availableOffers = 0

      if (item.quantity <= 3) {
        availableOffers = item.quantity
      } else {
        availableOffers = Math.ceil(item.quantity / 4)
      }

      // ** Image check
      const hasImages =
        Array.isArray(item.productImgs) && item.productImgs.length > 0

      return (
        <Card key={item.name} className='ecommerce-card'>
          <div className='item-img'>
            {hasImages && (
              <Link to={`/product-detail/${item.id}`}>
                <img
                  className='img-fluid'
                  src={item.productImgs[0]}
                  alt={item.name}
                />
              </Link>
            )}
          </div>
          <CardBody>
            <div className='item-name'>
              <h6 className='mb-0'>
                <Link to={`/product-detail/${item.id}`}>{item.name}</Link>
              </h6>
              <span className='item-company'>
                By
                <a
                  className='ms-25'
                  href='/'
                  onClick={(e) => e.preventDefault()}
                >
                  {item.brand}
                </a>
              </span>
              <div className='item-rating'>
                <ul className='unstyled-list list-inline'>
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className='ratings-list-item me-25'>
                        <Star
                          className={classnames({
                            'filled-star': index + 1 <= item.rating,
                            'unfilled-star': index + 1 > item.rating,
                          })}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <span className='text-success mb-1'>In Stock</span>
            <div className='item-quantity'>
              <span className='quantity-title me-50'>Qty</span>
              <InputNumber
                min={1}
                max={10}
                upHandler={<Plus />}
                className='cart-input'
                defaultValue={item.quantity}
                downHandler={<Minus />}
              />
            </div>
            {/* <div className='delivery-date text-muted'>
              Delivery by, {formatDate(item.shippingDate)}
            </div> */}
            {item.discounted && item.discount > 0 && (
              <span className='text-success'>
                {item.discount}% off {availableOffers} offers Available
              </span>
            )}
          </CardBody>
          <div className='item-options text-center'>
            <div className='item-wrapper'>
              <div className='item-cost'>
                <h4 className='item-price'>${item.salePrice}</h4>
                {item.hasFreeShipping ? (
                  <CardText className='shipping'>
                    <Badge color='light-success' pill>
                      Free Shipping
                    </Badge>
                  </CardText>
                ) : null}
              </div>
            </div>
            <Button
              className='mt-1 remove-wishlist'
              color='light'
              onClick={() => {
                dispatch(deleteCartItem(item.id))
              }}
            >
              <X size={14} className='me-25' />
              <span>Remove</span>
            </Button>
            <Button
              className='btn-cart'
              color='primary'
              onClick={(e) => {
                e.stopPropagation()
                handleWishlistClick(item.id, item.isInWishlist)
              }}
            >
              <Heart
                size={14}
                className={classnames('me-25', {
                  'fill-current': item.isInWishlist,
                })}
              />
              <span className='text-truncate'>Wishlist</span>
            </Button>
          </div>
        </Card>
      )
    })
  }

  return (
    <div className='list-view product-checkout'>
      <div className='checkout-items'>
        {products.length ? renderCart() : <h4>Your cart is empty</h4>}
      </div>
      <div className='checkout-options'>
        <Card>
          <CardBody>
            <label className='section-label mb-1'>Options</label>
            {!validCoupon && (
              <InputGroup className='input-group-merge coupons'>
                <Input
                  type='text'
                  placeholder='Coupons'
                  value={coupon}
                  onChange={handleInputChange}
                />
                <InputGroupText
                  className='text-primary ms-0 cursor-pointer'
                  onClick={() => handleApplyCoupon(coupon)}
                >
                  Apply
                </InputGroupText>
              </InputGroup>
            )}
            {validCoupon && (
              <div className='d-flex align-item-center justify-content-center'>
                <CardText className='text-dark me-auto'>{validCoupon}</CardText>
                <X
                  size={20}
                  className='ms-25 text-danger cursor-pointer'
                  onClick={() => setValidCoupon('')}
                />
              </div>
            )}
            <hr />
            <div className='price-details'>
              <h6 className='price-title'>Price Details</h6>
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title'>Product Cost</div>
                  <div className='detail-amt'>$598</div>
                </li>
                {validCoupon && (
                  <li className='price-detail'>
                    <div className='detail-title'>Coupon Discount</div>
                    <div className='detail-amt discount-amt text-success'>
                      -132$
                    </div>
                  </li>
                )}
                {
                  <li className='price-detail'>
                    <div className='detail-title'>Discount</div>
                    <div className='detail-amt discount-amt text-success'>
                      -25$
                    </div>
                  </li>
                }
                <li className='price-detail'>
                  <div className='detail-title'>Delivery Charges</div>
                  {false && <div className='detail-amt'>$10.3</div>}
                  <div className='detail-amt discount-amt text-success'>
                    Free
                  </div>
                </li>
              </ul>
              <hr />
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title detail-total'>Total</div>
                  <div className='detail-amt fw-bolder'>$574</div>
                </li>
              </ul>
              <Button
                block
                color='primary'
                disabled={!products.length}
                onClick={() => handleCheckout()}
                classnames='btn-next place-order'
              >
                Place Order
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Cart
