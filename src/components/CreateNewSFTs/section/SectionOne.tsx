import React from 'react';
import styles from './SectionOne.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { SnftResponse } from '../../../types/marketplace';
import { deleteSnft } from '../../../services/MarketplaceApi';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../../../components/CustomToast/CustomToast';
import {
  DoneIcon,
  ErrorIcon,
  EtheriumIcon,
  UsdtYellowBgIcon,
} from '../../../components/assets';
import { FadeLoader } from 'react-spinners';
import {
  _setSaleFromWallet,
  _buyNftToken,
  _nftInfo,
} from '../../../connectivity/mainFunctions/marketFunctions';
// import { createNewTransaction } from '../../../services/Transaction';
import useWebThree from '@/hooks/useWebThree';
// import {
//   marketPlaceContract,
//   napaTokenContract,
//   // newNapaNftContract,
//   usdtTokenContract,
// } from '@/connectivity/contractObjects/contractObject1';
import {
  newMarketPlace,
  // marketPlace,
  newSNFT,
  // nftAddress,
} from '@/connectivity/addressHelpers/addressHelper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// import {
//   // approve,
//   // ethFee as ethFees,
//   // lazyMint,
//   // lazyMintEth,
//   UsdtMintFee as _UsdtMintFee,
//   NapaMintFee as _NapaMintFee,
//   // napaTokenAmount,
//   // nftInfo,
//   // getLatestPrice,
//   // buyNftToken,
//   // buyNftTokenWithEth,
// } from '@/connectivity/callHelpers/callHelper1';
import { approve as NPTApprove, allowance as NAPAAllowance, balanceOf as NAPABalanceOf } from '@/connectivity/walletController/allContractsCallHelper/napaTokenCallHelper';
import { approve as USDTApprove, allowance as USDTAllowance, balanceOf as USDTBalanceOf } from '@/connectivity/walletController/allContractsCallHelper/usdtTokenCallHelper';
import {
  //  calculateTokens,
  lazyMint as _newLazyMint, _exists as SNFTExists
} from '@/connectivity/walletController/allContractsCallHelper/snftCallHelper';
// import {_exists as GExists} from "@/connectivity/walletController/allContractsCallHelper/genericNFTCallHelper";
// import { decimals } from '@/connectivity/callHelpers/napaTokenCallHandlers';
import useProfile from '@/hooks/useProfile';
import { pinToIPFS } from '../../../services/MarketplaceApi';
import Button from '@/components/Button/Button';
import { createOffer } from '@/services/offersApi';
import Loading from '@/components/Loading/Loading';
import { whichWalletConnected } from '@/connectivity/walletController/handleWallet';
import { getChainIdForOtherWallet } from '@/connectivity/networkUtils/chainHelper';
import { getCookie } from 'cookies-next';
import { TallowanceAndBalance, marketIitem, transactionType } from '@/connectivity/walletController/web3Types';
import { _fetchSingleMarketItem, buyNFTToken, claimBack } from '@/connectivity/walletController/allContractsCallHelper/marketPlace';
import axios from 'axios';
import { createNewTransaction } from '@/services/Transaction';
// import { returnpoolId,resalepooliteminfo,resaleItem,pools,participants,memberPercentage,itempoolinfo,isResaleActive, FetchPoolData, activepool, fetchMarketData, fetchPoolmember, fetchVotedStatus, fractionSeller } from '@/connectivity/walletController/allContractsCallHelper/coBatchingCallHelper';
import { createPool,joinPool,sellFraction,BuyFraction,reListItem,voteForPrice,endPool } from '@/connectivity/walletController/allContractsCallHelper/coBatchingCallHelper';
import {setSale,reSellToken} from '@/connectivity/walletController/allContractsCallHelper/marketPlace';
type SectionOneProps = {
  _snftDetails: SnftResponse | null;
  profileId: string | null;
  marketId: string | number | any;
};

