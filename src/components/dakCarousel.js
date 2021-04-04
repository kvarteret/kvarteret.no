import React from 'react'
import { Button, Paper } from '@material-ui/core'

// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './dakCarousel.scss'

import Slider from 'react-slick'

export default function DAKCarousel({ items }) {
  if (items.length == 1) {
    return <Item item={items[0]} />
  }
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
  }
  return (
    <Slider {...settings}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Slider>
  )
}

function Item(props) {
  return (
    <div>
      <img
        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
        src={
          'https://cms.kvarteret.no/assets/' + props.item.directus_files_id.id
        }
      ></img>
      {/* <span>{props.item.directus_files_id.description}</span> */}
    </div>
  )
}
