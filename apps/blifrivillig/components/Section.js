import { Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import ExternalContent from './externalContent'
import Image from 'next/image'

import styles from '../styles/Section.module.css'
import BlurImage from './BlurImage'

const Section = ({ swap, title, image, text, titleColor }) => {
  const direction = swap ? 'row-reverse' : 'row'
  return (
    <Container fixed>
      <Box my={6} style={{marginTop: 48}}>
        <Grid container direction={direction} spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <div className={styles.imageContainer}>
                <BlurImage
                imageId={image.id}
                title={title}
                alt={title}
                objectFit="cover"
                layout="fill"
                />
            </div>
          </Grid>
          <Grid item xs={12} md={6} container direction="column">
            <Grid item>
              <Typography variant="h1" component="h1" color={titleColor}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <ExternalContent data={text} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Section
