import Container from '@/Layout/Container/Container';
import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import styles from './WithdrawalSc.module.scss';
import Image from 'next/image';
import {
  EtheriumIcon,
  NapaBlueBgIcon,
  UsdtYellowBgIcon,
  backIcon,
  WalletNeedsToConnected,
  ErrorIcon,
  napaGrayIcon,
} from '../assets';
// import { errors } from 'ethers';
import Select from 'react-select';
import Input from '../Input/Input';
import { useRouter } from 'next/router';
import BgHighlightButton from '../BgHighlightButton/BgHighlightButton';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import useWebThree from '@/hooks/useWebThree';
import { getCookie } from 'cookies-next';
// import { getNapaAccounts } from '@/services/napaAccounts';
// import { decryptString } from '@/utils/wallet';
import { fetchGasFees, getAllNFTsOfUser, getCustomTokenWalletBalance, getNativeTokenWalletBalance, getOtherTokenWalletBalance, getSendCustomToken, getSendNativeToken, getSpecificNFTsOfUser, sendNFT } from '@/services/AssetManagement';
// import useProfile from '@/hooks/useProfile';
import Loading from '../Loading/Loading';
import { getImportedTokens } from '@/services/Tokens';
import { numberWithCommas } from '@/utils/NumberWithCommas';
// import { getNapaAccounts } from '@/services/napaAccounts';
// import { getFees } from '@/utils/wallet';
const Token =  require("../../connectivity/abis/anyToken.json")
import { ethers } from "ethers";
import { originalNapatokenAddress } from '@/connectivity/addressHelpers/addressHelper';
import axios from 'axios';

