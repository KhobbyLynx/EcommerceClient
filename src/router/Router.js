// ** Router imports
import { lazy } from 'react'

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'

// ** GetRoutes
import { getRoutes } from './routes'

// ** Components
const Error = lazy(() => import('../views/pages/misc/Error'))
const Login = lazy(() => import('../views/pages/authentication/Login'))
const NotAuthorized = lazy(() => import('../views/pages/misc/NotAuthorized'))
const Maintenance = lazy(() => import('../views/pages/misc/Maintenance'))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/home'
    }
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }],
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }],
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }],
    },

    // ** Pages Under Maintainence
    {
      path: '/blog',
      element: <BlankLayout />,
      children: [{ path: '/blog', element: <Maintenance /> }],
    },
    {
      path: '/faq',
      element: <BlankLayout />,
      children: [{ path: '/faq', element: <Maintenance /> }],
    },
    {
      path: '/more',
      element: <BlankLayout />,
      children: [{ path: '/more', element: <Maintenance /> }],
    },
    ...allRoutes,
  ])

  return routes
}

export default Router
