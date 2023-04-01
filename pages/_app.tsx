
import { Provider } from 'react-redux';
import '../styles/main.scss';
import store from '../store';
import '../i18n'

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page)

  return <Provider store={store}>
    {getLayout(<Component {...pageProps} />)}
  </Provider>
}


export default App
