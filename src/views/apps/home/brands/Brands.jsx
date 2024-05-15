import React from 'react'
import './Brands.scss'
import { brands } from '../data'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

const Brands = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const handleFilterChange = (key, value) => {
    if (searchParams === '') {
      if (searchParams.has(key)) {
        searchParams.delete(key)
        setSearchParams(searchParams)
      }
    } else if (value === 'all') {
      navigate('/shop')
    } else {
      navigate(`/shop?${key}=${value}`)
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, 500)
  }
  return (
    <div className='brands__container'>
      <div className='brands'>
        <div className='brands__header'>
          <h4>Exclusive Brand Partners</h4>
        </div>
        <div className='brand__logos'>
          <div className='logos__container'>
            {brands.map((brand) => (
              <img
                key={brand.id}
                src={brand.brandImg}
                alt='brands'
                onClick={() => handleFilterChange('brand', brand.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Brands
