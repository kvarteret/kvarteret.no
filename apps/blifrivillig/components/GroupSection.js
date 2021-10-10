import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Grid,
    Typography,
  } from '@material-ui/core'
  import { Link } from 'gatsby'
  import React, { useState } from 'react'
  import { GatsbyImage, getImage } from 'gatsby-plugin-image'
  import ExternalContent from '../mainSection/externalContent'
  
  import { graphql, useStaticQuery } from 'gatsby'
  import { getTranslation } from '../../helpers/languageHelper'
  
  const Query = graphql`
    query BlifrivilligTranslations {
      directus {
        blifrivillig_translations {
          group_description
          group_title
          languages_code {
            url_code
          }
        }
      }
    }
  `
  
  const GroupCard = ({ image, title, description, link }) => {
    const [shadow, setShadow] = useState(false)
  
    const imageElem = getImage(image)
    return (
      <Link to={link} style={{ height: '100%' }}>
        <Card
          onMouseOver={() => setShadow(true)}
          onMouseOut={() => setShadow(false)}
          raised={shadow}
          style={{ height: '100%' }}
        >
          <CardActionArea style={{ height: '100%' }}>
            <GatsbyImage
              image={imageElem}
              title={title}
              alt={title}
              style={{
                width: '100%',
                height: 160,
                top: 0,
                objectFit: 'cover',
              }}
            />
            <CardContent style={{ height: '100%', fontSize: 14 }}>
              <Typography
                variant="h3"
                component="h3"
                color="primary"
                style={{ textAlign: 'center' }}
              >
                {title}
              </Typography>
              <Typography>
                <ExternalContent data={description} />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    )
  }
  
  const sanitizeData = (data) => {
    return getTranslation(data.directus.blifrivillig_translations)
  }
  
  const GroupSection = ({ groups }) => {
    const groupElems = groups?.map((item, key) => (
      <Grid key={key} item xs={12} sm={6} md={4}>
        <GroupCard {...item} />
      </Grid>
    ))
  
    const data = sanitizeData(useStaticQuery(Query))
  
    return (
      <Container fixed>
        <Box my={4}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h1" component="h1" color="primary">
                {data.group_title}
              </Typography>
              <p style={{ marginTop: 10 }}>
                <ExternalContent data={data.group_description} />
              </Typography>
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
  