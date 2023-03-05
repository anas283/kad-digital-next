import { useEffect } from "react";
import "../styles/custom.css";
import "../styles/dashboard.css";
import store from '../store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require('bootstrap/dist/css/bootstrap.css');
    require('bootstrap/dist/js/bootstrap.bundle.min');
    // require('slick-carousel/slick/slick.css');
    // require('slick-carousel/slick/slick-theme.css');
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
