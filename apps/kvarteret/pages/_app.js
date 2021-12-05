import "../styles/globals.css";
import '../public/fonts/fonts.css'
import '../public/fonts/kvartereticons.css'
import Script from 'next/script'
import { Layout } from "dak-components";

function MyApp({ Component, pageProps }) {
  return (
    <Layout data={pageProps.layout}>

          <Script src="https://unpkg.com/node-vibrant@3.1.5/dist/vibrant.min.js"></Script>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
