import React from 'react'
import { SiFacebook, SiTwitter, SiInstagram, SiTiktok } from 'react-icons/si'
import './Footer.scss'
import { images } from '/src/constants'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Footer = () => {
  // User From Redux
  const userData = useSelector((state) => state.auth.userData)

  const accountLinks =
    userData && userData?.id
      ? ['View Cart', 'My Wishlist', 'Track My Order', 'Help']
      : ['Sign In', 'Register', 'Help']

  const aboutLinks = [
    'About Us',
    'Contact Us',
    'Devlivery Information',
    'Privacy Policy',
    'Terms & Conditions',
  ]
  const linkToRouteMap = {
    'About Us': '/about',
    'Delivery Information': '',
    'Privacy Policy': '',
    'Terms & Conditions': '',
    'Contact Us': '/contact',
    'Sign In': '/login',
    'View Cart': '/cart',
    'My Wishlist': '/wishlist',
    'Track My Order': '',
    Help: '',
    Register: '/register',
  }

  return (
    <div className='footer'>
      <div className='footer__logo'>
        <Link
          to='/home'
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        >
          <img src='logo.svg' alt='lynx logo' />
        </Link>
      </div>
      <div className='footer__content'>
        <div className='footer__contact'>
          <div className='contact__section'>
            <h2>Contact</h2>
            <div className='contact__info'>
              <span className='span'>Address: 562 Oxford Street, Osu</span>
              <span className='span'>Phone: +01 2222 365</span>
              <span className='span'>Hours: 10:00 - 18:00, Mon - Sat</span>
            </div>
          </div>
          <div className='socials__section'>
            <h2>Join Us On</h2>
            <div className='social__icons'>
              <SiFacebook className='icon' />
              <SiTwitter className='icon' />
              <SiInstagram className='icon' />
              <SiTiktok className='icon' />
            </div>
          </div>
        </div>
        <div className='footer__links'>
          <div className='footer__about'>
            <h2>About</h2>
            {aboutLinks.map((link) => {
              return (
                <Link
                  className='link span'
                  key={link}
                  to={linkToRouteMap[link]}
                  onClick={() =>
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                  }
                >
                  {link}
                </Link>
              )
            })}
          </div>
          <div className='footer__account'>
            <h2>My Account</h2>
            {accountLinks.map((link) => {
              return (
                <Link
                  className='link span'
                  key={link}
                  to={linkToRouteMap[link]}
                  onClick={() =>
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                  }
                >
                  {link}
                </Link>
              )
            })}
          </div>
        </div>
        <div className='footer__others'>
          <h2>App Coming Soon</h2>
          <div className='mobile__app'>
            <h6>On App Store and Google Play</h6>
            <div className='app__store'>
              <img src={images.app} alt='App Store' />
              <img src={images.play} alt='Google Play' />
            </div>
          </div>
          <div className='payment__gateways'>
            <h6>Secured Payment Gateways</h6>
            <img
              src={images.pay}
              alt='payment gateways'
              style={{ height: '40px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
