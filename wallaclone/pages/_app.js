import '../styles/globals.css'
import '../styles/navbar.css'
import '../styles/login.css'
import '../styles/login-form.css'
import '../styles/register.css'
import '../styles/adverts.css'
import '@fontsource/roboto';
import configureStore from '../store';
import { Provider } from 'react-redux';
import storage from '../utils/storage';
import NavBar from '../components/NavBar';
import parseAuthToken from '../utils/parseAuthToken';
import { configureClient } from '../api/client';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple, orange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const accessToken = storage.get('authToken');
if (accessToken) {
  configureClient(accessToken);
}
const userId = parseAuthToken(accessToken);
const store = configureStore({ preloadedState: { auth: !!accessToken, userId: userId } });


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0fbfe6',
    },
    secondary: {
      main: '#0e6c81',
    },
  },
});




function MyApp({ Component, pageProps }) {



  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>


  )
}

export default MyApp
