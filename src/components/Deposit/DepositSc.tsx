import Container from '@/Layout/Container/Container';
import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import styles from './DepositSc.module.scss';
import { backIcon, copyIcon, DoneIcon, EtheriumIcon, NapaBlueBgIcon, UsdtYellowBgIcon, WalletNeedsToConnected } from '../assets';
import { useRouter } from 'next/router';
import Select from 'react-select';
import QRCode from 'react-qr-code';
import BgHighlightButton from '../BgHighlightButton/BgHighlightButton';
import useWebThree from '@/hooks/useWebThree';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import Image from 'next/image';
const DepositSc = () => {
  const optionsone = [
    {
      value: '0',
      label: (
        <div className="cstm_napa_slct">
          <Image src={NapaBlueBgIcon} alt="" width="20px" height="20px" />
          NAPA
        </div>
      ),
    },
    {
      value: '1',
      label: (
        <div className="cstm_napa_slct">
          <Image src={UsdtYellowBgIcon} alt="" width="20px" height="20px" />
          USDT
        </div>
      ),
    },
    {
      value: '2',
      label: (
        <div className="cstm_napa_slct">
          <Image src={EtheriumIcon} alt="" width="20px" height="20px" />
          ETH
        </div>
      ),
    },
  ];
  const { push } = useRouter();
  const [currencyType, setCurrencyType] = React.useState<any>({
    ...optionsone[0],
  });

  const [type, setType] = useState('Ethereum')
  const { napaWalletAccount, metaMaskAccount } = useWebThree()
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if(!napaWalletAccount?.activeWalletAC) {
      toast.error(
        CustomToastWithLink({
          icon: WalletNeedsToConnected,
          title: 'NAPA Wallet Needs to Be Connected',
          description: 'Please connect your NAPA Wallet.',
          time: 'Now',
        })
      );
      push('/wallet-selector')
    }
    setTimeout(() => { 
      setShowing(true);
    }, 700);
  }, [])

  if (!showing) {
    return <></>;
  }
  
  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <div onClick={() => push('/napa-wallet')} className={styles.backBtn}>
          <img width={20} height={15} src={backIcon} alt="" />
          <span>Wallet</span>
        </div>
        <div className={styles.settings}>
          <h1>Deposit</h1>
        </div>
        <div style={{display:'flex', justifyContent:'center', paddingBottom:'42px'}} >
          <div style={{ display: 'flex', justifyContent: 'space-between', width:'34%'}}>
            <BgHighlightButton title="Ethereum" setSelectedValue={() => setType('Ethereum')} value="Ethereum" selectedValue={type} disabled={false} />
            <BgHighlightButton title="Polygon" setSelectedValue={() => setType('Polygon')} value="Polygon" selectedValue={type} disabled={true} />
            <BgHighlightButton title="BNB Chain" setSelectedValue={() => setType("BNB Chain")} value="BNB Chain" selectedValue={type} disabled={true}  />
          </div>
        </div>
        <div className={styles.qrContainer}>
          <div
            style={{ position: 'relative', border: 'none' }}
            className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
          >
            <p className={styles.ClctionTxt}>Select Token</p>
            <Select
              options={optionsone}
              // menuIsOpen={true}
              className="select_pernt select_pernt_v2"
              placeholder="Select Token"
              classNamePrefix="cntrslct"
              onChange={(selectedOption) =>
                //@ts-ignore
                setCurrencyType(selectedOption)
              }
              value={currencyType}
            />
          </div>
          <div className={styles.qrSection}>
            <p>NAPA Wallet Address</p>
            <QRCode
              value={JSON.stringify(
                // @ts-ignore
                { walletAddress : (napaWalletAccount?.activeWalletAC || metaMaskAccount) })}
              // size={180}
              // style={{ width: '100%', height: '100%' }}
              bgColor="#111919"
              fgColor="#16E6EF"
            />
            
            <p>{
            // @ts-ignore
            napaWalletAccount?.activeWalletAC || metaMaskAccount}</p>
            <img src={copyIcon} alt="" onClick={async ()=>{
              // @ts-ignore
              await navigator.clipboard.writeText(napaWalletAccount?.activeWalletAC || metaMaskAccount)
              toast.success(
                CustomToastWithLink({
                  icon: DoneIcon,
                  title: 'Success',
                  description: "Wallet address copied to clipboard",
                  time: 'Now',
                })
              );
            }}/>
          </div>
        </div>
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
};

export default DepositSc;