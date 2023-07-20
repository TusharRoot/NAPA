export const data={}
// import { swapC } from "../contractObjects"
// import swapABI from "../../newABIs/nftSwap.json"
// import { newSwapping } from "@/connectivity/addressHelpers/addressHelper";
// import { whichWalletConnected } from "../handleWallet";

// //read functions

// // 1) getAllSwaps
// export const getAllSwaps = async (_signer: any) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("getAllSwaps"),
//                     allParams: JSON.stringify([])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).getAllSwaps();
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling getAllSwaps() of nftSwapping Token");
//     }
// }
// // 2) getFees
// export const getFees = async (_signer: any) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("getFees"),
//                     allParams: JSON.stringify([])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).getFees();
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling getFees() of nftSwapping Token");
//     }
// }
// // 3) getLatestEthPrice
// export const getLatestEthPrice = async (_signer: any) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("getLatestEthPrice"),
//                     allParams: JSON.stringify([])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).getLatestEthPrice();
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling getLatestEthPrice() of nftSwapping Token");
//     }
// }
// // 4) getSingleSwap
// export const getSingleSwap = async (_signer: any, _swapId: number) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("getSingleSwap"),
//                     allParams: JSON.stringify([_swapId.toString()])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).getSingleSwap(_swapId.toString());
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling getSingleSwap() of nftSwapping Token");
//     }
// }
// // 5) getSwapsByWalletAddress
// export const getSwapsByWalletAddress = async (_signer: any, _walletAddress: string) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("getSwapsByWalletAddress"),
//                     allParams: JSON.stringify([_walletAddress])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).getSwapsByWalletAddress(_walletAddress);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling getSwapsByWalletAddress() of nftSwapping Token");
//     }
// }
// // 6) swapId
// export const swapId = async (_signer: any) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("swapId"),
//                     allParams: JSON.stringify([])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).swapId();
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling swapId() of nftSwapping Token");
//     }
// }
// // 7) swappingFees
// export const swappingFees = async (_signer: any) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("swappingFees"),
//                     allParams: JSON.stringify([])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).swappingFees();
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling swappingFees() of nftSwapping Token");
//     }
// }

// //------------------------------------------------------------------------------------------

// //Write Functions

// //1) cancelSwapAndClaimNFTBack
// export const cancelSwapAndClaimNFTBack = async (_signer: any, _swapId: number) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("cancelSwapAndClaimNFTBack"),
//                     allParams: JSON.stringify([_swapId.toString()])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).cancelSwapAndClaimNFTBack(_swapId.toString());
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling cancelSwapAndClaimNFTBack() of nftSwapping Token");
//     }
// }
// //2) completeSwap
// export const completeSwap = async (_signer: any, _swapId: number) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("completeSwap"),
//                     allParams: JSON.stringify([_swapId.toString()])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).completeSwap(_swapId.toString());
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling completeSwap() of nftSwapping Token");
//     }
// }
// //3) initiateSwap
// export const initiateSwap = async (_signer: any, _senderNftAddress: number[], _senderPrice: number[], _senderNftIds: number[], _endTimeOfSwapping: string, ethAmount: string) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("initiateSwap"),
//                     allParams: JSON.stringify([_senderNftAddress, _senderPrice, _senderNftIds, _endTimeOfSwapping.toString(), { value: ethAmount.toString() }])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).initiateSwap(_senderNftAddress, _senderPrice, _senderNftIds, _endTimeOfSwapping.toString(), { value: ethAmount.toString() });
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling initiateSwap() of nftSwapping Token");
//     }
// }
// //4) rejectSwap
// export const rejectSwap = async (_signer: any, _swapId: number) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("rejectSwap"),
//                     allParams: JSON.stringify([_swapId.toString()])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).rejectSwap(_swapId.toString());
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling rejectSwap() of nftSwapping Token");
//     }
// }
// //5) setRecipientNFT
// export const setRecipientNFT = async (_signer: any, _swapId: number,_recipientNftAddress: number[], _recipientNftIds: number[],_recipientPrice: number[]) => {
//     const { _id } = whichWalletConnected()
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(swapABI),
//                     contractAddress: JSON.stringify(newSwapping),
//                     funcionName: JSON.stringify("setRecipientNFT"),
//                     allParams: JSON.stringify([_swapId.toString(),_recipientNftAddress, _recipientNftIds,_recipientPrice])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await swapC(_signer).setRecipientNFT(_swapId.toString(),_recipientNftAddress, _recipientNftIds,_recipientPrice);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling setRecipientNFT() of nftSwapping Token");
//     }
// }
// // const { napaWalletAccount, metaMaskAccount } = useWebThree()
// //   // @ts-ignore
// //   console.log("napaWalletAccount?.activeWalletAC", napaWalletAccount?.activeWalletAC);
// //   console.log("metaMaskAccount", metaMaskAccount);