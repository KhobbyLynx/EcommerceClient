// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import ecommerce from '@src/views/apps/ecommerce/store'
import messaging from '@src/views/apps/messaging/store'

const rootReducer = {
  auth,
  navbar,
  layout,
  ecommerce,
  messaging,
}

export default rootReducer
