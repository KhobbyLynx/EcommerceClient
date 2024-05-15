import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Hero from './hero/Hero'
import './Home.scss'
import Category from './category/Category'
// import BookSlider from '../../components/bookSlider/BookSlider'

import ProductCards from '../ecommerce/shop/ProductCards'
import Brands from './brands/Brands'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem,
} from '../ecommerce/store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'
import SingleProductCard from '../ecommerce/shop/SingleProductCard'

const Home = () => {
  // ** States

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ecommerce)

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1,
      })
    )
  }, [dispatch])

  const productsSetOne = store.allProducts.filter(
    (pro) => pro.featuredHomeTwo === true
  )
  const productsSetTwo = store.allProducts.filter(
    (pro) => pro.featuredHome === true
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const handleFilterChange = (key, value) => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, 800)
    if (searchParams === '') {
      if (searchParams.has(key)) {
        searchParams.delete(key)
        setSearchParams(searchParams)
      }
    } else {
      navigate(`/shop?${key}=${value}`)
    }
  }

  return (
    <div className='home'>
      <Hero />
      <Category />
      {/* <BookSlider /> */}
      <section className='products__section'>
        <div className='products__heading'>
          <h1>Latest Trends and Styles | Fashion</h1>
          <p>Summer Collections - New Modern Design</p>
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
        <h4>Evolution Of Fashion</h4>
        <p>
          Up to <span>70% off</span> ‒ All t-Shirts & Accessories
        </p>
        <button onClick={() => handleFilterChange('q', 't-Shirt&accessories')}>
          Explore More
        </button>
      </section>
      <section className='products__section'>
        <div className='products__heading'>
          <h1>Best Sellers | Collections</h1>
          <p>There’s Something Here for Everyone - No Matter Your Style</p>
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
      <Brands />
      <section className='big__banner'>
        <div className='banner__box'>
          <h4>crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>The best classic dress is on sale at LynxMart</span>
          <button className='white'>Learn More</button>
        </div>
        <div className='banner__box'>
          <h4>spring/summer</h4>
          <h2>upcoming season</h2>
          <span>The best classic Rollex is on sale at LynxMart</span>
          <button className='white'>Collections</button>
        </div>
      </section>

      <section className='small__banner'>
        <div className='banner__box'>
          <h2>SEASONAL SALE</h2>
          <h3>Winter Collection -50% OFF</h3>
        </div>
        <div className='banner__box'>
          <h2>NEW FOOTWEAR COLLECTION</h2>
          <h3>Spring/Summer 2023</h3>
        </div>
        <div className='banner__box'>
          <h2>Tech</h2>
          <h3>New Tech Releases</h3>
        </div>
      </section>
    </div>
  )
}

export default Home
