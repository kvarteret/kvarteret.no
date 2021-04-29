import React from 'react'
import { Button, Paper } from '@material-ui/core'

// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './dakCarousel.scss'

import Slider from 'react-slick'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

export default function DAKCarousel({
  items,
  dots,
  template,
  animationSpeed,
  arrows,
}) {
  if (!items) return <div></div>
  if (items.length == 1) {
    if (template) {
      return template({ item: items[0] })
    } else {
      return <Item item={items[0]} />
    }
  }
  var settings = {
    dots: dots,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: animationSpeed || 500,
    arrows,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  }
  return (
    <Slider {...settings}>
      {items.map((item, i) => {
        if (template) {
          return template({ key: i, item: item })
        } else {
          return <Item key={i} item={item} />
        }
      })}
    </Slider>
  )
}

function Item({ item }) {
  const image = getImage(item.imageFile)
  return (
    <GatsbyImage
      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      image={image}
      alt={'image'}
    ></GatsbyImage>
  )
}
