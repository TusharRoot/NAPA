import Container from '@/Layout/Container/Container';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Footer/Footer';
import styles from './WalletSettingsSc.module.scss';
import {
  AthereumBlack,
  DoneIcon,
  EyeIcon,
  NapaIconv2,
  PlusIconWhite,
  SearchIcon,
  backIcon,
  // currencyEthereum,
  deleteIcon,
  shearWhiteIcon,
  userIconBlack,
  //   userIconWhite,
  ErrorIcon,
  UsdtYellowBgIcon,
} from '../assets';
// import { errors } from 'ethers';
import { useRouter } from 'next/router';
import Input from '../Input/Input';
import {
  addNapaAccount,
  deleteNapaAccount,
  getNapaAccounts,
  importNapaAccount,
  switchNapaAccount,
} from '@/services/napaAccounts';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { getCookie, setCookie } from 'cookies-next';
import Loading from '../Loading/Loading';
import { WEBSOCKET_URL } from '../../constants/url';
import useProfile from '@/hooks/useProfile';
import useWebThree from '@/hooks/useWebThree';
import { addStreamAddress, getAllNFTsOfUser, getNativeTokenWalletBalance, getSpecificNFTsOfUser } from '@/services/AssetManagement';
import { getImportedTokens } from '@/services/Tokens';
import { numberWithCommas } from '@/utils/NumberWithCommas';
// import { nftAddress } from '@/connectivity/addressHelpers/addressHelper';
import moment from 'moment';
import { originalNapatokenAddress } from '@/connectivity/addressHelpers/addressHelper';

