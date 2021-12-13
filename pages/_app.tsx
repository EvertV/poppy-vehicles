import Head from "next/head";
import type { AppProps } from "next/app";

import { ChakraProvider } from '@chakra-ui/react'

import { Global, css } from '@emotion/react'

const GlobalStyles = css`
  body {
    height: 100vh;
  }
  .sr-only {
    display: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Poppy</title>
        <meta name="description" content="A place to find all the Poppy vehicles." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
