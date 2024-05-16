// ** Icons Imports
import { useEffect } from 'react'
import { Search } from 'react-feather'
import { useSearchParams } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap'

const ProductsSearchbar = (props) => {
  // ** Props
  const { dispatch, getProducts, store } = props

  const [searchParams] = useSearchParams()
  const searchFilter = searchParams.get('q')

  useEffect(() => {
    if (searchFilter !== null) {
      dispatch(getProducts({ ...store.params, q: searchFilter }))
    }
  }, [dispatch, getProducts, searchFilter, store.params])

  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Search Product'
              defaultValue={searchFilter}
              onChange={(e) =>
                dispatch(getProducts({ ...store.params, q: e.target.value }))
              }
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsSearchbar
