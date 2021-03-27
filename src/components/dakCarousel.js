import React from 'react'
import { Button, Paper } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

export default function DAKCarousel({ items }) {
  if (items.length == 1) {
    return <Item item={items[0]} />
  }
  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
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
      <span>{props.item.directus_files_id.description}</span>
    </div>
  )
}
