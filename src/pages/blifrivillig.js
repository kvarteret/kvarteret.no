import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'

import Layout from '../components/shared/layout/layout'

import scrollTo from 'gatsby-plugin-smoothscroll'

import '../styles/video.css'
import { Link } from 'gatsby'

const Section = ({ swap, title, text, titleColor }) => {
  const direction = swap ? 'row-reverse' : 'row'
  return (
    <Container fixed>
      <Box my={6}>
        <Grid container direction={direction} spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src="https://kvarteret.no/wp-content/uploads/2018/08/34309087_10156125612730310_6750250518297182208_n-2.jpg"
              width="100%"
            ></img>
          </Grid>
          <Grid item xs={12} md={6} container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h1" component="h1" color={titleColor}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{text}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

const GroupCard = () => {
  const [shadow, setShadow] = useState(false)

  return (
    <Paper>
      <Link to="#">
        <Card
          onMouseOver={() => setShadow(true)}
          onMouseOut={() => setShadow(false)}
          raised={shadow}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Group image"
              height="160"
              title="Vaktetaten"
              image="https://kvarteret.no/wp-content/uploads/2018/08/34309087_10156125612730310_6750250518297182208_n-2.jpg"
            />
            <CardContent>
              <Typography variant="h3" component="h3" color="primary">
                Vaktetaten
              </Typography>
              <Typography>
                Ønsker du å oppleve utelivet bak kulissene? Vaktetaten har
                ansvar for vakthold på Kvarteret, og består av verter,
                ordensvakter og vektere som har i hovedoppgave å ivareta
                sikkerheten til gjestene, de som er på jobb og passe på at alle
                trives og har det bra.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Paper>
  )
}

const GroupSection = () => {
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
          <Grid item container spacing={4} style={{}}>
            <Grid item xs={12} md={6} lg={4}>
              <GroupCard />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GroupCard />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GroupCard />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GroupCard />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GroupCard />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GroupCard />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

const FAQuestion = ({ title, text }) => {
  return (
    <Box>
      <Typography variant="h3" component="h3">
        {title}
      </Typography>
      <Typography variant="p" compoennt="p">
        {text}
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    height: 120,
    border: '3px solid white',
    color: 'white',
    '&:hover': { backgroundColor: 'white', color: '#f54b4b' },
  },
}))

const BliFrivillig = () => {
  const styles = useStyles()
  return (
    <Layout>
      <Grid container direction="column">
        <Grid item style={{ position: 'relative' }}>
          <div className="video-background">
            <iframe
              width="100%"
              height="900px"
              src="https://www.youtube-nocookie.com/embed/P7SbB2_HW1o?controls=0&rel=0&showinfo=0&playlist=P7SbB2_HW1o&autoplay=1&loop=1&mute=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              opacity: 0.6,
              margin: 'auto',
              backgroundColor: '#F54B4B',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: '16px',
            }}
          >
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="center"
              justify="center"
              style={{
                minHeight: '900px',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <Grid item xs={12} md={6}>
                <Typography variant="h1">
                  Få mer ut av studietiden med oss!
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4">
                  Venner for livet, erfaring å være stolt av og minner du aldri
                  vil glemme!
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={{ width: '100%', marginTop: '60px' }}
              >
                <Button
                  component={'a'}
                  underline="none"
                  variant="outlined"
                  onClick={() => scrollTo('#signup')}
                  fullWidth="true"
                  color="white"
                  className={styles.buttonStyle}
                >
                  <Typography variant="h1">Bli frivillig nå!</Typography>
                </Button>
              </Grid>
            </Grid>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 16,
              margin: 'auto',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Typography variant="h4" color="white">
              Eller lær mer om kvarteret under
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <Section
            titleColor="primary"
            title="Hva er Kvarteret?"
            text="Det Akadamiske Kvarter er studenthuset i Bergen og er et av Norges
              mest aktive kulturhus. Hvert år arrangeres det over 1500
              arrangementer og alt blir driftet av frivillige studenter. Vi har
              tre barer som alle er frivilligdrevet samt utallige grupper for å
              dekke alle studenters behov. Kvarteret er et samlingssted for alle
              Bergens studenter om det er for morgenkaffen eller kveldsfesting!"
          />
        </Grid>
        <Grid item style={{ backgroundColor: '#F6F6F6' }}>
          <GroupSection />
        </Grid>
        <Grid item style={{ backgroundColor: '#F54B4B', color: 'white' }}>
          <Section
            color="white"
            swap
            title="Hvorfor jobbe frivillig?"
            text="Det å jobbe frivillig er en av de beste måtene å få mer ut av hverdagen! Selv om man ikke får penger så får man betalt i andre former! Det arrangeres hvert år flere fester forbeholdt interne, det arrangeres hytteturer, privatfester og mangt mer. Du får gode rabatter på mye forskjellig på hus som er veldig praktisk de kveldene man vil ut på silent disco ;) Uansett hva verv du tar på deg får du kompetanse og noe kjempebra å skrive på CV-en. Og ikke minst gir det deg et sosialt avbrudd i hverdagen hvor man kan fokusere på noe helt annet!"
          />
        </Grid>
        <Grid item id="signup">
          <Box my={8}>
            <Container fixed>
              <Grid container direction="row" spacing={4} justify="center">
                <Grid
                  item
                  xs={12}
                  lg={6}
                  container
                  direction="column"
                  spacing={8}
                >
                  <Grid item>
                    <Typography variant="h1" component="h1">
                      Ofte stilte spørsmål
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FAQuestion
                      title="Er det mulig å prøve?"
                      text="Ja! Det er bare å ta kontakt under så blir du kontaktet og får muligheten til å prøve vervet du ønsker. Vi ønsker at du skal ha muligheten til å prøve det du brenner for! Så det er helt uforpliktende å prøve."
                    />
                  </Grid>
                  <Grid item>
                    <FAQuestion
                      title="Er det mulig å prøve?"
                      text="Ja! Det er bare å ta kontakt under så blir du kontaktet og får muligheten til å prøve vervet du ønsker. Vi ønsker at du skal ha muligheten til å prøve det du brenner for! Så det er helt uforpliktende å prøve."
                    />
                  </Grid>
                  <Grid item>
                    <FAQuestion
                      title="Er det mulig å prøve?"
                      text="Ja! Det er bare å ta kontakt under så blir du kontaktet og får muligheten til å prøve vervet du ønsker. Vi ønsker at du skal ha muligheten til å prøve det du brenner for! Så det er helt uforpliktende å prøve."
                    />
                  </Grid>
                  <Grid item>
                    <FAQuestion
                      title="Er det mulig å prøve?"
                      text="Ja! Det er bare å ta kontakt under så blir du kontaktet og får muligheten til å prøve vervet du ønsker. Vi ønsker at du skal ha muligheten til å prøve det du brenner for! Så det er helt uforpliktende å prøve."
                    />
                  </Grid>
                  <Grid item>
                    <FAQuestion
                      title="Er det mulig å prøve?"
                      text="Ja! Det er bare å ta kontakt under så blir du kontaktet og får muligheten til å prøve vervet du ønsker. Vi ønsker at du skal ha muligheten til å prøve det du brenner for! Så det er helt uforpliktende å prøve."
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Typography variant="h1" component="h1">
                    Meld deg inn i her!
                  </Typography>

                  <script type="text/javascript">var submitted=false;</script>

                  <iframe
                    class="clickup-embed"
                    style={{ height: 1300, width: '100%' }}
                    src="https://forms.clickup.com/f/2aux0-1107/VRLFC1ITCP5RC59YBW"
                    frameborder="0"
                    onmousewheel=""
                    width="100%"
                    // style="background: transparent; border: 1px solid #ccc;"
                  ></iframe>
                  <script
                    async
                    src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"
                  ></script>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default BliFrivillig
