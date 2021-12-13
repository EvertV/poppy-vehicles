import Head from "next/head";
import type { AppProps } from "next/app";

import { ChakraProvider } from '@chakra-ui/react'

import { Global, css } from '@emotion/react'
import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}
const theme = extendTheme({ colors })

const GlobalStyles = css`
  html {
    font-family: "Quiet Sans Regular", sans-serif;
    color: #181818;
  }
  body {
    height: 100vh;
  }
  .sr-only {
    display: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
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
