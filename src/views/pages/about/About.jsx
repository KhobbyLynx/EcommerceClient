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
          src='https://res.cloudinary.com/khobbylynx/image/upload/v1726188945/ABOUTIMAGE_plkuzy.jpg'
          alt=''
        />
        <div className='about__details'>
          <h2>Why Choose Us</h2>
          <p>
            Welcome to Lynx, your one-stop destination for top-quality
            electronics and appliances! We specialize in offering a wide range
            of products, including the latest televisions, fridges, mobile
            phones, generators, and water pumps. Whether you’re upgrading your
            home appliances or looking for cutting-edge electronics, we have
            something to meet your needs. At Lynx, we are committed to providing
            high-quality products at competitive prices. Our carefully curated
            selection ensures that you get the best brands, advanced technology,
            and reliable performance in every product. With a focus on customer
            satisfaction, we offer a seamless shopping experience, from browsing
            to delivery, with fast and efficient service. Thank you for choosing
            Lynx —we’re here to make your life easier and more connected through
            technology and innovation.
          </p>
          <br />
          <br />
          <marquee bgcolor='#000' loop='-1' scrollamount='5' width='100%'>
            <p className='text-primary'>
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
