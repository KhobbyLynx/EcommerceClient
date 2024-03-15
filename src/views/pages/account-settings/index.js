// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import BillingTabContent from './BillingTabContent'
import SecurityTabContent from './SecurityTabContent'
import NotificationsTabContent from './NotificationsTabContent'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <Fragment>
      <Breadcrumbs title='Settings' data={[{ title: 'Account Settings' }]} />
      <Row>
        <Col xs={12}>
          <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <SecurityTabContent />
            </TabPane>
            <TabPane tabId='2'>
              <BillingTabContent />
            </TabPane>
            <TabPane tabId='3'>
              <NotificationsTabContent />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  )
}

export default AccountSettings
