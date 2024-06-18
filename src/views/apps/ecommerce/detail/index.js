// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
import ItemFeatures from './ItemFeatures'
import ProductDetails from './ProductDetails'
// import RelatedProducts from './RelatedProducts'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getProduct,
  deleteWishlistItem,
  addToWishlist,
  addToCart,
} from '../store'

import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
  // ** Vars
  const { product: productId } = useParams()
  // const productId = params.substring(params.lastIndexOf('-') + 1)

  console.log('--Product ID Params', productId)
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ecommerce)
  console.log('-Single Product', store.productDetail)

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(productId))
  }, [dispatch, productId])

  return (
    <Fragment>
      <BreadCrumbs
        title='Product Details'
        data={[
          { title: 'Shop' },
          {
            title: `${
              store.productDetail.name === undefined
                ? ''
                : store.productDetail.name
            }`,
          },
        ]}
      />
      <div className='app-ecommerce-details'>
        {Object.keys(store.productDetail).length ? (
          <Card>
            <CardBody>
              <ProductDetails
                dispatch={dispatch}
                addToCart={addToCart}
                productId={productId}
                getProduct={getProduct}
                data={store.productDetail}
                addToWishlist={addToWishlist}
                deleteWishlistItem={deleteWishlistItem}
              />
            </CardBody>
            <ItemFeatures />
            {/* <CardBody>
              <RelatedProducts />
            </CardBody> */}
          </Card>
        ) : null}
      </div>
    </Fragment>
  )
}

export default Details
