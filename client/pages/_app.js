import '../styles/globals.css'
import Head from 'next/Head'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import store from '../store/store'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>Apes collab</title>
        <link rel="icon" type="image/png" sizes="100x100" href="favicon.png"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Provider store = {store}>
        <Component {...pageProps} />
      </Provider>
    </>
  ) 
}

export default MyApp
