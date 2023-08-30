import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/globals.css";
import "../public/fonts/fonts.css";
import { Layout } from "dak-components";
import { TranslationContext } from "dak-components/lib/components/TranslatedField";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const metadata = pageProps?.metadata;

  return (
    <TranslationContext.Provider value={pageProps.translations}>
      <CacheProvider value={emotionCache}>
        <Layout data={pageProps.layout}>
          <Head>
            {metadata && (
              <>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
              </>
            )}
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </StyledEngineProvider>
        </Layout>
      </CacheProvider>
    </TranslationContext.Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
