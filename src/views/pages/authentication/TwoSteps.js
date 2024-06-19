// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
  Input,
} from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import themeConfig from '../../../configs/themeConfig'

const TwoStepsBasic = () => {
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
            <CardTitle tag='h2' className='fw-bolder mb-1'>
              Two Step Verification 💬
            </CardTitle>
            <CardText className='mb-75'>
              We sent a verification code to your mobile. Enter the code from
              the mobile in the field below.
            </CardText>
            <CardText className='fw-bolder mb-2'>******0789</CardText>
            <Form className='mt-2' onSubmit={(e) => e.preventDefault()}>
              <h6>Type your 6 digit security code</h6>
              <div className='auth-input-wrapper d-flex align-items-center justify-content-between'>
                <Input
                  autoFocus
                  maxLength='1'
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                />
                <Input
                  maxLength='1'
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                />
                <Input
                  maxLength='1'
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                />
                <Input
                  maxLength='1'
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                />
                <Input
                  maxLength='1'
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                />
                <Input
                  maxLength='1'
                  className='auth-input height-50 text-center numeral-mask mx-25 mb-1'
                />
              </div>
            </Form>
            <Button block tag={Link} to='/' color='primary'>
              Sign in
            </Button>
            <p className='text-center mt-2'>
              <span>Didn’t get the code?</span>{' '}
              <a href='/' onClick={(e) => e.preventDefault()}>
                Resend
              </a>{' '}
              <span>or</span>{' '}
              <a href='/' onClick={(e) => e.preventDefault()}>
                Call us
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default TwoStepsBasic
