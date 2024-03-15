import React from 'react'
import './About.scss'

import PageBanner from '../../../@core/components/ecom/pageBanner/PageBanner'
import FeatureCard from '../../../@core/components/ecom/feature/FeatureCard'
import { aboutBanner, features } from '../../apps/home/data'

const About = () => {
  const Features = features.map((feature) => {
    return <FeatureCard key={feature.id} {...feature} />
  })
  return (
    <div className='about__page'>
      <PageBanner {...aboutBanner} />
      <section className='about__banner'>
        <img
          src='https://res.cloudinary.com/khobbylynx/image/upload/v1683975686/lynxmart/img/about/a6_m4jfkj.jpg'
          alt=''
        />
        <div className='about__details'>
          <h2>Who We Are?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod iusto
            est Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Temporibus, fugiat. explicabo. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quis ipsum excepturi cumque tempora
            fugiat atque. Possimus incidunt culpa magnam quod?Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Omnis voluptates, sunt
            voluptatum nam aspernatur eaque voluptatem ullam? Aperiam, voluptate
            dolorem.
          </p>
          <abbr title=''>
            Create stunning images with as much or as little control as you like
            thanks to a choice of Basic and Creative modes.
          </abbr>
          <br />
          <br />
          <marquee bgcolor='#ccc' loop='-1' scrollamount='5' width='100%'>
            Create stunning images with as much or as little control as you like
            thanks to a choice of Basic and Creative modes.
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
