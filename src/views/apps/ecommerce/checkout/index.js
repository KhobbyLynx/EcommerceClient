// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import BreadCrumbs from '@components/breadcrumbs'

// ** Steps
import Cart from './steps/Cart'
import Address from './steps/Address'
import Payment from './steps/Payment'
import Delivery from './steps/Delivery'

// ** Third Party Components
import { ShoppingCart, Home, CreditCard } from 'react-feather'
import { TbTruckDelivery } from 'react-icons/tb'
import { IoArrowBackSharp } from 'react-icons/io5'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getCartItems,
  deleteCartItem,
  deleteWishlistItem,
  addToWishlist,
} from '../store'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { Button } from 'reactstrap'

const Checkout = () => {
  // ** Ref & State
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)

  /// Will navigate to the second step

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ecommerce)

  // ** Get Cart Items on mount
  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  const steps = [
    {
      id: 'Cart',
      title: 'Cart',
      subtitle: 'Your Cart Items',
      icon: <ShoppingCart size={18} />,
      content: (
        <Cart
          stepper={stepper}
          dispatch={dispatch}
          products={store.cart}
          store={store}
          getCartItems={getCartItems}
          addToWishlist={addToWishlist}
          deleteCartItem={deleteCartItem}
          deleteWishlistItem={deleteWishlistItem}
        />
      ),
    },
    {
      id: 'Address',
      title: 'Address',
      subtitle: 'Enter Your Address',
      icon: <Home size={18} />,
      content: <Address stepper={stepper} />,
    },
    {
      id: 'Delivery',
      title: 'Delivery',
      subtitle: 'Delivery Details',
      icon: <TbTruckDelivery size={18} />,
      content: <Delivery stepper={stepper} store={store} />,
    },
    {
      id: 'Payment',
      title: 'Payment',
      subtitle: 'Select Payment Method',
      icon: <CreditCard size={18} />,
      content: <Payment stepper={stepper} store={store} />,
    },
  ]

  console.log('STEPPER', stepper)

  const handleBackStepper = () => {
    stepper.to(stepper._currentIndex)
  }

  return (
    <Fragment>
      <BreadCrumbs
        title='Checkout'
        data={[{ title: 'eCommerce' }, { title: 'Checkout' }]}
      />
      <Button
        outline
        color='dark'
        className='mb-2'
        onClick={() => handleBackStepper()}
      >
        <IoArrowBackSharp size={18} /> <span>Back</span>
      </Button>
      <Wizard
        ref={ref}
        steps={steps}
        className='checkout-tab-steps'
        instance={(el) => setStepper(el)}
        options={{
          linear: false,
        }}
      />
    </Fragment>
  )
}

export default Checkout
