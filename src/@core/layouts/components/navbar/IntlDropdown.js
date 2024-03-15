// ** Third Party Components
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'

// ** Icons Imports
import { IoLanguageOutline } from 'react-icons/io5'
const IntlDropdown = () => {
  // ** Hooks
  const { i18n } = useTranslation()

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    i18n.changeLanguage(lang)
  }

  return (
    <UncontrolledDropdown
      href='/'
      tag='li'
      className='dropdown-language nav-item'
    >
      <DropdownToggle
        href='/'
        tag='a'
        className='nav-link'
        onClick={(e) => e.preventDefault()}
      >
        <IoLanguageOutline className='ficon' />
      </DropdownToggle>
      <DropdownMenu className='mt-0' end>
        <DropdownItem
          href='/'
          tag='a'
          onClick={(e) => handleLangUpdate(e, 'en')}
        >
          <ReactCountryFlag className='country-flag' countryCode='us' svg />
          <span className='ms-1'>English</span>
        </DropdownItem>
        <DropdownItem
          href='/'
          tag='a'
          onClick={(e) => handleLangUpdate(e, 'fr')}
        >
          <ReactCountryFlag className='country-flag' countryCode='fr' svg />
          <span className='ms-1'>French</span>
        </DropdownItem>
        <DropdownItem
          href='/'
          tag='a'
          onClick={(e) => handleLangUpdate(e, 'de')}
        >
          <ReactCountryFlag className='country-flag' countryCode='de' svg />
          <span className='ms-1'>German</span>
        </DropdownItem>
        <DropdownItem
          href='/'
          tag='a'
          onClick={(e) => handleLangUpdate(e, 'pt')}
        >
          <ReactCountryFlag className='country-flag' countryCode='pt' svg />
          <span className='ms-1'>Portuguese</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
