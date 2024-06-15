import React from 'react'
import './Newsletter.scss'

const Newsletter = () => {
  return (
    <div
      className='newsletter'
      style={{
        backgroundImage: `url('https://res.cloudinary.com/khobbylynx/image/upload/v1683975707/lynxmart/img/banner/b14_h4wojg.png')`,
      }}
    >
      <div className='newstext'>
        <h4>Sign Up For Newletters</h4>
        <p>
          Get E-mail updates about our lastest products and
          <span>special offers.</span>
        </p>
      </div>
      <div className='form'>
        <input type='email' placeholder='Enter your email address' />
        <button>Sign Up</button>
      </div>
    </div>
  )
}

export default Newsletter
