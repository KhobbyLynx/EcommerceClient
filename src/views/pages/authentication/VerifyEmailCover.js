// ** React Imports
import { Link } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Button } from 'reactstrap'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/verify-email-illustration.svg'
import illustrationsDark from '@src/assets/images/pages/verify-email-illustration-dark.svg'

// ** Styles
import '@styles/base/pages/authentication.scss'
import themeConfig from '../../../configs/themeConfig'

const VerifyEmailCover = () => {
  // ** Hooks
  const { skin } = useSkin()

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={(e) => e.preventDefault()}>
          <img
            src={themeConfig.app.appLogoImage}
            alt=''
            style={{ maxWidth: '36px', maxHeight: '32px' }}
          />
          <h2 className='brand-text text-primary ms-1'>
            {themeConfig.app.appName}
          </h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col
          className='d-flex align-items-center auth-bg px-2 p-lg-5'
          lg='4'
          sm='12'
        >
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bolder mb-1'>
              Verify your email ✉️
            </CardTitle>
            <CardText className='mb-2'>
              We've sent a link to your email address:{' '}
              <span className='fw-bolder'>hello@pixinvent.com</span> Please
              follow the link inside to continue.
            </CardText>
            <Button block tag={Link} to='/' color='primary'>
              Skip for now
            </Button>
            <p className='text-center mt-2'>
              <span>Didn't receive an email? </span>
              <a href='/' onClick={(e) => e.preventDefault()}>
                <span>Resend</span>
              </a>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default VerifyEmailCover
