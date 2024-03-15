// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Custom Components
import InputPassword from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Button } from 'reactstrap'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/reset-password-v2.svg'
import illustrationsDark from '@src/assets/images/pages/reset-password-v2-dark.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import themeConfig from '../../../configs/themeConfig'

const ResetPasswordCover = () => {
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
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Reset Password 🔒
            </CardTitle>
            <CardText className='mb-2'>
              Your new password must be different from previously used passwords
            </CardText>
            <Form
              className='auth-reset-password-form mt-2'
              onSubmit={(e) => e.preventDefault()}
            >
              <div className='mb-1'>
                <Label className='form-label' for='new-password'>
                  New Password
                </Label>
                <InputPassword
                  className='input-group-merge'
                  id='new-password'
                  autoFocus
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='confirm-password'>
                  Confirm Password
                </Label>
                <InputPassword
                  className='input-group-merge'
                  id='confirm-password'
                />
              </div>
              <Button color='primary' block>
                Set New Password
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/pages/login-cover'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ResetPasswordCover
