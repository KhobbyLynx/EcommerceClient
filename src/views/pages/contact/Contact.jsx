import React from 'react'
import {
  FaMapMarkedAlt,
  FaRegEnvelope,
  FaPhoneAlt,
  FaClock,
} from 'react-icons/fa'
import './Contact.scss'
import { contactBanner } from '../../apps/home/data'
import PageBanner from '../../../@core/components/ecom/pageBanner/PageBanner'

const Contact = () => {
  return (
    <div className='contact__section'>
      <PageBanner {...contactBanner} />
      <section className='contact__details'>
        <div className='details'>
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency locations or contact us today</h2>
          <h3>Head Office</h3>
          <div className='info__cards'>
            <div className='info__card'>
              <FaMapMarkedAlt className='icon' />
              <p>56 Glassford Street Glasgow G1 1UL New York</p>
            </div>
            <div className='info__card'>
              <FaRegEnvelope className='icon' />
              <p>contact@example.com</p>
            </div>
            <div className='info__card'>
              <FaPhoneAlt className='icon' />
              <p>contact@example.com</p>
            </div>
            <div className='info__card'>
              <FaClock className='icon' />
              <p>Monday to Saturday: 9.00am to 16.00am</p>
            </div>
          </div>
        </div>
        <div className='map'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.1756884000256!2d-71.09634868526435!3d42.36009494309324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e370aaf51a6a87%3A0xd0e08ea5b308203c!2sMassachusetts%20Institute%20of%20Technology!5e0!3m2!1sen!2sgh!4v1671415491775!5m2!1sen!2sgh'
            width='600'
            height='450'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </section>

      <section className='form__details'>
        <form>
          <span>LEAVE MESSAGE</span>
          <h2>We love to hear from you</h2>
          <input type='text' placeholder='Your Name' />
          <input type='text' placeholder='E-mail' />
          <input type='text' placeholder='Subject' />
          <textarea
            name=''
            id=''
            cols='30'
            rows='10'
            placeholder='Your Message'
          ></textarea>
          <button>Submit</button>
        </form>
        <div className='admins__cards'>
          <div className='admins__card'>
            <img
              src='https://res.cloudinary.com/khobbylynx/image/upload/v1683975701/lynxmart/img/people/img_luxrba.jpg'
              alt=''
            />
            <p>
              <span className='admin__name'>Samuel Tetteh</span>CEO
              <br />
              Phone: +24 6314183 <br />
              Email: khobbylynx55@gmail.com
            </p>
          </div>
          <div className='admins__card'>
            <img
              src='https://res.cloudinary.com/khobbylynx/image/upload/v1683975753/lynxmart/img/people/3_dlh6wn.png'
              alt=''
            />
            <p>
              <span>Jane Smith </span>HR
              <br />
              Phone: +324 85917976 <br />
              Email: contact@example.com
            </p>
          </div>
          <div className='admins__card'>
            <img
              src='https://res.cloudinary.com/khobbylynx/image/upload/v1683975749/lynxmart/img/people/2_o0slte.png'
              alt=''
            />
            <p>
              <span>Emma Stone</span>Senior Marketing Manager
              <br />
              Phone: +324 85917976 <br />
              Email: contact@example.com
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
