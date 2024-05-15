import classnames from 'classnames'
import React from 'react'
import { Heart, ShoppingCart, Star } from 'react-feather'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, CardBody, CardText } from 'reactstrap'

const SingleProductCard = (item) => {
  const CartBtnTag = item.isInCart ? Link : 'button'
  if (item === null && item === undefined) return
  return (
    <Card className='ecommerce-card' key={item.name}>
      <div className='item-img text-center mx-auto'>
        <Link to={`/product-detail/${item.id}`}>
          <img
            className='img-fluid card-img-top'
            src={item.productImgs[0]}
            alt={item.name}
          />
        </Link>
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
          onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
        >
          <Heart
            className={classnames('me-50', {
              'text-danger': item.isInWishlist,
            })}
            size={14}
          />
          <span>Wishlist</span>
        </Button>
        <Button
          color='primary'
          tag={CartBtnTag}
          className='btn-cart move-cart'
          onClick={() => handleCartBtn(item.id, item.isInCart)}
          /*eslint-disable */
          {...(item.isInCart
            ? {
                to: '/cart',
              }
            : {})}
          /*eslint-enable */
        >
          <ShoppingCart className='me-50' size={14} />
          <span>{item.isInCart ? 'View In Cart' : 'Add To Cart'}</span>
        </Button>
      </div>
    </Card>
  )
}

export default SingleProductCard