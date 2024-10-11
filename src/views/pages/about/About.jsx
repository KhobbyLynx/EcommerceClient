import React from 'react'
import './About.scss'

import PageBanner from '../../../@core/components/ecom/pageBanner/PageBanner'
import FeatureCard from '../../../@core/components/ecom/feature/FeatureCard'
import { aboutBanner, features } from '../../apps/ecommerce/home/data'

const About = () => {
  const Features = features.map((feature) => {
    return <FeatureCard key={feature.id} {...feature} />
  })
  return (
    <div className='about__page'>
      <PageBanner {...aboutBanner} />
      <section className='about__banner'>
        <img
          src='https://res.cloudinary.com/khobbylynx/image/upload/v1726239540/umps._T_ad948z.png'
          alt=''
        />
        <div className='about__details'>
          <h2>Why Choose Us</h2>
          <p>
            Welcome to Lynx, your one-stop destination for top-quality
            electronics and appliances! We specialize in offering a wide range
            of products, including the latest televisions, fridges, mobile
            phones, generators, and water pumps. At Lynx, we are committed to
            providing high-quality products at competitive prices. With a focus
            on customer satisfaction, we offer a seamless shopping experience,
            from browsing to delivery, with fast and efficient service. Thank
            you for choosing Lynx —we’re here to make your life easier and more
            connected through technology and innovation.
          </p>
          <marquee
            bgcolor='#000'
            loop='-1'
            scrollamount='5'
            width='100%'
            className='m-0'
          >
            <p className='text-primary m-1'>
              Exclusive Deals on TVs, Fridges, Phones, Generators, and Water
              Pumps – Shop Now! --- Unbeatable Prices on the Latest Electronics
              & Appliances – Fast Delivery Guaranteed!
            </p>
          </marquee>
        </div>
      </section>
      <div className='features__grid'>{Features}</div>
      <section className='about__app'>
        <h1>
          Download Our <a href='#'>App</a>
        </h1>
        <div className='video__box'>
          <video
            autoPlay
            muted
            loop
            src='https://res.cloudinary.com/khobbylynx/video/upload/v1683975757/lynxmart/img/about/1_xpd6zv.mp4'
          ></video>
        </div>
      </section>
    </div>
  )
}

export default About
