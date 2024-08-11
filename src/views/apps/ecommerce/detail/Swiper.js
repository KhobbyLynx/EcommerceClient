// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import SwiperCore, { Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

SwiperCore.use([Thumbs])

const SwiperGallery = ({ productImgs, isRtl }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const params = {
    className: 'swiper-gallery',
    spaceBetween: 10,
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
    direction: 'horizontal',
  }

  return (
    <Card>
      <CardBody className='p-0'>
        <div className='swiper-gallery'>
          <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params} className='pb-1'>
            {productImgs.map((img) => (
              <SwiperSlide key={img}>
                <img
                  src={img}
                  alt='Product Image'
                  className='img-fluid object-fit-cover'
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {productImgs.length >= 2 ? (
            <Swiper {...paramsThumbs}>
              {productImgs.map((img) => (
                <SwiperSlide key={img}>
                  <img
                    src={img}
                    alt='Product Image'
                    className='img-fluid object-fit-cover'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
      </CardBody>
    </Card>
  )
}

export default SwiperGallery
