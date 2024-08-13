// ** React Imports
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import toast from 'react-hot-toast'

// ** Icons
import { Star, ShoppingCart, Heart } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

// ** Redux Imports
import { fetchBrands } from '../store'

// ** Utils
import { GeneralToastContent, getUserData } from '../../../../utility/Utils'

const ProductCards = (props) => {
  // ** Props
  const {
    store,
    products,
    dispatch,
    addToCart,
    activeView,
    getProducts,
    getCartItems,
    addToWishlist,
    deleteWishlistItem,
  } = props

  // ** Hooks
  const navigate = useNavigate()

  // ** UseEffect
  useEffect(() => {
    dispatch(fetchBrands())
  }, [])

  // ** Check if user is logged in
  const user = getUserData()

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (!user) {
      toast((t) => (
        <GeneralToastContent
          t={t}
          icon='Cart'
          title='Cart'
          msg='Log In or Sign up an account before adding product to Cart'
        />
      ))
      navigate('/login')
      return
    }
    if (val === false || val === undefined) {
      dispatch(addToCart(id))
    }
    dispatch(getCartItems())
    dispatch(getProducts(store.params))
  }

  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (!user) {
      toast((t) => (
        <GeneralToastContent
          t={t}
          title='Wishlist'
          msg='Log In or Sign up an account before adding product to Wishlist'
        />
      ))
      navigate('/login')
      return
    }
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getProducts(store.params))
  }

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map((item) => {
        // ** Get brand image
        const brandDetails = store?.brands?.find(
          (brand) => brand.name === item.brand
        )
        // ** Check if item is in cart & wishlist
        const inCart = store.cart?.some((pro) => pro.id === item.id)

        const inWishlist = store.wishlist?.some((pro) => pro.id === item.id)

        const CartBtnTag = inCart ? Link : 'button'

        // ** Quantity check
        const isOutOfStock = item.quantity <= 0
        return (
          <Card
            className={`ecommerce-card   ${isOutOfStock ? 'outofStock' : ''}`}
            key={item.id}
            onClick={() => {
              const anchor = document.querySelector('body')
              if (anchor) {
                anchor.scrollIntoView({ behavior: 'smooth' })
              }
              navigate(`/product-detail/${item.id}`)
            }}
          >
            <div className='item-img text-center mx-auto soldout-container'>
              <div className='pro-image'>
                <img
                  className='img-fluid card-img-top'
                  src={item.productImgs[0]}
                  alt={item.name}
                />
                {isOutOfStock && (
                  <img
                    src='https://res.cloudinary.com/khobbylynx/image/upload/v1723336382/soldout_e6jcfk.png'
                    alt='Out of Stock'
                    className='soldout-image'
                  />
                )}
                <div className='item-brand'>
                  {brandDetails?.logo ? (
                    <img
                      src={brandDetails?.logo}
                      alt=''
                      className='item-brandImg'
                    />
                  ) : (
                    <h6 className='item-brandName'>{item.brand}</h6>
                  )}
                </div>
                {item.discounted && (
                  <div className='item-discount'>
                    <h6 className='item-discountText'>
                      {item.discounted === 'percent'
                        ? `-${item.discount}%`
                        : `-$${item.discount}`}
                    </h6>
                  </div>
                )}
              </div>
            </div>
            <CardBody>
              <div className='item-wrapper'>
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
                <div className='item-cost'>
                  <h6 className='item-price'>${item.salePrice}</h6>
                </div>
              </div>
              <h6 className='item-name'>
                <Link className='text-body' to={`/product-detail/${item.id}`}>
                  {item.name}
                </Link>
                <CardText tag='span' className='item-company'>
                  By{' '}
                  <a
                    className='company-name'
                    href='/'
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.brand}
                  </a>
                </CardText>
              </h6>
              <CardText className='item-description'>{item.desc}</CardText>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>${item.salePrice}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                className='btn-wishlist'
                color='light'
                onClick={(e) => {
                  e.stopPropagation()
                  handleWishlistClick(item.id, inWishlist)
                }}
              >
                <Heart
                  className={classnames('me-50', {
                    'text-danger': inWishlist,
                  })}
                  size={14}
                />
                <span>Wishlist</span>
              </Button>
              <Button
                color='primary'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={(e) => {
                  e.stopPropagation()
                  handleCartBtn(item.id, inCart)
                }}
                /*eslint-disable */
                {...(inCart
                  ? {
                      to: '/cart',
                    }
                  : {})}
                /*eslint-enable */
              >
                <ShoppingCart className='me-50' size={14} />
                <span>{inCart ? 'View In Cart' : 'Add To Cart'}</span>
              </Button>
            </div>
          </Card>
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list',
        // 'grid-view': activeView === undefined,
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default ProductCards
