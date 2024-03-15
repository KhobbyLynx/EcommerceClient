// ** React Imports
import { Fragment } from 'react'

// ** Demo Components
import PaymentMethods from './PaymentMethods'
import BillingAddress from './BillingAddress'
import OrderHistory from './OrderHistory'

const BillingTabContent = () => {
  return (
    <Fragment>
      <PaymentMethods />
      <BillingAddress />
      <OrderHistory />
    </Fragment>
  )
}

export default BillingTabContent
