import { useEffect } from "react";
import "../styles/custom.css";
import store from '../store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require('bootstrap/dist/css/bootstrap.css');
  },[])

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
export default MyApp;
