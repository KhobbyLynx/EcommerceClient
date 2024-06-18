// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import ecommerce from '@src/views/apps/ecommerce/store'

const rootReducer = {
  auth,
  navbar,
  layout,
  ecommerce,
}

export default rootReducer
