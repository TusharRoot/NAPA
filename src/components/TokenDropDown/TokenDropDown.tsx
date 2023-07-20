import React from 'react';
import styles from './TokenDropDown.module.scss';
import { NextPage } from 'next';
import { ArrowDownIcon, DoneIcon } from '../assets';

type TokenDropDown = {
  handleDropdownToggle?: any;
  accountData?: any;
  selectedOption?: any;
  handleOptionSelect?: any;
  isOpen?: boolean;
  selected?: any;
  selectToken?: any;
};

const TokenDropDown: NextPage<TokenDropDown> = ({
  handleDropdownToggle,
  accountData,
  selectedOption,
  handleOptionSelect,
  isOpen,
}) => {
  return (
    <div style={{ width: 280 }} className={styles.customdropdown}>
      <button
        style={{ width: 250 }}
        className={`${styles.dropdowntoggle} ${isOpen && styles.actionbutton}`}
        onClick={() => handleDropdownToggle()}
      >
        <span style={{ fontSize: 24, width: 230, fontFamily: "Avenir" }}>
          {selectedOption.label}
          <img height={13} width={13} style={{marginRight: 20}} src={ArrowDownIcon} alt="" />
        </span>
      </button>
      {isOpen && (
        <ul style={{ width: 250 }} className={styles.dropdownoptions}>
          {accountData?.map((value: any, index: number) => {
            return (
              <li key={index} onClick={() => handleOptionSelect(value)}>
                {value && selectedOption.label == value.label ? (
                  <span className={styles.selectedDropdowOption}>
                    {value.label}
                    <img src={DoneIcon} alt="" />
                  </span>
                ) : (
                  <span className={styles.selectHoverOption}>
                    {value.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TokenDropDown;
