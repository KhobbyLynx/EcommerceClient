import React from 'react'
import './Category.scss'
import { categories } from '../data'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()

  const handleCategorySearch = (cat) => {
    const name = cat.replace(/\s+/g, '').toLowerCase()
    navigate(`/q/${name}`)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  return (
    <div className='category'>
      {categories.map((category) => (
        <div
          key={category.id}
          className='cat__card'
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
