// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import Repeater from '@components/repeater'
import { SlideDown } from 'react-slidedown'
import { X, Plus, Hash } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  InputGroup,
  InputGroupText,
} from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import themeConfig from '../../../../configs/themeConfig'

const InvoiceEditCard = ({ data }) => {
  // ** States
  const [count, setCount] = useState(1)
  const [picker, setPicker] = useState(new Date(data.invoice.issuedDate))
  const [dueDatepicker, setDueDatePicker] = useState(
    new Date(data.invoice.dueDate)
  )

  // ** Deletes form
  const deleteForm = (e) => {
    e.preventDefault()
    e.target.closest('.repeater-wrapper').remove()
  }

  const note =
    'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'

  return (
    <Card className='invoice-preview-card'>
      {/* Header */}
      <CardBody className='invoice-padding pb-0'>
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
              <img
                src={themeConfig.app.appLogoImage}
                alt=''
                style={{ maxWidth: '36px', maxHeight: '32px' }}
              />
              <h3 className='text-primary invoice-logo'>
                {themeConfig.app.appName}
              </h3>
            </div>
            <p className='card-text mb-25'>
              Office 149, 450 South Brand Brooklyn
            </p>
            <p className='card-text mb-25'>San Diego County, CA 91905, USA</p>
            <p className='card-text mb-0'>
              +1 (123) 456 7891, +44 (876) 543 2198
            </p>
          </div>
          <div className='invoice-number-date mt-md-0 mt-2'>
            <div className='d-flex align-items-center justify-content-md-end mb-1'>
              <h4 className='invoice-title'>Invoice</h4>
              <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                <InputGroupText>
                  <Hash size={15} />
                </InputGroupText>
                <Input
                  type='number'
                  className='invoice-edit-input'
                  value={data.invoice.id}
                  placeholder='53634'
                  disabled
                />
              </InputGroup>
            </div>
            <div className='d-flex align-items-center mb-1'>
              <span className='title'>Date:</span>
              <Flatpickr
                value={picker}
                onChange={(date) => setPicker(date)}
                className='form-control invoice-edit-input date-picker'
              />
            </div>
            <div className='d-flex align-items-center'>
              <span className='title'>Due Date:</span>
              <Flatpickr
                value={dueDatepicker}
                onChange={(date) => setDueDatePicker(date)}
                className='form-control invoice-edit-input due-date-picker'
              />
            </div>
          </div>
        </div>
      </CardBody>
      {/* /Header */}

      <hr className='invoice-spacing' />

      {/* Address and Contact */}
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' xl='8'>
            <h6 className='mb-2'>Invoice To:</h6>
            <h6 className='mb-25'>{data.invoice.client.name}</h6>
            <CardText className='mb-25'>{data.invoice.client.company}</CardText>
            <CardText className='mb-25'>{data.invoice.client.address}</CardText>
            <CardText className='mb-25'>{data.invoice.client.contact}</CardText>
            <CardText className='mb-0'>
              {data.invoice.client.companyEmail}
            </CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' xl='4'>
            <h6 className='mb-2'>Payment Details:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pe-1'>Total Due:</td>
                  <td>
                    <span className='fw-bolder'>
                      {data.paymentDetails.totalDue}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='pe-1'>Bank name:</td>
                  <td>{data.paymentDetails.bankName}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Country:</td>
                  <td>{data.paymentDetails.country}</td>
                </tr>
                <tr>
                  <td className='pe-1'>IBAN:</td>
                  <td>{data.paymentDetails.iban}</td>
                </tr>
                <tr>
                  <td className='pe-1'>SWIFT code:</td>
                  <td>{data.paymentDetails.swiftCode}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Product Details */}
      <CardBody className='invoice-padding invoice-product-details'>
        <Repeater count={count}>
          {(i) => {
            const Tag = i === 0 ? 'div' : SlideDown
            return (
              <Tag key={i} className='repeater-wrapper'>
                <Row>
                  <Col
                    className='d-flex product-details-border position-relative pe-0'
                    sm='12'
                  >
                    <Row className='w-100 pe-lg-0 pe-1 py-2'>
                      <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg='5' sm='12'>
                        <CardText className='col-title mb-md-50 mb-0'>
                          Item
                        </CardText>
                        <Input type='select' className='item-details'>
                          <option>App Design</option>
                          <option>App Customization</option>
                          <option>ABC Template</option>
                          <option>App Development</option>
                        </Input>
                        <Input
                          className='mt-2'
                          type='textarea'
                          rows='1'
                          defaultValue='Customization & Bug Fixes'
                        />
                      </Col>
                      <Col className='my-lg-0 my-2' lg='3' sm='12'>
                        <CardText className='col-title mb-md-2 mb-0'>
                          Cost
                        </CardText>
                        <Input
                          type='number'
                          defaultValue='24'
                          placeholder='24'
                        />
                        <div className='mt-2'>
                          <span>Discount:</span> <span>0%</span>
                        </div>
                      </Col>
                      <Col className='my-lg-0 my-2' lg='2' sm='12'>
                        <CardText className='col-title mb-md-2 mb-0'>
                          Qty
                        </CardText>
                        <Input type='number' defaultValue='1' placeholder='1' />
                      </Col>
                      <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                        <CardText className='col-title mb-md-50 mb-0'>
                          Price
                        </CardText>
                        <CardText className='mb-0'>$24.00</CardText>
                      </Col>
                    </Row>
                    <div className='d-flex justify-content-center border-start invoice-product-actions py-50 px-25'>
                      <X
                        size={18}
                        className='cursor-pointer'
                        onClick={deleteForm}
                      />
                    </div>
                  </Col>
                </Row>
              </Tag>
            )
          }}
        </Repeater>

        <Row className='mt-1'>
          <Col sm='12' className='px-0'>
            <Button
              color='primary'
              size='sm'
              className='btn-add-new'
              onClick={() => setCount(count + 1)}
            >
              <Plus size={14} className='me-25' />{' '}
              <span className='align-middle'>Add Item</span>
            </Button>
          </Col>
        </Row>
      </CardBody>
      {/* /Product Details */}

      {/* Invoice Total */}
      <CardBody className='invoice-padding'>
        <Row className='invoice-sales-total-wrapper'>
          <Col
            className='mt-md-0 mt-3'
            md={{ size: '6', order: 1 }}
            xs={{ size: 12, order: 2 }}
          >
            <div className='d-flex align-items-center mb-1'>
              <Label for='salesperson' className='form-label'>
                Salesperson:
              </Label>
              <Input
                type='text'
                className='ms-50'
                id='salesperson'
                placeholder='Edward Crowley'
              />
            </div>
          </Col>
          <Col
            className='d-flex justify-content-end'
            md={{ size: '6', order: 2 }}
            xs={{ size: 12, order: 1 }}
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
      </CardBody>
      {/* /Invoice Total */}

      <hr className='invoice-spacing mt-0' />

      {/* Invoice Note */}
      <CardBody className='invoice-padding py-0'>
        <Row>
          <Col>
            <div className='mb-2'>
              <Label for='note' className='form-label fw-bold'>
                Note:
              </Label>
              <Input type='textarea' rows='2' id='note' defaultValue={note} />
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  )
}

export default InvoiceEditCard
