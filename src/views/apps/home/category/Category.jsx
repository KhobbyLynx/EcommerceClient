import React from 'react'
import './Category.scss'
import { categories } from '../data'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../ecommerce/store'

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const store = useSelector((state) => state.ecommerce)
  const handleFilterChange = (key, value) => {
    if (searchParams === '') {
      if (searchParams.has(key)) {
        searchParams.delete(key)
        setSearchParams(searchParams)
      }
    } else {
      navigate(`/shop?${key}=${value}`)
    }
  }

  const handleChange = (value) => {
    navigate('/shop')
    dispatch(getProducts({ ...store.params, q: value }))
    console.log('@Store @ Category', value, store.params.q)
  }

  return (
    <div className='category'>
      {categories.map((category) => (
        <div
          key={category.id}
          className='cat__card'
          // onClick={() => {
          //   dispatch(getProducts({ ...store.params, q: `${category.title}` }))
          //   // navigate('/shop')
          //   console.log('@Store @ Category', store.params.q)
          // }}
          // onClick={() => handleChange(`${category.title}`)}
          onClick={() => handleFilterChange('q', `${category.title}`)}
        >
          <img src={category.url} alt={category.title} />
          <p>{category.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Category
