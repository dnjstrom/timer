import type { AppProps } from 'next/app';
import '@styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="viewport" content="initial-scale=1, width=device-width, viewport-fit=cover" />
        <link rel="manifest" href="manifest.json" />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}
