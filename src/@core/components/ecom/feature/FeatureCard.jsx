import React from 'react'
import './FeatureCard.scss'

const FeatureCard = ({ url, title }) => {
  return (
    <section className='feature__card'>
      <div className='feature__box'>
        <img src={url} alt='feature image' />
        <h6 className='bg-secondary text-black'>{title}</h6>
      </div>
    </section>
  )
}

export default FeatureCard
