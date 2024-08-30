import React from 'react'
import './Category.scss'
import { categories } from '../data'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectCategory, filterByCategory } from '../../../ecommerce/store'

const Category = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCategoryFilter = (category) => {
    dispatch(selectCategory(category))
    dispatch(dispatch(filterByCategory(category)))
    navigate('/shop')
  }

  const handleCategorySearch = (cat) => {
    const name = cat.replace(/\s+/g, '').toLowerCase()
    navigate(`/category/${name}`)
  }

  return (
    <div className='category'>
      {categories.map((category) => (
        <div
          key={category.id}
          className='cat__card'
          // onClick={() => handleCategoryFilter(category.title)}
          onClick={() => handleCategorySearch(category.title)}
        >
          <img src={category.url} alt={category.title} />
          <p>{category.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Category
