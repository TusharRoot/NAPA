import React from 'react';
import styles from './LogoutAlertModal.module.scss';

const LogoutAlertModal = (props: any) => {
  const { userYes, userNo } = props;
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.deleteAccountContainer}>
        <h1 className={styles.deleteAccountheading}>
          Your session has expired
        </h1>
        <div>
          <p className={styles.deleteAccountText}>
            You are about to be logged off, stay logged in or nah?
          </p>
        </div>
        <div className={styles.deleteAccountBtnContainer}>
          <button
            onClick={() => userYes()}
            className={styles.deleteAccountCancel}
          >
            Yes
          </button>
          <button
            onClick={() => userNo()}
            className={styles.deleteAccountDelete}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutAlertModal;
