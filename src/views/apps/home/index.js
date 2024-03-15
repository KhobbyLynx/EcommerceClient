import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Hero from './hero/Hero'
import './Home.scss'
import Category from './category/Category'
// import BookSlider from '../../components/bookSlider/BookSlider'
// import ProductCard from '../../components/products/ProductCard'
// import Brands from '../../components/brands/Brands'

const Home = () => {
  //   const products = useLoaderData()
  //   const productsSetOne = products.slice(0, 8)
  //   const productsSetTwo = products.slice(8, 16)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  //   const ProductsGridOne = productsSetOne.map((product) => {
  //     return (
  //       <div key={product._id}>
  //         <Link to={`/${product._id}`} className='product_link link'>
  //           <ProductCard {...product} />
  //         </Link>
  //       </div>
  //     )
  //   })

  //   const ProductsGridTwo = productsSetTwo.map((product) => {
  //     return (
  //       <div key={product._id}>
  //         <Link to={`/${product._id}`} className='product_link link'>
  //           <ProductCard {...product} />
  //         </Link>
  //       </div>
  //     )
  //   })

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
        {/* <div className='product-grid'>{ProductsGridOne}</div> */}
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
        {/* <div className='product-grid'>{ProductsGridTwo}</div> */}
      </section>
      {/* <Brands /> */}
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