const WithdrawalSc = () => {
  const { push } = useRouter();
 

  // const collectionValue = [
  //   {
  //     value: '0',
  //     label: (
  //       <div  className={styles.optionsContainer}>
  //          <div>
  //             <img className={styles.collectionImage} src={collectionNfts} alt="" />
  //          </div>
  //          <div className={styles.collectionTextContainer}>
  //             <div><span className={styles.collectionOptionText1}>Expulsion from Paradise</span></div>
  //             <div><span className={styles.collectionOptionText2}>237 NFT's</span></div>
  //          </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     value: '1',
  //     label: (
  //       <div  className={styles.optionsContainer}>
  //          <div>
  //             <img className={styles.collectionImage} src={collectionNfts} alt="" />
  //          </div>
  //          <div className={styles.collectionTextContainer}>
  //             <div><span className={styles.collectionOptionText1}>Expulsion from Paradise</span></div>
  //             <div><span className={styles.collectionOptionText2}>237 NFT's</span></div>
  //          </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     value: '2',
  //     label: (
  //       <div  className={styles.optionsContainer}>
  //          <div>
  //             <img className={styles.collectionImage} src={collectionNfts} alt="" />
  //          </div>
  //          <div className={styles.collectionTextContainer}>
  //             <div><span className={styles.collectionOptionText1}>Expulsion from Paradise</span></div>
  //             <div><span className={styles.collectionOptionText2}>237 NFT's</span></div>
  //          </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     value: '3',
  //     label: (
  //       <div  className={styles.optionsContainer}>
  //          <div>
  //             <img className={styles.collectionImage} src={collectionNfts} alt="" />
  //          </div>
  //          <div className={styles.collectionTextContainer}>
  //             <div><span className={styles.collectionOptionText1}>Expulsion from Paradise</span></div>
  //             <div><span className={styles.collectionOptionText2}>237 NFT's</span></div>
  //          </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     value: '4',
  //     label: (
  //       <div  className={styles.optionsContainer}>
  //          <div>
  //             <img className={styles.collectionImage} src={collectionNfts} alt="" />
  //          </div>
  //          <div className={styles.collectionTextContainer}>
  //             <div><span className={styles.collectionOptionText1}>Expulsion from Paradise</span></div>
  //             <div><span className={styles.collectionOptionText2}>237 NFT's</span></div>
  //          </div>
  //       </div>
  //     ),
  //   },
  // ];
  // const [currencyType, setCurrencyType] = React.useState<any>();
  const [nfttype, setNFTType] = React.useState<any>();
  const [snfttype, setSNFTType] = React.useState<any>();
  const [address, setAddress] = React.useState('');
  const [ammount, setammount] = useState<any>('');
  const [type, setType] = useState<any>('Tokens')
  const [showing, setShowing] = useState(false);
  const { napaWalletAccount } = useWebThree()
  // const [privateKey, setPrivateKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [dynamic, setdynamic] = useState<any>()
  const [napaDropdownValue, setNapaDropdownValue] = useState<any>();
  const [gasFeesLoading, setGasFeesLoading] = useState(false)
  const [gasFees, setGasFees] = useState('')
  // const [collectinType, setCollectinType] = useState('')
  const [nfts, setNfts] = useState<any[]>([
    {
      tokenId: '',
      shortContractAddress: '',
      contractAddress: '',
      id: '',
      name: '',
      description: '',
      attributes: '',
      image: '',
      onSold: '',
      avatar: '',
      amount:'',
    },
  ]);
  const [snfts, setSnfts] = useState<any[]>([
    {
      tokenId: '',
      shortContractAddress: '',
      contractAddress: '',
      id: '',
      name: '',
      description: '',
      attributes: '',
      image: '',
      onSold: '',
      avatar: '',
    },
  ]);
  
  // const { profileId } = useProfile()

  // const handleGetNapaWalletPrivateKey = async () => {
  //   let activeAccountPK:any
  // //   @ts-ignore
  //   const { data }: any = await getNapaAccounts(profileId);
  //   if(data?.data)
  //   {
  //         const activeWalletAC = data?.data?.activeWalletAC
  //         activeAccountPK = data?.data[`NWA_${activeWalletAC}_PK`]
  //   }        
  //     return decryptString(activeAccountPK)
  // }

  const [networkType, setNetworkType] = useState<any>()

  const handleSendNativeToken = async () => {
    setLoading(true);
    if (!address) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Send Address is Required',
          time: 'Now',
        })
      );
      setLoading(false);
      return;
    }
    if (!ammount) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Ammount is Required',
          time: 'Now',
        })
      );
      setLoading(false);
      return;
    }
    if (Number(ammount) > Number(napaDropdownValue?.balance)) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Not Enough Funds in Account for Transaction',
          time: 'Now',
        })
      );
      setLoading(false);
      return;
    }
   else {
     // const privateKey = await handleGetNapaWalletPrivateKey()
    const walletNetwork = getCookie('networkType')
    // @ts-ignore
    const { data, error, message } = await getSendNativeToken(walletNetwork, napaWalletAccount?.profileId, address, ammount)
    if(error)
    {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      setLoading(false)
      return
    }
    // setTokenType(null)
    setAddress('')
    setammount('')
    setLoading(false)
    push('/napa-wallet')
   }
  }

  const handleSendCustomToken = async () => {
    setLoading(true)
    // const privateKey = await handleGetNapaWalletPrivateKey()
    const walletNetwork = getCookie('networkType')
    if(!address) {
     toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Send Address is Required',
          time: 'Now',
        })
      );
      setLoading(false);
      return
    }
    if(!ammount) {
       toast.error(
         CustomToastWithLink({
           icon: ErrorIcon,
           title: 'Error',
           description: 'Ammount is Required',
           time: 'Now',
         })
       );
       setLoading(false);
       return;
    }
    if(Number(ammount) > Number(napaDropdownValue?.balance)) {
       toast.error(
         CustomToastWithLink({
           icon: ErrorIcon,
           title: 'Error',
           description: 'Not Enough Funds in Account for Transaction',
           time: 'Now',
         })
       );
       setLoading(false);
       return
    }
    else {
      // @ts-ignore
    const { data, error, message } = await getSendCustomToken(napaWalletAccount?.profileId, walletNetwork, napaDropdownValue?.tokenAddresses, address, ammount)
    if(error)
    {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      setLoading(false)
      return
    }
    // setTokenType(null)
    setAddress('')
    setammount('')
    setLoading(false)
    push('/napa-wallet')
}
  }

  const handleSendNFT = async () => {
    if(!address) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Send Address is Required',
          time: 'Now',
        })
      );
      setLoading(false);
      return;
   }
   
   if(!nfttype?.value) {
    toast.error(
      CustomToastWithLink({
        icon: ErrorIcon,
        title: 'Error',
        description: 'NFT is required',
        time: 'Now',
      })
    );
    setLoading(false);
    return;
 }
    setLoading(true)
    const {error, message} = await sendNFT(napaWalletAccount?.profileId, networkType, nfttype?.value?.tokenId, address, nfttype?.value?.contractAddress)
    if(error)
    {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      setLoading(false)
      return
    }
    setLoading(false)
    push("/napa-wallet")
  }
  const handleSendSNFT = async () => {
    if(!address) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Send Address is Required',
          time: 'Now',
        })
      );
      setLoading(false);
      return;
   }
   
   if(!snfttype?.value) {
    toast.error(
      CustomToastWithLink({
        icon: ErrorIcon,
        title: 'Error',
        description: 'SNFT is required',
        time: 'Now',
      })
    );
    setLoading(false);
    return;
 }
    setLoading(true)
    const {error, message} = await sendNFT(napaWalletAccount?.profileId, networkType, snfttype?.value?.tokenId, address, snfttype?.value?.contractAddress)
    if(error)
    {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      setLoading(false)
      return
    }
    setLoading(false)
    push("/napa-wallet")
  }
  const handleSendToken = () => {
    // const isEthImported = dynamic.find((d:any)=>d.tokenAddresses == "0xcBFa1C66e8875602F742626E577d2eDc0aFd629E")
    // if(!isEthImported)
    // {
    //   toast.error(
    //     CustomToastWithLink({
    //       icon: ErrorIcon,
    //       title: 'Error',
    //       description: "Ethereum is not imported",
    //       time: 'Now',
    //     })
    //   );
    //   return;
    // }
    // if(isEthImported && Number(numberWithCommas(isEthImported?.balance)) < 1)
    // {
    //   toast.error(
    //     CustomToastWithLink({
    //       icon: ErrorIcon,
    //       title: 'Error',
    //       description: "Not enough ethereum balance",
    //       time: 'Now',
    //     })
    //   );
    //   return;
    // }    
    if(napaDropdownValue?.name && (napaDropdownValue?.name != 'ETH' && napaDropdownValue?.name != 'SepoliaETH'))
    {
      handleSendCustomToken()
    }
    else {
      handleSendNativeToken()
    }
  }
  const sortNfts = (nfts: any) => {
   
    nfts.sort((a:any, b:any) => {
      const num1 = +a.tokenId;
      const num2 = +b.tokenId;
      // if (num1 < num2) return -1;
      // if (num1 > num2) return 1;
      // return 0;
      return num1 - num2;
    });
    return nfts;
  };
  const loadNFTs: () => Promise<object[]> = async () => {
  
    const walletNetwork:any = getCookie('networkType');
    setLoading(true);
    let dt: any = [];
    let newItems: any = [];
    try {
      const res = await getAllNFTsOfUser(
        walletNetwork,
        napaWalletAccount?.activeWalletAC
      );
      // @ts-ignore
      await Promise.all(
        // @ts-ignore
        res?.data?.data?.tokenData?.response?.result.map(async (data: any) => {
            console.log(data.media.original_media_url,"data")
            let splitted =
              data.token_address.slice(0, 6) +
              '...' +
              data.token_address.slice(38, data.token_address.length);
            let contractAddress = data.token_address;
            if(contractAddress == '0x94d407d1860841e9a531d754ec5a6de7d899113d')
            {
              return null
            }

            let ff = await data.token_uri;
            let meta: any = await axios.get(ff);
            let item = {
              tokenId: await data.token_id,
              shortContractAddress: splitted,
              contractAddress: data.token_address,
              id: await meta?.data?.id,
              name: await meta?.data?.name,
              description: await meta?.data?.description,
              attributes: await meta?.data?.attributes,
              image: await meta?.data?.image,
              avatar: data.media.original_media_url,
              amount: data?.amount,
              // onSold: isOnSold,
            };
            newItems.push(item);
            // }
          }
        )
      );
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      const sortedItems = sortNfts(newItems);
      setNfts(sortedItems);
      setLoading(false);
    }, 300);
    return dt;
  };

  const sortSNfts = (nfts: any) => {
    //@ts-ignore
    nfts.sort((a, b) => {
      const num1 = +a.tokenId;
      const num2 = +b.tokenId;
      // if (num1 < num2) return -1;
      // if (num1 > num2) return 1;
      // return 0;
      return num1 - num2;
    });
    return nfts;
  };
  const getSpecificNFTsOfUsers: () => Promise<object[]> = async () => {
    const walletNetwork = getCookie('networkType');
    console.log(walletNetwork);
    setLoading(true);
    let snftData: any = [];
    let newSnftItems: any = [];
    try {
      const res = await getSpecificNFTsOfUser(
        walletNetwork as string,
        napaWalletAccount?.activeWalletAC,
        '0x94d407D1860841E9a531D754ec5A6DE7D899113d'
        // "2",
        // "0x7975b9CF12B1599F4502a4A9759305405da58953",
        // "0x5DBa9fA28cB4E76aC617E2843C7a3e24efFA9eb2",
      );
      await Promise.all(
        // @ts-ignore
        res?.data?.data?.tokenData?.response?.result.map(
          async (data: any) => {
            let splitted =
              data.token_address.slice(0, 6) +
              '...' +
              data.token_address.slice(38, data.token_address.length);
            // let contractAddress = data.token_address;
            // console.log(
            //   nftAddress.toUpperCase() == contractAddress.toUpperCase(),
            //   'onsold1'
            // );
            // console.log(
            //   nftAddress.toUpperCase() !== contractAddress.toUpperCase() &&
            //   contractAddress.toUpperCase() !=
            //   '0X20BF1A09C7C7211EAD72DE3D96BC129CD2BFE743',
            //   'checker'
            // );
            let ff = await data.token_uri;
            let meta: any = await axios.get(ff);
            let item = {
              tokenId: await data.token_id,
              shortContractAddress: splitted,
              contractAddress: data.token_address,
              id: await meta?.data?.id,
              name: await meta?.data?.name,
              description: await meta?.data?.description,
              attributes: await meta?.data?.attributes,
              image: await meta?.data?.image,
              avatar: await meta?.data?.avatar,
            };
            newSnftItems.push(item);
          }
        )
      );
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      const sortedSnftsItems = sortSNfts(newSnftItems);
      setSnfts(sortedSnftsItems)
      setLoading(false);
    }, 300);
    console.log(nfts, "nfts")
    return snftData;
  };
  useEffect(() => {
    const getSpecificSNFTsOfUsers = async () => {
      await getSpecificNFTsOfUsers()
    }
    getSpecificSNFTsOfUsers()
  }, [])

  useEffect(() => {
    const handleNft = async () => {
      await loadNFTs();
    };
    handleNft();
  }, [napaWalletAccount]);
  useEffect(() => {
    const networkFromCookie = getCookie('networkType')
    if(networkFromCookie)
    {
      setNetworkType(networkFromCookie)
    }
    else (
      setNetworkType('1')
    )
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
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(networkType)
    {
      handleGetImportedTokens()
    }
  }, [networkType])
  
  
  const handleGetImportedTokens = async () => {
    setLoading(true);
    const walletNetwork = getCookie('networkType')
    const selectedToken: any = getCookie('selectedToken');
    const {
      data,
      error,
    }: // message
    any = await getImportedTokens(
      napaWalletAccount?.activeWalletAC,
      networkType
    );
    if (error) {
      setLoading(false);
          return;
        }   
    
    let modifiedList:any = []
    let otherTokens: any = []
    if (data?.data.length) {
      const tokensList = data?.data;
      await Promise.all(
        tokensList.map(async (token: any, index:number) => {
          if (token.tokenAddresses == originalNapatokenAddress) {
            // @ts-ignore
            const balanceData = await getNativeTokenWalletBalance(napaWalletAccount?.profileId, walletNetwork ? walletNetwork as string : chaiId);
            // @ts-ignore
            token.balance = (balanceData?.data?.data?.NativeTokenWalletBalance[0]?.balance || 0) / 10 ** 18
            modifiedList.push(token)
          }
          else if(token.symbol == 'ETH' || token.symbol == 'SepoliaETH') {
            // @ts-ignore
            const response = await getCustomTokenWalletBalance(walletNetwork ? walletNetwork as string : '5', napaWalletAccount?.profileId)
            // @ts-ignore
            token.balance = (response?.data?.data?.CustomTokenWalletBalance || 0) / 10 ** 18
            modifiedList.push(token)
          }
          else {
            otherTokens.push(token.tokenAddresses)
          }
          if(index == tokensList.length - 1)
          {
            // @ts-ignore
            const balanceData = await getOtherTokenWalletBalance(napaWalletAccount?.profileId, walletNetwork ? (walletNetwork as string) : chaiId, otherTokens.join(','));
            // @ts-ignore
            tokensList.filter((token)=>token.tokenAddresses != originalNapatokenAddress && token.symbol != 'ETH' && token.symbol != 'SepoliaETH').map((tokens, i) => {
              // @ts-ignore
              const token = balanceData?.data?.data?.OtherTokenWalletBalance.find((balanceToken: any) => balanceToken?.token_address?.toLowerCase() === tokens?.tokenAddresses?.toLowerCase() )
               modifiedList.push({
                   ...tokens,
                   balance: (token?.balance || 0)  / 10 ** 18
                 })
            })
          }
        })
      )
    }     
    const 
    test: any = []
    modifiedList.map((item: any, index: number) => {      
      test.push({
        tokenAddresses: item.tokenAddresses,
        balance: item.balance || 0,
        symbol: item.symbol,
        name:item.name || '',
        value: index,
        label: (
          <div className="cstm_napa_slct">
            <Image src={item?.name === "NAPA Society"  ? NapaBlueBgIcon : item?.symbol === "NAPA"  ? NapaBlueBgIcon : item?.name === "USDT" ? UsdtYellowBgIcon : EtheriumIcon} alt="" width="20px" height="20px" />
            <span>{item.symbol}</span>
            <span>{item.tokenAddresses}</span>
          </div>
        ),
      })
    })
    setdynamic(test)
    setLoading(false);
    const tokenName = test.find((v: any) => (v.symbol) == selectedToken)
    if(tokenName) {
      setNapaDropdownValue(tokenName);
    }
    else {
      setNapaDropdownValue(test[0]);
    }
  };

  const handleGetGasFees = async () => {
    const numberOfTokens = ethers.utils.parseUnits(ammount.toString(), 18);
    const params = {
      callData: {
        abi: JSON.stringify(Token),
        contractAddress: JSON.stringify(napaDropdownValue?.tokenAddresses),
        funcionName: JSON.stringify('transfer'),
        allParams: JSON.stringify([address, numberOfTokens]),
        chainId: networkType,
        // @ts-ignore
        profileId: napaWalletAccount?.profileId,
      },
    };
    setGasFeesLoading(true);
    // @ts-ignore
    const { data, error, message } = await fetchGasFees(params);
    // if (error) {
    //   toast.error(
    //     CustomToastWithLink({
    //       icon: ErrorIcon,
    //       title: 'Error',
    //       description: message,
    //       time: 'Now',
    //     })
    //   );
    // }
    setGasFeesLoading(false)
    // @ts-ignore
    setGasFees(data?.data?.transactionSuccess?.GasFeesInEther?.toString())
  };

  useEffect(()=> {
    if(!ammount)
    {
      setGasFees('')
    }
    if(address && ammount)
    {
      handleGetGasFees()
    }
  },[address,ammount])

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
          <h1>Withdrawal</h1>
        </div>

        <div className={styles.withdrawalContainer}>
          <div className={styles.withdrawalInnerContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <BgHighlightButton title="Tokens" setSelectedValue={() => setType('Tokens')} value="Tokens" selectedValue={type} />
              <BgHighlightButton title="NFT'S" setSelectedValue={() => setType('NFTS')} value="NFTS" selectedValue={type} />
              <BgHighlightButton title="SNFT'S" setSelectedValue={() => setType("SNFTS")} value="SNFTS" selectedValue={type} />
            </div>
            {
              type === 'Tokens' && (
                <div >
                  <div
                    style={{ position: 'relative', marginTop: '2rem', marginBottom: '2rem' }}
                    className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
                  >
                    <p className={styles.ClctionTxt}>Select Token</p>
                    <Select
                      options={dynamic}
                      // menuIsOpen={true}
                      className="select_pernt select_pernt_v2"
                      placeholder="Select Token"
                      classNamePrefix="cntrslct"
                      onChange={(selectedOption) =>{
                        setNapaDropdownValue(selectedOption)
                      }
                      }
                      value={napaDropdownValue}
                    />
                  </div>
                  <div
                    style={{ position: 'relative' }}
                    className={`${styles.FrstInput} frstinputsell`}
                  >
                    <Input
                      value={address}
                      type="text"
                      placeholder="0.00000001"
                      label="Address"
                      onChange={(e) => {
                        setAddress(e.target.value)
                      }}
                    />
                  </div>
                </div>
              )
            }
            {
              type === 'NFTS' && (
                <>
                  <div className={styles.dropdownContainer}>
                    <div
                      style={{ position: 'relative' }}
                      className={`${styles.FrstInput} frstinputsell`}
                    >
                      <Input
                        value={address}
                        type="text"
                        placeholder="0.00000001"
                        label="Address"
                        onChange={(e) => {
                          setAddress(e.target.value)
                        }}
                      />
                    </div>
                    {/* <div
                      style={{ position: 'relative' }}
                      className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
                    >
                      <p className={styles.ClctionTxt}>Select Collection</p>
                      <Select
                      // @ts-ignore
                        options={collectionValue}
                        className="select_pernt select_pernt_v2"
                        placeholder="Select Collection"
                        classNamePrefix="cntrslct"
                        onChange={(selectedOption) =>
                          //@ts-ignore
                          setCollectinType(selectedOption)
                        }
                        value={collectinType}
                      />
                    </div> */}
                  </div>
                  <div className={styles.dropdownContainer}>
                    <div
                      style={{ position: 'relative' }}
                      className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
                    >
                      <p className={styles.ClctionTxt}>Select NFT</p>
                      <Select
                      options={nfts?.map(nft => ({
                      value : nft,
                        label: (
                          <div  className={styles.optionsContainer} key={nft?.tokenId}>
                             <div style={{ minWidth: 50 }}>
                                <img className={styles.collectionImage} width={50} height={50} src={nft?.image || nft?.avatar} alt="" />
                             </div>
                             <div className={styles.collectionTextContainer}>
                                <div><span className={styles.collectionOptionText1}>{nft?.name}</span></div>
                                <div className={styles.iconTe}><span className={styles.napaGrayIcon}><img src={napaGrayIcon} alt="" /></span><span className={styles.collectionOptionText2}>{nft.amount}</span></div>
                             </div>
                          </div>
                        ),
                      }))}
                        className="select_pernt select_pernt_v2"
                        placeholder="Select NFT"
                        classNamePrefix="cntrslct"
                        onChange={(event) =>{
                          setNFTType(event)
                        }}
                        value={nfttype}
                      />
                    </div>
                  </div>
                </>
              )
            }
            {
              type === "SNFTS" && (
                <>
                  <div
                    style={{ position: 'relative' }}
                    className={`${styles.FrstInput} frstinputsell`}
                  >
                    <Input
                      value={address}
                      type="text"
                      placeholder="0.00000001"
                      label="Address"
                      onChange={(e) => {
                        setAddress(e.target.value)
                      }}
                    />
                  </div>
                  <div 

                  className={styles.dropdownContainer}    
                  >
                    {/* <br /> */}
                    {/* <div
                      style={{ position: 'relative', marginBottom: '2rem' }}
                      className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
                    >
                      <p className={styles.ClctionTxt}>Select Collection</p>
                      <Select
                        options={optionsone}
                        // menuIsOpen={true}
                        className="select_pernt select_pernt_v2"
                        placeholder="Select Collection"
                        classNamePrefix="cntrslct"
                        onChange={(selectedOption) =>
                          //@ts-ignore
                          setCurrencyType(selectedOption)
                        }
                        value={currencyType}
                      />
                    </div> */}
                    <div
                      // style={{ position: 'relative', marginTop: '-10px' }}
                      className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
                    >
                      <p className={styles.ClctionTxt}>Select SNFT</p>
                      <Select
                        options={snfts?.map(snft => ({
                          value : snft,
                                 label: (
                                   <div  className={styles.optionsContainer} key={snft?.tokenId}>
                                      <div style={{ minWidth: 50 }}>
                                         <img className={styles.collectionImage} width={50} height={50} src={snft?.image} alt="" />
                                      </div>
                                      <div className={styles.collectionTextContainer}>
                                         <div><span className={styles.collectionOptionText1}>{snft?.name}</span></div>
                                         <div className={styles.iconTe}><span className={styles.napaGrayIcon}><img src={napaGrayIcon} alt="" /></span><span className={styles.collectionOptionText2}>0.24</span></div>
                                      </div>
                                   </div>
                                 ),
                               }))}
                        // menuIsOpen={true}
                        className="select_pernt select_pernt_v2"
                        placeholder="Select SNFT"
                        classNamePrefix="cntrslct"
                        onChange={(event) =>
                          setSNFTType(event)
                        }
                        value={snfttype}
                      />
                    </div>
                  </div>
                </>
              )
            }
            {  (type === "Tokens") &&  (<div>
              <div className={styles.MiddleCont}>
                <label>Amount</label>
                <div className={styles.MiddleContInn}>
                  <input
                    type="text"
                    value={ammount}
                    placeholder="0.00000000"
                    onChange={(e) => {  
                      if (/^\d{0,9}(?:\.\d{0,8})?$/.test(e.target.value)) {
                        setammount(e.target.value);
                      }
                    }}
                  />
                  <span />
                  <p style={{width: 50}}>{napaDropdownValue?.symbol}</p>
                </div>
              </div>
            </div>)
            }
             {(type === "Tokens") &&(
   <div className={styles.totalBalanceContainer}>
   <div className={styles.totalBalanceText}>Total Available Balance: </div>
   <div className={styles.totalBalanceIconContainer}><img style={{ marginTop: '-6px', width: 25 }} src={napaDropdownValue?.name === "NAPA Society" ? NapaBlueBgIcon : napaDropdownValue?.name === "USDT" ? UsdtYellowBgIcon : EtheriumIcon} alt="" /><span style={{ paddingLeft: '10px' }}>{numberWithCommas(napaDropdownValue?.balance)}</span> </div>
 </div>

             ) } 
           {(type === "Tokens") &&
           ( <hr className={styles.line1} />)
          }
           {(type === "Tokens") &&

                             (<div className={styles.networkFeeContainer}>
          <div className={styles.networkText}>Network Fee</div>
                 <div className={styles.networkText}><img style={{ marginBottom: '5px', paddingRight: '5px', width: 25 }} src={EtheriumIcon} alt="" /> <span> {gasFeesLoading ? "Calculating" : (ammount && gasFees ? gasFees : 0)}</span></div>
                </div>)
           }
       
           
            { (type === "Tokens") &&(<div className={styles.networkFeeContainer}>
              <div className={styles.networkText1}>Recipient Will Recieve</div>
              <div className={styles.networkText1}><img style={{ marginBottom: '5px', paddingRight: '5px', width: 25 }} src={napaDropdownValue?.name === "NAPA Society" ? NapaBlueBgIcon : napaDropdownValue?.name === "USDT" ? UsdtYellowBgIcon : EtheriumIcon} alt="" /><span> {ammount || 0}</span></div>
            </div>)}
            
            <div>
              
              <div className={styles.BottomAction}>
                {/* <Button text="Withdraw" outlined /> */}
                <button onClick={() => {
                  if(gasFeesLoading)
                  {
                    return
                  }
                  if(type == 'Tokens')
                  {
                    handleSendToken()
                  }
                  if(type == 'NFTS')
                  {
                    handleSendNFT()
                  }
                  if(type === "SNFTS")
                  {
                    handleSendSNFT()
                  }
                 }} className={styles.actionBtn}>Withdraw</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {
        loading &&  <Loading/>
      }
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
};

export default WithdrawalSc;
