// ** React Imports
import { lazy } from 'react'

const Register = lazy(() => import('../../views/pages/authentication/Register'))

const ForgotPassword = lazy(() =>
  import('../../views/pages/authentication/ForgotPassword')
)

const ResetPassword = lazy(() =>
  import('../../views/pages/authentication/ResetPassword')
)

const VerifyEmail = lazy(() =>
  import('../../views/pages/authentication/VerifyEmail')
)

const TwoSteps = lazy(() => import('../../views/pages/authentication/TwoSteps'))

const AuthenticationRoutes = [
  {
    path: '/register',
    element: <Register />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true,
    },
  },

  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    layout: 'BlankLayout',
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true,
    },
  },

  {
    path: '/reset-password',
    element: <ResetPassword />,
    meta: {
      layout: 'blank',
    },
  },

  {
    path: '/verify-email',
    element: <VerifyEmail />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/two-steps',
    element: <TwoSteps />,
    meta: {
      layout: 'blank',
    },
  },
]

export default AuthenticationRoutes
