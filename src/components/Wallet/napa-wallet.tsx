import Container from '@/Layout/Container/Container';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Footer/Footer';
import styles from './WalletTwo.module.scss';
import {
  DoneIcon,
  ErrorIcon,
  EthereumBlackIcon,
  EtheriumIcon,
  EyeIcon,
  EyeIconHide,
  link,
  LockIcon,
  MoneyReceived,
  MoneySend,
  // napaGrayIcon,
  NapaIcon,
  sepoliaIcon,
  Settings,
  UsdtYellowBgIcon,
  WalletNeedsToConnected,
  // whiteNapaIcon,
} from '../assets';
import ImportTokensModal from '../ImportTokensModal/ImportTokensModal';
import { useRouter } from 'next/router';
import useProfile from '@/hooks/useProfile';
import {
  addStreamAddress,
  fetchAllMixedTransactions,
  getAllNFTsOfUser,
  getCustomTokenWalletBalance,
  getNativeTokenWalletBalance,
  getOtherTokenWalletBalance,
  getSpecificNFTsOfUser,

} from '@/services/AssetManagement';
import moment from 'moment';
import { Image } from 'react-bootstrap';
import { getImportedTokens, updateTokenVisibility } from '@/services/Tokens';
import useWebThree from '@/hooks/useWebThree';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { FadeLoader } from 'react-spinners';
import { ASSET_MANAGEMENT_WEBSOCKET_URL, WEBSOCKET_URL } from '../../constants/url';
import {
  getCookie,
  setCookie,
} from 'cookies-next';
import { getNapaAccounts, switchNapaAccount } from '@/services/napaAccounts';
import CustomDropDown from '../CustomeDropDown/CustomDropDown';
import TokenDropDown from '../TokenDropDown/TokenDropDown';
import { numberWithCommas } from '@/utils/NumberWithCommas';
import axios from 'axios';
import {  originalNapatokenAddress } from '@/connectivity/addressHelpers/addressHelper';

