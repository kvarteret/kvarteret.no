import "../styles/globals.css";
import "../public/fonts/fonts.css";
import "../public/fonts/kvartereticons.css";
import Script from "next/script";
import { Layout } from "dak-components";
import { TranslationContext } from "dak-components/lib/components/TranslatedField";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TranslationContext.Provider value={pageProps.translations}>
      <Layout data={pageProps.layout}>
        <Script src="https://unpkg.com/node-vibrant@3.1.5/dist/vibrant.min.js"></Script>
        {pageProps?.layout?.scripts?.map((x, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: x.script }} />
        ))}
        <Component {...pageProps} />
      </Layout>
    </TranslationContext.Provider>
  );
}

export default MyApp;
