// ** React Imports
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Third Party Components
import { Home, User, CreditCard } from 'react-feather'

// ** Steps
import Billing from './steps/Billing'
import PersonalInfo from './steps/PersonalInfo'
import AccountDetails from './steps/AccountDetails'

// ** Image Imports
import source from '@src/assets/images/pages/create-account.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import themeConfig from '../../../../configs/themeConfig'

const RegisterMultiSteps = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Account',
      subtitle: 'Enter username',
      icon: <Home size={18} />,
      content: <AccountDetails stepper={stepper} />,
    },
    {
      id: 'personal-info',
      title: 'Personal',
      subtitle: 'Enter Information',
      icon: <User size={18} />,
      content: <PersonalInfo stepper={stepper} />,
    },
    {
      title: 'Billing',
      id: 'step-billing',
      subtitle: 'Payment Details',
      icon: <CreditCard size={18} />,
      content: <Billing stepper={stepper} />,
    },
  ]

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
          <img
            src={themeConfig.app.appLogoImage}
            alt=''
            style={{ maxWidth: '36px', maxHeight: '32px' }}
          />
          <h2 className='brand-text text-primary ms-1'>
            {themeConfig.app.appName}
          </h2>
        </Link>
        <Col lg='3' className='d-none d-lg-flex align-items-center p-0'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center'>
            <img className='img-fluid w-100' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col
          lg='9'
          className='d-flex align-items-center auth-bg px-2 px-sm-3 px-lg-5 pt-3'
        >
          <div className='width-700 mx-auto'>
            <Wizard
              ref={ref}
              steps={steps}
              headerClassName='px-0'
              instance={(el) => setStepper(el)}
              contentWrapperClassName='px-0 mt-4'
              className='register-multi-steps-wizard shadow-none'
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default RegisterMultiSteps