export default function SectionOne({
  _snftDetails,
  profileId,
  marketId
}: SectionOneProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [expiresIn, setExpiresIn] = React.useState('');
  const [submitOfferLoading, setSubmitOfferLoading] = React.useState(false);
  const [error, setError] = React.useState({
    amount: '',
    expiresIn: '',
  });
  const [snftDetails, setSnftDetails] = React.useState<any>();
  const [marketItemPrice, setMarketItemPrice] = React.useState<number | string>(0);
  const [marketItemCurrencyType, setMarketItemCurrencyType] = React.useState<number | string>(-1);
  const [seller, setSeller] = React.useState<string>("");
  const [isSeller, setIsSeller] = React.useState<boolean>();
  const [isMinted, setIsMinted] = React.useState<boolean>(false);

  const handleClose = () => setOpen(false);

  const { metaMaskAccount, napaWalletAccount } = useWebThree();
  // const { profileId } = useProfile();

  const { balance, chainId, signer } = useWebThree();
  // console.log(address, balance, chainId, signer, "mtmx wallet Data");
  const handleDeleteSnft = async () => {
    setLoading(true);
    //@ts-ignore
    const { error, message } = await deleteSnft(router?.query?.id);
    if (error) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      setLoading(false);
      return;
    }
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: message,
        time: 'Now',
      })
    );
    setLoading(false);
    router.push('/marketplace');
  };

  const handleNewTransaction = async (data: any) => {
    const { error, message }: any = await createNewTransaction(data);
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

  // const handleBuySnft = async (id: string) => {
  //   const { error, message }: any = await buySnft(id);
  //   if (error) {
  //     setLoading(false);
  //     toast.error(
  //       CustomToastWithLink({
  //         icon: ErrorIcon,
  //         title: 'Error',
  //         description: message,
  //         time: 'Now',
  //       })
  //     );
  //     return;
  //   }
  //   router.push({
  //     pathname: '/marketplace',
  //     query: { redirect: "MySNFTs" }
  //   }, '/marketplace')
  // };

  //connectivity functions starts here

  //1 for approval of tokens
  // const doApproval: any = async (
  //   amt: string,
  //   transactionType: number | string
  // ) => {
  //   if (transactionType == 0) {
  //     // Check if the transaction is for NPA tokens
  //     const npaTokenctr: any = await napaTokenContract(signer); // Get the NPA token contract
  //     console.log(npaTokenctr, 'npaTokenctr contract');
  //     console.log('isInString', amt);
  //     try {
  //       const alw1 = await approve(npaTokenctr, nftAddress, amt.toString()); // Call the approve function of the NPA token contract to allow spending of tokens
  //       console.log(await alw1.wait(), 'allowance of napa is in progress');
  //       return alw1;
  //     } catch (e) {
  //       console.log(e, 'approval error');
  //     }
  //   } else if (transactionType == 1) {
  //     // Check if the transaction is for USDT tokens
  //     const usdtTokenctr: any = await usdtTokenContract(signer); // Get the USDT token contract
  //     console.log(usdtTokenctr, 'usdtTokenctr contract');
  //     try {
  //       const alw1 = await approve(usdtTokenctr, nftAddress, amt.toString()); // Call the approve function of the USDT token contract to allow spending of tokens
  //       console.log(await alw1.wait(), 'allowance of usdt is in progress');
  //       return alw1;
  //     } catch (e) {
  //       console.log(e, 'approval error');
  //     }
  //   } else {
  //     // If the transaction is not for tokens, return -1
  //     console.log("don't need any approval check as you've opted for ether");
  //     return -1;
  //   }
  // };

  //2 Main LazyMint function
  // const LazyFunction = async (
  //   _tokenId: number,
  //   _supposedSeller: string,
  //   _ethFee: string,
  //   typeOfTransaction: number | string,
  //   _tokenUri: string,
  //   _transferToNapa: boolean,
  //   _setSaleMinter: boolean,
  //   callback: CallableFunction
  // ) => {
  //   // get NftCtr instance from newNapaNftContract function
  //   const NftCtr: any = await newNapaNftContract(signer);

  //   try {
  //     if (typeOfTransaction == 0) {
  //       console.log('inside1 ');
  //       // Get additional Napa token fee for minting NFT
  //       let additional: any = await _NapaMintFee(NftCtr);
  //       let convertedEthFee: any = _ethFee;
  //       console.log(_ethFee, '_ethFee');
  //       // Calculate the total fee by adding the additional fee and eth fee
  //       const hit = Number(Number(_ethFee)) + Number(additional.toString());
  //       console.log(hit, 'new hit');
  //       // Check if total fee is greater than the provided eth fee
  //       if (hit > convertedEthFee) {
  //         // If yes, do token approval for Napa token and then mint NFT
  //         await doApproval(hit.toString(), typeOfTransaction)
  //           .then(async function checkApproval(res: any) {
  //             const mainRes = await res.wait();
  //             if (await mainRes) {
  //               const _lazy = await lazyMint(
  //                 NftCtr,
  //                 _tokenId,
  //                 _supposedSeller,
  //                 hit.toString(),
  //                 typeOfTransaction,
  //                 _tokenUri,
  //                 _transferToNapa,
  //                 _setSaleMinter
  //               );
  //               const _lazyRes = await _lazy.wait();
  //               console.log(await _lazyRes, '_lazy response');
  //               callback(undefined, _lazyRes);
  //             } else {
  //               console.log('waiting for confirmation');
  //               checkApproval(res);
  //             }
  //           })
  //           .catch((e: any) => {
  //             callback(e);
  //             console.log('Unknown error occured :', e);
  //             toast.error(
  //               CustomToastWithLink({
  //                 icon: ErrorIcon,
  //                 title: 'Error',
  //                 description: e?.error?.message,
  //                 time: 'Now',
  //               })
  //             );
  //           });
  //       }
  //     } else if (typeOfTransaction == 1) {
  //       // Get additional USDT fee for minting NFT
  //       console.log('inside 2 ');
  //       // Get additional Napa token fee for minting NFT
  //       let additional: any = await _UsdtMintFee(NftCtr);
  //       let convertedEthFee: any = _ethFee;
  //       console.log(_ethFee, '_eth Fee');
  //       // Calculate the total fee by adding the additional fee and eth fee
  //       const hit = Number(Number(_ethFee)) + Number(additional.toString());
  //       console.log(hit, 'new hit');

  //       // Check if total fee is greater than the provided eth fee
  //       if (hit > convertedEthFee) {
  //         // If yes, do token approval for Napa token and then mint NFT
  //         await doApproval(hit.toString(), typeOfTransaction)
  //           .then(async function checkApproval(res: any) {
  //             const mainRes = await res.wait();
  //             console.log(mainRes, 'approval response');
  //             if (await mainRes) {
  //               const _lazy = await lazyMint(
  //                 NftCtr,
  //                 _tokenId,
  //                 _supposedSeller,
  //                 hit.toString(),
  //                 1,
  //                 _tokenUri,
  //                 _transferToNapa,
  //                 _setSaleMinter
  //               );
  //               const _lazyRes = await _lazy.wait();
  //               console.log(await _lazyRes, '_lazy response');
  //               callback(undefined, _lazyRes);
  //             } else {
  //               console.log('waiting for confirmation');
  //               checkApproval(res);
  //             }
  //           })
  //           .catch((e: any) => {
  //             callback(e);
  //             console.log('Unknown error occured :', e);
  //             toast.error(
  //               CustomToastWithLink({
  //                 icon: ErrorIcon,
  //                 title: 'Error',
  //                 description: e?.error?.message,
  //                 time: 'Now',
  //               })
  //             );
  //           });
  //       }
  //     } else {
  //       // Calculate total fee for eth minting
  //       const etherFee = await ethFees(NftCtr);
  //       let hit = Number(Number(_ethFee)) + Number(etherFee.toString());
  //       console.log(_ethFee, etherFee.toString(), hit.toFixed(9), 'Problem');
  //       // Mint NFT with eth
  //       const _lazy = await lazyMintEth(
  //         NftCtr,
  //         _tokenId,
  //         _supposedSeller,
  //         hit.toString(),
  //         2,
  //         _tokenUri,
  //         false,
  //         false,
  //         { value: hit.toString() }
  //       );
  //       console.log('Hang on Lazymint with ETH is in process...');
  //       const _lazyRes = await _lazy.wait();
  //       console.log(await _lazyRes, 'Successful Lazymint with ETH ');
  //       callback(undefined, _lazyRes);
  //     }
  //   } catch (e: any) {
  //     callback(e);
  //     console.log(e.code, e.message, 'caught');
  //   }
  // };

  //3 buynft from market place
  // const _buyNftTokenFromMarket = async (
  //   transactionType: number | string,
  //   _tokenId: number | string,
  //   amount: string | number,
  //   callback: CallableFunction
  // ) => {
  //   console.log('you are buying token :', _tokenId);
  //   const isApprovedTkn = await doApprovalForToken(transactionType, _tokenId);

  //   console.log('lvl2');
  //   const marketCtr: any = await marketPlaceContract(signer);
  //   if (Number(transactionType) == 0 && (await isApprovedTkn)) {
  //     console.log('buy from market in NAPA');
  //     await buyNftToken(marketCtr, 0, _tokenId)
  //       .then(async (res: any) => {
  //         const response = await res.wait();
  //         console.log(await response, 'buyNftToken res');
  //         callback(undefined, response);
  //       })
  //       .catch((e: any) => {
  //         callback(e);
  //         console.log(e);
  //         toast.error(
  //           CustomToastWithLink({
  //             icon: ErrorIcon,
  //             title: 'Error',
  //             description: e?.error?.message,
  //             time: 'Now',
  //           })
  //         );
  //       });
  //   } else if (Number(transactionType) == 1 && (await isApprovedTkn)) {
  //     console.log('buy from market in USDT');
  //     await buyNftToken(marketCtr, Number(transactionType), _tokenId)
  //       .then(async (res: any) => {
  //         const response = await res.wait();
  //         console.log(await response, 'buyNftToken res');
  //         callback(undefined, response);
  //       })
  //       .catch((e: any) => {
  //         callback(e);
  //         console.log(e);
  //         toast.error(
  //           CustomToastWithLink({
  //             icon: ErrorIcon,
  //             title: 'Error',
  //             description: e?.error?.message,
  //             time: 'Now',
  //           })
  //         );
  //       });
  //   } else {
  //     let valInEth = await calculateTokenAllowance(2, _tokenId);
  //     console.log(valInEth, 'valInEth');
  //     if (isApprovedTkn) {
  //       console.log('in to the ether put my stress right now');
  //       await buyNftTokenWithEth(marketCtr, Number(transactionType), _tokenId, {
  //         value: amount.toString(),
  //       })
  //         .then(async (res: any) => {
  //           const response = await res.wait();
  //           console.log(response, 'approve res');
  //           callback(undefined, response);
  //         })
  //         .catch((e: any) => {
  //           callback(e);
  //           console.log(e);
  //           toast.error(
  //             CustomToastWithLink({
  //               icon: ErrorIcon,
  //               title: 'Error',
  //               description: e?.error?.message,
  //               time: 'Now',
  //             })
  //           );
  //         });
  //     }
  //   }
  // };

  //4 approve Napa Or Usdt Token
  // This function does the approval for a specific token contract
  // const doApprovalForToken: any = async (
  //   transactionType: number,
  //   tokenId: string | number
  // ) => {
  //   console.log('gg', tokenId);
  //   const amountToApprove: any = await calculateTokenAllowance(
  //     transactionType,
  //     tokenId
  //   );
  //   console.log((amountToApprove * 2).toString(), 'token allowance');
  //   if (transactionType == 0) {
  //     // Check if the transaction is for NPA tokens
  //     const npaTokenctr: any = await napaTokenContract(signer); // Get the NPA token contract
  //     console.log(npaTokenctr, 'npaTokenctr contract');
  //     const approveRes = await approve(
  //       npaTokenctr,
  //       marketPlace,
  //       (amountToApprove * 2).toString()
  //     ); // Call the approve function of the NPA token contract to allow spending of tokens
  //     console.log(approveRes, 'approve response of napa');
  //     return await approveRes.wait();
  //   } else if (transactionType == 1) {
  //     // Check if the transaction is for USDT tokens
  //     const usdtTokenctr: any = await usdtTokenContract(signer); // Get the USDT token contract
  //     console.log(usdtTokenctr, 'usdtTokenctr contract');
  //     const approveRes = await approve(
  //       usdtTokenctr,
  //       marketPlace,
  //       (amountToApprove * 2).toString()
  //     ); // Call the approve function of the USDT token contract to allow spending of tokens
  //     console.log(approveRes, 'approve response of usdt');
  //     return await approveRes.wait();
  //   } else {
  //     // If the transaction is not for tokens, return -1
  //     console.log("don't need any approval check as you've opted for ether");
  //     return -1;
  //   }
  // };

  //5 calculates token allowance for each type
  // const calculateTokenAllowance = async (
  //   transactionType: number,
  //   toknId: string | number
  // ) => {
  //   // console.log(toknId),"gg";
  //   const decimals: number = 10 ** 18;
  //   const otherDecimals: number = 10 ** 10;
  //   const marketCtr: any = await marketPlaceContract(signer);
  //   const { salePrice } = await nftInfo(marketCtr, toknId.toString());
  //   console.log(salePrice.toString(), 'mysale', toknId);
  //   if (transactionType == 0 || transactionType == 1) {
  //     const _napaTokenAmount = await napaTokenAmount(marketCtr);
  //     const calculatedAmount = (await salePrice) / (await _napaTokenAmount);
  //     console.log(calculatedAmount * decimals, 'total allowance need');
  //     return calculatedAmount * decimals;
  //   } else {
  //     console.log('into ethers part');
  //     const _getLatestPrice: number = await getLatestPrice(marketCtr);
  //     console.log(_getLatestPrice.toString(), '_getLatestPrice aa');
  //     const calculatedAmount: number =
  //       (await salePrice) / (_getLatestPrice * otherDecimals);
  //     console.log(salePrice.toString(), 'salePrice');
  //     console.log(calculatedAmount, 'calculated');
  //     return calculatedAmount.toFixed(18);
  //   }
  // };

  const handleCreateTransactionTable = async (err: any, data: any) => {
    console.log('error while buying listed item', err);
    console.log('lezy response data', data);
    // if (err) {
    //   setLoading(false);
    // } else {
    const newTransaction = {
      sellerWallet: data?.to ? data?.to : '',
      buyerWallet: data?.from ? data?.from : '',
      type: 'SNFT',
      itemId: _snftDetails?.snftId,
      amount: _snftDetails?.amount,
      currencyType: _snftDetails?.currencyType,
      status: '1',
      txId: data?.transactionHash ? data?.transactionHash : '',
      contractAddress: data?.contractAddress ? data.contractAddress : '',
      tokenId: _snftDetails?.tokenId,
      wallet: 'metamask',
      profileId: profileId,
      owner: data?.from ? data?.from : '',
    };
    await handleNewTransaction(newTransaction);
    router.push(
      {
        pathname: '/marketplace',
        query: { redirect: 'MySNFTs' },
      },
      '/marketplace'
    );
    // await handleBuySnft(_snftDetails?.snftId as string);
    setLoading(false);
    // }
  };

  // //6 lazy mint connectivity function
  // const lazyMintHandler = async (data: any) => {
  //   const tokenId = data.tokenId.toString();
  //   const transactionType = data.currencyType;

  //   // console.log((data.currencyType).toString(), "LLL")
  //   const seller = data.generatorId;
  //   const _amount = data.amount;
  //   console.log(_amount, 'AMOUNTT');

  //   console.log('changes appeared', signer, address, data);
  //   const NFTCtr = await newNapaNftContract(signer);
  //   // data.tokenId.toString()
  //   let isNFTAvailable;
  //   try {
  //     isNFTAvailable = await NFTCtr._exists(tokenId);
  //     console.log(isNFTAvailable, 'NFAVA');
  //   } catch (e) {
  //     isNFTAvailable = 0;
  //     console.log(e, 'NOW it will go to Lazymint');
  //   }
  //   console.log('NFT AVAILABILITY', isNFTAvailable);
  //   if (isNFTAvailable) {
  //     let val = data.tokenId.toString();
  //     console.log('NFT exists', val);
  //     // alert("You are buying from market");
  //     console.log('You are buying from market');
  //     setLoading(true);
  //     _buyNftTokenFromMarket(
  //       transactionType,
  //       val,
  //       _amount,
  //       handleCreateTransactionTable
  //     );
  //   } else {
  //     console.log("NFT doesn't exists");
  //     // alert(`You are buying by Lazymint ${transactionType}`);
  //     console.log(`You are buying by Lazymint ${transactionType}`);
  //     console.log('IPFS url is being generated.....');
  //     const metadataUrl = await generateIPFS();
  //     console.log(metadataUrl, 'metadataUrl');
  //     try {
  //       setLoading(true);
  //       await LazyFunction(
  //         tokenId,
  //         seller,
  //         _amount,
  //         transactionType,
  //         metadataUrl,
  //         false,
  //         false,
  //         handleCreateTransactionTable
  //       )
  //         .then(async (res: any) => {
  //           console.log('hang on lazyint is in progress...');
  //           console.log(await res, 'lazymint response');
  //         })
  //         .catch((e: any) => {
  //           console.log(e, 'Error While Lazymint');
  //         });
  //     } catch (e) {
  //       console.log('error :', e);
  //     }
  //   }
  // };

  // API Key: 60b6f40d19ff82e8547a
  // API Secret: bf8632acaad65c73cce04654ed9db02138961f6c80655b4996fa753941751522
  // 7 Pinata IPFS setup
  const { profileDetails } = useProfile();
  const generateIPFS = async () => {
    setLoading(true);
    console.log('generating IPFS ... ');
    const data = {
      thumbnail: _snftDetails?.thumbnail,
      videoURL: _snftDetails?.videoURL,
      id: _snftDetails?.snftId,
      userName: profileDetails?.profileName,
      avatar: profileDetails?.avatar,
      description: _snftDetails?.SNFTDescription,
      title: _snftDetails?.SNFTTitle,
    };


    // const data = {
    //   thumbnail: "https://gateway.pinata.cloud/ipfs/QmZqqLdyuQPvG9P3cr3AccSGJ1ivp5SRx3Ni7JmXr7CZE4/6877.png",
    //   videoURL: "ipfs://QmdWLqsiny6tb7jDrHe5rjS9n6W7KHgmpBwMPe7LpPXE5X/nft.gif",
    //   id: "99",
    //   userName: "Vivek",
    //   avatar: "avatar",
    //   description: "Lorem",
    //   title: "Title",
    // };



    // const data = {
    //   "attributes": [
    //     {
    //       "trait_type": "Faction",
    //       "value": "Rogue Jumpers"
    //     },
    //     {
    //       "trait_type": "Fur",
    //       "value": "Bar Fight Gray"
    //     },
    //     {
    //       "trait_type": "Face",
    //       "value": "OG"
    //     },
    //     {
    //       "trait_type": "Shirt",
    //       "value": "Varsity Jacket Red"
    //     },
    //     {
    //       "trait_type": "Item",
    //       "value": "Flamethrower Red"
    //     },
    //     {
    //       "trait_type": "Top",
    //       "value": "Captain Hat White"
    //     },
    //     {
    //       "display_type": "boost_number",
    //       "trait_type": "S-Karrots",
    //       "value": 0
    //     }
    //   ],
    //   "image": "https://gateway.pinata.cloud/ipfs/QmZqqLdyuQPvG9P3cr3AccSGJ1ivp5SRx3Ni7JmXr7CZE4/6877.png",
    //   "description": "Official Store At [mypethooligan.com](https://mypethooligan.com/).",
    //   "name": "Hooligan #6877"
    // }

    const result = await pinToIPFS(data);
    console.log(result,"pinToIPFS result");
    const mainUrl: any = await result.data.data.IpfsHashURL;
    console.log('pinToIPFS result', mainUrl,result);
    return mainUrl;
  };

  //connectivity functions ends here

  const handleOfferSubmit = async () => {
    setError({
      amount: '',
      expiresIn: '',
    });
    if (!expiresIn) {
      setError((prev) => {
        return {
          ...prev,
          expiresIn: 'Expire Days is required',
        };
      });
    }
    if (!amount) {
      setError((prev) => {
        return {
          ...prev,
          amount: 'Offer Amount is required',
        };
      });
    }
    if (!amount || !expiresIn) return;
    const newOffer = {
      snftId: _snftDetails?.snftId as string,
      profileId: profileId as string,
      expiresIn,
      amount,
    };
    setSubmitOfferLoading(true);
    const { error, message } = await createOffer(newOffer);
    if (error) {
      setSubmitOfferLoading(false);
      setOpen(false);
      setAmount('');
      setExpiresIn('');
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
    setSubmitOfferLoading(false);
    setOpen(false);
    setAmount('');
    setExpiresIn('');
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: 'Offer Was Submitted Successfully',
        time: 'Now',
      })
    );
  };



  // New Work to Support NAPA Wallet for LazyMint start
  const getNetwork = async () => {
    let currentChainId;
    let metaMaskNetwork;
    // for Metamsk
    if (window.ethereum) {
      currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
      metaMaskNetwork = await getChainIdForOtherWallet(currentChainId.toString());
      console.log(metaMaskNetwork, "metaMaskNetwork");
    }
    // for NAPA Wallet
    const walletNetwork: any = getCookie('networkType');
    console.log(walletNetwork, "walletNetwork");
    console.log(metaMaskAccount ? metaMaskNetwork : Number(walletNetwork) === 1 ? (Number(walletNetwork) + 1) : Number(walletNetwork), "Current Network");
    return metaMaskAccount ? metaMaskNetwork : Number(walletNetwork) === 1 ? (Number(walletNetwork) + 1) : Number(walletNetwork);
  }
  const checkApprovalAndBalance = async (_tokenType: string | number, _spender: string) => {
    let response: TallowanceAndBalance = {
      allowance: -1,
      balance: -1
    };
    console.log((metaMaskAccount || napaWalletAccount?.activeWalletAC), "WALLET DETAILS");
    const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
    try {
      if (_tokenType == 0) {
        const chainId = await getNetwork();
        const allowance = await NAPAAllowance(signer, _id, chainId, napaWalletAccount?.profileId, (metaMaskAccount || napaWalletAccount?.activeWalletAC), _spender.toString());
        const balance = await NAPABalanceOf(signer, _id, chainId, napaWalletAccount?.profileId, (metaMaskAccount || napaWalletAccount?.activeWalletAC).toString());
        response.allowance = (parseInt((await allowance).toString(), 10));
        response.balance = (((balance).toString()));
        console.log(response, "allowance and balance for NAPA TKN");
      } else if (_tokenType == 1) {
        const chainId = await getNetwork();
        const allowance = await USDTAllowance(signer, _id, chainId, napaWalletAccount?.profileId, (metaMaskAccount || napaWalletAccount?.activeWalletAC), _spender.toString());
        const balance = await USDTBalanceOf(signer, _id, chainId, napaWalletAccount?.profileId, (metaMaskAccount || napaWalletAccount?.activeWalletAC).toString());
        response.allowance = (parseInt((await allowance).toString(), 16));
        response.balance = (((balance).toString()));
        console.log(response, "allowance and balance for USDT TKN");
      } else if (_tokenType == 2) {
        response.allowance = 0;
        response.balance = balance;
        console.log(response, "allowance and balance for ETHERS");
      }
      else {
        console.log("Wrong Token Type");
      }
      return { response };
    } catch (e) {
      console.log("Error while getting the Allowance and Balance", e);
      return response;
    }
  }
  const approveAny = async (_amount: string, _tokenType: string | number, _to: string): Promise<transactionType> => {
    let response: transactionType = { response: -1, transactionHash: -1 };
    try {
      const chainId = await getNetwork();
      const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
      if (_tokenType == "0") {
        const ApproveResponse: transactionType = await NPTApprove(signer, _id, chainId, napaWalletAccount?.profileId, _to, _amount);
        console.log(ApproveResponse.response, ApproveResponse.transactionHash, "ApproveResponse for NAPA TKN");
        response = ApproveResponse;
      } else if (_tokenType == "1") {
        const ApproveResponse: transactionType = await USDTApprove(signer, _id, chainId, napaWalletAccount?.profileId, _to, _amount);
        console.log(ApproveResponse, "ApproveResponse for USDT TKN");
        response = ApproveResponse;
      } else if (_tokenType == "2") {
        console.log("for ETHERS do nothing");
      } else {
        console.log("wrong Token Type");
      }
      return response;
    }
    catch (e) {
      console.log("Error while giving the Approval", e);
      return response;
    }
  }


  const snftExists = async (_tokenId: any): Promise<boolean> => {
    let response: boolean = false;
    try {
      const chainId = await getNetwork();
      const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
      const allowance = await SNFTExists(signer, _id, chainId, napaWalletAccount?.profileId, _tokenId.toString());
      response = (allowance);
      console.log(`is ${_tokenId} NFT Exists? `, response);
      return response;
    }
    catch (e) {
      console.log("Error while giving the Approval", e);
      return response;
    }
  }
  const newLazyMint = async (data: any) => {
    console.log(data, (metaMaskAccount || napaWalletAccount?.activeWalletAC), "SNFTDATA");
    const chainId = await getNetwork();
    const { _id, _address, _profile, _chainId } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
    console.log(_id, _address, _profile, _chainId, "Wallet Data");

    //LazyMint Params
    const _amount = data?.amount;
    const amount = Number(_amount) * (10 ** 18);
    const currencyType = data?.currencyType;
    // const currencyType: string | number = 1;
    const seller = data?.generatorId;
    const tokenId = data?.tokenId;
    // const tokenId = "10000000000000000000008";
    // const _tokenUri = "https://mypethooligan.com/meta/2214";
    const _tokenUri = await generateIPFS();

    try {
      const balAndAllowanceResponse: any = await checkApprovalAndBalance(currencyType, newSNFT);
      console.log(Number(balAndAllowanceResponse.response.balance), Number(balAndAllowanceResponse.response.allowance), amount, "balance and allowance");
      const url = `https://sepolia.etherscan.io/tx/`;

      const isExists = await snftExists(tokenId);
      console.log(isExists, "isExists")
      if (!isExists) {
        //check token type
        if (Number(currencyType) == 0) {
          console.log("tokens checking for NAPA", (balAndAllowanceResponse.response.balance), (balAndAllowanceResponse.response.allowance), amount)
          // check sufficient balance
          if (Number((balAndAllowanceResponse.response.balance)) >= amount) {
            // all dependant and main functions will starts from here 
            // check Allowance
            if (Number(balAndAllowanceResponse.response.allowance) < amount) {
              try {
                const approval: transactionType = await approveAny((amount).toString(), currencyType, newSNFT);
                console.log(approval, "Approval Response for NAPA TKN");
                if (Number(approval.response) !== -1) {
                  // main lazymint body
                  
                  const LazyResponse: transactionType = await _newLazyMint(signer, _id, chainId, napaWalletAccount?.profileId, tokenId, seller, (amount).toString(), (currencyType).toString(), _tokenUri, false, "0");
                  console.log(await LazyResponse, "LazyResponse for NAPA Type");
                  if (await snftExists(tokenId)) {
                    handleCreateTransactionTable(undefined, LazyResponse);
                    alert("NFT LazyMinted!");
                    const newURL = url + LazyResponse.transactionHash;
                    window.open(newURL, '_blank', 'noreferrer')
                  } else {
                    alert("LazyMint Failed!");
                  }
                } else {
                  alert("Approval rejected");
                }
              } catch (e: any) {
                console.log(e, "error While Lazymint");
                handleCreateTransactionTable(e, e);
              }
            } else {
              // main lazymint body
              try {
                const LazyResponse = await _newLazyMint(signer, _id, chainId, napaWalletAccount?.profileId, tokenId, seller, (amount).toString(), (currencyType).toString(), _tokenUri, false, "0");
                console.log(await LazyResponse, "LazyResponse for NAPA Type");
                if (await snftExists(tokenId)) {
                  handleCreateTransactionTable(undefined, LazyResponse);
                  alert("NFT LazyMinted!");
                  const newURL = url + LazyResponse.transactionHash;
                  window.open(newURL, '_blank', 'noreferrer')
                } else {
                  alert("LazyMint Failed!");
                }
              } catch (e: any) {
                console.log(e, "error While Lazymint");
                handleCreateTransactionTable(e, e);
              }
            }
          } else {
            // you don't have enough balance
            console.log("You don't have suffiecient Balance");
          }

        } else if (Number(currencyType) == 1) {
          console.log("tokens checking for USDT", (balAndAllowanceResponse.response.balance), (balAndAllowanceResponse.response.allowance), amount)
          // check sufficient balance
          if (Number((balAndAllowanceResponse.response.balance)) >= amount) {
            // all dependant and main functions will starts from here 
            // check Allowance
            if (Number(balAndAllowanceResponse.response.allowance) < amount) {
              try {
                const approval: transactionType = await approveAny((amount).toString(), currencyType, newSNFT);
                console.log(approval, "Approval Response for USDT TKN");
                // main lazymint body
                if (Number(approval.response) !== -1) {
                  const LazyResponse: transactionType = await _newLazyMint(signer, _id, chainId, napaWalletAccount?.profileId, tokenId, seller, (amount).toString(), (currencyType).toString(), _tokenUri, false, "0");
                  console.log(await LazyResponse, "LazyResponse for USDT Type");
                  if (await snftExists(tokenId)) {
                    handleCreateTransactionTable(undefined, LazyResponse);
                    alert("NFT LazyMinted!");
                    const newURL = url + LazyResponse.transactionHash;
                    window.open(newURL, '_blank', 'noreferrer')
                  } else {
                    alert("LazyMint Failed!");
                  }
                } else {
                  alert("Approval rejected")
                }
              } catch (e: any) {
                console.log(e);
                handleCreateTransactionTable(e, e);
              }
            } else {
              // main lazymint body
              try {
                const LazyResponse = await _newLazyMint(signer, _id, chainId, napaWalletAccount?.profileId, tokenId, seller, (amount).toString(), (currencyType).toString(), _tokenUri, false, "0");
                console.log(await LazyResponse, "LazyResponse for USDT Type");
                if (await snftExists(tokenId)) {
                  handleCreateTransactionTable(undefined, LazyResponse);
                  alert("NFT LazyMinted!");
                  const newURL = url + LazyResponse.transactionHash;
                  window.open(newURL, '_blank', 'noreferrer')
                } else {
                  alert("LazyMint Failed!");
                }
              } catch (e: any) {
                console.log(e);
                handleCreateTransactionTable(e, e);
              }
            }
          } else {
            // you don't have enough balance
            console.log("You don't have suffiecient Balance");
          }

        } else if (Number(currencyType) == 2) {
          // check sufficient balance
          if (Number(balance) >= amount) {
            // all dependant and main functions will starts from here
            // main lazymint body
            try {
              const LazyResponse = await _newLazyMint(signer, _id, chainId, napaWalletAccount?.profileId, tokenId, seller, (amount).toString(), (currencyType).toString(), _tokenUri, false, amount.toString());
              console.log(await LazyResponse, "LazyResponse for ETH Type");
              handleCreateTransactionTable(undefined, LazyResponse);
            }
            catch (e: any) {
              console.log(e);
              handleCreateTransactionTable(e, e);
            }
          } else {
            // you don't have enough allowance
            console.log("You don't have suffiecient Ether Balance");
          }
        } else {
          console.log("Wrong Token Type");
        }
      } else {
        console.log(`Token id ${tokenId} Already Minted!, try other`);
        alert(`Token id ${tokenId} Already Minted!, try other`);
      }
    }
    catch (e) {
      console.log("Error while LazyMinting", e);
    }
  }
  const getNFTData = async (
    _tknId: string | number, _contract: string
  ): Promise<nftData> => {
    const url = `https://deep-index.moralis.io/api/v2/nft/${_contract}/${_tknId}?chain=sepolia&format=decimal&normalizeMetadata=true&media_items=false`

    try {
      const res = await axios.get(url, {
        headers: {
          'accept': 'application/json',
          'X-API-Key': 'gxFx0RWobr82DUQZD7W2qwtsfaW63p6QtIJh7pZSvRshWexNbv58m9Dc1hai9ZLl'
        }
      })
      const allData = {
        image: res.data.normalized_metadata.image,
        contract_name: res.data.name,
        contract_symbol: res.data.symbol,
        description: res?.data?.normalized_metadata?.description
      }
      return allData;
    } catch (e: any) {
      console.log(e, " Error while fetching NFT Metadata");
      return e;
    }
  }
  type nftData = {
    image: string,
    contract_name: string,
    contract_symbol: string,
    description: string,
  }
  const loadMarketItem = async (): Promise<marketIitem> => {
    let res: marketIitem | any;
    const chainId = await getNetwork();
    const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
    if (marketId > 0) {
      const marketData: any = await _fetchSingleMarketItem(signer, _id, chainId, napaWalletAccount?.profileId, marketId);
      console.log(marketData, "marketDatamarketDatamarketDatamarketDatamarketData")
      if (marketData.price > 0) {
        setMarketItemPrice(marketData.price);
        setMarketItemCurrencyType(marketData.paymentMode);
      }
      if (marketData) {
        res = marketData;
      }
    }
    return res;
  }
  const convertToSNFT = async (): Promise<any> => {
    let data: any;
    try {
      const mrktData: any = await loadMarketItem()
      if (mrktData.price > 0) {
        let _ctr = mrktData?.nftContract;
        let _tknId = mrktData?.tokenId;
        const internalData: nftData = await getNFTData(_tknId, _ctr);
        // console.log(await internalData, "INNER MAP")
        // if (mrktData?.seller.length > 0) {
        setSeller(mrktData?.seller)
        // }
        if (true) {
          data = {
            itemId: mrktData.itemId,
            SNFTAddress: mrktData.nftContract,
            tokenId: mrktData.tokenId,
            owner: mrktData.owner,
            amount: mrktData.price,
            currencyType: mrktData.paymentMode,
            isCoBatchable: mrktData.isCobatchable,
            listed: mrktData.sold,
            SNFTDescription: await internalData.description,
            SNFTTitle: await internalData.contract_name,
            SNFTCollection: await internalData.contract_name,
            marketplace_listed: mrktData.sold,
            thumbnail: await internalData.image
          };
        }
        console.log(data, "converted object")
      } else {
        console.log("No NFT Found on web-3 MarketPlace");
      }
      return data
    }
    catch (e: any) {
      console.log("Error While Fetching MarketPlace NFTs from web3 MarketPlace", e);
      return data;
    }
  }
  const setMarketData = async () => {
    let localItem: SnftResponse | undefined = {
      amount: "-1",
      createdAt: "", currencyType: "", duration: "", mintId: "", postId: "",
      profileId: "", snftId: "", type: "", updatedAt: "", accountId: "",
      generatorId: "", generatorName: "", genre: "", lazyMinted: "",
      listed: "", marketplace_listed: "", maxOffer: "", napaTokenEarned: "",
      payoutsCategory: "", SNFTAddress: "", SNFTCollection: "", SNFTDescription: "", SNFTTitle: "", thumbnail: "", tokenId: "", tokenUri: "", userImage: "", userName: "", videoURL: "", isWeb3Listed: false
    };
    const newData = await convertToSNFT();
    console.log(newData, "web3Object")
    localItem.snftId = newData?.itemId;
    localItem.currencyType = newData?.currencyType;
    localItem.amount = newData?.amount;
    localItem.mintId = newData?.tokenId;
    localItem.SNFTDescription = newData?.SNFTDescription;
    localItem.SNFTTitle = newData?.SNFTTitle;
    localItem.SNFTCollection = newData?.SNFTCollection;
    localItem.SNFTAddress = newData?.SNFTAddress;
    localItem.generatorName = newData?.seller;
    localItem.marketplace_listed = newData?.listed;
    localItem.thumbnail = newData?.thumbnail;
    localItem.tokenUri = newData?.SNFTDescription;
    localItem.tokenId = newData?.tokenId;
    localItem.listed = newData?.listed;
    localItem.lazyMinted = "false";
    localItem.isWeb3Listed = true;
    return localItem;
  }
  const checkIfMarketItemOrNot = async () => {
    //for if item is from web3
    if (typeof marketId === 'string' && Number(marketId) > 0) {
      const data = await setMarketData()
      console.log(_snftDetails, marketId, data, "data found for web3 MarketItem")
      setSnftDetails(data);
      //for if item is from web2
    } else if (_snftDetails && typeof marketId !== 'number') {
      console.log(_snftDetails, marketId, "data found for web2 MarketItem")
      const _tkn: any = _snftDetails?.tokenId;
      const isIt = await snftExists((_tkn).toString());
      if (isIt) {
        setIsMinted(isIt);
      }
      setSnftDetails(_snftDetails);
      const _price: number = Number(_snftDetails.amount) * (10 ** 18);
      setMarketItemPrice(_price);
      setMarketItemCurrencyType(_snftDetails.currencyType);
    } else {
      console.log(_snftDetails, marketId, "_snftDetails_snftDetails")
    }
  }
  const checkFunds = async (_currencyType: string | number, _spender: string, desiredAmouont: string | number): Promise<boolean> => {
    let res: boolean = false;
    if (Number(_currencyType) === 0) {
      const _res: any = await checkApprovalAndBalance(_currencyType, newMarketPlace);
      if (desiredAmouont <= _res.response.balance) {
        if (desiredAmouont <= _res.response.allowance) {
          res = true;
        } else {
          console.log("Insufficient Balance or Allowance");
        }
      } else {
        console.log("You don't have sufficient NAPA Balance to buy this Item");
      }
      return res;
    } else if (Number(_currencyType) === 1) {
      const _res: any = await checkApprovalAndBalance(_currencyType, newMarketPlace);
      if (desiredAmouont <= _res.response.balance) {
        if (desiredAmouont <= _res.response.allowance) {
          res = true;
        } else {
          console.log("Insufficient Balance or Allowance");
        }
      } else {
        console.log("You don't have sufficient USDT Balance to buy this Item");
      }
      return res;
    } else if (Number(_currencyType) === 2) {
      const _res: any = await checkApprovalAndBalance(_currencyType, newMarketPlace);
      if (desiredAmouont <= _res.response.balance) {
        res = true;
      } else {
        console.log("Insufficient Eth Balance");
      }
      return res;
    } else {
      console.log("Invalid Payment Type");
    }
    return res;
  }
  // decide if LazyMint or buyNFTToken
  const marketPlaceInit = async (data: any) => {
    console.log(snftDetails.SNFTAddress, newSNFT, "_myCheck")
    try {
      const chainId = await getNetwork();
      const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
      //if not SNFT
      if (snftDetails.SNFTAddress !== newSNFT && snftDetails.SNFTAddress !== "0x94d407d1860841e9a531d754ec5a6de7d899113d") {
        console.log("MARKET Transcation", "web3 buy", snftDetails)
        // // marketPlace buyNFTToken function will be initiated
        if (Number(marketItemPrice) > 0) {
          const isAllowed = await checkFunds(marketItemCurrencyType, newMarketPlace, marketItemPrice);
          if (isAllowed) {
            console.log("buyNFTToken of Marketplace is in Progress...!");
            buyNFTToken(signer, _id, chainId, napaWalletAccount?.profileId, data.tokenId, marketItemPrice, marketItemCurrencyType);
          } else {
            console.log("you don't have enough assets or insufficient allowance, giving allowance wait...!");
            const _res = await approveAny((marketItemPrice).toString(), marketItemCurrencyType, newMarketPlace);
            console.log(_res, "approval response");
            if (_res) {
              console.log("buyNFTToken of Marketplace is in Progress...!")
              buyNFTToken(signer, _id, chainId, napaWalletAccount?.profileId, marketId, marketItemPrice, marketItemCurrencyType);
            }
          }
        } else {
          console.log("Invalid Price");
        }
      } else {
        //if SNFT

        if (await snftExists(data?.tokenId)) {
          console.log("MARKET Transcation", "SNFT buy", snftDetails)
          //   // if SNFT Exists       
          // then marketPlace buyNFTToken function will be initiated
          if (Number(marketItemPrice) > 0) {
            const isAllowed = await checkFunds(marketItemCurrencyType, newMarketPlace, marketItemPrice);
            if (isAllowed) {
              console.log("buyNFTToken of Marketplace is in Progress...!")
              const buyRes = await buyNFTToken(signer, _id, chainId, napaWalletAccount?.profileId, marketId, marketItemPrice, marketItemCurrencyType);
              console.log("MarketItem Bought Successfully", buyRes);
              setOpen(false)
            } else {
              console.log("you don't have enough assets or insufficient allowance, giving allowance wait...!");
              const _res = await approveAny((marketItemPrice).toString(), marketItemCurrencyType, newMarketPlace);
              console.log(_res, "approval response");
              if (_res) {
                console.log("buyNFTToken of Marketplace is in Progress...!")
                const buyRes = await buyNFTToken(signer, _id, chainId, napaWalletAccount?.profileId, data.tokenId, marketItemPrice, marketItemCurrencyType);
                console.log("MarketItem Bought Successfully", buyRes);
                setOpen(false)
              }
            }
          } else {
            console.log("Invalid Price");
          }
        } else {
          console.log("MARKET Transcation", "Lazy mint", snftDetails)
          //   //lazyMint will be initiated
          console.log("LazyMint of SNFT is in Progress...!")
          newLazyMint(snftDetails);
        }
      }
    } catch (e: any) {
      console.log("Error while Minting or Buying", e);
    }
  }
  React.useEffect(() => {
    console.log(_snftDetails, marketId, "_snftDetails_snftDetails_snftDetails")
    checkIfMarketItemOrNot()
    console.log((metaMaskAccount || napaWalletAccount?.activeWalletAC).toString(), seller, "ISOWNER")
    if (seller.length > 0) {
      if ((metaMaskAccount || napaWalletAccount?.activeWalletAC).toString() === seller) {
        setIsSeller(true)
      }
    }
  }, [seller])
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    bgcolor: '#1c2424',
    borderRadius: '20px',
    border: '5px solid #16e6ef',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = (data: any) => {
    if (metaMaskAccount.length > 0) {
      marketPlaceInit(data)
    } else {
      setOpen(true);
    }
    console.log(typeof metaMaskAccount, "MTMX", napaWalletAccount, "My Dart");
  };

  // work for claim back Market Item
  const claimBackItem = async (marketItem: any) => {
    console.log(marketItem)
    try {
      const chainId = await getNetwork();
      const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
      const marketData: any = await _fetchSingleMarketItem(signer, _id, chainId, napaWalletAccount?.profileId, marketId);
      //if not SNFT
      if ((marketData.seller).toString() === (metaMaskAccount || napaWalletAccount?.activeWalletAC).toString()) {
        console.log("Item is being Claimed back, wait...");
        const _res = await claimBack(signer, _id, chainId, napaWalletAccount?.profileId, marketId);
        console.log(_res, "CLAIM_")
        if (Number(_res.response) !== -1) {
          alert("Item claimed..!");
        } else {
          alert("Item claiming Rejected!");
        }
      } else {
        alert("You're can't Claim NFT back");
        console.log("")
      }
    } catch (e: any) {
      console.log("Error while Minting or Buying", e);
    }
  }

  // New Work to Support NAPA Wallet for LazyMint ends)


  //Tushar work starts from here
  const test1 = async (): Promise<any> => {
    console.log("In test1");
    
    const { _id } = whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
    try {
        const chainId = await getNetwork();
        // const response = await NAPAAllowance(signer, _id, chainId, napaWalletAccount?.profileId, (metaMaskAccount || napaWalletAccount?.activeWalletAC), _spender.toString());
        // await activepool(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await fetchMarketData(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await FetchPoolData(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await fetchPoolmember(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // // await FetchPoolDetails(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await fetchVotedStatus(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await fractionSeller(signer, _id, chainId, napaWalletAccount?.profileId,"1","0xec112c2402717f7f05ab3E289224E99cCa8E5280")
        // // await isResaleActive(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await isResaleActive(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await itempoolinfo(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await memberPercentage(signer, _id, chainId, napaWalletAccount?.profileId,"1","0xec112c2402717f7f05ab3E289224E99cCa8E5280")
        // await participants(signer, _id, chainId, napaWalletAccount?.profileId,"1","0xec112c2402717f7f05ab3E289224E99cCa8E5280")
        // await pools(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await resaleItem(signer, _id, chainId, napaWalletAccount?.profileId,"1","20")
        // await resalepooliteminfo(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        // await returnpoolId(signer, _id, chainId, napaWalletAccount?.profileId,"1")
        //  console.log(response);

        // await setSale(signer,_id,chainId,napaWalletAccount?.profileId,)
        // await createPool(signer,_id,chainId,napaWalletAccount?.profileId,"2","5","50000000000000000","2073600","1","70627017000000000");
        // await joinPool(signer,_id,chainId,napaWalletAccount?.profileId,"1","50000000000000000","50000000000000000");
        // await sellFraction(signer,_id,chainId,napaWalletAccount?.profileId,"1");
        // await BuyFraction(signer,_id,chainId,napaWalletAccount?.profileId,"1","0x5438F7aE81843305a4f20f482Dea9d5d582eA49D","50000000000000000","50000000000000000");
        // await reListItem(signer,_id,chainId,napaWalletAccount?.profileId,"2","50000000000000000");
        // await voteForPrice(signer,_id,chainId,napaWalletAccount?.profileId,"2",true);
        await reSellToken(signer,_id,chainId,napaWalletAccount?.profileId,"4","500000000000000000","2",true);
        // await endPool(signer,_id,chainId,napaWalletAccount?.profileId,"2","3");
      }catch(e){
      console.log("Error in test1",e);
      
    }
  }

  //ends here

  return (
    <div className={styles.SectionOne}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} alignItems="center"
          justifyContent="center">
          <div style={{ display: 'flex', justifyContent: "center" }}>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontWeight: "bolder", color: "white" }} >
              <div style={{ fontSize: "14px" }}>{napaWalletAccount.activeWalletAC}</div>
            </Typography>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontWeight: "bolder", color: "white" }} >
              {/* {napaWalletAccount.activeWalletAC} */}
            </Typography>
          </div>
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontWeight: "bolder", marginTop: "20px", color: "white" }} >
            Buy / LazyMint From MarketPlace
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{ display: 'flex', justifyContent: "space-around", marginTop: "300px" }}>
              <button onClick={handleClose} style={{ width: "120px", border: "1px solid cyan", borderRadius: "10%", fontSize: "20px", fontWeight: "bolder" }} >Reject</button>
              <button onClick={() => { marketPlaceInit(snftDetails) }} style={{ width: "120px", border: "1px solid cyan", borderRadius: "10%", fontSize: "20px", fontWeight: "bolder" }}>Confirm</button>
            </div>
          </Typography>
        </Box>
      </Modal>
      <div className={styles.CustomGridContainer}>
        <div className={styles.CustomGrid}>
          <div className={styles.imgPerntScone}>
            {/* <Image
              src="/img/crat_nft_tow_aj.png"
              alt=""
              width={540}
              height={540}
            /> */}
            {snftDetails?.videoURL?.length > 0 ? <video
              width={'100%'}
              height={'540px'}
              autoPlay
              controls
              muted
              loop
              src={snftDetails?.videoURL as string}
            ></video> : <img
              width={'100%'}
              height={'540px'}
              src={snftDetails?.thumbnail as string}
            ></img>}
          </div>
        </div>
        <div className={styles.CustomGrid}>
          <div className={styles.ScOneLeftCont}>
            <h1>{snftDetails?.SNFTTitle}</h1>
            <p>{snftDetails?.SNFTDescription}</p>
            <div className={styles.imgAndperaFlex}>
              <img
                src={`${snftDetails?.userImage
                  ? snftDetails?.userImage
                  : '/assets/images/img_avatar.png'
                  }`}
                alt=""
                width={40}
                height={40}
                style={{ borderRadius: '50px' }}
              />
              <p>{snftDetails?.userName}</p>
            </div>
            <div className={styles.CurrentBitBox}>
              <div className={styles.CurrentBitBoxInrr}>
                <p>{snftDetails?.type == "Fixed Price" ? "Fixed Price" : "Best Bid"}</p>
                <div className={styles.imgAdnHH}>
                  {snftDetails?.currencyType == '0' ? (
                    <Image
                      src="/img/napa_ic.svg"
                      height="28px"
                      width="28px"
                      alt=""
                      className=""
                    />
                  ) : snftDetails?.currencyType == '1' ? (
                    <Image
                      src={UsdtYellowBgIcon}
                      alt=""
                      width="28px"
                      height="28px"
                    />
                  ) : (
                    <Image
                      src={EtheriumIcon}
                      alt=""
                      width="28px"
                      height="28px"
                    />
                  )}
                  <h3>{snftDetails?.amount ? snftDetails?.amount : '--'}</h3>
                </div>
              </div>
              <div className={styles.CurrentBitBoxInrr}>
                <p>Ending In</p>
                <div className={styles.imgAdnHH}>
                  <h3>
                    {snftDetails?.duration ? snftDetails?.duration : '--'}
                  </h3>
                </div>
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div className={styles.thrBtnPrnt}>
                {open && (
                  <div className={styles.submitModalContainer}>
                    <div className={styles.icon}>
                      <Image
                        className={styles.close}
                        onClick={() => {
                          setOpen(false);
                          setError({ amount: '', expiresIn: '' });
                          setAmount('');
                          setExpiresIn('');
                        }}
                        src="/img/exit_icon.svg"
                        alt=""
                        width="24px"
                        height="24px"
                      />
                    </div>
                    <div className={`col-lg-12 col-lg-12-rspnsv`}>
                      <div className={styles.max540}>
                        <div className={styles.TopLogo}></div>
                        <div className={styles.MiddleCont}>
                          {/* <div className={styles.exitBtnContainer}> */}
                          <div className={styles.MiddleContInn}>
                            <div className={styles.text}>
                              <label>Enter Bid Amount</label>
                            </div>
                            {/* </div> */}
                            <input
                              type="text"
                              placeholder="0.000"
                              value={amount}
                              onChange={(e) => {
                                if (
                                  /^\d{0,9}(?:\.\d{0,8})?$/.test(e.target.value)
                                ) {
                                  setAmount(e.target.value);
                                }
                              }}
                              disabled={submitOfferLoading}
                            />
                            {!amount && error.amount && (
                              <span className={styles.errmsg}>
                                {error.amount}
                              </span>
                            )}
                            {/* <span /> */}
                            {/* <p>NAPA</p> */}
                          </div>
                        </div>
                        <div className={styles.BottomCont}>
                          <div className={styles.text}>
                            <label>Offer Expires</label>
                          </div>
                          <ul>
                            <li>
                              <input
                                type="radio"
                                name="lock-amout"
                                id="amountOne"
                                value="1 Days"
                                onChange={(e) => setExpiresIn(e.target.value)}
                                disabled={submitOfferLoading}
                              />
                              <p>1 Days</p>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="lock-amout"
                                id="amountOne"
                                value="3 Days"
                                onChange={(e) => setExpiresIn(e.target.value)}
                                disabled={submitOfferLoading}
                              />
                              <p>3 Days</p>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="lock-amout"
                                id="amountOne"
                                value="5 Days"
                                onChange={(e) => setExpiresIn(e.target.value)}
                                disabled={submitOfferLoading}
                              />
                              <p>5 Days</p>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="lock-amout"
                                id="amountOne"
                                value="7 Days"
                                onChange={(e) => setExpiresIn(e.target.value)}
                                disabled={submitOfferLoading}
                              />
                              <p>7 Days</p>
                            </li>
                          </ul>
                          {!expiresIn && error.expiresIn && (
                            <span className={styles.errmsg}>
                              {error.expiresIn}
                            </span>
                          )}
                        </div>
                        {submitOfferLoading ? (
                          <div className={styles.loaderContainer}>
                            <FadeLoader color="#ffffff" />
                          </div>
                        ) : (
                          <div
                            onClick={handleOfferSubmit}
                            className={styles.BottomAction}
                          >
                            <Button text="Submit" outlined />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {profileId == snftDetails?.profileId && (
                  <Link href={`/list-item?id=${router?.query?.id}`}>
                    <a
                      className={`${styles.linkPernt} ${(snftDetails?.listed == '2' || snftDetails?.listed == '0') && styles.disabled
                        }`}
                    >
                      Edit
                    </a>
                  </Link>
                )}
                {/* {profileId == snftDetails?.profileId && (
                  <Link href="">
                    <a onClick={handleDeleteSnft} className={styles.linkPernt}>
                      Delist
                    </a>
                  </Link>
                )} */}
                {profileId == snftDetails?.profileId &&
                  (snftDetails?.listed == '1' ||
                    snftDetails?.listed == '2') && (
                    <Link href="">
                      <a
                        onClick={() =>
                          snftDetails?.listed == '1' && handleDeleteSnft()
                        }
                        className={`${styles.linkPernt} ${snftDetails?.listed == '2' && styles.disabled
                          }`}
                      >
                        {snftDetails?.listed == '2' ? 'Sold' : 'Delist'}
                      </a>
                    </Link>
                  )}
                {profileId == snftDetails?.profileId &&
                  snftDetails?.listed == '0' && (
                    <a
                      href="javascript:void(0);"
                      onClick={() =>
                        router.push(`/list-item?id=${router?.query?.id}`)
                      }
                      className={styles.linkPernt}
                    >
                      Sell
                    </a>
                  )}

                {profileId != snftDetails?.profileId && !isMinted ? (
                  <a
                    href="javascript:void(0);"
                    className={`${styles.linkPernt} ${(snftDetails?.listed == '2' || snftDetails?.type == "Fixed Price") && styles.disabled
                      }`}
                    onClick={() => {
                      if (snftDetails?.type == 'Fixed Price') {
                        toast.error(
                          CustomToastWithLink({
                            icon: ErrorIcon,
                            title: 'Error',
                            description:
                              'You cant not submit offer for the fixed price',
                            time: 'Now',
                          })
                        );
                        return;
                      }
                      setOpen(true);
                    }}
                  >
                    Submit Bid
                  </a>
                  // </Link>
                ) : null}
                {profileId != snftDetails?.profileId && !isSeller ? (
                  <a
                    href="javascript:void(0);"
                    className={`${styles.linkPernt} ${snftDetails?.listed == '2' && styles.disabled
                      }`}
                    onClick={() => {
                      if (snftDetails?.listed == '2') {
                        return;
                      }
                      // lazyMintHandler(snftDetails);
                      // newLazyMint(snftDetails);
                      handleOpen(snftDetails)
                      // marketPlaceInit(snftDetails)
                      // checkApprovalAndBalance();
                      // generateIPFS()
                    }}
                  >
                    {snftDetails?.listed == '2' ? (
                      <span>Sold</span>
                    ) : (
                      <span>
                        {' '}
                        <span
                          className={`${snftDetails?.currencyType == '0'
                            ? styles.blue
                            : snftDetails?.currencyType == '1'
                              ? styles.green
                              : styles.lightBlue
                            }`}
                        >{`${((snftDetails?.amount)) }  ${snftDetails?.currencyType == '0'
                          ? 'NAPA'
                          : snftDetails?.currencyType == '1'
                            ? 'USDT'
                            : 'ETH'
                          }`}</span>
                      </span>
                    )}
                  </a>
                ) : null}
                {profileId != snftDetails?.profileId && isMinted ? (
                  <a
                    href="javascript:void(0);"
                    className={`${styles.linkPernt} ${snftDetails?.listed == '2' && styles.disabled
                      }`}
                    onClick={() => {
                      if (snftDetails?.listed == '2') {
                        return;
                      }
                    }}
                  >
                    {(
                      <span>Sold</span>
                    )}
                  </a>
                ) : null}

                {/* // if user is the Lister on marketPlace */}
                {profileId != snftDetails?.profileId && isSeller ? (
                  <a
                    href="javascript:void(0);"
                    className={`${styles.linkPernt} ${snftDetails?.listed == '2' && styles.disabled
                      }`}
                    onClick={() => {
                      if (snftDetails?.listed == '2') {
                        return;
                      }
                      // lazyMintHandler(snftDetails);
                      // newLazyMint(snftDetails);
                      claimBackItem(marketId)
                      // marketPlaceInit(snftDetails)
                      // checkApprovalAndBalance();
                      // generateIPFS()
                    }}
                  >
                    {snftDetails?.listed == '2' ? (
                      <span>Sold</span>
                    ) : (
                      <span>
                        {' '}
                        <span
                          className={`${snftDetails?.currencyType == '0'
                            ? styles.blue
                            : snftDetails?.currencyType == '1'
                              ? styles.green
                              : styles.lightBlue
                            }`}
                        >{`${"Claim Back"}`}</span>
                      </span>
                    )}
                  </a>
                ) : null}
                <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                  <div className={styles.butnPernt}>
                    <button
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Image
                        src="/img/tow_dot_white_img.svg"
                        alt=""
                        width={32}
                        height={32}
                      />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                      <li>
                        <a className="dropdown-item" href="#" 
                        onClick={generateIPFS}
                        >
                          Add to Watchlist
                        </a>
                      </li>
                      <li>
                        {/* <a className="dropdown-item" href="#">
                          Ask DAVE
                        </a> */}
                          <button className="dropdown-item" onClick={test1}>
                          Ask DAVE
                        </button>
                      </li>
                      <li>
                        <a className="dropdown-item" href="create-new-pool">
                          Create New Pool
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// for create new pool the NFT or SFT will be added to co-bathing pools on step 2 //