import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Grid,
  } from '@material-ui/core'
  import React, { useState } from 'react'
  import ExternalContent from './externalContent'
  import Link from 'next/link'
  import Image from 'next/image'
  
  import style from '../styles/GroupSection.module.css';
import BlurImage from './BlurImage'
  
  const GroupCard = ({ image, title, description, link }) => {
    const [shadow, setShadow] = useState(false)
    // const imageElem = getImage(image)
    return (
      <Link href={link} style={{ height: '100%' }}>
        <Card
          onMouseOver={() => setShadow(true)}
          onMouseOut={() => setShadow(false)}
          raised={shadow}
          style={{ height: '100%' }}
        >
          <CardActionArea style={{ height: '100%' }}>
            <div className={style.imageContainer}>
              <BlurImage
                  imageId={image.id}
                  title={title}
                  alt={title}
                  layout="fill"
                  />
            </div>
            <CardContent style={{ height: '100%', fontSize: 14 }}>
              <h3 className={style.title}>
                {title}
              </h3>
              {/* <Typography
                variant="h3"
                component="h3"
                color="primary"
                style={{ textAlign: 'center' }}
              >
              </Typography> */}
              <p>
                <ExternalContent data={description} />
              </p>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    )
  }
  
  const sanitizeGroup = group => ({
    image: group.blifrivillig_image,
    title: group.blifrivillig_group_translations.at(0).title,
    description: group.blifrivillig_group_translations.at(0).description,
    link: group.blifrivillig_group_translations.at(0).link || "",
  })
  const GroupSection = ({ groups, translation }) => {
    const groupElems = groups?.map((item, key) => {
      return (
        <Grid key={key} item xs={12} sm={6} md={4}>
          <GroupCard {...sanitizeGroup(item)} />
        </Grid>
      )
    })
    
    const data = translation;
    return (
      <Container fixed>
        <Box my={4}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <h1 className={style.groupTitle}>
                {data.group_title}
              </h1>
              <p style={{ marginTop: 10 }}>
                <ExternalContent data={data.group_description} />
              </p>
            </Grid>
            <Grid
              item
              container
              spacing={4}
              justify="flex-start"
              alignItems="stretch"
            >
              {groupElems}
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  }
  
  export default GroupSection
  