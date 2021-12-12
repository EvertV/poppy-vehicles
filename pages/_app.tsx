import Head from "next/head";
import type { AppProps } from "next/app";

import '../styles/global.css'

import "the-new-css-reset/css/reset.css"
import { Global, css } from '@emotion/react'

const GlobalStyles = css`
  html {
    font-family: "Quiet Sans Regular", sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Quiet Sans Regular", sans-serif;
    font-weight: 600;
  }

  h1 {
    font-size: 24pt;
  }

  h2 {
    font-size: 20pt;
  }

  h3 {
    font-size: 18pt;
  }
  
  h4, h5, h6 {
    font-size: 16pt;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
