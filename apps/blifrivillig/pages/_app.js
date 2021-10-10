import '../styles/globals.css'
import '../public/fonts/fonts.css'

function MyApp({ Component, pageProps }) {
  return <div><Component {...pageProps} /></div>
}

export default MyApp
