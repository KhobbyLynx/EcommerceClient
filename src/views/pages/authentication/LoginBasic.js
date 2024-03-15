// ** React Imports
import { Link } from 'react-router-dom'

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from 'reactstrap'
import themeConfig from '../../../configs/themeConfig'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const LoginBasic = () => {
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link
              className='brand-logo'
              to='/'
              onClick={(e) => e.preventDefault()}
            >
              <img
                src={themeConfig.app.appLogoImage}
                alt=''
                style={{ maxWidth: '36px', maxHeight: '32px' }}
              />
              <h2 className='brand-text text-primary ms-1'>
                {themeConfig.app.appName}
              </h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Welcome to {themeConfig.app.appName}! 👋
            </CardTitle>
            <CardText className='mb-2'>
              Please sign-in to your account and start the adventure
            </CardText>
            <Form
              className='auth-login-form mt-2'
              onSubmit={(e) => e.preventDefault()}
            >
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  type='email'
                  id='login-email'
                  placeholder='john@example.com'
                  autoFocus
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/pages/forgot-password-basic'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className='input-group-merge'
                  id='login-password'
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button color='primary' block>
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/pages/register-basic'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginBasic
