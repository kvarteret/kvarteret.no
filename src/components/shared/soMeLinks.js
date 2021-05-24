import React from 'react'
import { Grid } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { isValidStatus } from '../../helpers/helper'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  someIcon: {
    '&:hover': {
      filter: 'brightness(1.4)',
    },
    '&:active': {
      filter: 'brightness(0.8)',
    },
  },
  image: {
    width: 60,
    height: 60,
  },
})

function SoMeLinks() {
  const styles = useStyles()
  const data = useStaticQuery(graphql`
    query SocialMediaQuery {
      directus {
        general_information {
          social_media {
            url
            icon {
              id
              imageFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, formats: PNG)
                }
              }
            }
            status
          }
        }
      }
    }
  `)

  const components = data.directus.general_information.social_media.map(
    (item, key) => {
      if (!isValidStatus(item.status)) return <div key={key}></div>
      const image = getImage(item.icon.imageFile)
      return (
        <Grid key={key} item>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.someIcon}
          >
            <GatsbyImage
              className={styles.image}
              image={image}
              alt="image"
            ></GatsbyImage>
          </a>
        </Grid>
      )
    }
  )

  return (
    <Grid container direction="row" justify="space-evenly">
      {components}
    </Grid>
  )
}

export default SoMeLinks
