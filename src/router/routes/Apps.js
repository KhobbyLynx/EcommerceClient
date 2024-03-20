// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import('../../views/apps/home'))
const BlogList = lazy(() => import('../../views/pages/blog/list'))
const BlogDetails = lazy(() => import('../../views/pages/blog/details'))
const About = lazy(() => import('../../views/pages/about/About'))
const Contact = lazy(() => import('../../views/pages/contact/Contact'))
const Faq = lazy(() => import('../../views/pages/faq'))
const Inbox = lazy(() => import('../../views/apps/email'))
const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
const Profile = lazy(() => import('../../views/pages/profile'))

const Todo = lazy(() => import('../../views/apps/todo'))
const Chat = lazy(() => import('../../views/apps/chat'))
const Email = lazy(() => import('../../views/apps/email'))
const Kanban = lazy(() => import('../../views/apps/kanban'))
const Calendar = lazy(() => import('../../views/apps/calendar'))

const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceWishlist = lazy(() =>
  import('../../views/apps/ecommerce/wishlist')
)
const EcommerceCheckout = lazy(() =>
  import('../../views/apps/ecommerce/checkout')
)

const UserList = lazy(() => import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))

const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() =>
  import('../../views/apps/roles-permissions/permissions')
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
    path: '/product-detail',
    element: <Navigate to='/product-detail/apple-i-phone-11-64-gb-black-26' />,
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
    path: '/blog',
    element: <BlogList />,
    meta: {
      publicRoute: true,
    },
  },
  {
    path: '/blog/detail/:id',
    element: <BlogDetails />,
    meta: {
      publicRoute: true,
    },
  },
  {
    path: '/blog/detail',
    element: <Navigate to='/blog/detail/1' />,
    meta: {
      publicRoute: true,
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
    path: '/faq',
    element: <Faq />,
    meta: {
      publicRoute: true,
    },
  },
  {
    path: '/inbox',
    element: <Inbox />,
    meta: {
      appLayout: true,
      className: 'email-application',
    },
  },
  {
    path: '/settings',
    element: <AccountSettings />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },

  {
    element: <Email />,
    path: '/apps/email',
    meta: {
      appLayout: true,
      className: 'email-application',
    },
  },
  {
    element: <Email />,
    path: '/apps/email/:folder',
    meta: {
      appLayout: true,
      className: 'email-application',
    },
  },
  {
    element: <Email />,
    path: '/apps/email/label/:label',
    meta: {
      appLayout: true,
      className: 'email-application',
    },
  },
  {
    element: <Email />,
    path: '/apps/email/:filter',
  },
  {
    path: '/apps/chat',
    element: <Chat />,
    meta: {
      appLayout: true,
      className: 'chat-application',
    },
  },
  {
    element: <Todo />,
    path: '/apps/todo',
    meta: {
      appLayout: true,
      className: 'todo-application',
    },
  },
  {
    element: <Todo />,
    path: '/apps/todo/:filter',
    meta: {
      appLayout: true,
      className: 'todo-application',
    },
  },
  {
    element: <Todo />,
    path: '/apps/todo/tag/:tag',
    meta: {
      appLayout: true,
      className: 'todo-application',
    },
  },
  {
    element: <Calendar />,
    path: '/apps/calendar',
  },
  {
    element: <Kanban />,
    path: '/apps/kanban',
    meta: {
      appLayout: true,
      className: 'kanban-application',
    },
  },
  {
    element: <InvoiceList />,
    path: '/apps/invoice/list',
  },
  {
    element: <InvoicePreview />,
    path: '/apps/invoice/preview/:id',
  },
  {
    path: '/apps/invoice/preview',
    element: <Navigate to='/apps/invoice/preview/4987' />,
  },
  {
    element: <InvoiceEdit />,
    path: '/apps/invoice/edit/:id',
  },
  {
    path: '/apps/invoice/edit',
    element: <Navigate to='/apps/invoice/edit/4987' />,
  },
  {
    element: <InvoiceAdd />,
    path: '/apps/invoice/add',
  },
  {
    path: '/apps/invoice/print',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank',
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
    element: <UserList />,
    path: '/apps/user/list',
  },
  {
    path: '/apps/user/view',
    element: <Navigate to='/apps/user/view/1' />,
  },
  {
    element: <UserView />,
    path: '/apps/user/view/:id',
  },
  {
    element: <Roles />,
    path: '/apps/roles',
  },
  {
    element: <Permissions />,
    path: '/apps/permissions',
  },
]

export default AppRoutes
