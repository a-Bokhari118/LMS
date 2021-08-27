import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import '../styles/globals.css';
import TopNav from '@components/TopNav';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopNav />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
