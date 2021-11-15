import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import '../public/fonts/fonts.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <Layout data={pageProps.layout}>

          <Script src="https://unpkg.com/node-vibrant@3.1.5/dist/vibrant.min.js"></Script>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
