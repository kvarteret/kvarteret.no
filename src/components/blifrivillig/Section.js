import { Box, Container, Grid, Typography } from '@material-ui/core'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import ExternalContent from '../mainSection/externalContent'

const Section = ({ swap, title, image, text, titleColor }) => {
  const direction = swap ? 'row-reverse' : 'row'

  const imageElem = getImage(image)
  return (
    <Container fixed>
      <Box my={6}>
        <Grid container direction={direction} spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <GatsbyImage
              image={imageElem}
              title={title}
              alt={title}
              style={{
                width: '100%',
                height: 333,
                objectFit: 'cover',
              }}
            />
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
