import Head from 'next/head';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import LiveStreamDetailsSc from '../components/LiveStreamDetails/LiveStreamDetailsSc';

const LiveStreamDetails: NextPage = () => {
  return (
    <>
      <Head>
        <title>NAPA Society | Livestream</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        className={`${styles.container} lvstreams-detail`}
        id="earn-container"
      >
        <div className={`${styles.child} earnpage `} id="scrollElement">
          <LiveStreamDetailsSc />
        </div>
      </section>
    </>
  );
};

export default LiveStreamDetails;
