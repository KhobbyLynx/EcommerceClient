// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Third Party Components
import wNumb from 'wnumb'
import classnames from 'classnames'
import { Star } from 'react-feather'
import Nouislider from 'nouislider-react'

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label } from 'reactstrap'

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchBrands, fetchCategories } from '../store'

const Sidebar = (props) => {
  // ** Props
  // ** The sidebar takes in products and bar toggle as props
  const { sidebarOpen, products } = props

  // ** Hooks
  const dispatch = useDispatch()

  // ** UseEffect
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchBrands())
  }, [])

  // ** ecommerce state from the redux store
  const store = useSelector((state) => state.ecommerce)

  // ** Categories from the redux store filtered to contained only the featured ones
  const categories = store.categories.filter((cat) => cat.featured === true)

  // ** Brands from the redux store filtered to contain only the featured ones
  const brands = store.brands.filter((brand) => brand.featured === true)

  // ** Array of ratings
  const ratings = [
    {
      ratings: 4,
    },
    {
      ratings: 3,
    },
    {
      ratings: 2,
    },
    {
      ratings: 1,
    },
  ]

  return (
    <div className='sidebar-detached sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen,
          })}
        >
          <Row>
            <Col sm='12'>
              <h6 className='filter-heading d-none d-lg-block'>Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              // ** Multi Price Range Products Filter
              <div className='multi-range-price'>
                <h6 className='filter-title mt-0'>Multi Price Range</h6>
                <ul className='list-unstyled price-range'>
                  <li>
                    <div className='form-check'>
                      <Input
                        type='radio'
                        id='all'
                        name='price-range-radio'
                        defaultChecked
                      />
                      <Label className='form-check-label' for='all'>
                        All
                      </Label>
                    </div>
                  </li>
                  <li>
                    <div className='form-check'>
                      <Input
                        type='radio'
                        id='500-cedis-below'
                        name='price-range-radio'
                        value='below-500'
                      />
                      <Label
                        className='form-check-label'
                        for='500-cedis-below'
                      >{`Below Ghs500`}</Label>
                    </div>
                  </li>
                  <li>
                    <div className='form-check'>
                      <Input
                        type='radio'
                        id='500-1000-cedis'
                        name='price-range-radio'
                      />
                      <Label className='form-check-label' for='500-1000-cedis'>
                        Ghs500-Ghs1000
                      </Label>
                    </div>
                  </li>
                  <li>
                    <div className='form-check'>
                      <Input
                        type='radio'
                        id='1000-5000-cedis'
                        name='price-range-radio'
                      />
                      <Label className='form-check-label' for='1000-5000-cedis'>
                        Ghs1000-Ghs5000
                      </Label>
                    </div>
                  </li>
                  <li>
                    <div className='form-check'>
                      <Input
                        type='radio'
                        id='5000-cedis-above'
                        name='price-range-radio'
                      />
                      <Label
                        className='form-check-label'
                        for='5000-cedis-above'
                      >{`Above Ghs5000`}</Label>
                    </div>
                  </li>
                </ul>
              </div>
              // ** Categories Products Filter
              <div id='product-categories'>
                <h6 className='filter-title'>Categories</h6>
                <ul className='list-unstyled categories-list'>
                  {categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <div className='form-check'>
                          <Input
                            type='radio'
                            id={category.id}
                            name='category-radio'
                            defaultChecked={category.defaultChecked}
                          />
                          <Label className='form-check-label' for={category.id}>
                            {category.name}
                          </Label>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
              // ** Brands Products Filter
              <div className='brands'>
                <h6 className='filter-title'>Brands</h6>
                <ul className='list-unstyled brand-list'>
                  {brands.map((brand) => {
                    return (
                      <li key={brand.name}>
                        <div className='form-check'>
                          <Input
                            type='checkbox'
                            id={brand.name}
                            defaultChecked={brand.checked}
                          />
                          <Label className='form-check-label' for={brand.name}>
                            {brand.name}
                          </Label>
                        </div>
                        <span>{brand.total}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              // ** Ratings Products Filter
              <div id='ratings'>
                <h6 className='filter-title'>Ratings</h6>
                {ratings.map((item) => {
                  return (
                    <div key={item.total} className='ratings-list'>
                      <a href='/' onClick={(e) => e.preventDefault()}>
                        <ul className='unstyled-list list-inline'>
                          {new Array(5).fill().map((listItem, index) => {
                            return (
                              <li
                                key={index}
                                className='ratings-list-item me-25'
                              >
                                <Star
                                  className={classnames({
                                    'filled-star': index + 1 <= item.ratings,
                                    'unfilled-star': index + 1 > item.ratings,
                                  })}
                                />
                              </li>
                            )
                          })}
                          <li>& up</li>
                        </ul>
                      </a>
                      <div className='stars-received'>{item.total}</div>
                    </div>
                  )
                })}
              </div>
              // ** Reset Filter to default state
              <div id='clear-filters'>
                <Button color='primary' block>
                  Clear All Filters
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
