import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './SellNFTPage.module.scss';
import Input from '../Input/Input';
import Select from 'react-select';
import Image from 'next/image';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useRouter } from 'next/router';
import { Dayoptions, offerOptions } from '../../constants/sell-nft.constants';
import { MintPost } from '../../types/mint';
import { FadeLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import {
  DoneIcon,
  ErrorIcon,
  EtheriumIcon,
  NapaBlueBgIcon,
  UsdtYellowBgIcon,
  dollarBlackIcon,
  timeBlackIcon,
} from '../assets';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import {
  createNewSnft,
  // createNewSnft,

  updateSnft
} from '../../services/MarketplaceApi';
import { SnftResponse } from '../../types/marketplace';
// import { commanNFTContract } from '@/connectivity/contractObjects/commanNFTContract';
import // approve,
  // getApproved,
  //  transferFrom
  '@/connectivity/callHelpers/commanNFTCallHandlers';
import useWebThree from '@/hooks/useWebThree';
// import {
//   marketPlaceContract,
//   // newNapaNftContract,
//   // napaTokenContract, usdtTokenContract
// } from '@/connectivity/contractObjects/contractObject1';
// import {
//   isApprovedForAll,
//   // approve, buyNftToken, buyNftTokenWithEth, getLatestPrice, napaTokenAmount,
//   nftInfo,
//   setSaleFromWallet,
// } from '@/connectivity/callHelpers/callHelper1'; 
import { newMarketPlace, newSNFT } from '@/connectivity/addressHelpers/addressHelper';
import Loading from '../Loading/Loading';
import Tippy from '@tippyjs/react';
import { getChainIdForOtherWallet } from '@/connectivity/networkUtils/chainHelper';
import { getCookie } from 'cookies-next';
import { whichWalletConnected } from '@/connectivity/walletController/handleWallet';
import { setApprovalForAll as snftSetApprovalForAll } from '@/connectivity/walletController/allContractsCallHelper/snftCallHelper';
import { transactionType } from '@/connectivity/walletController/web3Types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { setSale } from '@/connectivity/walletController/allContractsCallHelper/marketPlace';
import { approve as GNFTApproval } from '@/connectivity/walletController/allContractsCallHelper/genericNFTCallHelper';
import { getFees } from '@/connectivity/walletController/allContractsCallHelper/marketPlace';


type SellNFTPageProps = {
  mintDetails: MintPost | null;
  loading: boolean;
  snftDetails: SnftResponse | null;
};

export default function SellNFTPage({
  mintDetails,
  loading,
  snftDetails,
}: SellNFTPageProps) {
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
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [currencyType, setCurrencyType] = React.useState<any>();
  const [amount, setAmount] = React.useState('');
  const [maxOffer, setMaxOffer] = React.useState<any>();
  const [duration, setDuration] = React.useState<any>();
  const [creatorFees, setCreatorFees] = React.useState<any>("");
  const [buyNow, setBuyNow] = React.useState<string>('');
  const [type, setType] = React.useState('Fixed Price');
  const [isChecked, setIsChecked] = React.useState<boolean>();
  const [offerSpread, setOfferSpread] = React.useState<any>();
  const [validation, setValidation] = React.useState('');
  const [errors, setErrors] = React.useState({
    currencyType: '',
    amount: '',
    duration: '',
    maxOffer: '',
    buyNow: '',
    creatorFees: '',
    offerSpread: '',
    validationError: '',
  });

  const { metaMaskAccount, napaWalletAccount } = useWebThree();
  const [open, setOpen] = React.useState(false);
  const [web3contract, setWeb3Contract] = React.useState<any>("");
  const [web3TokenId, setWeb3TokenId] = React.useState<any>("");

  const handleOpen = () => {
    if (metaMaskAccount.length > 0) {
      handleCreateSnft()
    } else {
      setOpen(true);
    }
    console.log(typeof metaMaskAccount, "MTMX", napaWalletAccount, "My Dart");
  };

  const handleClose = () => setOpen(false);
  const { signer } = useWebThree();

  useEffect(() => {
    console.log(router.query, "new-dart-for-marketitem")
    if (web3contract?.length !== "" && web3TokenId?.length !== "") {
      setWeb3Contract(router.query?.contract);
      setWeb3TokenId(router.query?.tokenId);
    }

    console.log(validation)
    if (snftDetails) {
      const currencyTypeIndex = optionsone.findIndex(
        (option) => snftDetails.currencyType == option.value
      );

      if (currencyTypeIndex > -1) {
        setCurrencyType({ ...optionsone[currencyTypeIndex] });
      } else {
        setCurrencyType(null);
      }
      const durationIndex = Dayoptions.findIndex(
        (option) => snftDetails.duration == option.value
      );
      if (durationIndex > -1) {
        setDuration({ ...Dayoptions[durationIndex] });
      } else {
        setDuration(null);
      }
      const offerIndex = offerOptions.findIndex(
        (option) => snftDetails.maxOffer == option.value
      );
      if (offerIndex > -1) {
        setMaxOffer({ ...offerOptions[offerIndex] });
      } else {
        setMaxOffer(null);
      }
      if (snftDetails.amount) {
        setAmount(snftDetails.amount);
      } else {
        setAmount('');
      }
      if (snftDetails.type) {
        setType(snftDetails.type);
      } else {
        setType('Fixed Price');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snftDetails]);

  const handleCreateSnft = async () => {
    setErrors({
      currencyType: '',
      amount: '',
      duration: '',
      maxOffer: '',
      buyNow: '',
      creatorFees: '',
      offerSpread: '',
      validationError: '',
    });
    const vald = validation?.includes('@');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ethAddressPattern = /^(0x)?[0-9a-fA-F]{40}$/;
    if (vald) {
      const emailValidate = emailRegex.test(validation);
      if (!emailValidate) {
        setErrors((prev) => {
          return {
            ...prev,
            validationError: 'Email Address is invalid',
          };
        });
      }
    }
    if (!vald) {
      const etherumValidate = ethAddressPattern.test(validation);
      if (!etherumValidate) {
        setErrors((prev) => {
          return {
            ...prev,
            validationError: 'Etherum Address is invalid',
          };
        });
      }
    }
    if (!validation) {
      setErrors((prev) => {
        return {
          ...prev,
          validationError: 'Email or Etherum Address is required',
        };
      });
    }
    if (mintDetails?.marketplace_listed == 'true') {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Listed In Marketplace',
          time: 'Now',
        })
      );
      return;
    }
    if (!currencyType) {
      setErrors((prev) => {
        return {
          ...prev,
          currencyType: 'Currency type is required',
        };
      });
    }
    if (!amount) {
      setErrors((prev) => {
        return {
          ...prev,
          amount: 'Amount is required',
        };
      });
    }
    if (!creatorFees) {
      setErrors((prev) => {
        return {
          ...prev,
          creatorFees: 'Creator Fees is required',
        };
      });
    }
    if (!offerSpread) {
      setErrors((prev) => {
        return {
          ...prev,
          offerSpread: 'Offer Spread is required',
        };
      });
    }
    if (offerSpread > 5) {
      setErrors((prev) => {
        return {
          ...prev,
          offerSpread: 'Offer Spread must be from 0% to 5% max',
        };
      });
    }
    if (creatorFees > 20) {
      setErrors((prev) => {
        return {
          ...prev,
          creatorFees: 'Creator Fees must be from 0% to 20% max',
        };
      });
    }
    if (!duration) {
      setErrors((prev) => {
        return {
          ...prev,
          duration: 'Duration is required',
        };
      });
    }
    if (type == 'Time Based Auction' && !buyNow) {
      setErrors((prev) => {
        return {
          ...prev,
          buyNow: 'Buy Now is required',
        };
      });
    }
    if (type == 'Time Based Auction' && !maxOffer) {
      setErrors((prev) => {
        return {
          ...prev,
          maxOffer: 'Maximum Offers is required for time based auction',
        };
      });
    }
    console.log("IN the END",
      // duration ||
      // !amount 
      // !currencyType 
      // creatorFees 
      // offerSpread  Fault
      // (type == 'Time Based Auction' && !maxOffer) Fault
      // creatorFees == '' 
      // offerSpread Fault
    );
    if (
      !duration ||
      !amount ||
      !currencyType ||
      !creatorFees ||
      // !offerSpread ||
      // (type == 'Time Based Auction' && !maxOffer) ||
      // offerSpread == '' ||
      creatorFees == ''
    )
      return;
    setIsLoading(true);
    // let id = "101"
    console.log("Initiated......")
    const amountInDecimals = Number(amount.toString()) * 10 ** 18;
    console.log('amount', amountInDecimals);
    console.log("Initiated2...", amountInDecimals)

    // new Listing setup ->
    const newListing = await newSetList();
    console.log(await newListing, "new Listing response");
    // new Listing setup <-

    // const deployedWeb3 = await listNFT(
    //   mintDetails?.tokenId as string,
    //   amountInDecimals.toString(),
    //   nftAddress
    // );

    console.log(newListing, 'web3 setApproval triggered...!');

    if (newListing) {
      const newSnft = {
        currencyType: currencyType?.value ?? '',
        type,
        amount,
        duration: duration?.value ?? '',
        mintId: mintDetails?.mintId ?? '',
        profileId: mintDetails?.profileId ?? '',
        postId: mintDetails?.postId ?? '',
        maxOffer: maxOffer?.value ?? '',
      };
      const { error, message }: any = await createNewSnft(newSnft);
      if (error) {
        setIsLoading(false);
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
      setIsLoading(false);
      setCurrencyType(null);
      setAmount('');
      setDuration(null);
      setMaxOffer(null);
      setType('Fixed Price');
      toast.success(
        CustomToastWithLink({
          icon: DoneIcon,
          title: 'Success',
          description: 'SNFT was sucessfully listed in marketplace',
          time: 'Now',
        })
      );
      push('/marketplace');
    } else {
      setIsLoading(false);
    }
  };

  const handleUpdateSnft = async () => {
    setErrors({
      currencyType: '',
      amount: '',
      duration: '',
      maxOffer: '',
      buyNow: '',
      creatorFees: '',
      offerSpread: '',
      validationError: '',
    });
    if (!currencyType) {
      setErrors((prev) => {
        return {
          ...prev,
          currencyType: 'Currency type is required',
        };
      });
    }
    if (type == 'Time Based Auction' && !buyNow) {
      setErrors((prev) => {
        return {
          ...prev,
          currencyType: 'Buy Now is required',
        };
      });
    }
    if (!amount) {
      setErrors((prev) => {
        return {
          ...prev,
          amount: 'Amount is required',
        };
      });
    }
    if (!duration) {
      setErrors((prev) => {
        return {
          ...prev,
          duration: 'Duration is required',
        };
      });
    }
    if (type == ' TimeBased Auction' && !maxOffer) {
      setErrors((prev) => {
        return {
          ...prev,
          maxOffer: 'Maximum Offer is required for Time Based Auction',
        };
      });
    }
    if (
      !duration ||
      !amount ||
      !currencyType ||
      (type == 'Time Based Auction' && !maxOffer)
    )
      return;
    console.log('hello');

    setIsLoading(true);
    const updatedSnft = {
      currencyType: currencyType?.value ?? '',
      type,
      amount,
      duration: duration?.value ?? '',
      mintId: mintDetails?.mintId ?? '',
      maxOffer: maxOffer?.value ?? '',
    };
    const { error, message }: any = await updateSnft(updatedSnft);
    if (error) {
      setIsLoading(false);
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
    setIsLoading(false);
    setCurrencyType(null);
    setAmount('');
    setDuration(null);
    setType('Fixed Price');
    setMaxOffer(null);
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: 'SNFT has been successfully Updated',
        time: 'Now',
      })
    );
    push('/marketplace');
  };

  //web3 functions starts here
  // user will allow his Other NFTs by approving to MarketPlace Contract (LISTING)
  // let id = "104"
  // let contract = "0x20bf1a09c7c7211ead72de3d96bc129cd2bfe743"

  // case #1 to list SNFT (setSaleFromWallet)
  // const allowMarketToSellForSNFT = async (
  //   tknId: number | string,
  //   salePrice: number | string
  // ): Promise<boolean> => {
  //   let flag: boolean = false;
  //   console.log(
  //     'you are giving approval to SNFT token id:',
  //     tknId,
  //     await signer,
  //     await address
  //   );
  //   const marketContract = await marketPlaceContract(signer);
  //   const commanNFTCtr = await commanNFTContract(signer, nftAddress);
  //   //set list from MarketPlace contract
  //   console.log('salePrice', salePrice);
  //   const isNftExists = await commanNFTCtr._exists(tknId);
  //   console.log('is this Nft Exists ? : asa', isNftExists, commanNFTCtr);
  //   if (isNftExists) {
  //     console.log('NFT exists so setting approval from Wallet');
  //     await setSaleFromWallet(marketContract, tknId, salePrice.toString())
  //       .then(async (res: any) => {
  //         console.log(
  //           `You are setting for sale to token id: ${tknId}, Wait for the Transaction 'Approval'... `
  //         );
  //         console.log(await res.wait(), 'setSaleFromWallet result');
  //       })
  //       .catch((e: any) => {
  //         console.log(e, 'Error while setSaleFromWallet');
  //         // toast.error(
  //         //   CustomToastWithLink({
  //         //     icon: ErrorIcon,
  //         //     title: 'Error',
  //         //     description: e.message,
  //         //     time: 'Now',
  //         //   })
  //         // );
  //         // console.log(e, 'Error');
  //       });
  //   }

  //   await commanNFTCtr
  //     .setApprovalForAll(marketPlace, true)
  //     .then(async (res: any) => {
  //       console.log(await res.wait(), 'Approval response for SNFT');
  //       flag = true;
  //     })
  //     .catch((e: any) => {
  //       toast.error(
  //         CustomToastWithLink({
  //           icon: ErrorIcon,
  //           title: 'Error',
  //           description: e.message,
  //           time: 'Now',
  //         })
  //       );
  //       console.log(e, 'Error while approving SNFT');
  //       flag = false;
  //     });
  //   let approvalTwo: boolean = await isApprovedForAll(
  //     commanNFTCtr,
  //     address,
  //     marketPlace
  //   );
  //   // const commanNFTCtr = await commanNFTContract(signer, nftAddress);
  //   // await commanNFTCtr.approve(nftAddress, tknId).then(async (res: any) => {
  //   //   console.log(`You have approved your nft with id: ${tknId}, Wait for the Transaction 'Approval'... `);
  //   //   console.log(await res.wait(), "approve to market result");
  //   // }).catch((e: any) => {
  //   //   console.log(e, "Error");
  //   // });
  //   try {
  //     //#2 NFT info
  //     const marketCtr = await marketPlaceContract(signer);
  //     const _nftInfoRes = await nftInfo(marketCtr, tknId);
  //     console.log('saleStatus', _nftInfoRes[2]);
  //     console.log('approvalTwo', approvalTwo);
  //     // flag = _nftInfoRes[2] && approvalTwo;// it will be true or false
  //   } catch (e) {
  //     toast.error(
  //       CustomToastWithLink({
  //         icon: ErrorIcon,
  //         title: 'Error',
  //         description: e.message,
  //         time: 'Now',
  //       })
  //     );
  //     console.log(e, 'Error While checking the Approval');
  //     flag = false;
  //   }
  //   return flag;
  // };

  // case #2 to list other NFT (approve)
  // const allowMarketToSellOtherNft = async (
  //   tknId: number | string,
  //   nftAddress: string
  // ): Promise<boolean> => {
  //   let flag = false;
  //   console.log(
  //     'you are giving approval to token id:',
  //     tknId,
  //     await address,
  //     await chainId.toString()
  //   );
  //   const commanNFTCtr = await commanNFTContract(signer, nftAddress);
  //   await commanNFTCtr
  //     .approve(nftAddress, tknId)
  //     .then(async (res: any) => {
  //       console.log(
  //         `You have approved your nft with id: ${tknId}, Wait for the Transaction 'Approval'... `
  //       );
  //       console.log(await res.wait(), 'approve to market result');
  //     })
  //     .catch((e: any) => {
  //       toast.error(
  //         CustomToastWithLink({
  //           icon: ErrorIcon,
  //           title: 'Error',
  //           description: e.error.message,
  //           time: 'Now',
  //         })
  //       );
  //       console.log(e, 'Error');
  //     });
  //   try {
  //     const checkApproval = await commanNFTCtr.getApproved(tknId);
  //     console.log(checkApproval, 'address which is approved');
  //     if (checkApproval) {
  //       alert('otherNFT has been approved to marketplace');
  //       flag = true;
  //     }
  //   } catch (e) {
  //     toast.error(
  //       CustomToastWithLink({
  //         icon: ErrorIcon,
  //         title: 'Error',
  //         description: e.message,
  //         time: 'Now',
  //       })
  //     );
  //     console.log(e, 'Error While checking the Approval');
  //     flag = false;
  //   }
  //   return flag;
  // };

  //main function who will decide to call which listing function
  // const listNFT = async (
  //   tknId: number | string,
  //   salePrice: number | string,
  //   nftAddress: string
  // ): Promise<boolean | undefined> => {
  //   try {
  //     if (nftAddress.toUpperCase() == nftAddress.toUpperCase()) {
  //       // alert('List for SNFTs');
  //       console.log('List for SNFTs');
  //       return await allowMarketToSellForSNFT(tknId, salePrice);
  //     } else {
  //       // alert('List for other NFTs');
  //       console.log('List for other NFTs');
  //       return await allowMarketToSellOtherNft(tknId, nftAddress);
  //     }
  //   } catch (e) {
  //     toast.error(
  //       CustomToastWithLink({
  //         icon: ErrorIcon,
  //         title: 'Error',
  //         description: e.message,
  //         time: 'Now',
  //       })
  //     );
  //     console.log(e, 'Error while Listing NFTs');
  //     return false;
  //   }
  // };

  //web3 functions ends here



  // new-web3 connectivity for Listing starts
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

  const newSetList = async () => {
    let response;
    try {
      const chainId = await getNetwork();
      const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
      const SNFTContractAddress = newSNFT;
      const ApproveResponse: transactionType = await snftSetApprovalForAll(signer, _id, chainId, napaWalletAccount?.profileId, SNFTContractAddress, true);
      console.log(ApproveResponse.response, ApproveResponse.transactionHash, "ApproveResponse for SNFT");
      response = ApproveResponse;
      return response;
    }
    catch (e) {
      console.log("Error while giving the Approval for SNFT", e);
      return response;
    }
  }

  const web3NFTApproval = async (_token: string, _contract: string): Promise<transactionType> => {
    let response: transactionType = { response: -1, transactionHash: -1 };
    try {
      const chainId = await getNetwork();
      const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
      if (_token !== undefined && _contract !== undefined) {
        const ApproveResponse: transactionType = await GNFTApproval(signer, _id, chainId, napaWalletAccount?.profileId, newMarketPlace, _token, _contract);
        console.log(ApproveResponse.response, ApproveResponse.transactionHash, "ApproveResponse for Any NFT/SNFT");
        response = ApproveResponse;
        return response;
      } else {
        alert(`Contract or Id not found ${router.query?.contract}`)
        return { response: -1, transactionHash: -1 }
      }
    }
    catch (e) {
      console.log("Error while giving the Approval for SNFT/NFT", e);
      return response;
    }
  }

  const getListingFees = async () => {
    let response: number | string = 0;
    try {
      const chainId = await getNetwork();
      const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
      const _fees = await getFees(signer, _id, chainId, napaWalletAccount?.profileId);
      response = (_fees);
      let _res = parseInt((response).toString(),16)
      console.log(`Marketplace Fees: `, _res);
      return _res;
    }
    catch (e) {
      console.log("Error while giving the Approval", e);
      return response;
    }
  }


  const web3Listing = async () => {
    alert("actual web3 Item Listing...!")
    console.log("actual web3 Item Listing...!")
    let response;
    try {
      const chainId = await getNetwork();
      const { _id } = await whichWalletConnected(metaMaskAccount, napaWalletAccount, napaWalletAccount?.profileId, chainId);
      console.log(web3TokenId, web3contract, "web3TokenId, web3contract")
      const _approvalRes: transactionType = await web3NFTApproval(web3TokenId, web3contract);
      if (_approvalRes.response !== -1) {
        const listingPrice = await getListingFees();
        console.log(listingPrice,"listingPricelistingPrice")
        if (Number(listingPrice) >= 0) {
          const _listResponse: transactionType = await setSale(signer, _id, chainId, napaWalletAccount?.profileId, web3TokenId, (Number(amount)*(10**18)), web3contract, currencyType.value, true, listingPrice);
          console.log(_listResponse.response, _listResponse.transactionHash, "_listResponse for SNFT");
          response = _listResponse;
        } else {
          alert("Couldn't get ListingFees")
        }
      } else {
        alert("Approval Failed")
      }
      return response;
    }
    catch (e) {
      console.log("Error while giving the Approval for SNFT", e);
      return response;
    }
  }

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

  // new-web3 connectivity for Listing ends 

  return (
    <>
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
            Allow MarketPlace Listing
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{ display: 'flex', justifyContent: "space-around", marginTop: "300px" }}>
              <Button variant="contained" onClick={handleClose} >Reject</Button>
              <Button variant="contained" onClick={handleCreateSnft}>Confirm</Button>
            </div>
          </Typography>
        </Box>
      </Modal>
      <div className={styles.SellNFTPage}>
        <div className={styles.CustomGridContainer}>
          <div className={styles.CustomGrid}>
            <div className={styles.TypeSidCont}>
              <div className={styles.typePrnt}>
                <h1 className={styles.DefHed}>Listing Type</h1>
                <div className={styles.dublBtn}>
                  <button
                    onClick={() => setType('Fixed Price')}
                    className={`${type === 'Fixed Price' ? styles.Active1 : styles.Active}`}
                  >
                    <Image
                      src={type === "Fixed Price" ? dollarBlackIcon : "/img/dollar_icon.svg"}
                      alt=""
                      width={20}
                      height={20}
                    />{' '}
                    Fixed Price
                  </button>
                  <button
                    onClick={() => setType('Time Based Auction')}
                    className={`${type === 'Time Based Auction' ? styles.Active1 : styles.Active}`}
                  >
                    <Image
                      src={type === "Time Based Auction" ? timeBlackIcon : "/img/time_icon.svg"}
                      alt=""
                      width={20}
                      height={20}
                    />
                    Time Based Auction
                  </button>
                </div>
              </div>
              <div className={styles.typePrnt}>
                <h1 className={styles.DefHed}>
                  {type == 'Time Based Auction' && ''}Price & Currency
                  Type
                </h1>
                <div className={styles.MixInputPool}>
                  <div
                    style={{ position: 'relative' }}
                    className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
                  >
                    <p className={styles.ClctionTxt}>Currency Type</p>
                    <Select
                      options={optionsone}
                      // menuIsOpen={true}
                      className="select_pernt select_pernt_v2"
                      placeholder="Select currency type"
                      classNamePrefix="cntrslct"
                      onChange={(selectedOption) =>
                        //@ts-ignore
                        setCurrencyType(selectedOption)
                      }
                      value={currencyType}
                    />
                    {!currencyType && errors.currencyType && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-2rem',
                          left: '0rem',
                        }}
                        className={styles.errormsg}
                      >
                        {errors.currencyType}
                      </span>
                    )}
                  </div>
                  <div
                    style={{ position: 'relative' }}
                    className={`${styles.FrstInput} frstinputsell`}
                  >
                    <Input
                      value={amount}
                      type="text"
                      placeholder="0.00000001"
                      label="Minimum Price"
                      onChange={(e) => {
                        if (/^\d{0,9}(?:\.\d{0,8})?$/.test(e.target.value)) {
                          setAmount(e.target.value);
                        }
                      }}
                    />
                    {!amount && errors.amount && (
                      <span
                        className={styles.errormsg}
                        style={{
                          position: 'absolute',
                          bottom: '1rem',
                          left: '0rem',
                          color: 'red',
                        }}
                      >
                        {errors.amount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {type == 'Time Based Auction' && (
                <>
                  <div
                    style={{ position: 'relative', marginTop: '-3rem' }}
                    className={styles.typePrnt}
                  >
                    <div className={`${styles.FrstInput} frstinputsell`}>
                      <Input
                        value={buyNow}
                        type="text"
                        placeholder="0.00000001"
                        label="Buy Now Price"
                        onChange={(e) => {
                          if (/^\d{0,9}(?:\.\d{0,8})?$/.test(e.target.value)) {
                            setBuyNow(e.target.value);
                          }
                        }}
                      />
                      {!buyNow && errors.buyNow && (
                        <span
                          className={`${styles.errormsg}`}
                          style={{
                            position: 'absolute',
                            bottom: '110px',
                            left: '0rem',
                            color: 'red',
                          }}
                        >
                          {errors.buyNow}
                        </span>
                      )}
                    </div>
                    <h1 className={styles.DefHed}>Maximum Offers</h1>
                    <div className={styles.Sections}>
                      <Select
                        //@ts-ignore
                        options={offerOptions}
                        className={`select_pernt select_pernt_v2 ${styles.options}`}
                        placeholder="Select Max Number of Offers"
                        classNamePrefix="cntrslct"
                        onChange={(selectedOption) =>
                          setMaxOffer(selectedOption)
                        }
                        value={maxOffer}
                      />
                    </div>
                    {!maxOffer && errors.maxOffer && (
                      <span
                        className={styles.errormsg}
                        style={{
                          position: 'absolute',
                          bottom: '-2rem',
                          left: '0rem',
                        }}
                      >
                        {errors.maxOffer}
                      </span>
                    )}
                  </div>
                </>
              )}
              <div
                style={{
                  position: 'relative',
                  marginTop: type == 'Time Based Auction' ? 0 : '-3rem',
                }}
                className={styles.typePrnt}
              >
                <h1 className={styles.DefHed}>Listing Duration (Days)</h1>
                <div className={styles.Sections}>
                  <Select
                    options={Dayoptions}
                    className={`select_pernt select_pernt_v2 ${styles.options}`}
                    placeholder="Select Duration"
                    classNamePrefix="cntrslct"
                    onChange={(selectedOption) =>
                      //@ts-ignore
                      setDuration(selectedOption)
                    }
                    value={duration}
                  />
                </div>
                {!duration && errors.duration && (
                  <span
                    className={styles.errormsg}
                    style={{
                      position: 'absolute',
                      bottom: '-2rem',
                      left: '0rem',
                    }}
                  >
                    {errors.duration}
                  </span>
                )}
              </div>
              <div className={`${styles.typePrnt} typePrntaj`}>
                <div className={styles.otherOptionInfoContainer}>
                  <div style={{ display: 'flex' }}>
                    <h1 className={styles.DefHed}>Other Options</h1>
                  </div>
                </div>
                <div className={`${styles.switchpool} switchpool`}>
                  <div style={{ display: 'flex' }}>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Creator Royalties Fees
                      </label>
                    </div>
                    <div className={styles.infoIcons}>
                      <Tippy
                        className="toolTipContainer"
                        placement="top"
                        content={
                          <div>
                            <p style={{ textAlign: 'left' }}>As a creator, you are eligible to earn up to 20% of the views earnings of your post after sale of post</p>
                          </div>
                        }
                      >
                        <img
                          src={'/assets/images/info_icon.png'}
                          alt=""
                          style={{
                            marginLeft: '6px',
                            cursor: 'pointer',
                          }}
                          width={20}
                          height={20}
                        />
                      </Tippy>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {/* <form > */}
                      <div style={{ display: 'flex', borderBottom: '2px solid white', textAlign: 'center', width: '4vw' }}>
                        <input
                          className={`${styles.creatorFees} ${creatorFees ? "w-50 text-right" : "w-100 text-center"}`}
                          type="number"
                          min={'1'}
                          max={'20'}
                          placeholder="0%"
                          // maxLength={20}
                          value={creatorFees}
                          onChange={(e) => {

                            if (Number(e.target.value) < 0) return;
                            if (Number(e.target.value) <= 20) {
                              setCreatorFees(e.target.value);
                            }
                          }}

                        />
                        {creatorFees &&
                          <span style={{ color: 'white' }}>%</span>
                        }
                      </div>


                    </div>

                    {!creatorFees &&
                      errors.creatorFees == 'Creator Fees is required' && (
                        <span
                          className={styles.errormsg}
                          style={{
                            marginTop: '1rem',
                          }}
                        >
                          {errors.creatorFees}
                        </span>
                      )}
                  </div>
                </div>
                {
                  type != 'Time Based Auction' ?
                    <>
                      <div className={`${styles.switchpool} switchpool`}>
                        <div style={{}}>

                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              checked={isChecked}
                              onChange={() => setIsChecked(!isChecked)}
                            />
                            <div className={styles.flexBox}>
                              <label
                                className="form-check-label"
                                htmlFor="flexSwitchCheckDefault"
                              >
                                Reserve for specific buyer
                              </label>
                              <p>
                                This item will be purchased by the buyer specified
                              </p>
                            </div>
                          </div>
                          {isChecked && (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '2.5rem',
                                alignItems: 'flex-start',
                              }}
                            >
                              <div style={{ borderBottom: '2px solid white', textAlign: 'left' }}>
                                <label className={styles.checkBoxLable}>
                                  Enter the Wallet or Email Address of the Buyer
                                </label>
                                <input
                                  style={{ width: '100%', paddingLeft: '1rem', textAlign: "left" }}
                                  type="text"
                                  className={styles.creatorFees}
                                  onChange={(e) => {
                                    setValidation(e.target.value);
                                  }}
                                />
                              </div>
                              {errors.validationError && (
                                <span
                                  className={styles.errormsg}
                                  style={{
                                    marginTop: '1rem',
                                  }}
                                >
                                  {errors.validationError}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`${styles.switchpool} switchpool`}>

                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                          <div className={styles.flexBox}>
                            <label
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                            >
                              Eligible for Co-Batching Pool
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <div className={`${styles.switchpool} switchpool`}>
                        <div style={{}}>

                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              checked={isChecked}
                              disabled={true}
                              onChange={() => setIsChecked(!isChecked)}
                            />
                            <div className={styles.flexBox}>
                              <label
                                style={{ color: 'gray' }}
                                className="form-check-label"
                                htmlFor="flexSwitchCheckDefault"
                              >
                                Reserve for specific buyer
                              </label>
                              <p style={{ color: "gray" }}>
                                This item will be purchased by the buyer specified
                              </p>
                            </div>
                          </div>
                          {isChecked && (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '2.5rem',
                                alignItems: 'flex-start',
                              }}
                            >
                              <div style={{ borderBottom: '2px solid white', textAlign: 'left' }}>
                                <label className={styles.checkBoxLable}>
                                  Enter the Wallet or Email Address of the Buyer
                                </label>
                                <input
                                  style={{ width: '100%', paddingLeft: '1rem', textAlign: "left" }}
                                  type="text"
                                  className={styles.creatorFees}
                                  onChange={(e) => {
                                    setValidation(e.target.value);
                                  }}
                                />
                              </div>
                              {errors.validationError && (
                                <span
                                  className={styles.errormsg}
                                  style={{
                                    marginTop: '1rem',
                                  }}
                                >
                                  {errors.validationError}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`${styles.switchpool} switchpool`}>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            disabled={true}
                          />
                          <div className={styles.flexBox}>
                            <label style={{ color: 'gray' }}
                              className="form-check-label"
                              htmlFor="flexSwitchCheckDefault"
                            >
                              Eligible for Co-Batching Pool
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                }

                {type == 'Time Based Auction' && 'Minimum ' && (
                  <div className={`${styles.switchpool} switchpool`}>
                    <div style={{ display: 'flex' }}>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                        />
                        <div className={styles.flexBox}>
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            Offer Spread
                          </label>
                        </div>
                      </div>

                      <div className={styles.infoIcons}>
                        <Tippy
                          className="toolTipContainer"
                          placement="top"
                          content={
                            <div>
                              <p style={{ textAlign: 'left' }}>
                                The offer spread is the max percentage another
                                user must bid to beat the best bid, mx spread is
                                5%
                              </p>
                            </div>
                          }
                        >
                          <img
                            src={'/assets/images/info_icon.png'}
                            alt="Trending"
                            style={{
                              marginLeft: '6px',
                              cursor: 'pointer',
                            }}
                            width={20}
                            height={20}
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-end" }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', borderBottom: '2px solid white', textAlign: 'center', width: '4vw' }}>
                          <input
                            className={`${styles.creatorFees} ${offerSpread ? "w-50 text-right" : "w-100 text-center"}`}
                            style={{ minWidth: 25 }}
                            type="number"
                            min={'1'}
                            max={'5'}
                            placeholder="0%"
                            value={offerSpread}
                            onChange={(e) => {
                              if (Number(e.target.value) < 0) return;
                              if (Number(e.target.value) <= 5) {
                                setOfferSpread(e.target.value);
                              }
                            }}
                          />
                          {offerSpread &&
                            <span style={{ color: 'white' }}>%</span>
                          }
                        </div>


                      </div>
                      {!offerSpread &&
                        errors.offerSpread == 'Offer Spread is required' && (
                          <span
                            className={styles.errormsg}
                            style={{
                              marginTop: '1rem',
                            }}
                          >
                            {errors.offerSpread}
                          </span>
                        )}
                    </div>
                  </div>
                )}
              </div>
              <div className={`${styles.typePrnt} `}>
                {/* <h1 className={styles.DefHed}>Fees</h1> */}
                <div className={styles.flexFees}>
                  {/* <p>Transaction Fee</p> */}
                  {/* <h6>0%</h6> */}
                </div>
                {/* <div className={styles.flexFees}>
                  <p>Creator Fee</p>
                  <h6> (set when collection is created)</h6>
                </div> */}
              </div>
              {web3contract?.length <= 0 ?
                <div className={`${styles.typePrnt} `}>
                  {isLoading ? (
                    <Loading />
                  ) : mintDetails?.marketplace_listed == 'true' ? (
                    <a onClick={handleUpdateSnft} className={styles.linkPrnt}>
                      Update Listing
                    </a>
                  ) : (
                    // <button
                    //   onClick={handleCreateSnft}
                    //   className={styles.linkPrnt}
                    //   style={{
                    //     backgroundColor: 'transparent',
                    //     border: 'none',
                    //     outline: 'none',
                    //   }}
                    //   type="submit"
                    // >
                    //   Complete Listing
                    // </button>
                    <a onClick={handleOpen} className={styles.linkPrnt}>
                      Complete Listing
                    </a>

                  )}
                  {/* <a onClick={handleCreateSnft} className={styles.linkPrnt}>
                  <Button onClick={handleOpen}>Open modal</Button>
                </a> */}
                </div> : <div className={`${styles.typePrnt} `}>
                  {isLoading ? (
                    <Loading />
                  ) : mintDetails?.marketplace_listed == 'true' ? (
                    <a onClick={handleUpdateSnft} className={styles.linkPrnt}>
                      Update Listing
                    </a>
                  ) : (
                    <a onClick={web3Listing} className={styles.linkPrnt}>
                      Complete Listing
                    </a>
                  )}
                  {/* <a onClick={handleCreateSnft} className={styles.linkPrnt}>
                  <Button onClick={handleOpen}>Open modal</Button>
                </a> */}
                </div>}
            </div>
          </div>
          <div className={styles.CustomGrid}>
            <div className={`${styles.typePrnt} `}>
              <h1 className={styles.DefHed}>Preview</h1>

              <div className={styles.imgPernt}>
                {loading ? (
                  <div className={styles.loadingContainer}>
                    <FadeLoader color="#ffffff" />
                  </div>
                ) : (
                  // <Image
                  //   src={`${
                  //     mintDetails?.thumbnail ? mintDetails?.thumbnail : ''
                  //   }`}
                  //   alt=""
                  //   width={540}
                  //   height={540}
                  // />
                  <video
                    width={'100%'}
                    height={'100%'}
                    autoPlay
                    controls
                    muted
                    loop
                    src={mintDetails?.videoURL as string}
                    style={{ objectFit: 'cover' }}
                  >
                    The “video” tag is not supported by your browser.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
