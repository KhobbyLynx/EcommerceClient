import React, { Suspense } from 'react'

// ** Spinner
import Spinner from '@components/spinner/Loading-spinner'

// ** Router Import
import Router from './router/Router'

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Router />
    </Suspense>
  )
}

export default App
