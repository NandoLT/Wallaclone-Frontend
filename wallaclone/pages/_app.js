import '../styles/globals.css'
import '../styles/login.css'
import '../styles/register.css'
import '../styles/adverts.css'
import '@fontsource/roboto';
import configureStore from '../store';
import { Provider } from 'react-redux';
import storage from '../utils/storage';
import NavBar from '../components/NavBar';
import parseAuthToken from '../utils/parseAuthToken';
import { configureClient } from '../api/client';

const accessToken = storage.get('authToken');
if(accessToken) {
  configureClient(accessToken);
}
const userId = parseAuthToken(accessToken);
const store = configureStore({ preloadedState: { auth: !!accessToken, userId: userId } });




function MyApp({ Component, pageProps }) {



  return (
    <Provider store={store}>
      <NavBar/>
      <Component {...pageProps} />
    </Provider>


  )
}

export default MyApp
