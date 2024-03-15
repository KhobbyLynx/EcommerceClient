// ** React Imports
import { useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Table } from 'reactstrap'

// ** Styles
import '@styles/base/pages/app-invoice-print.scss'
import themeConfig from '../../../../configs/themeConfig'

const Print = () => {
  // ** Print on mount
  useEffect(() => {
    setTimeout(() => window.print(), 50)
  }, [])

  return (
    <div className='invoice-print p-3'>
      <div className='d-flex justify-content-between flex-md-row flex-column pb-2'>
        <div>
          <div className='d-flex mb-1'>
            <img
              src={themeConfig.app.appLogoImage}
              alt=''
              style={{ maxWidth: '36px', maxHeight: '32px' }}
            />
            <h3 className='text-primary fw-bold ms-1'>
              {themeConfig.app.appName}
            </h3>
          </div>
          <p className='mb-25'>Office 149, 450 South Brand Brooklyn</p>
          <p className='mb-25'>San Diego County, CA 91905, USA</p>
          <p className='mb-0'>+1 (123) 456 7891, +44 (876) 543 2198</p>
        </div>
        <div className='mt-md-0 mt-2'>
          <h4 className='fw-bold text-end mb-1'>INVOICE #3492</h4>
          <div className='invoice-date-wrapper mb-50'>
            <span className='invoice-date-title'>Date Issued:</span>
            <span className='fw-bold'> 25/08/2020</span>
          </div>
          <div className='invoice-date-wrapper'>
            <span className='invoice-date-title'>Due Date:</span>
            <span className='fw-bold'>29/08/2020</span>
          </div>
        </div>
      </div>

      <hr className='my-2' />

      <Row className='pb-2'>
        <Col sm='6'>
          <h6 className='mb-1'>Invoice To:</h6>
          <p className='mb-25'>Thomas shelby</p>
          <p className='mb-25'>Shelby Company Limited</p>
          <p className='mb-25'>Small Heath, B10 0HF, UK</p>
          <p className='mb-25'>718-986-6062</p>
          <p className='mb-0'>peakyFBlinders@gmail.com</p>
        </Col>
        <Col className='mt-sm-0 mt-2' sm='6'>
          <h6 className='mb-1'>Payment Details:</h6>
          <table>
            <tbody>
              <tr>
                <td className='pe-1'>Total Due:</td>
                <td>
                  <strong>$12,110.55</strong>
                </td>
              </tr>
              <tr>
                <td className='pe-1'>Bank name:</td>
                <td>American Bank</td>
              </tr>
              <tr>
                <td className='pe-1'>Country:</td>
                <td>United States</td>
              </tr>
              <tr>
                <td className='pe-1'>IBAN:</td>
                <td>ETD95476213874685</td>
              </tr>
              <tr>
                <td className='pe-1'>SWIFT code:</td>
                <td>BR91905</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>

      <Table className='mt-2 mb-0' responsive>
        <thead>
          <tr>
            <th className='py-1 ps-4'>Task description</th>
            <th className='py-1'>Rate</th>
            <th className='py-1'>Hours</th>
            <th className='py-1'>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-1 ps-4'>
              <p className='fw-semibold mb-25'>Native App Development</p>
              <p className='text-muted text-nowrap'>
                Developed a full stack native app using React Native, Bootstrap
                & Python
              </p>
            </td>
            <td className='py-1'>
              <strong>$60.00</strong>
            </td>
            <td className='py-1'>
              <strong>30</strong>
            </td>
            <td className='py-1'>
              <strong>$1,800.00</strong>
            </td>
          </tr>
          <tr className='border-bottom'>
            <td className='py-1 ps-4'>
              <p className='fw-semibold mb-25'>Ui Kit Design</p>
              <p className='text-muted text-nowrap'>
                Designed a UI kit for native app using Sketch, Figma & Adobe XD
              </p>
            </td>
            <td className='py-1'>
              <strong>$60.00</strong>
            </td>
            <td className='py-1'>
              <strong>20</strong>
            </td>
            <td className='py-1'>
              <strong>$1200.00</strong>
            </td>
          </tr>
        </tbody>
      </Table>

      <Row className='invoice-sales-total-wrapper mt-3'>
        <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
          <p className='mb-0'>
            <span className='fw-bold'>Salesperson:</span>{' '}
            <span className='ms-75'>Alfie Solomons</span>
          </p>
        </Col>
        <Col
          className='d-flex justify-content-end'
          md='6'
          order={{ md: 2, lg: 1 }}
        >
          <div className='invoice-total-wrapper'>
            <div className='invoice-total-item'>
              <p className='invoice-total-title'>Subtotal:</p>
              <p className='invoice-total-amount'>$1800</p>
            </div>
            <div className='invoice-total-item'>
              <p className='invoice-total-title'>Discount:</p>
              <p className='invoice-total-amount'>$28</p>
            </div>
            <div className='invoice-total-item'>
              <p className='invoice-total-title'>Tax:</p>
              <p className='invoice-total-amount'>21%</p>
            </div>
            <hr className='my-50' />
            <div className='invoice-total-item'>
              <p className='invoice-total-title'>Total:</p>
              <p className='invoice-total-amount'>$1690</p>
            </div>
          </div>
        </Col>
      </Row>

      <hr className='my-2' />

      <Row>
        <Col sm='12'>
          <span className='fw-bold'>Note:</span>
          <span>
            It was a pleasure working with you and your team. We hope you will
            keep us in mind for future freelance projects. Thank You!
          </span>
        </Col>
      </Row>
    </div>
  )
}

export default Print
