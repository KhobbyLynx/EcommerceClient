// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Star } from 'react-feather'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// ** Reactstrap Imports
import { CardText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/swiper/swiper.scss'
import { getProducts } from '../store'
import { Link } from 'react-router-dom'

const RelatedProducts = ({ store, dispatch }) => {
  // ** UseEffect
  useEffect(() => {
    if (store.allProducts.length === 0) {
      dispatch(
        getProducts({
          q: '',
          sortBy: 'featured',
          perPage: 9,
          page: 1,
        })
      )
    }
  }, [])
  // ** Get Related Products
  let displayedRelatedProducts = []

  const relatedSubCategoryProducts = store.allProducts.filter(
    (product) =>
      product.subCategory === store.productDetail.subCategory &&
      product.id !== store.productDetail.id
  )

  if (relatedSubCategoryProducts.length >= 5) {
    displayedRelatedProducts = relatedSubCategoryProducts.slice(0, 5)
  } else {
    displayedRelatedProducts = [...relatedSubCategoryProducts]

    const relatedCategoryProducts = store.allProducts.filter(
      (product) =>
        product.category === store.productDetail.category &&
        product.id !== store.productDetail.id
    )

    const additionalProductsNeeded = 5 - relatedSubCategoryProducts.length

    const additionalProducts = relatedCategoryProducts.filter(
      (product) => !displayedRelatedProducts.includes(product)
    )

    displayedRelatedProducts = displayedRelatedProducts.concat(
      additionalProducts.slice(0, additionalProductsNeeded)
    )
  }

  SwiperCore.use([Navigation])

  // ** Slider params
  const params = {
    className: 'swiper-responsive-breakpoints swiper-container px-4 py-2',
    slidesPerView: 5,
    spaceBetween: 55,
    navigation: true,
    breakpoints: {
      1600: {
        slidesPerView: 4,
        spaceBetween: 55,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 55,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 55,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 55,
      },
    },
  }

  return (
    <Fragment>
      <div className='mt-4 mb-2 text-center'>
        <h4>Related Products</h4>
        <CardText>People also search for this items</CardText>
      </div>
      <Swiper {...params}>
        {displayedRelatedProducts.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <Link
                to={`/product-detail/${product.id}`}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                }}
              >
                <div className='item-heading'>
                  <h5 className='text-truncate mb-0'>{product.name}</h5>
                  <small className='text-body'>by {product.brand}</small>
                </div>
                <div className='img-container w-50 mx-auto py-75'>
                  <img
                    src={product?.productImgs[0]}
                    alt={product.name}
                    className='img-fluid relatedProduct-img'
                  />
                </div>
                <div className='item-meta'>
                  <ul className='unstyled-list list-inline mb-25'>
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className='ratings-list-item me-25'>
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= product.rating,
                              'unfilled-star': index + 1 > product.rating,
                            })}
                          />
                        </li>
                      )
                    })}
                  </ul>
                  <CardText className='text-primary mb-0'>
                    ${product.salePrice}
                  </CardText>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Fragment>
  )
}

export default RelatedProducts
