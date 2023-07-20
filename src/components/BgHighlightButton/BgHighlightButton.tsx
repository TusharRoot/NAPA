import React from 'react'
import styles from './BgHighlightButton.module.scss';
import type { NextPage } from 'next';



type BgHighlightButtonProps = {
    title: string;
    setSelectedValue: CallableFunction,
    value: string;
    selectedValue: string;
    disabled?: boolean
  };

const BgHighlightButton : NextPage <BgHighlightButtonProps> = ({title,setSelectedValue,value, selectedValue, disabled}) => {
    
  return (
         <button disabled={disabled} onClick={()=>setSelectedValue(value)} className={`${styles.actionBtn} ${selectedValue == value && styles.active}`}>{title}</button>
  )
}

export default BgHighlightButton