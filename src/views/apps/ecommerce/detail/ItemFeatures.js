// ** Icon Imports
import { Award, Clock, Shield } from 'react-feather'
// ** Reactstrap Imports
import { Row, Col, CardText } from 'reactstrap'

const ItemFeatures = () => {
  return (
    <div className='item-features'>
      <Row className='text-center'>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Award />
            <h4 className='mt-2 mb-1'>100% Original</h4>
            <CardText>
              All products are authentic, sourced directly from verified brands
              and suppliers, ensuring genuine quality and reliability.
            </CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Clock />
            <h4 className='mt-2 mb-1'>10 Day Replacement</h4>
            <CardText>
              All products come with a hassle-free return policy, ensuring a
              smooth and worry-free shopping experience.
            </CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Shield />
            <h4 className='mt-2 mb-1'>1 Year Warranty</h4>
            <CardText>
              All products include a warranty, guaranteeing peace of mind and
              protection for your purchase.
            </CardText>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ItemFeatures