const options = [
  {
    value: '0',
    label: (
      <div className={styles.optionContainer}>
        <Image src={EtheriumIcon} alt="" width="20px" height="20px" />
        <span>Ethereum</span>
      </div>
    ),
  },
  // {
  //   value: '1',
  //   label: (
  //     <div className={styles.optionContainer}>
  //       <Image src={EtheriumIcon} alt="" width="20px" height="20px" />
  //       <span>Goerli Testnet</span>
  //     </div>
  //   ),
  // },
  {
    value: '2',
    label: (
      <div className={styles.optionContainer}>
        <Image src={sepoliaIcon} alt="" width="20px" height="20px" />
        <span>Sepolia Testnet</span>
      </div>
    ),
  },
  // {
  //   value: '1',
  //   label: (
  //     <div className={styles.optionContainer}>
  //       <Image src={EtheriumIcon} alt="" width="20px" height="20px" />
  //       <span>Smart Chain</span>
  //     </div>
  //   ),
  // },
  // {
  //   value: '2',
  //   label: (
  //     <div className={styles.optionContainer}>
  //       <Image src={EtheriumIcon} alt="" width="20px" height="20px" />
  //       <span>Smart Chain Testnet</span>
  //     </div>
  //   ),
  // },
  // {
  //   value: '5',
  //   label: (
  //     <div className={styles.optionContainer}>
  //       <Image src={EtheriumIcon} alt="" width="20px" height="20px" />
  //       <span>Polygon</span>
  //     </div>
  //   ),
  // },
  // {
  // value: '6',
  // label: (
  // <div className={styles.optionContainer}>
  //   <Image src={EtheriumIcon} alt="" width="20px" height="20px" />
  //   <span>Mumbai Testnet</span>
  // </div>
  // ),
  // },
];
const WalletTwo = () => {
  const chaiId = '0x5';
  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  // const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<any>();
  const { profileId } = useProfile();
  const [networkType, setNetworkType] = React.useState<any>();
  const [loading, setLoading] = useState(false);
  const { napaWalletAccount, setNapaWalletAccount } = useWebThree();
  const [tokensList, setTokensList] = useState<any>();
  const [newTokensList, setNewTokensList] = useState<any>();
  const [napaDropdownValue, setNapaDropdownValue] = useState<any>();
  const [dynamic, setdynamic] = useState<any>();
  const [showing, setShowing] = useState<boolean>(false);
  const [accountData, setAccountData] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBalanceDropdown, setIsOpenBalanceDropdown] = useState(false);
  const [isOpenTokenDropdown, setIsOpenTokenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>();
  const [selected, setSelected] = useState(-1);
  const [selectToken, setSelectToken] = useState(false)
  const [activeTab, setActiveTab] = useState('Tokens')
  const socketRef = useRef<any>(null);
  const assetManagementSocketRef = useRef<any>(null)
  const [scrollShadow, setScrollShadow] = useState({
    transition: false,
    token: false,
  });
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
      amount: '',
      symbol: ''
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
      amount: '',
      symbol: '',
      date: ''
    },
  ]);

  const t = getCookie("networkType")
  console.log("networkType", t);

  const handleUpdateTokenList = (token: any) => {
    setTokensList((prev: any) => {
      const temp = [...prev] || []

      const isFound = temp.findIndex((t) => t.tokenId == token.tokenId)
      console.log("isfound", isFound);

      if (isFound > -1) {
        temp[isFound].isVisible = token.isVisible
      }
      return temp
    })
  }


  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    if (!napaWalletAccount?.activeWalletAC) {
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
    const networkFromCookie = getCookie('networkType')
    const networkTypeIndex = options.findIndex(
      (option) => networkFromCookie == option.value
    );
    if (networkTypeIndex > -1) {
      setNetworkType({ ...options[networkTypeIndex] });
    } else {
      setNetworkType(options[1]);
    }
  }, [])

  useEffect(() => {
    if (profileId && socketRef.current == null) {
      socketRef.current = new WebSocket(WEBSOCKET_URL);
      // @ts-ignore
      socketRef.current.addEventListener('message', ({ data }) => {
        const response = JSON.parse(data);
        // @ts-ignore
        if (response.event === `switch-to-new-napa-account-${profileId}`) {
          // @ts-ignore
          handleGetNapaAccounts(profileId);
        }
        if (response.event === `delete-napa-account-${profileId}`) {
          handleGetNapaAccounts(profileId);
        }
        if (response?.event === `new-napa-account-${profileId}`) {
          handleGetNapaAccounts(profileId);
        }
        if (response?.event === 'new-imported-token') {
          handleGetImportedTokens();
        }
        if (response?.event === `token-visibility-update-${profileId}`) {
          handleUpdateTokenList(response.token);
        }
      });
    }
    return () => {
      if(socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  // const handleGetBalance = async () => {
  //   //@ts-ignore
  //   const address = napaWalletAccount?.activeWalletAC;
  //   const walletNetwork = getCookie('networkType')
  //   const balanceData = await getNativeTokenWalletBalance(walletNetwork ? walletNetwork as string : chaiId, address);
  //   // @ts-ignore
  //   setBalance((Number(balanceData?.data?.data?.NativeTokenWalletBalance?.balance) / 10 ** 18).toFixed(8)
  //   );
  // };


  const handleGetTransactions = async () => {
    // const address = '0xa1D66BF3b8A08f40c5A61936Bb9C931201c97641';
    //@ts-ignore
    const address = selectedOption[`NWA_${selected}_AC`];
    const walletNetwork = getCookie('networkType');
    const transactionData = await fetchAllMixedTransactions(
      walletNetwork ? (walletNetwork as string) : chaiId,
      address
    );
    // @ts-ignore
    setHistory(transactionData?.data?.data?.TransactionHistory);
  };

  const handleGetImportedTokens = async () => {
    setNapaDropdownValue(null)
    setNewTokensList(null)
    setLoading(true);
    setdynamic(null);
    setTokensList(null);
    setNapaDropdownValue(null);
    const walletNetwork = getCookie('networkType')
    const { data, error}: any = await getImportedTokens(
        // @ts-ignore
        selectedOption[`NWA_${selected}_AC`],
        networkType?.value
      );
    if (error) {
      setLoading(false);
      // toast.error(
      //   CustomToastWithLink({
      //     icon: ErrorIcon,
      //     title: 'Error',
      //     description: message,
      //     time: 'Now',
      //   })
      // );
      setTokensList([])
      return;
    }
    let modifiedList: any = []
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
        name: item.name,
        value: index,
        label: (
          <div className={styles.optionContainer}>
            <span>{item.symbol}</span>
          </div>
        ),
      })
    })
    setdynamic(test)
    setTokensList(modifiedList);
    setLoading(false);
    setNapaDropdownValue(test[0])
    const selectedTokenFromCookie = getCookie('selectedToken');
    if (selectedTokenFromCookie) {
      const isFound = test.find(
        (t: any) => (t.name || t.symbol) == selectedTokenFromCookie
      );
      if (isFound) {
        setNewTokensList(isFound);
      }
      else {
        setNewTokensList(modifiedList[0])
      }
    }
    else {
      //@ts-ignore
      const index = modifiedList.findIndex(x => x.symbol === "NAPA");
      if (index) {
        setNewTokensList(modifiedList[index])
      } else {
        setNewTokensList(modifiedList[0])
      }
    }
  };

  useEffect(() => {
    if (networkType && selectedOption) {
      handleGetImportedTokens();
    }
  }, [networkType, selectedOption]);

  // const handleNewToken = async (token:any) => {    
  //   console.log("token", token);

  //   setTokensList(async (prevState:any) => {
  //       let data = prevState?.length ? [...prevState] : [];
  //       const response = await getCustomTokenWalletBalance('0x5',token.napaWalletAccount, token.tokenAddresses)        
  //       // @ts-ignore
  //       token.balance = (response?.data?.data?.CustomTokenWalletBalance[0]?.balance || 0)/10**18
  //       // @ts-ignore
  //       data.push(token);        
  //       return [...data];
  //   });
  // }
  const handleClick = (token: any, index: number) => {
    const currentToken = dynamic.find((item: any) => item.value == index)
    setNapaDropdownValue(currentToken)
    setNewTokensList(token)
    if (isOpenBalanceDropdown) setIsOpenBalanceDropdown(!isOpenBalanceDropdown);
    setCookie("selectedToken", (token.name || token.symbol));
  }

  useEffect(() => {
    if (
      selectedOption &&
      networkType &&
      assetManagementSocketRef.current == null
    ) {
      // handleGetBalance();
      handleGetTransactions();
      assetManagementSocketRef.current = new WebSocket(
        ASSET_MANAGEMENT_WEBSOCKET_URL
      );
      assetManagementSocketRef.current.addEventListener(
        'message',
        ({ data }: any) => {
          const response = JSON.parse(data);
          const firstEntry = Object.entries(selectedOption)[0];
          // @ts-ignore
          const firstValue: string = firstEntry[1];
          if (
            response?.event ===
            `streaming-erc20-transfers-to-account-${firstValue.toLowerCase()}`
          ) {
            handleGetImportedTokens();
            handleGetTransactions();
            if (!toast) {
              //@ts-ignore
              toast.success(
                CustomToastWithLink({
                  icon: DoneIcon,
                  title: 'Success',
                  description: 'Token Recieve',
                  time: 'Now',
                })
              );
            }
          }
          if (
            response?.event ===
            `streaming-erc20-transfers-from-account-${firstValue.toLowerCase()}`
          ) {
            handleGetImportedTokens();
            handleGetTransactions();
            if (!toast) {
              //@ts-ignore
              toast.success(
                CustomToastWithLink({
                  icon: DoneIcon,
                  title: 'Success',
                  description: 'Token Send',
                  time: 'Now',
                })
              );
            }
          }
        }
      );
    }
    return () => {
      if(assetManagementSocketRef.current) {
        assetManagementSocketRef.current.close();
        assetManagementSocketRef.current = null;
      }
    };
  }, [networkType, selectedOption]);

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

    const account = Array.from({ length: 5 }).reduce((acc: any, _, i) => {
      if (data.data[`NWA_${i + 1}_AC`]) {
        acc.push({
          [`NWA_${i + 1}_AC`]: data.data[`NWA_${i + 1}_AC`],
          [`NWA_${i + 1}_NE`]: data.data[`NWA_${i + 1}_NE`],
          [`NWA_${i + 1}_PK`]: data.data[`NWA_${i + 1}_PK`],
          [`NWA_${i + 1}_ST`]: data.data[`NWA_${i + 1}_ST`],
        });
      }
      return acc;
    }, []);
    setAccountData(account);
    const activeWalletAC = data?.data?.activeWalletAC;
    setCookie(
      'napaWalletAccount',
      JSON.stringify({
        profileId: data?.data?.profileId,
        activeWalletAC: data?.data[`NWA_${activeWalletAC}_AC`],
      })
    );
    setNapaWalletAccount(
      {
        profileId: data?.data?.profileId,
        activeWalletAC: data?.data[`NWA_${activeWalletAC}_AC`],
      } || ''
    );
    setSelected(Number(activeWalletAC))
    // @ts-ignore
    setSelectedOption(account[Number(activeWalletAC) - 1]);
    // @ts-ignore
    const firstEntry = Object.entries(account[Number(activeWalletAC) - 1])[0];
    // @ts-ignore
    const firstValue: string = firstEntry[1];

    await addStreamAddress(firstValue)
    setLoading(false);
  };

  const sortNfts = (nfts: any) => {
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
  const loadNFTs: () => Promise<object[]> = async () => {
    // let currentChainId
    // if (window.ethereum) {
    //   currentChainId = await window.ethereum.request({
    //     method: 'eth_chainId',
    //   })
    // }
    // const metaMaskNetwork = getChainId(currentChainId)
    const walletNetwork = getCookie('networkType');
    setLoading(true);
    let dt: any = [];
    let newItems: any = [];
    try {
      // const config = {
      //   method: 'get',
      //   url: `https://deep-index.moralis.io/api/v2/${address}/nft?chain=goerli&format=decimal`,
      //   headers: {
      //     'X-API-Key':
      //       'D8Kfm2KtjFHVEpqvPmTVgaNLvY8TFEhrIBi8h71wjcTfFIdlmSKFlYJcEGATK8dr',
      //   },
      // };
      // let res = await axios(config);

      const res = await getAllNFTsOfUser(
        // @ts-ignore
        walletNetwork,
        // @ts-ignore
        napaWalletAccount?.activeWalletAC
      );
      // @ts-ignore
      await Promise.all(
        // @ts-ignore
        res?.data?.data?.tokenData?.response?.result.map(async (data: any) => {
          let splitted =
            data.token_address.slice(0, 6) +
            '...' +
            data.token_address.slice(38, data.token_address.length);
          // console.log(splitted, "datas")
          // let isOnSold = await checkIfApprovedToMarket(
          //   data.token_id,
          //   data.token_address
          // );
          // console.log(isOnSold, 'onsold');
          let contractAddress = data.token_address;
          if (contractAddress == '0x94d407d1860841e9a531d754ec5a6de7d899113d') {
            return null
          }

          // if (nftAddress.toUpperCase() !== contractAddress.toUpperCase() && contractAddress.toUpperCase() != "0X20BF1A09C7C7211EAD72DE3D96BC129CD2BFE743") {
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
    console.log(nfts, "nfts")
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
    const walletNetwork: any = getCookie('networkType')
    setLoading(true);
    let snftData: any = [];
    let newSnftItems: any = [];
    try {
      const res = await getSpecificNFTsOfUser(
        walletNetwork,
        napaWalletAccount?.activeWalletAC,
        '0x94d407D1860841E9a531D754ec5A6DE7D899113d'
        // "2",
        // "0x7975b9CF12B1599F4502a4A9759305405da58953",
        // "0x5DBa9fA28cB4E76aC617E2843C7a3e24efFA9eb2",
      );
      // @ts-ignore
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
              avatar: data.media.original_media_url,
              amount: data?.amount,
              date: data.last_metadata_sync
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
  }, [napaWalletAccount])

  useEffect(() => {
    const data = getCookie('profileId');
    if (data) {
      // @ts-ignore
      handleGetNapaAccounts(data);
    }
  }, []);
  useEffect(() => {
    const handleNft = async () => {
      await loadNFTs()
    }
    handleNft()
  }, [napaWalletAccount])

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBalanceDropdownToggle = () => {
    setIsOpenBalanceDropdown(!isOpenBalanceDropdown)
  }

  const handleTokenDropdown = () => {
    setIsOpenTokenDropdown(!isOpenTokenDropdown);
    setSelectToken(!selectToken);
  };

  const handleTokenOptionSelect = (value: any) => {
    setNetworkType(value);
    setCookie('networkType', value.value);
    setIsOpenTokenDropdown(!isOpenTokenDropdown);
  }

  const handleOptionSelect = async (option: any, currentIndex: number) => {
    console.log(option);

    // setSelected(index + 1);
    // setSelectedOption(option);
    // const firstEntry = Object.entries(option)[0];
    // // @ts-ignore
    // const firstValue: string = firstEntry[1];      

    // await addStreamAddress(firstValue)
    // setCookie('selectedAccount', JSON.stringify(option));
    // setIsOpen(false);
    const { error, message }: any = await switchNapaAccount(
      // @ts-ignore
      napaWalletAccount?.profileId,
      option[`NWA_${currentIndex + 1}_AC`]
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
    setIsOpen(false);
  };

  if (!showing) {
    return <></>;
  }
  const toggleItem = async (token: any) => {    
    const { error, message } = await updateTokenVisibility(token?.tokenId, token?.isVisible == "true" ? "false" : "true")
    if (error) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
    }
  }
  // @ts-ignore



  // @ts-ignore
  let scrollableElement: any = document.getElementById('scrollable-element');
  scrollableElement?.addEventListener('scroll', function () {
    if (scrollableElement.scrollTop + scrollableElement.clientHeight + 20 >= scrollableElement.scrollHeight) {
      removeScrollShadow();
    } else {
      addScrollShadow();
    }
  });
  function removeScrollShadow() {
    console.log('Removing scroll shadow');
    setScrollShadow({
      ...scrollShadow,
      transition: false,
    });
  }
  function addScrollShadow() {
    console.log('Adding scroll shadow');
    setScrollShadow({
      ...scrollShadow,
      transition: true,
    });
  }
  // scrollableToken?.addEventListener('scroll', function () {
  //   if (
  //     scrollableToken.scrollHeight - scrollableToken.scrollTop + 20 >=
  //     scrollableToken.clientHeight
  //   ) {
  //     setScrollShadow({
  //       ...scrollShadow,
  //       token: false,
  //     });
  //   } else {
  //     setScrollShadow({
  //       ...scrollShadow,
  //       token: true,
  //     });
  //   }
  // });
  let scrollableToken: any = document.getElementById('scrollable-Token');
  scrollableToken?.addEventListener('scroll', function () {
    if (scrollableToken.scrollTop + scrollableToken.clientHeight + 20 >= scrollableToken.scrollHeight) {
      console.log(scrollableToken.clientHeight,"scrollableToken.clientHeight");
      
      tokenRemoveScrollShadow();
    } else {
      tokenAddScrollShadow();
    }
  });
  function tokenRemoveScrollShadow() {
    console.log('Removing scroll shadow');
    setScrollShadow({
      ...scrollShadow,
      token: false,
    });
  }
  function tokenAddScrollShadow() {
    console.log('Adding scroll shadow');
    setScrollShadow({
      ...scrollShadow,
      token: true,
    });
  }


  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <div className={styles.settings}>
          <div className={styles.headerSection}>
            <h1 className={styles.walletHeading}>Wallet</h1>
            <div className={styles.settingDropdownContainer}>
              <div className={styles.walletDropdownContainer}>
                {/* <Select
                  options={options}
                  // menuIsOpen={true}
                  className="select_pernt select_pernt_v2"
                  placeholder="Select Network"
                  classNamePrefix="cntrslct"
                  onChange={async (selectedOption) => {
                    //@ts-ignore
                    setNetworkType(selectedOption);
                    setCookie('networkType', selectedOption.value);
                    console.log(selectedOption);
                  }}
                  value={networkType}
                /> */}
                <TokenDropDown
                  selectedOption={networkType}
                  handleDropdownToggle={handleTokenDropdown}
                  isOpen={isOpenTokenDropdown}
                  accountData={options}
                  handleOptionSelect={handleTokenOptionSelect}
                />
              </div>
              <div
                onClick={() => push('/wallet-settings')}
                className={styles.settingsLabel}
              >
                <img src={Settings} alt="" />
                <span>Wallet Settings</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.accountContainer}>
          <div className={styles.accountLeftContainer}>
            <div>
              {/* <div style={{ width: '100%' }} className={styles.customdropdown}>
                <button
                  className={`${styles.dropdowntoggle} ${
                    isOpen && styles.actionbutton
                  }`}
                  onClick={handleDropdownToggle}
                >
                  <span style={{color: "white"}}>
                    {selectedOption
                      ? selectedOption[`NWA_${selected}_NE`]
                      : null}
                    <img height={13} width={13} src={ArrowDownIcon} alt="" />
                  </span>
                </button>
                {isOpen && (
                  <ul className={styles.dropdownoptions}>
                    {accountData?.map((value: string, index: number) => {
                      return (
                        <li
                          key={index}
                          onClick={() => handleOptionSelect(value, index)}
                        >
                          {selected == index + 1 ? (
                            //@ts-ignore
                            <span style={{color: '#16e6ef', display: 'flex', justifyContent: 'space-between', backgroundColor: "#181C1C", padding: "8px 16px"}}>{value[`NWA_${index + 1}_NE`]}<img src={DoneIcon} alt="" /></span>
                            
                          ) : (
                            //@ts-ignore
                            <span>{value[`NWA_${index + 1}_NE`]}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div> */}
              <CustomDropDown
                handleDropdownToggle={handleDropdownToggle}
                handleOptionSelect={handleOptionSelect}
                isOpen={isOpen}
                selectedOption={selectedOption}
                accountData={accountData}
                selected={selected}
              />
            </div>

            {/* <p className={styles.accountText}>Account 1</p> */}
            <div className={styles.accountTextContainer}>
              <div className={styles.accountNumber}>
                <span>
                  {
                    numberWithCommas(newTokensList?.balance || '0')
                      .toString()
                      .split('.')[0]
                  }
                </span>
                .
                <span className={styles.tokenListBalance}>
                  {
                    numberWithCommas(newTokensList?.balance || '0')
                      .toString()
                      .split('.')[1]
                  }
                </span>
                {/* {newTokensList?.balance || '0.00000000'} */}
              </div>
              <div className={styles.acccountDropdown}>
                <div className={styles.walletDropdownContainer}>
                  {/* <Select
                    options={dynamic}
                    // menuIsOpen={true}
                    className="select_pernt select_pernt_v2"
                    placeholder=""
                    classNamePrefix="cntrslct"
                    onChange={(selectedOption) => {
                      console.log(selectedOption);
                      handleClick(
                        tokensList[selectedOption?.value],
                        selectedOption?.value
                      );
                      setNapaDropdownValue(selectedOption);
                    }}
                    value={napaDropdownValue}
                  /> */}

                  <CustomDropDown
                    handleDropdownToggle={handleBalanceDropdownToggle}
                    isOpen={isOpenBalanceDropdown}
                    accountData={dynamic}
                    handleOptionSelect={handleClick}
                    selected={napaDropdownValue}
                    selectedOption={newTokensList}
                    tokenList={tokensList}
                  />

                  {/* <div style={{ width: '7rem' }}>
                    <CustomDropdown dropdownData={napaTokens} />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.accountRightContainer}>
            <Link className={styles.depositBtnContainer} href="/deposit">
              <div>
                <button className={styles.depositBtn}>
                  <img
                    style={{ marginRight: '1rem' }}
                    src={MoneyReceived}
                    alt=""
                  />{' '}
                  Receive
                </button>
              </div>
            </Link>
            <Link className={styles.withdrawalBtnContainer} href="/withdrawal">
              <div>
                <button className={styles.withdrawalBtn}>
                  <img style={{ marginRight: '1rem' }} src={MoneySend} alt="" />{' '}
                  Send
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.walletTableContainer}>
          <div
            id='scrollable-Token'
            className={`${scrollShadow.token ? styles.walletTokensContainer : styles.walletTokensContainer1}`}
          >
            <div className={styles.tabsContainer}>
              <div className={styles.tabs}>
                <div
                  onClick={() => {
                    setActiveTab('Tokens');
                  }}
                  className={activeTab == 'Tokens' ? styles.tab1 : styles.tab}
                >
                  Tokens
                </div>
                <div
                  onClick={() => {
                    setActiveTab('NFTs');
                  }}
                  className={activeTab == 'NFTs' ? styles.tab1 : styles.tab}
                >
                  NFT&apos;s
                </div>
                <div
                  onClick={() => {
                    setActiveTab('SNFTs');
                  }}
                  className={activeTab == 'SNFTs' ? styles.tab1 : styles.tab}
                >
                  SNFT&apos;s
                </div>
              </div>
              {/* <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="default_tab mb-30 default_tab_wt_scroll"
              >
                <Tab title="Tokens">
                  <span className={styles.tabOne}>Tokens</span>
                </Tab>
                <Tab title="NFTs">
                  NFTs
                </Tab>
                <Tab title="SNFTs">
                  SNFTs
                </Tab>

              </Tabs> */}
              {/* <div className={styles.tabOne}>Tokens</div>
              <div className={styles.tab}>NFTs</div>
              <div className={styles.tab}>SNFTs</div> */}
            </div>
            <div className={styles.textIconContainer}>
              <div className={styles.iconContainer}>
                {/* <img src={SearchIcon} alt="" /> */}
              </div>
              <div
                onClick={() => setOpen(!open)}
                className={styles.textContainer}
              >
                Import
              </div>
            </div>
            <table
              style={{
                width: '100%',
                textAlign: 'left',
                tableLayout: 'fixed',
                // marginTop: 10,
              }}
            >
              {activeTab == 'Tokens' &&
                //  <div className={styles.tableHeader1}>
                //   <div style={{ display: 'flex', width: '51%' }}>
                //     <div className={styles.tableHeadingToken4}></div>
                //     <div
                //       style={{ width: '17vh' }}
                //       className={styles.tableHeadingToken}
                //     >
                //       Token Name
                //     </div>
                //     <div className={styles.tableHeadingToken1}>Symbol</div>
                //   </div>
                //   <div
                //     style={{
                //       display: 'flex',
                //       width: '50%',
                //       justifyContent: 'space-between',
                //     }}
                //   >
                //     <div className={styles.tableHeadingToken2}>Balance</div>
                //     <div className={styles.tableHeadingToken3}>Balance in USD</div>
                //     <div className={styles.tableHeadingToken5}></div>
                //   </div>
                // </div>
                <thead
                  style={{
                    // position: 'sticky',
                    top: '0px',
                    backgroundColor: 'black',
                    paddingTop: '10px',
                  }}
                >
                  <tr className={styles.transitionTableHeading}>
                    <th className={styles.tableChildDate}>Token Name</th>
                    <th style={{paddingLeft:"3rem"}}>Symbol</th>
                    <th>Amount</th>
                    <th>Amount in USD</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
              }
            </table>
            <div
              id="scrollable-Token"
              style={{
                overflow: 'scroll',
                height: '29vh',
                minWidth: '495px',
                overflowX: 'auto',
              }}
            >
              {activeTab == 'Tokens' ? (
                <>
                  <tbody>
                    {loading ? (
                      <tr className={styles.loderIconContainer}
                      // className={styles.loderIconContainer}
                      // style={{
                      //   display: 'flex',
                      //   justifyContent: 'center',
                      //   alignItems: 'center',
                      //   height: '100%',
                      //   width:'45vw',
                      // }}
                      ><td colSpan={12}>
                          <FadeLoader color="#ffffff" />
                        </td>
                      </tr>
                    ) : tokensList?.length == 0 ? (
                      <p style={{ color: 'gray',minWidth:'750px' }}>No Tokens Found</p>
                    ) : (
                      tokensList &&
                      tokensList[0] &&
                      tokensList?.map((token: any, index: number) => {
                        return (
                          <>
                            <tr
                              key={index}
                              className={styles.tableRowBorder}
                              // style={{
                                //   border: '1px solid #212C2C',
                              //   color: 'white',
                              //   height: '75px',
                              // }}
                            >
                              <td  className={styles.tablerows}>
                                {token.isVisible == 'false' ? (
                                  <span style={{paddingRight:'20px'}}>
                                    <img src={LockIcon} alt="" />
                                  </span>
                                ) : (
                                  <>
                                    <img
                                      style={{ cursor: 'pointer', paddingRight: '10px' }}
                                      onClick={(_tokensList) =>
                                        handleClick(token, index)
                                      }
                                      src={EthereumBlackIcon}
                                      alt=""
                                    />
                                  </>
                                )}
                                {token.isVisible == 'false' ? (
                                  <span
                                    className={styles.hideTokens}
                                    style={{ color: 'white' }}
                                  >
                                    *******
                                  </span>
                                ) : (
                                  <>
                                    {token.name || token.symbol}
                                  </>
                                )}
                              </td>
                              <td style={{paddingLeft:"3rem"}} className={styles.tableRow}>
                                {token.isVisible == 'false' ? (
                                  <span
                                    className={styles.hideTokens1}
                                    style={{ color: 'grey' }}
                                  >
                                    ***
                                  </span>
                                ) : (
                                  <>
                                    {token.symbol}
                                  </>
                                )}
                              </td>

                              <td className={styles.tableRow}>
                                {token.isVisible == 'false' ? (
                                  <span
                                    className={styles.hideTokens}
                                    style={{ color: 'white' }}
                                  >
                                    **.***.**
                                  </span>
                                ) : (
                                  <>
                                    {numberWithCommas(token.balance)}
                                  </>
                                )}
                              </td>
                              <td className={styles.tableRowend}>
                                {token.isVisible == 'false' ? (
                                  <span
                                    className={styles.hideTokens1}
                                    style={{ color: 'grey' }}
                                  >
                                    ****.***.**
                                  </span>
                                ) : (
                                  <>
                                    $00.00
                                  </>
                                )}
                              </td>
                              <td onClick={() => toggleItem(token)} style={{ textAlign: 'center', paddingRight: 10 }}>

                                {token.isVisible == 'false' ? (
                                  <img
                                    src={EyeIconHide}
                                    alt=""
                                    style={{ cursor: 'pointer' }}
                                  />
                                ) : (
                                  <img
                                    src={EyeIcon}
                                    alt=""
                                    style={{ cursor: 'pointer' }}
                                  />
                                )}
                              </td>
                            </tr>
                         


                            {/* <div key={index} className={styles.tokenDiv}>
                            <div className={styles.tokenDivLeft}>
                              {token.isVisible == 'false' ? (
                                <div>
                                  <img src={LockIcon} alt="" />
                                </div>
                              ) : (
                                <div style={{ cursor: 'pointer' }}>
                                  <img
                                    onClick={(_tokensList) =>
                                      handleClick(token, index)
                                    }
                                    src={EthereumBlackIcon}
                                    alt=""
                                  />
                                </div>
                              )}
                              <div>
                                {token.isVisible == 'false' ? (
                                  <span
                                    className={styles.hideTokens}
                                    style={{ color: 'white' }}
                                  >
                                    *******
                                  </span>
                                ) : (
                                  <div className={styles.bitcoinText11}>
                                    {token.name || token.symbol}
                                  </div>
                                )}
                              </div>
                              {token.isVisible == 'false' ? (
                                <span
                                  className={styles.hideTokens1}
                                  style={{ color: 'grey' }}
                                >
                                  ***
                                </span>
                              ) : (
                                <div
                                  style={{ paddingRight: '3rem' }}
                                  className={styles.bitcoinText13}
                                >
                                  {token.symbol}
                                </div>
                              )}
                            </div>




                            <div className={styles.tokenDivRight}>
                              {token.isVisible == 'false' ? (
                                <span
                                  className={styles.hideTokens}
                                  style={{ color: 'white' }}
                                >
                                  **.***.**
                                </span>
                              ) : (
                                <div className={styles.bitcoinText}>
                                  {numberWithCommas(token.balance)}
                                </div>
                              )}
                              {token.isVisible == 'false' ? (
                                <span
                                  className={styles.hideTokens1}
                                  style={{ color: 'grey' }}
                                >
                                  ****.***.**
                                </span>
                              ) : (
                                <div className={styles.bitcoinText1}>
                                  $32.271
                                </div>
                              )}
                            </div>



                            <div onClick={() => toggleItem(token)}>
                              {token.isVisible == 'false' ? (
                                <img
                                  src={EyeIconHide}
                                  alt=""
                                  style={{ cursor: 'pointer' }}
                                />
                              ) : (
                                <img
                                  src={EyeIcon}
                                  alt=""
                                  style={{ cursor: 'pointer' }}
                                />
                              )}
                            </div>
                          </div> */}
                          </>
                        );
                      })
                    )}
                  </tbody>
                </>

              ) : activeTab == 'NFTs' ? (
                <>
                  {loading ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <FadeLoader color="#ffffff" />
                    </div>
                  ) : nfts?.length == 0 ? (
                    <p style={{ color: 'gray' }}>No NFT&apos;s Found</p>
                  ) : (nfts.map((nft, index) => {
                    return (
                      <div key={index} className={styles.nftContainerDiv}>
                        <div className={styles.nftImageContainer}>
                          <div className={styles.imageContainer} style={{ minWidth: 80 }}>
                            <img
                              className={styles.imageDiv}
                              src={`${nft?.image || nft?.avatar}`}
                              alt=""
                              width={80}
                              height={50}
                            />
                          </div>
                          <div className={styles.textDivContainer}>
                            <div className={styles.text1}>
                              <span>{nft?.name}</span>
                            </div>
                            <div className={styles.text2}>
                              {/* <span>Highest Offer:</span> */}
                              <span
                                style={{
                                  paddingLeft: '10px',
                                  paddingRight: '10px',
                                  paddingBottom: '30px',
                                }}
                              >
                                {/* <img src={napaGrayIcon} alt="" /> */}
                              </span>
                              {/* <span>0.18</span> */}
                            </div>
                          </div>
                        </div>
                        <div className={styles.nftImageContainer}>
                          <div className={styles.textDivContainer1}>
                            <div className={styles.text1}>
                              <span>
                                {/* <img style={{paddingBottom:'5px'}} src={whiteNapaIcon} alt="" /> */}
                              </span>{' '}
                              <span>{nft.amount}</span>
                            </div>
                            {/* <div className={styles.text2}>
                              <span>Floor Price:</span>
                              <span
                                style={{
                                  paddingLeft: '10px',
                                  paddingRight: '10px',
                                  paddingBottom: '30px',
                                }}
                              >
                                <img src={napaGrayIcon} alt="" />
                              </span>
                              <span>0.18</span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    );
                  })
                  )
                  }
                  {/* <div className={styles.nftContainerDiv}>
                    <div className={styles.nftImageContainer}>
                      <div className={styles.imageContainer}><img className={styles.imageDiv} src={NftImage} alt="" /></div>
                      <div className={styles.textDivContainer}>
                        <div className={styles.text1}><span>Illusions of Darkness</span></div>
                        <div className={styles.text2}><span>Highest Offer:</span>
                          <span style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px' }}><img src={napaGrayIcon} alt="" /></span>
                          <span>0.18</span></div>
                      </div>
                    </div>
                    <div className={styles.nftImageContainer}>
                      <div className={styles.textDivContainer1}>
                        <div className={styles.text1}><span><img src={whiteNapaIcon} alt="" /></span> <span>0.24</span></div>
                        <div className={styles.text2}><span>Floor Price:</span>
                          <span style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '30px' }}><img src={napaGrayIcon} alt="" /></span>
                          <span>0.18</span></div>
                      </div>
                    </div>
                  </div>  */}
                </>
              ) : (
                activeTab == 'SNFTs' && (
                  <>
                    {
                      loading ? (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                          }}
                        >
                          <FadeLoader color="#ffffff" />
                        </div>
                      ) : snfts?.length == 0 ? (
                        <p style={{ color: 'gray' }}>No SNFT&apos;s Found</p>
                      ) : snfts.map((snft, index) => {
                        return (
                          <div key={index} className={styles.nftContainerDiv}>
                            <div className={styles.nftImageContainer}>
                              <div className={styles.imageContainer} style={{ minWidth: 80 }}>
                                <img
                                  className={styles.imageDiv}
                                  src={snft?.image}
                                  alt=""
                                  width={80}
                                  height={50}
                                />
                              </div>
                              <div className={styles.textDivContainer}>
                                <div className={styles.text1}>
                                  <span>{snft?.name}</span>
                                </div>
                                <div className={styles.text2}>
                                  <span>Minted {moment(snft.date).format('D MMM YYYY')}</span>
                                </div>
                              </div>
                            </div>
                            <div className={styles.nftImageContainer}>
                              <div className={styles.textDivContainer1}>
                                <div className={styles.text1}>
                                  <span>
                                    {/* <img style={{paddingBottom:"5px"}} src={whiteNapaIcon} alt="" /> */}
                                  </span>{' '}
                                  {/* <span>{snft.amount} Earned</span> */}
                                </div>
                                {/* <div className={styles.text2}>
                                  <span>Current Rewards Tier: </span>
                                  <span style={{ color: 'white' }}>8</span>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>
                )
              )}
            </div>
          </div>
          <div
            id='scrollableTransition'
            className={`${scrollShadow.transition ? styles.walletTransactionContainer1 : styles.walletTransactionContainer
              }`}
          >
            <div className={styles.transactionContainer}>
              <div>Transaction History</div>

              {/* <div>
                <img src={SearchIcon} alt="" />
              </div> */}
            </div>
            <table
              style={{
                width: '100%',
                textAlign: 'left',
                tableLayout: 'fixed',
                // marginTop: 10,
              }}
            ></table>
            <div
              id="scrollable-element"
              className="max-h-[440px] scroll-wrapper"
              style={{
                height: '39vh',
                overflow: 'auto',
                overflowX: 'auto',
                minWidth: '585px',
              }}
            >
              <table
                style={{
                  width: '100%',
                  textAlign: 'left',
                  tableLayout: 'fixed',
                  // marginTop: 10,
                }}
              >
                <thead
                  style={{
                    position: 'sticky',
                    top: '0px',
                    backgroundColor: 'black',
                    paddingTop: '10px',
                  }}
                >
                  <tr className={styles.transitionTableHeading}>
                    <th className={styles.tableChildDate}>Date</th>
                    <th style={{paddingLeft:'3rem'}}>Tx Type</th>
                    <th style={{paddingLeft:'2rem'}}>Asset</th>
                    <th style={{paddingLeft:'1rem'}}>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style={{}}>
                  {history?.length > 0 &&
                    history
                      .filter((item: any) => {
                        return (
                          (item.hasOwnProperty('gasPrice') &&
                            napaWalletAccount?.activeWalletAC == +item?.to) ||
                          !item.hasOwnProperty('gasPrice')
                        );
                      })
                      .map((item: any, index: number) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              border: '1px solid #212C2C',
                              color: 'white',
                              height: '75px',
                            }}
                          >
                            <td
                              style={{ paddingLeft: '10px' }}
                              className={styles.tablerows}
                            >
                              {moment(item.blockTimestamp).format('DD MMM LT')}
                            </td>
                            {/* @ts-ignore */}
                            <td style={{paddingLeft:'3rem'}}>
                              {napaWalletAccount?.activeWalletAC ==
                              +(item?.toAddress || item?.to)
                                ? 'Receive'
                                : 'Send'}
                            </td>
                            <td style={{paddingLeft:'2rem'}}>
                              {item.contractType
                                ? item.tokenAddress ==
                                  '0x94d407d1860841e9a531d754ec5a6de7d899113d'
                                  ? 'SNFT'
                                  : 'NFT'
                                : item.tokenSymbol || 'Ethereum'}
                            </td>
                            <td style={{paddingLeft:'1rem'}}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                {!item.contractType && 
                                <span
                                  style={{
                                    marginRight: '10px',
                                    marginTop: '-6px',
                                  }}
                                >
                                  {item?.tokenSymbol?.includes('NAPA') ? (
                                    <img width={20} src={NapaIcon} alt="" />
                                  ) : item?.tokenSymbol?.includes('USDT') ? (
                                    <img
                                      width={20}
                                      src={UsdtYellowBgIcon}
                                      alt=""
                                    />
                                  ) : (
                                    <img width={20} src={EtheriumIcon} alt="" />
                                  )}
                                </span>}
                                <span
                                  style={{
                                    //@ts-ignore
                                    color:
                                      napaWalletAccount?.activeWalletAC ==
                                      +(item?.toAddress || item?.to)
                                        ? '#16E6EF'
                                        : '#FF4E51',
                                  }}
                                >
                                  {item.contractType
                                    ? '------'
                                    : numberWithCommas(
                                        // valueDecimal
                                        (item.value / 10 ** 18).toString()
                                      )}
                                </span>
                              </div>
                            </td>
                            {/* &thinsp; */}

                            {/* <td></td> */}
                            <td style={{ textAlign: 'center' }}>
                              {
                                // @ts-ignore
                                t == '2' && (
                                  <a
                                    href={`https://sepolia.etherscan.io/tx/${
                                      item?.transactionHash || item?.hash
                                    }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img src={link} alt="" />
                                  </a>
                                )
                              }
                              {
                                // @ts-ignore
                                t == '0' && (
                                  <a
                                    href={`https://etherscan.io/tx/${
                                      item?.transactionHash || item?.hash
                                    }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img src={link} alt="" />
                                  </a>
                                )
                              }
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container >
      <div>
        <Footer footerIconShow={false} />
      </div>
      <ImportTokensModal
        open={open}
        onClick={async () => setOpen(!open)}
        setopen={setOpen}
        networkType={networkType?.value}
      />
    </div >
  );
};

export default WalletTwo;