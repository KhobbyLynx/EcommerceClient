// ** React Imports
import { useState, useEffect } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Demo Components
import AccountSettings from './AccountSettings'

// ** Styles
import '@styles/react/pages/page-profile.scss'

// ** Third Party Components
import axios from 'axios'

const Profile = () => {
  // ** States
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .get('/account-setting/data')
      .then((response) => setData(response.data))
  }, [])
  return (
    <>
      <Breadcrumbs title='Profile' data={[{ title: 'My Profile' }]} />
      {data !== null ? <AccountSettings data={data.general} /> : null}
    </>
  )
}

export default Profile
