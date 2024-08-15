import { getUserData } from '../Utils'
import newRequest from './newRequest'

// ** Paystack import
import PaystackPop from '@paystack/inline-js'

const handlePaymentRequest = (totalPayment) => {
  setTimeout(() => {
    const request = async () => {
      try {
        const currentUser = getUserData()
        const res = await newRequest.post('/paystack', {
          email: currentUser.email,
          amount: 1000,
        })

        console.log('RES', res)

        // ** Authorization url uses redirects pop-up
        // ** Access Code uses in-app pop-up
        // const geturl = res.data.data.authorization_url
        // if (geturl) {
        //   window.open(geturl, '_top')
        // }
        const access_code = res.data.data.access_code
        const reference = res.data.data.reference

        const popup = new PaystackPop()
        popup.resumeTransaction(access_code)

        // Verification endpoint
        const url = `/paystack?reference=${encodeURIComponent(reference)}`

        setTimeout(async () => {
          const getRes = await newRequest.get(url)
          console.log('RESPONSE FROM VERIFICATION', getRes)
        }, 10000)
      } catch (error) {
        console.error('ERROR PROCESSING PAYMENT', error)
      } finally {
      }
    }

    return request()
  }, 2000)
}

export { handlePaymentRequest }
