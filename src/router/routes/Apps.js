// ** React Imports
import { lazy } from 'react'

const Home = lazy(() => import('../../views/apps/home'))
const About = lazy(() => import('../../views/pages/about/About'))
const Contact = lazy(() => import('../../views/pages/contact/Contact'))

const CustomShop = lazy(() => import('../../views/apps/ecommerce/customShop'))
const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceWishlist = lazy(() =>
  import('../../views/apps/ecommerce/wishlist')
)
const EcommerceCheckout = lazy(() =>
  import('../../views/apps/ecommerce/checkout')
)

const AppRoutes = [
  {
    element: <Home />,
    path: '/home',
    meta: {
      publicRoute: true,
    },
  },
  {
    element: <EcommerceWishlist />,
    path: '/wishlist',
    meta: {
      publicRoute: true,
      className: 'ecommerce-application',
    },
  },
  {
    path: '/product-detail/:product',
    element: <EcommerceDetail />,
    meta: {
      publicRoute: true,
      className: 'ecommerce-application',
    },
  },
  {
    path: '/cart',
    element: <EcommerceCheckout />,
    meta: {
      publicRoute: true,
      className: 'ecommerce-application',
    },
  },

  {
    path: '/about',
    element: <About />,
    meta: {
      publicRoute: true,
    },
  },
  {
    path: '/contact',
    element: <Contact />,
    meta: {
      publicRoute: true,
    },
  },
  {
    element: <EcommerceShop />,
    path: '/shop',
    meta: {
      className: 'ecommerce-application',
      publicRoute: true,
    },
  },
  {
    element: <CustomShop />,
    path: '/generators',
    meta: {
      className: 'ecommerce-application',
      publicRoute: true,
    },
  },
  {
    element: <CustomShop />,
    path: '/pumps',
    meta: {
      className: 'ecommerce-application',
      publicRoute: true,
    },
  },
]

export default AppRoutes