const WalletSettingsSc = () => {
  const { push } = useRouter();
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [accountDetailsModal, setAccountDetailsModal] = useState(false);
  const [importAccountModal, setImportAccountModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [account, setAccount] = useState('');
  // const [accountDetails, setAccountDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [napaAccounts, setNapaAccounts] = useState<any>([]);
  const [currentActive, setCurrentActive] = useState(0);
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentAccountActive, setCurrentAccountActive] = useState('');
  const [totalNafts, setTotalNafts] = useState<number>();
  const [totalSNafts, setTotalSNafts] = useState<number>();
  const { profileId } = useProfile();
  const { setNapaWalletAccount, napaWalletAccount } = useWebThree();
  const [ napaAccountBalance, setNapaAccountBalance ] = useState('');
  const [collections, setCollections] = useState<any>([]);
  const [createdAt, setCreatedAt] = useState<any>();
  const [addAccountError,setAddAccountError] = useState <any>('');
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const walletNetwork: any = getCookie('networkType');
    const tokenImport = async () => {
      setNapaAccountBalance('')
       const {
         data,
       }: // message
       any = await getImportedTokens(
         // @ts-ignore
         napaWalletAccount.activeWalletAC,
         walletNetwork
       );
       if (data) {
         const tokenAddress = data?.data.find(
           (item: any) => item.tokenAddresses == originalNapatokenAddress
         );
         if (tokenAddress) {
           const response = await getNativeTokenWalletBalance(
             napaWalletAccount?.profileId,
             walletNetwork as string
           );
           //@ts-ignore
           setNapaAccountBalance((response?.data?.data?.NativeTokenWalletBalance[0]?.balance || 0) / 10 ** 18);
         }
       }
        }
     tokenImport()
  }, [napaWalletAccount])

 


  const handleGetNapaAccounts = async (profileId: string) => {
    setLoading(true);
    const { data, error, message }: any = await getNapaAccounts(profileId);
    if (error) {
      setLoading(false);
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      return;
    }
    setCurrentActive(Number(data?.data?.activeWalletAC));
    const account = Array.from({ length: 5 }).reduce((acc: any, _, i) => {
      if (data.data[`NWA_${i + 1}_AC`]) {
        acc.push({
          [`NWA_${i + 1}_AC`]: data.data[`NWA_${i + 1}_AC`],
          [`NWA_${i + 1}_NE`]: data.data[`NWA_${i + 1}_NE`],
          [`NWA_${i + 1}_PK`]: data.data[`NWA_${i + 1}_PK`],
          [`NWA_${i + 1}_ST`]: data.data[`NWA_${i + 1}_ST`],
          [`NWA_${i + 1}_Type`]: data.data[`NWA_${i + 1}_Type`],
          [`NWA_${i + 1}_CreatedAt`]: data.data[`NWA_${i + 1}_CreatedAt`],
        });
      }
      return acc;
    }, []);
    setNapaAccounts(account);
    setLoading(false);
  };
  const loadNFTs = async () => {
    setCollections([])
    const walletNetwork: any = getCookie('networkType');
    setLoading(true);
    try {
      const res: any = await getAllNFTsOfUser(
        // '1',
        // '0xB9B1ccef38Eec50f78801ABA7c5d1aa6438e3ff8'
        walletNetwork,
        napaWalletAccount?.activeWalletAC
      );
      setTotalNafts(res?.data?.data?.tokenData?.response?.result?.filter((t:any)=>t.token_address != '0x94d407d1860841e9a531d754ec5a6de7d899113d')?.length);
      res?.data?.data?.tokenData?.response?.result?.filter((t:any)=>t.token_address != '0x94d407d1860841e9a531d754ec5a6de7d899113d')?.map((t:any)=>{
          setCollections((prev:any)=> {
            if(!prev.includes(t.token_address))
            {
              return [...prev, t.token_address]
            }
            else {
              return [...prev]
            }
          })
      })
      
    } catch (e) {
      console.log(e);
    }
  };
  const getSpecificNFTsOfUsers = async () => {
    const walletNetwork:any = getCookie('networkType');
    setLoading(true);
    try {
      const res:any = await getSpecificNFTsOfUser(
        walletNetwork,
        napaWalletAccount?.activeWalletAC,
        '0x94d407D1860841E9a531D754ec5A6DE7D899113d'
        );
        setTotalSNafts(res.data.data.tokenData.response.result.length)
      } catch (e) {
        console.log(e);
      }
    };
    
    useEffect(()=>{
      const getSpecificSNFTsOfUsers = async ()=>{
        await getSpecificNFTsOfUsers()
      }
      getSpecificSNFTsOfUsers()
    },[napaWalletAccount])


  useEffect(() => {
    const handleNft = async () => {
      await loadNFTs();
    };
    handleNft();
  }, [napaWalletAccount]);
  useEffect(() => {
    const data: any = getCookie('profileId');
    if (data) {
      handleGetNapaAccounts(data);
    }
  }, []);

  useEffect(() => {
    if(profileId && socketRef.current == null)
    {
      socketRef.current = new WebSocket(WEBSOCKET_URL);
      socketRef.current.addEventListener('message', async ({ data }:any) => {
        const response = JSON.parse(data);
        if (response?.event === `new-napa-account-${profileId}`) {
          const data: any = getCookie('profileId');
          if (data) {
            handleGetNapaAccounts(data);
          }
        }
        if (response.event === `switch-to-new-napa-account-${profileId}`) {
          const activeWalletAC = response?.account?.activeWalletAC;
          setCookie(
            'napaWalletAccount',
            JSON.stringify({
              profileId: response?.account?.profileId,
              activeWalletAC: response?.account[`NWA_${activeWalletAC}_AC`],
            })
          );
          setNapaWalletAccount(
            {
              profileId: response?.account?.profileId,
              activeWalletAC: response?.account[`NWA_${activeWalletAC}_AC`],
            } || ''
          );
          setCurrentActive(activeWalletAC);
          await addStreamAddress(response?.account[`NWA_${activeWalletAC}_AC`]);
          setLoading(false);
        }
        if (response.event === `delete-napa-account-${profileId}`) {
          handleGetNapaAccounts(profileId);
        }
      });
    }
    return () => {
      if(socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [profileId]);

  const handleAddAccount = async () => {
    if (!account) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Enter Account Name',
          time: 'Now',
        })
      );
      return;
    }
    setLoading(true);
    const { error, message }: any = await addNapaAccount(
      napaWalletAccount?.profileId,
      account,
      napaAccounts.length
    );
    if (error) {
      setLoading(false);
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      return;
    }
    setAccount('');
    setOpenAccountModal(!openAccountModal);
    setLoading(false);
  };

  const handleImportAccount = async () => {
    if (!account) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Enter Account Name',
          time: 'Now',
        })
      );
      return;
    }
    if (!privateKey) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Enter Private Key',
          time: 'Now',
        })
      );
      return;
    }
    setLoading(true);
    const { error, message }: any = await importNapaAccount(
      napaWalletAccount?.profileId,
      account,
      privateKey
    );
    if (error) {
      setLoading(false);
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      return;
    }
    setAccount('');
    setPrivateKey('');
    setImportAccountModal(!importAccountModal);
    setLoading(false);
  };

  const handleSwitchAccount = async (acc: any, currentIndex: number) => {
    setLoading(true);
    const { error, message }: any = await switchNapaAccount(
      profileId,
      acc[`NWA_${currentIndex + 1}_AC`]
    );
    if (error) {
      setLoading(false);
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      return;
    }
    setLoading(false);
    setAccountDetailsModal(true);
    setOpenAccountModal(false);
    setImportAccountModal(false);
    setCurrencyModal(false);
    setDeleteAccountModal(false);
    setCurrentAccount(acc[`NWA_${currentIndex + 1}_NE`]);
    setCreatedAt(
      moment(acc[`NWA_${currentIndex + 1}_CreatedAt`]).format('DD MMM YYYY')
    );
    setCurrentAccountActive(acc[`NWA_${currentIndex + 1}_AC`]);
  };

  const deletedNapaAccount = async () => {
    console.log(profileId, 'profileId');
    console.log(currentAccountActive, 'currentAccountActive');
    setDeleteAccountModal(false);
    const { error, message }: any = await deleteNapaAccount(
      profileId,
      napaWalletAccount?.activeWalletAC
    );
    if (error) {
      setLoading(false);
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      return;
    }
  };

  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <div onClick={() => push('/napa-wallet')} className={styles.backBtn}>
          <img width={20} height={15} src={backIcon} alt="" />
          <span>Wallet</span>
        </div>
        <div className={styles.settings}>
          <h1>Settings</h1>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.walletSettings}>
            <div className={styles.walletSettingContainer}>
              <div className={styles.walletSetting}>
                {/* <div className={styles.accountContainer}>
                  <div
                    onClick={() => {
                      setAccountDetailsModal(!accountDetailsModal);
                      setOpenAccountModal(false);
                      setImportAccountModal(false);
                      setCurrencyModal(false);
                      setDeleteAccountModal(false);
                    }}
                    className={styles.accountImageEth}
                  >
                    <img src={userIconWhite} alt="" />
                  </div>
                  <div
                    onClick={() => {
                      setAccountDetailsModal(!accountDetailsModal);
                      setOpenAccountModal(false);
                      setImportAccountModal(false);
                      setCurrencyModal(false);
                      setDeleteAccountModal(false);
                    }}
                    className={styles.accountName}
                  >
                    Account 1
                  </div>
                </div> */}
                {napaAccounts &&
                  napaAccounts[0] &&
                  napaAccounts.map((acc: any, index: number) => {
                    if (
                      acc[`NWA_${index + 1}_ST`] &&
                      acc[`NWA_${index + 1}_ST`] == '2'
                    ) {
                      return null;
                    }
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          handleSwitchAccount(acc, index);
                        }}
                        className={styles.accountContainer2}
                      >
                        <div className={styles.accountImage2}>
                          <img src={userIconBlack} alt="" />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                        >
                          <div style={{ cursor: 'pointer', textAlign: 'left' }}>
                            <div className={styles.accountName2}>
                              {acc[`NWA_${index + 1}_NE`]}
                            </div>
                            <div className={styles.accountImportName2}>
                              {acc[`NWA_${index + 1}_Type`]}
                            </div>
                          </div>
                          {index + 1 == currentActive && (
                            <div style={{ color: 'red', paddingTop: '10px' }}>
                              <img src={DoneIcon} alt="" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                <div className={styles.accountContainer}>
                  <div
                    onClick={() => {
                      setOpenAccountModal(!openAccountModal);
                      setImportAccountModal(false);
                      setCurrencyModal(false);
                      setDeleteAccountModal(false);
                      setAccountDetailsModal(false);
                    }}
                    className={styles.accountImageBorder}
                  >
                    <img src={PlusIconWhite} alt="" />
                  </div>
                  <div
                    onClick={() => {
                      setOpenAccountModal(!openAccountModal);
                      setImportAccountModal(false);
                      setCurrencyModal(false);
                      setDeleteAccountModal(false);
                      setAccountDetailsModal(false);
                    }}
                    className={styles.accountName}
                  >
                    Add Account
                  </div>
                </div>
                <div className={styles.accountContainer}>
                  <div
                    onClick={() => {
                      setImportAccountModal(!importAccountModal);
                      setOpenAccountModal(false);
                      setCurrencyModal(false);
                      setDeleteAccountModal(false);
                      setAccountDetailsModal(false);
                    }}
                    className={styles.accountImageBorder}
                  >
                    {' '}
                    <img
                      width={'23px'}
                      height={'20px'}
                      src={shearWhiteIcon}
                      alt=""
                    />
                  </div>
                  <div
                    onClick={() => {
                      setImportAccountModal(!importAccountModal);
                      setOpenAccountModal(false);
                      setCurrencyModal(false);
                      setDeleteAccountModal(false);
                      setAccountDetailsModal(false);
                    }}
                    className={styles.accountName}
                  >
                    Import Account
                  </div>
                </div>
                <hr className={styles.line} />
                {/* <div className={styles.accountContainer}>
                  <div
                    onClick={() => {
                      setCurrencyModal(!currencyModal);
                      setImportAccountModal(false);
                      setOpenAccountModal(false);
                      setDeleteAccountModal(false);
                      setAccountDetailsModal(false);
                    }}
                    className={styles.accountImageBorder}
                  >
                    <img src={currencyEthereum} alt="" />
                  </div>
                  <div
                    onClick={() => {
                      setCurrencyModal(!currencyModal);
                      setImportAccountModal(false);
                      setOpenAccountModal(false);
                      setDeleteAccountModal(false);
                      setAccountDetailsModal(false);
                    }}
                    className={styles.currencyTypeContainer}
                  >
                    <div className={styles.accountName}>Currency</div>
                    <div className={styles.currencyType}>ETH</div>
                  </div>
                </div> */}
                <div className={styles.accountDeleteContainer}>
                  <div
                    onClick={() => {
                      setDeleteAccountModal(!deleteAccountModal);
                      setImportAccountModal(false);
                      setOpenAccountModal(false);
                      setCurrencyModal(false);
                      setAccountDetailsModal(false);
                    }}
                    className={styles.accountDeleteImage}
                  >
                    <img src={deleteIcon} alt="" />
                  </div>
                  <div
                    onClick={() => {
                      setDeleteAccountModal(!deleteAccountModal);
                      setImportAccountModal(false);
                      setOpenAccountModal(false);
                      setCurrencyModal(false);
                      setAccountDetailsModal(false);
                    }}
                    className={styles.accountDeleteName}
                  >
                    Delete Account
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.modalContainer}>
              {accountDetailsModal && (
                <div>
                  <div
                    style={{ position: 'relative' }}
                    className={styles.addAccount}
                  >
                    <h1>Account Details</h1>
                    <p className={styles.accountDetailsDate}>
                      Date Created: {createdAt}
                    </p>
                    <button
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: '2.5rem',
                      }}
                      onClick={() =>
                        setAccountDetailsModal(!accountDetailsModal)
                      }
                      className={styles.accountCloseButton}
                    >
                      x
                    </button>
                  </div>
                  <Input
                    type="text"
                    placeholder="0x9324415c4aBe898eFca6cBb0febd9f"
                    label="Name"
                    // value={accountDetails}
                    value={currentAccount}
                    onChange={() => {}}
                    disabled
                  />
                  <div
                    style={{ marginTop: '3rem' }}
                    className={styles.accountDetailsContainer}
                  >
                    <div className={styles.accountDetailsContainer}>
                      <div className={styles.accountDetailsTokens}>
                        <div className={styles.accountDetailTexContainer}>
                          <div className={styles.textContainer}>Tokens</div>
                          <div className={styles.accountDetailTexContainer1}>
                            <div className={styles.accountNumberBalance}>
                              {/* {numberWithCommas(napaAccountBalance as string || '0')} */}
                              <span>
                                {
                                  numberWithCommas(
                                    (napaAccountBalance as string) || '0'
                                  )
                                    .toString()
                                    .split('.')[0]
                                }
                              </span>
                              .
                              <span className={styles.tokenListBalance}>
                                {
                                  numberWithCommas(
                                    (napaAccountBalance as string) || '0'
                                  )
                                    .toString()
                                    .split('.')[1]
                                }
                              </span>
                              {/* {napaAccountBalance ? napaAccountBalance : 0} */}
                            </div>
                            <div className={styles.textAccount}>NAPA</div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ marginRight: '-17px' }}
                        className={styles.accountDetailsTokens}
                      >
                        <div className={styles.accountDetailTexContainer}>
                          <div className={styles.textContainer}>
                            Collections
                          </div>
                          <div className={styles.accountDetailTexContainer1}>
                            <div className={styles.accountNumber}>{collections?.length || 0}</div>
                            {/* <div className={styles.textAccount}>NAPA</div> */}
                          </div>
                        </div>
                      </div>
                      <div className={styles.accountDetailsCollection}></div>
                    </div>
                  </div>
                  <br />
                  <div className={styles.accountDetailsContainer}>
                    <div className={styles.accountDetailsContainer}>
                      <div className={styles.accountDetailsTokens}>
                        <div className={styles.accountDetailTexContainer}>
                          <div className={styles.textContainer}>NFT&apos;s</div>
                          <div className={styles.accountDetailTexContainer1}>
                            <div className={styles.accountNumber}>
                              {totalNafts || 0}
                            </div>
                            {/* <div className={styles.textAccount}>NAPA</div> */}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ marginRight: '-17px' }}
                        className={styles.accountDetailsTokens}
                      >
                        <div className={styles.accountDetailTexContainer}>
                          <div className={styles.textContainer}>
                            SNFT&apos;s
                          </div>
                          <div className={styles.accountDetailTexContainer1}>
                            <div className={styles.accountNumber}>{totalSNafts || 0}</div>
                            {/* <div className={styles.textAccount}>NAPA</div> */}
                          </div>
                        </div>
                      </div>
                      <div className={styles.accountDetailsCollection}></div>
                    </div>
                  </div>
                  {/* <button
                    // onClick={handleAddAccount}
                    className={styles.actionBtn}
                  >
                    Save
                  </button> */}
                </div>
              )}

              {openAccountModal && (
                <div>
                  <div className={styles.addAccount}>
                    <h1>Add Account</h1>
                    <button
                      onClick={() => {
                        setOpenAccountModal(!openAccountModal);
                        setAccount('');
                      }}
                    >
                      x
                    </button>
                  </div>
                  <Input
                    type="text"
                    placeholder="0x9324415c4aBe898eFca6cBb0febd9f"
                    label="Enter Account Name"
                    value={account}
                    onChange={(e: any) => {
                      const inputValue = e.target.value;
                      if (inputValue.length > 15) {
                        setAddAccountError(`Account name can't be greater than 15 character`);
                      } else {
                        setAccount(inputValue);
                        setAddAccountError('');
                      }
                    }}
                  />
                  <div style={{display:'flex',color:'red'}}><label>{addAccountError}</label></div>
                  <button
                    onClick={handleAddAccount}
                    className={styles.actionBtn}
                  >
                    Add
                  </button>
                </div>
              )}
              {importAccountModal && (
                <div>
                  <div className={styles.addAccount}>
                    <h1>Import Account</h1>
                    <button
                      onClick={() => setImportAccountModal(!importAccountModal)}
                    >
                      x
                    </button>
                  </div>
                  <Input
                    type="text"
                    placeholder="0x9324415c4aBe898eFca6cBb0febd9f"
                    label="Enter Account Name"
                    value={account}
                    onChange={(e: any) => setAccount(e.target.value)}
                  />

                  <div className={styles.pvtKeyContainer}>
                    <Input
                      type={showKey ? 'text' : 'password'}
                      placeholder="18"
                      label="Enter your private key string here"
                      value={privateKey}
                      onChange={(e: any) => setPrivateKey(e.target.value)}
                    />
                    <img
                      onClick={() => setShowKey(!showKey)}
                      className={styles.eyeBtn}
                      src={EyeIcon}
                      alt=""
                    />
                    <button
                      onClick={handleImportAccount}
                      className={styles.actionBtn}
                    >
                      Import
                    </button>
                  </div>
                </div>
              )}
              {currencyModal && (
                <div>
                  <div className={styles.addAccount}>
                    <h1>Select Currency</h1>
                    <button onClick={() => setCurrencyModal(!currencyModal)}>
                      x
                    </button>
                  </div>
                  <div className={styles.currencySerchContainer}>
                    <img
                      style={{ cursor: 'pointer' }}
                      src={SearchIcon}
                      alt=""
                    />
                    <input
                      className={styles.currencySerchText}
                      type="text"
                      placeholder="Search.."
                    />
                    {/* <div className={styles.currencySerchText}>Search..</div> */}
                  </div>
                  <div className={styles.currencyScrollContainer}>
                    {/* <div className={styles.currencyTextIconContainer}>
                      <div className={styles.currencyImg}>
                        <img src={Ripple} alt="" />
                      </div>
                      <div className={styles.currencyNameTextContainer}>
                        <div className={styles.currencyName}>Ripple</div>
                        <div className={styles.currencyTxt}>XRP</div>
                      </div>
                    </div> */}
                    <div className={styles.currencyTextIconContainer1}>
                      <div className={styles.currencyImg1}>
                        <img src={AthereumBlack} alt="" />
                      </div>
                      <div className={styles.currencyNameTextContainer1}>
                        <div>
                          <div className={styles.currencyName1}>Ethereum</div>
                          <div className={styles.currencyTxt1}>ETH</div>
                        </div>
                        <div>
                          <img src={DoneIcon} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className={styles.currencyTextIconContainer}>
                      <div className={styles.currencyImg}>
                        <img width={25} height={25} src={NapaIconv2} alt="" />
                      </div>
                      <div className={styles.currencyNameTextContainer}>
                        <div className={styles.currencyName}>NAPA</div>
                        <div className={styles.currencyTxt}>NAPA</div>
                      </div>
                    </div>
                    <div className={styles.currencyTextIconContainer}>
                      <div className={styles.currencyImg}>
                        <img
                          width={25}
                          height={25}
                          src={UsdtYellowBgIcon}
                          alt=""
                        />
                      </div>
                      <div className={styles.currencyNameTextContainer}>
                        <div className={styles.currencyName}>USDT</div>
                        <div className={styles.currencyTxt}>USDT</div>
                      </div>
                    </div>
                    {/* <div className={styles.currencyTextIconContainer}>
                      <div className={styles.currencyImg}>
                        <img src={Ape} alt="" />
                      </div>
                      <div className={styles.currencyNameTextContainer}>
                        <div className={styles.currencyName}>Bored Ape</div>
                        <div className={styles.currencyTxt}>BAYC</div>
                      </div>
                    </div> */}
                    {/* <div className={styles.currencyTextIconContainer}>
                      <div className={styles.currencyImg}>
                        <img src={Ape} alt="" />
                      </div>
                      <div className={styles.currencyNameTextContainer}>
                        <div className={styles.currencyName}>Bored Ape</div>
                        <div className={styles.currencyTxt}>BAYC</div>
                      </div>
                    </div> */}
                  </div>
                  <button className={styles.actionBtn}>Done</button>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
      {deleteAccountModal && (
        <div className={styles.loaderContainer}>
          <div className={styles.deleteAccountContainer}>
            <h1 className={styles.deleteAccountheading}>Delete Account</h1>
            <div>
              <p className={styles.deleteAccountText}>
                Are you sure want to permanently delete this account? <br />
                Please make sure you have moved all your assets before deletion.
              </p>
            </div>
            <div className={styles.deleteAccountBtnContainer}>
              <button
                onClick={() => setDeleteAccountModal(false)}
                className={styles.deleteAccountCancel}
              >
                Cancel
              </button>
              <button
                onClick={() => deletedNapaAccount()}
                className={styles.deleteAccountDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
};

export default WalletSettingsSc;
