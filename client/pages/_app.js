import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import React from 'react';

import '../styles/globals.css';
import TopNav from '@components/TopNav';
React.useLayoutEffect = React.useEffect;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from '../context';
function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position="top-right" />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
