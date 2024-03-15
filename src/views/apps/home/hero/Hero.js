import React from 'react'
import Slider from 'react-slick'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { images } from '/src/constants'
import { featured } from '../data'
import './Hero.scss'
import { Link } from 'react-router-dom'

function NextArrow(props) {
  const { style, onClick } = props
  return (
    <div
      className='next__arrow'
      onClick={onClick}
      style={{
        ...style,
      }}
    >
      <BiChevronRight className='next__icon' />
    </div>
  )
}

function PrevArrow(props) {
  const { style, onClick } = props
  return (
    <div
      className='prev__arrow'
      onClick={onClick}
      style={{
        ...style,
      }}
    >
      <BiChevronLeft className='prev__icon' />
    </div>
  )
}

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 10000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div
        style={{
          bottom: '20px',
          right: '0px',
        }}
      >
        <ul
          style={{
            color: '#fff',
            margin: '0px',
            padding: '20px',
          }}
        >
          {dots}
        </ul>
      </div>
    ),
  }

  const featuredSlider = featured.map((feature) => (
    <div key={feature.id} className='slider'>
      <div className='hero' style={{ backgroundImage: `url(${feature.url})` }}>
        <div className='hero__content'>
          <div className='hero__text'>
            <h2>{feature.mainText}</h2>
            <h6>{feature.smallText}</h6>
          </div>
          <Link to='shop'>
            <button style={{ backgroundImage: `url(${images.buttonImg})` }}>
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  ))

  return (
    <>
      <div>
        <Slider {...settings}>{featuredSlider}</Slider>
      </div>
    </>
  )
}

export default Hero
