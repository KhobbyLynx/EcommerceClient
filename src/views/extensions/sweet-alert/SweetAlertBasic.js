// ** Third Party Components
import Swal from 'sweetalert2'
import { ThumbsUp, ThumbsDown } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'

// ** Reactstrap Imports'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  CardText,
} from 'reactstrap'

const MySwal = withReactContent(Swal)

const BasicSweetAlert = () => {
  const handleBasicTitleAlert = () => {
    return MySwal.fire({
      title: 'Any fool can use a computer',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
    })
  }

  const handleTitleAlert = () => {
    return MySwal.fire({
      title: 'The Internet?,',
      text: 'That thing is still around?',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
    })
  }

  const handleFooterAlert = () => {
    return MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="#">Why do I have this issue?</a>',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
    })
  }

  const handleHTMLAlert = () => {
    return MySwal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="" target="_blank">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: (
        <span className='align-middle'>
          <ThumbsUp className='me-50' size={15} />
          <span className='align-middle'>Great!</span>
        </span>
      ),
      cancelButtonText: <ThumbsDown size={15} />,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1',
      },
      buttonsStyling: false,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Basic</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText className='mb-0'>
          SweetAlert automatically centers itself on the page and looks great no
          matter if you're using a desktop computer, mobile or tablet. It's even
          highly customizable, as you can see below!
        </CardText>
        <div className='demo-inline-spacing'>
          <Button color='primary' onClick={handleBasicTitleAlert} outline>
            Basic
          </Button>
          <Button color='primary' onClick={handleTitleAlert} outline>
            With Title
          </Button>
          <Button color='primary' onClick={handleFooterAlert} outline>
            With Footer
          </Button>
          <Button color='primary' onClick={handleHTMLAlert} outline>
            HTML
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default BasicSweetAlert
