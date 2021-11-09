import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import '../public/fonts/fonts.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout data={pageProps.layout}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
