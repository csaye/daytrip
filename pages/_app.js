import Head from 'next/head';
import Image from 'next/image';
import '../styles/globals.css';
import '../styles/vars.css';
import styles from '../styles/App.module.css';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Daytrip</title>
        <meta name="description" content="Explore any area with a randomly generated one day trip." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Work%20Sans:300,600" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:600" rel="stylesheet" />
      </Head>
      <div className={styles.header}>
        <h1>Daytrip</h1>
        <Image src="/logo.png" width="40" height="40" alt="logo" />
      </div>
      <Component {...pageProps} />
    </>
  );
}
