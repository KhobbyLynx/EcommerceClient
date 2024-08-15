// ** Reactstrap Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Components
import Faqs from './Faqs'
import FaqFilter from './FaqFilter'
import FaqContact from './FaqContact'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/base/pages/page-faq.scss'

import { data } from './data'

const Faq = () => {
  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  // const [data, setData] = useState(null)

  const getFAQData = (query) => {
    return axios.get('/faq/data', { params: { q: query } }).then((response) => {
      setData(data)
    })
  }

  useEffect(() => {
    getFAQData(searchTerm)
  }, [])

  return (
    <Fragment>
      <Breadcrumbs title='FAQ' data={[{ title: 'Pages' }, { title: 'FAQ' }]} />
      <FaqFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        getFAQData={getFAQData}
      />
      {data !== null ? (
        <Faqs
          data={data}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      ) : null}
      <FaqContact />
    </Fragment>
  )
}

export default Faq
