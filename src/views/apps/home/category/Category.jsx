import React from 'react'
import './Category.scss'
import { categories } from '../data'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

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

  return (
    <div className='category'>
      {categories.map((category) => (
        <div
          key={category.id}
          className='cat__card'
          onClick={() => handleFilterChange('cat', `${category.title}`)}
        >
          <img src={category.url} alt={category.title} />
          <p>{category.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Category
