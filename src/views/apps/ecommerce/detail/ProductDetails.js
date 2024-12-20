// ** React Imports
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap'
import { useSelector } from 'react-redux/es'
import { fetchBrands } from '../store'
import SwiperGallery from './Swiper'

const Product = (props) => {
  // ** Props
  const {
    data,
    deleteWishlistItem,
    dispatch,
    addToWishlist,
    getProduct,
    productId,
    addToCart,
  } = props

  // ** State

  // ** Hooks
  const store = useSelector((state) => state.ecommerce)

  useEffect(() => {
    dispatch(getProduct(productId))
    dispatch(fetchBrands())
  }, [dispatch, productId])

  // ** Check if item is in cart & wishlist
  const inCart = store.cart?.some((pro) => pro.id === data.id)
  const inWishlist = store.wishlist?.some((pro) => pro.id === data.id)

  // ** Handle Wishlist item toggle
  const handleWishlist = (val) => {
    if (val) {
      dispatch(deleteWishlistItem(productId))
    } else {
      dispatch(addToWishlist(productId))
    }
    dispatch(getProduct(productId))
  }

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false || val === 'undefined') {
      dispatch(addToCart(id))
    }
    dispatch(getProduct(productId))
  }

  // ** Condition btn tag
  const CartBtnTag = inCart ? Link : 'button'

  return (
    <Row className='my-2'>
      <Col
        className='d-flex align-items-center justify-content-center mb-2 mb-md-0'
        md='5'
        xs='12'
      >
        <SwiperGallery productImgs={data.productImgs} />
      </Col>
      <Col md='7' xs='12'>
        <h4>{data.name}</h4>
        <h6 tag='span' className='item-company'>
          By
          <a
            className='company-name'
            href='/'
            onClick={(e) => e.preventDefault()}
          >
            {data.brand}
          </a>
        </h6>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price me-1'>${data.salePrice}</h4>
          <ul className='unstyled-list list-inline'>
            {new Array(5).fill().map((listItem, index) => {
              return (
                <li key={index} className='ratings-list-item me-25'>
                  <Star
                    className={classnames({
                      'filled-star': index + 1 <= data.rating,
                      'unfilled-star': index + 1 > data.rating,
                    })}
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <h6>
          Available -<span className='text-success ms-25'>In stock</span>
        </h6>
        <h6>{data.desc}</h6>
        <ul className='product-features list-unstyled'>
          {data.hasFreeShipping ? (
            <li>
              <ShoppingCart size={19} />
              <span>Free Shipping</span>
            </li>
          ) : null}
        </ul>
        <hr />
        {data?.details?.length > 0 && (
          <div className='product-details'>
            <h6 className='fw-bold'>SPECIFICATIONS</h6>
            <ul>
              {data.details.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
            <hr />
          </div>
        )}

        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button
            tag={CartBtnTag}
            className='btn-cart me-0 me-sm-1 mb-1 mb-sm-0'
            color='primary'
            onClick={() => handleCartBtn(data.id, inCart)}
            /*eslint-disable */
            {...(inCart
              ? {
                  to: '/cart',
                }
              : {})}
            /*eslint-enable */
          >
            <ShoppingCart className='me-50' size={14} />
            {inCart ? 'View in cart' : 'Move to cart'}
          </Button>
          <Button
            className='btn-wishlist me-0 me-sm-1 mb-1 mb-sm-0'
            color='secondary'
            outline
            onClick={() => handleWishlist(inWishlist)}
          >
            <Heart
              size={14}
              className={classnames('me-50', {
                'text-danger': inWishlist,
              })}
            />
            <span>Wishlist</span>
          </Button>
          <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
            <DropdownToggle
              className='btn-icon hide-arrow'
              color='secondary'
              caret
              outline
            >
              <Share2 size={14} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag='a'
                href='/'
                onClick={(e) => e.preventDefault()}
              >
                <Facebook size={14} />
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                onClick={(e) => e.preventDefault()}
              >
                <Twitter size={14} />
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                onClick={(e) => e.preventDefault()}
              >
                <Youtube size={14} />
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                onClick={(e) => e.preventDefault()}
              >
                <Instagram size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </Col>
    </Row>
  )
}

export default Product
