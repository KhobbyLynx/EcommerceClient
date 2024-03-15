// ** React Imports
import { Link } from 'react-router-dom'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Custom Components
import InputPassword from '@components/input-password-toggle'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Button,
} from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import themeConfig from '../../../configs/themeConfig'

const ResetPasswordBasic = () => {
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
              <Link to='/pages/login-basic'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ResetPasswordBasic
