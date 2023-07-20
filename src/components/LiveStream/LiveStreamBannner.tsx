import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './LiveStreamBanner.module.scss';
import Image from 'next/image';

export default function LiveStreamBannner() {
  return (
    <>
      <div className={styles.LiveStreamMain}>
        <div className={styles.LeftLiveStreamPad}>
          <h1 className={styles.LiveStreamPadDeflt}>NAPA Livestream</h1>
          <p>
            Stream live with NAPA Livestream and sell or auction off your phygitals in your livestream to create phygitals with value.
          </p>
        </div>
        <div className={styles.RightPlayBtn}>
          <Image
            src="/assets/images/play_button.png"
            alt=""
            width={340}
            height={340}
          />
        </div>
      </div>
    </>
  );
}
