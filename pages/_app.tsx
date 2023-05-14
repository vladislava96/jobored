import NextApp, { AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider as ReduxProvider } from 'react-redux';
import Header from '../components/Header/Header';
import './global.css';
import store from '../app/store';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <ReduxProvider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Header />
          <Component {...pageProps} />
          <Notifications />
        </MantineProvider>
      </ReduxProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return { ...appProps };
};
