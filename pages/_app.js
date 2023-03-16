import { useEffect } from "react";
import "../styles/custom.css";
import "../styles/dashboard.css";
import "../styles/demo.css";
import "../styles/themes.css";
import store from '../store/store';
import { Provider } from 'react-redux';
import { Analytics } from '@vercel/analytics/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { appWithI18Next, useSyncLanguage } from "ni18n";
import { ni18nConfig } from '../ni18n.config';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require('bootstrap/dist/css/bootstrap.css');
    require('bootstrap/dist/js/bootstrap.bundle.min');
    require('slick-carousel/slick/slick.css');
    require('slick-carousel/slick/slick-theme.css');
    AOS.init();
  },[])

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        {/* <Analytics /> */}
      </Provider>
    </>
  );
}
export default appWithI18Next(MyApp, ni18nConfig);
