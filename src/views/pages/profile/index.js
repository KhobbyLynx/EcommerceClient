// ** Reactstrap Imports
import { Col, Row } from 'reactstrap'

// ** Components
import Breadcrumbs from '@components/breadcrumbs'
import AccountDetails from './AccountDetails'
import OrderHistory from './OrderHistory'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import { useSelector } from 'react-redux'

const AccountSettings = () => {
  // ** States
  const currentUser = useSelector((state) => state.auth.userData)

  return (
    <>
      <Breadcrumbs
        title='Profile Settings'
        data={[{ title: 'User Details' }]}
      />
      <Row>
        <Col xs={12}>
          <AccountDetails data={currentUser} />
          <OrderHistory />
        </Col>
      </Row>
    </>
  )
}

export default AccountSettings
