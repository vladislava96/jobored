import NextApp, { AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider as ReduxProvider } from 'react-redux';
import Header from '../components/Header/Header';
import './global.scss';
import store from '../app/store';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Jobored</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <ReduxProvider store={store}>
        <MantineProvider
          withNormalizeCSS
          theme={{
            globalStyles: () => ({
              '*': {
                boxSizing: 'border-box',
                padding: '0',
                margin: '0',
              },
              body: {
                color: '#232134',
                backgroundColor: '#F7F7F8',
              },
              a: {
                color: 'inherit',
                textDecoration: 'none',
              },
            }),
          }}
        >
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
