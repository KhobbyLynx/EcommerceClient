import React from 'react'
import './PageBanner.scss'

const PageBanner = ({ title, subText, bgImg }) => {
  const styles = {
    backgroundImage: `linear-gradient(rgba(0,0,0, 0.6), rgba(0,0,0,0.6)), url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  return (
    <div className='page__banner' style={styles}>
      <h2>{title}</h2>
      <p>{subText}</p>
    </div>
  )
}

export default PageBanner
