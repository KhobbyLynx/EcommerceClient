import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Hero from './hero/Hero'
import './Home.scss'
import Category from './category/Category'
// import BookSlider from '../../components/bookSlider/BookSlider'

import ProductCards from '../../ecommerce/shop/ProductCards'
// import Brands from './brands/Brands'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem,
  getWishlistItems,
} from '../../ecommerce/store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'
import { getAllMessages, getNotifications } from '../../messaging/store'

const Home = () => {
  // ** States

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ecommerce)

  // ** UseEffect
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1,
      })
    )
    dispatch(getCartItems())
    dispatch(getWishlistItems())
    dispatch(getAllMessages())
    dispatch(getNotifications())
  }, [])

  const productsSetOne = store.allProducts.filter(
    (pro) => pro.featuredHomeTwo === true
  )
  const productsSetTwo = store.allProducts.filter(
    (pro) => pro.featuredHome === true
  )
  const navigate = useNavigate()

  const handleFilterChange = (value) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    navigate(`/q/${value}`)
  }

  return (
    <div className='home'>
      <div className='m-auto'>
        <Hero />
      </div>
      <div className='ps-lg-2 pe-lg-2'>
        <Category />
      </div>
      {/* <BookSlider /> */}
      <section className='products__section'>
        <div className='products__heading'>
          <h1>Smart Solutions, Smart Life | Electronics</h1>
          <p>Gadgets That Impress - New Modern Design</p>
        </div>
        <div className='product-grid '>
          <div className='ecommerce-application'>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView='grid'
              products={productsSetTwo}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />
          </div>
        </div>
      </section>

      <section className='banner__explore'>
        <h4>Water Flow, Made Simple</h4>
        <p>
          Up to <span>70% off</span> ‒ All Water Pumps
        </p>
        <button onClick={() => handleFilterChange('pumps')}>
          Explore More
        </button>
      </section>
      <section className='products__section'>
        <div className='products__heading'>
          <h1>Sole Seller | Powerful Pumps, Reliable Performance</h1>
          <p>Quality You Can Trust - Dependable Water Solutions</p>
        </div>
        <div className='product-grid'>
          <div className='ecommerce-application'>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView='grid'
              products={productsSetOne}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />
          </div>
        </div>
      </section>

      <div className='ps-lg-2 pe-lg-2'>
        <section className='big__banner'>
          <div className='banner__box'>
            <h4>P47 WIREKESS HEADSET</h4>
            <h2>Up to 20% discount</h2>
            <span>Your One-Stop Shop for Tech - Extra comfortable</span>
            <Link to='/product-detail/069CEE8D'>
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                }
              >
                Order Now!
              </button>
            </Link>
          </div>
          <div className='banner__box'>
            <h4>Future-Ready Tech</h4>
            <h2>upcoming season</h2>
            <span>Solutions That Power Your World</span>
            <button
              className='white'
              onClick={() => {
                navigate('/q/tech')
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
              }}
            >
              Explore
            </button>
          </div>
        </section>

        <section className='small__banner'>
          <div
            className='banner__box'
            onClick={() => {
              navigate('/q/seasonalsale')
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }}
          >
            <h2>SEASONAL SALE</h2>
            <h3>Winter Collection -50% OFF</h3>
          </div>
          <div
            className='banner__box'
            onClick={() => {
              navigate('/q/generators')
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }}
          >
            <h2>CALL FOR A GENERATOR NOW</h2>
            <h3>Spring/Summer 2024</h3>
          </div>
          <div
            className='banner__box'
            onClick={() => {
              navigate('/q/newrelease')
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }}
          >
            <h2>Tech</h2>
            <h3>New Tech Releases</h3>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
