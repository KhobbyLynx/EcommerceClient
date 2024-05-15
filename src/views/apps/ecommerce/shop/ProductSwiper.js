// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import SwiperCore, { Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

SwiperCore.use([Thumbs])

const ProductSwiper = ({ isRtl, images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const params = {
    className: 'swiper-gallery',
    spaceBetween: 10,
    navigation: true,
    pagination: {
      clickable: true,
    },
    thumbs: { swiper: thumbsSwiper },
  }

  const paramsThumbs = {
    className: 'gallery-thumbs',
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    onSwiper: setThumbsSwiper,
  }

  const swiper = images.map((image) => (
    <SwiperSlide>
      <img src={image} alt={image} className='img-fluid' />
    </SwiperSlide>
  ))

  const swiperSmll = images.map((image) => (
    <SwiperSlide>
      <img src={image} alt={image} className='img-fluid' />
    </SwiperSlide>
  ))

  return (
    <Card>
      <CardBody>
        <div className='swiper-gallery'>
          <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
            {swiper}
          </Swiper>
          <Swiper {...paramsThumbs}>{swiperSmll}</Swiper>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProductSwiper
