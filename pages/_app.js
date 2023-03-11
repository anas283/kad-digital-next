import { useEffect } from "react";
import "../styles/custom.css";
import "../styles/dashboard.css";
import "../styles/demo.css";
import "../styles/themes.css";
import store from '../store/store';
import { Provider } from 'react-redux';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require('bootstrap/dist/css/bootstrap.css');
    require('bootstrap/dist/js/bootstrap.bundle.min');
    require('slick-carousel/slick/slick.css');
    require('slick-carousel/slick/slick-theme.css');
  },[])

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        <Analytics />
      </Provider>
    </>
  );
}
export default MyApp;
