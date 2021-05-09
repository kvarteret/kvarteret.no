import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import { Link } from 'gatsby'
import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ExternalContent from '../mainSection/externalContent'

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
          <CardContent style={{ height: '100%' }}>
            <Typography
              variant="h3"
              component="h3"
              color="primary"
              style={{ textAlign: 'center' }}
            >
              {title}
            </Typography>
            <ExternalContent data={description} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

const GroupSection = ({ groups }) => {
  const groupElems = groups?.map((item, key) => (
    <Grid key={key} item xs={12} sm={6} md={4}>
      <GroupCard {...item} />
    </Grid>
  ))

  return (
    <Container fixed>
      <Box my={4}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h1" component="h1" color="primary">
              Hva kan du gjøre?
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Mange tror at vi bare har grupper for å drive huset, men vi har
              langt mer enn dette! Om du er interessert i å forbedre
              kaffekunsten din så har du mulighet til å bli servitør i vår egen
              Kafè, Stjernesalen. Kanskje du ønsker å drive med lyd og lys, da
              har du muligheten til å bli med i Kraft! Ønsker du å være del av
              kvarterets natteliv og forsikre at gjestene fester forsvarlig kan
              du bli med i Vaktetaten. Er du mer interessert i design eller
              kanskje utvikling har vi en PR-gruppe. Ønsker du å bli Bergens nye
              store DJ, bli med i DJ-gruppen i produksjonsgruppen vår! Du kan
              lese mer om alle våre grupper under. For mer informasjon om hver
              gruppe kan du klikke på kortet.
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
