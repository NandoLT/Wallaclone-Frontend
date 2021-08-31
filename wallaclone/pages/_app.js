import '../styles/globals.css'
import '../styles/login.css'
import '../styles/login-form.css'
import '../styles/register-form.css'
import '../styles/register.css'
import '../styles/adverts.css'
import '../styles/dashboard2.css'
import '../styles/pagination.css'
import '@fontsource/roboto';
import configureStore from '../store';
import { Provider } from 'react-redux';
import storage from '../utils/storage';
import NavBar from '../components/NavBar';
import { configureClient } from '../api/client';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme.js'
import { useRouter } from 'next/router'

const accessToken = storage.get('authToken');
console.log(accessToken);
const recoverToken = storage.get('recoverToken');
if (accessToken && !recoverToken) {
  configureClient(accessToken.replace(/['"]+/g, ''));
} else if (!accessToken && recoverToken) {
  configureClient(recoverToken.replace(/['"]+/g, ''));
}

const store = configureStore({ preloadedState: { auth: !!accessToken } });




function MyApp({ Component, pageProps }) {

  const { pathname } = useRouter();


  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {pathname != '/login' ? pathname != '/register' ? <NavBar /> : '' : ''}
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>


  )
}

export default MyApp
