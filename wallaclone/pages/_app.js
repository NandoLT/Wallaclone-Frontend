import '../styles/globals.css'
import '../styles/login.css'
import '../styles/register.css'
import '../styles/adverts.css'
import '@fontsource/roboto';
import configureStore from '../store';
import { Provider } from 'react-redux';
import storage from '../utils/storage';

const accessToken = storage.get('authToken');
const store = configureStore({ preloadedState: { auth: !!accessToken } });

function MyApp({ Component, pageProps }) {



  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>


  )
}

export default MyApp
