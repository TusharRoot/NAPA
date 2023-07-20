import React from 'react';
import styles from './CustomDropDown.module.scss';
import { NextPage } from 'next';
import { ArrowDownIcon, DoneIcon } from '../assets';

type CustomDropDownProps = {
  handleDropdownToggle?: any;
  accountData?: any;
  selectedOption?: any;
  handleOptionSelect?: any;
  isOpen?: boolean;
  selected?: any;
  tokenList?: any;
  selectToken?: any;
};

const CustomDropDown: NextPage<CustomDropDownProps> = ({
  handleDropdownToggle,
  accountData,
  selectedOption,
  handleOptionSelect,
  isOpen,
  selected,
  tokenList,
}) => {
  return (
    <div
      style={{
        zIndex: typeof selected == 'number' ? 999 : 0,
        // width: 170,
      }}
      className={styles.customdropdown}
    >
      <button
        style={{  }}
        className={`${styles.dropdowntoggle} ${isOpen && styles.actionbutton}`}
        onClick={() => handleDropdownToggle()}
      >
        <span style={{ fontSize: 24 }}>
          {typeof selected == 'number'
            ? selectedOption[`NWA_${selected}_NE`]
            : selectedOption?.symbol}
          <img
            height={13}
            width={13}
            style={{ marginLeft: selected == 'number' ? 0 : 20 }}
            src={ArrowDownIcon}
            alt=""
          />
        </span>
      </button>
      {isOpen && (
        <ul style={{  }} className={styles.dropdownoptions}>
          {accountData?.map((value: any, index: number) => {
            if(value[`NWA_${index + 1}_ST`] && value[`NWA_${index + 1}_ST`] == '2')
            {
              return null
            }
            return (
              <li
                key={index}
                onClick={() => {
                  typeof selected == 'number'
                    ? handleOptionSelect(value, index)
                    : handleOptionSelect(tokenList[value?.value], index);
                }}
              >
                {typeof value.value == 'number' &&
                selectedOption?.value == index ? (
                  <span className={styles.selectedDropdowOption}>
                    {value.label}
                    <img src={DoneIcon} alt="" />
                  </span>
                ) : (
                  <span className={styles.selectHoverOption}>
                    {value.label}
                  </span>
                )}
                {value && selected == index + 1 ? (
                  <span className={styles.selectedDropdowOption}>
                    {value[`NWA_${index + 1}_NE`]}
                    <img src={DoneIcon} alt="" />
                  </span>
                ) : (
                  <span className={styles.selectHoverOption}>
                    {value[`NWA_${index + 1}_NE`]}
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

export default CustomDropDown;
