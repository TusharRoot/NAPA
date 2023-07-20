import { auctionC } from "../contractObjects"
import auctionABI from "../../newABIs/auction.json"
import { newAuction } from "@/connectivity/addressHelpers/addressHelper";
import { readFunction } from "@/services/AssetManagement";

//read functions

// 2) auctionAdmin
export const auctionAdmin = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _address: string, _auctionid: number) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(auctionABI),
                    contractAddress: JSON.stringify(newAuction),
                    funcionName: JSON.stringify("auctionAdmin"),
                    allParams: JSON.stringify([_address,_auctionid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("auctionAdmin response from NAPAWallet",value)
            res = await value;
        } else if (_id==1){
            const contract = await auctionC(_signer);
            const response = await contract.auctionAdmin();
            console.log("auctionAdmin response from Metamask",response)
            res= response;
            return res;
        }else{
            console.log("Wrong Wallet Connceted");
        }
        return res;
    } catch (e){
        console.log(e, "Error while calling auctionAdmin() of auction");
        return res;
    }
}

// 1) auctionCounter
export const auctionCounter = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(auctionABI),
                    contractAddress: JSON.stringify(newAuction),
                    funcionName: JSON.stringify("auctionCounter"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("auctionCounter response from NAPAWallet", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await auctionC(_signer);
            const response = await contract.auctionCounter();
            console.log(response, "auctionCounter response from Metamask");
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling auctionCounter() of auction");
        return res;
    }
}
// 2) auctionDetails
export const auctionDetails = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(auctionABI),
                    contractAddress: JSON.stringify(newAuction),
                    funcionName: JSON.stringify("auctionDetails"),
                    allParams: JSON.stringify([_auctionId])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("auctionDetails response from NAPAWallet", value);
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await auctionC(_signer);
            const response = await contract.auctionDetails(_auctionId);
            console.log(response, "auctionDetails response from Metamask");
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling auctionDetails() of auction");
        return res;
    }
}
// 3) bids ("Returns total bid by a Bidder")
//export  const bids = async (_signer: any) => {
//    
//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("bids"),
//                     allParams: JSON.stringify([])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).bids();
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling bids() of auction");
//     }
// }
// 4) fetchAllAuctioBids
export const fetchAllAuctioBids = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(auctionABI),
                    contractAddress: JSON.stringify(newAuction),
                    funcionName: JSON.stringify("fetchAllAuctioBids"),
                    allParams: JSON.stringify([_auctionId.toString()])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("fetchAllAuctioBids response from NAPAWallet", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await auctionC(_signer);
            const response = await contract.fetchAllAuctioBids(_auctionId.toString());
            console.log(response, "fetchAllAuctioBids response from Metamask");
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling fetchAllAuctioBids() of auction");
        return res;
    }
}
// // 5) fetchAllAuctionItems
// export const fetchAllAuctionItems = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("fetchAllAuctionItems"),
//                     allParams: JSON.stringify([])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).fetchAllAuctionItems();
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling fetchAllAuctionItems() of auction");
//     }
// }
// // 6) getFees
// export const getFees = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("getFees"),
//                     allParams: JSON.stringify([])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).getFees();
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling getFees() of auction");
//     }
// }
// // 7) memberDetails
// export const memberDetails = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _address: string, _auctionId: number) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("memberDetails"),
//                     allParams: JSON.stringify([_address, _auctionId.toString()])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).memberDetails(_address, _auctionId.toString());
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling memberDetails() of auction");
//     }
// }
// // 8) nextBidPrice
// export const nextBidPrice = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("nextBidPrice"),
//                     allParams: JSON.stringify([_auctionId])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).nextBidPrice(_auctionId);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling nextBidPrice() of auction");
//     }
// }


// //Write functions

// // 1) addMembers
// export const addMembers = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number, _members: string[]) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("addMembers"),
//                     allParams: JSON.stringify([_auctionId, _members])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).addMembers(_auctionId, _members);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling addMembers() of auction");
//     }
// }
// // 2) cancelAuction
// export const cancelAuction = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("cancelAuction"),
//                     allParams: JSON.stringify([_auctionId])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).cancelAuction(_auctionId);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling cancelAuction() of auction");
//     }
// }
// // 3) changeMinBidPercentage
// export const changeMinBidPercentage = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number, _nextBidPercentage: string) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("changeMinBidPercentage"),
//                     allParams: JSON.stringify([_auctionId, _nextBidPercentage])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).changeMinBidPercentage(_auctionId, _nextBidPercentage);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling changeMinBidPercentage() of auction");
//     }
// }
// // 4) claimNFT
// export const claimNFT = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("claimNFT"),
//                     allParams: JSON.stringify([_auctionId])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).claimNFT(_auctionId);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling claimNFT() of auction");
//     }
// }
// // 5) createAuction
// export const createAuction = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _nftId: string, _nftAddress: string, _endTime: string, _isPrivate: string, _paymentType: string, _minBidPercentage: string, ethAmount: string) => {

//     let res: any; ``
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("createAuction"),
//                     allParams: JSON.stringify([_nftId, _nftAddress, _endTime, _isPrivate, _paymentType, _minBidPercentage, { value: ethAmount.toString() }])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).createAuction(_nftId, _nftAddress, _endTime, _isPrivate, _paymentType, _minBidPercentage, { value: ethAmount.toString() });
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling createAuction() of auction");
//     }
// }
// // 6) makeBid
// export const makeBid = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number, _amount: string) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("makeBid"),
//                     allParams: JSON.stringify([_auctionId, _amount])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).makeBid(_auctionId, _amount);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling makeBid() of auction");
//     }
// }
// // 7) rejectHighestBid
// export const rejectHighestBid = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("rejectHighestBid"),
//                     allParams: JSON.stringify([_auctionId])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).rejectHighestBid(_auctionId);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling rejectHighestBid() of auction");
//     }
// }
// // 8) withDrawBid
// export const withDrawBid = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _auctionId: number) => {

//     let res: any;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(auctionABI),
//                     contractAddress: JSON.stringify(newAuction),
//                     funcionName: JSON.stringify("withDrawBid"),
//                     allParams: JSON.stringify([_auctionId])
//                 }
//             };
//             //params will be injected within API CALL

//             //
//         } else if (_id == 1) {
//             res = await auctionC(_signer).withDrawBid(_auctionId);
//         } else {
//             console.log("Wrong Wallet Connected");
//         }
//         return res;
//     }
//     catch (e) {
//         console.log(e, "Error while calling withDrawBid() of auction");
//     }
// }