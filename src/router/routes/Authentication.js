// ** React Imports
import { lazy } from 'react'

const Login = lazy(() => import('../../views/pages/authentication/LoginBasic'))

const Register = lazy(() =>
  import('../../views/pages/authentication/RegisterBasic')
)

const ForgotPassword = lazy(() =>
  import('../../views/pages/authentication/ForgotPasswordBasic')
)

const ResetPasswordBasic = lazy(() =>
  import('../../views/pages/authentication/ResetPasswordBasic')
)
const ResetPasswordCover = lazy(() =>
  import('../../views/pages/authentication/ResetPasswordCover')
)

const VerifyEmailBasic = lazy(() =>
  import('../../views/pages/authentication/VerifyEmailBasic')
)
const VerifyEmailCover = lazy(() =>
  import('../../views/pages/authentication/VerifyEmailCover')
)

const TwoStepsBasic = lazy(() =>
  import('../../views/pages/authentication/TwoStepsBasic')
)
const TwoStepsCover = lazy(() =>
  import('../../views/pages/authentication/TwoStepsCover')
)

const AuthenticationRoutes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true,
    },
  },

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
    element: <ResetPasswordBasic />,
    meta: {
      layout: 'blank',
    },
  },

  {
    path: '/verify-email',
    element: <VerifyEmailBasic />,
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/two-steps',
    element: <TwoStepsBasic />,
    meta: {
      layout: 'blank',
    },
  },
]

export default AuthenticationRoutes
