import React, { useState } from 'react'
import {
  FaMapMarkedAlt,
  FaRegEnvelope,
  FaPhoneAlt,
  FaClock,
} from 'react-icons/fa'
import './Contact.scss'
import { contactBanner } from '../../apps/ecommerce/home/data'
import PageBanner from '../../../@core/components/ecom/pageBanner/PageBanner'
import { Button, Form, Input, Spinner } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { createMessage } from '../../apps/messaging/store'
import { addDoc, collection } from 'firebase/firestore'
import {
  generateRandomId,
  ToastContentError,
  ToastContentSuccess,
} from '../../../utility/Utils'
import toast from 'react-hot-toast'
import { auth, db } from '../../../configs/firebase'

const defaultValues = {
  title: '',
  message: '',
  name: '',
  email: '',
}

const Contact = () => {
  const [pending, setPending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState(defaultValues)

  // ** Dispatch
  const dispatch = useDispatch()

  // ** user data
  const userData = auth.currentUser

  // Reset Error Msg
  setTimeout(() => {
    setErrorMsg('')
  }, 3000)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the form field
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPending(true)

    // Check if subject is empty
    if (!formData.title) {
      setPending(false)
      setErrorMsg('Subject of message is required!')
      return
    }

    // Check if name is empty
    if (!formData.name) {
      setPending(false)
      setErrorMsg('Name is required!')
      return
    }

    // Check if email is empty
    if (!formData.email && userData.email) {
      setPending(false)
      setErrorMsg('Email is required!')
      return
    }

    // Check if Body is empty
    if (!formData.message) {
      setPending(false)
      setErrorMsg('Write a message to send!')
      return
    }

    try {
      if (userData && userData.email) {
        console.log('userData @ Contact', userData)

        // ** If user is logged In Send as an inbox msg
        dispatch(createMessage(formData)) // Create a new message

        const generalMessagesRef = collection(db, 'generalMessages')

        // ** Write it to generalMessage
        const docRef = await addDoc(generalMessagesRef, {
          id: generateRandomId(),
          name: formData.name,
          email: formData.email,
          subject: formData.title,
          message: formData.message,
          createdAt: new Date(),
          isUserRegistered: [true, userData.id, userData.email],
        })

        setFormData(defaultValues)
        setPending(false)

        console.log('Message written with ID: ', docRef.id)
      } else {
        const generalMessagesRef = collection(db, 'generalMessages')

        const docRef = await addDoc(generalMessagesRef, {
          id: generateRandomId(),
          name: formData.name,
          email: formData.email,
          subject: formData.title,
          message: formData.message,
          createdAt: new Date(),
          isUserRegistered: [false],
        })

        toast((t) => (
          <ToastContentSuccess
            t={t}
            title='Send Message'
            msg='Message Submitted Successfully'
          />
        ))

        setFormData(defaultValues)
        setPending(false)

        console.log('Message written with ID: ', docRef.id)
      }
    } catch (error) {
      setPending(false)
      console.log('Error Submitting Message @ Contact', error)
      setErrorMsg('Error Submitting Message')

      toast((t) => (
        <ToastContentError
          t={t}
          title='Send Message'
          msg='Error Submitting Message'
        />
      ))
    }
  }
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
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d554.9225552929099!2d-0.43378874909588183!3d5.547139941652735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfbb3d5dc54ea5%3A0x8fa72c90c4cc09f2!2sKGee%20Water%20pumps%20and%20Generators!5e1!3m2!1sen!2sgh!4v1726095823978!5m2!1sen!2sgh'
            width='600'
            height='450'
            style={{ border: 0 }}
            allowFullscreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </section>

      <section className='form__details'>
        <Form onSubmit={handleSubmit}>
          <span>LEAVE MESSAGE</span>
          <h2>We love to hear from you</h2>

          <Input
            id='name'
            name='name'
            placeholder='Your Name'
            type='text'
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            id='email'
            name='email'
            placeholder='Your Email'
            type='email'
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            id='title'
            name='title'
            required
            placeholder='Subject'
            type='text'
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            id='message'
            name='message'
            required
            placeholder='Your Message'
            type='textarea'
            cols='30'
            rows='10'
            value={formData.message}
            onChange={handleChange}
          />

          <Button color='primary' disabled={pending}>
            {pending ? (
              <>
                <Spinner
                  className='me-25 text-center'
                  color='light'
                  size='sm'
                />{' '}
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>

          {errorMsg && (
            <div className='text-center mt-1'>
              <span style={{ color: 'red' }}>{errorMsg}</span>
            </div>
          )}
        </Form>
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
