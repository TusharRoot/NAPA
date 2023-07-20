import { ethers } from "ethers";
import napaABI from "../newABIs/napaToken.json"
import usdtABI from "../newABIs/usdtToken.json"
import snftABI from "../newABIs/snft.json"
import auctionABI from "../newABIs/auction.json"
import cobatchingABI from "../newABIs/coBatching.json"
import rewardABI from "../newABIs/rewarder.json"
import marketplaceABI from "../newABIs/marketPlace.json"
import swapABI from "../newABIs/nftSwap.json"

import { newNapaToken, newUSDTToken, newSNFT, newAuction, newCoBatching, newRewarder, newMarketPlace, newSwapping } from "../addressHelpers/addressHelper";

//napa Token Conrtact Object
export const napaTokenC = async (signer: any): Promise<any> => {
    try {
        return new ethers.Contract(newNapaToken, napaABI.abi, signer);
    } catch (e) {
        console.log("Error While napaToken Contract Deployment", e);
        return e
    }
}

//usdt Token Conrtact Object
export const usdtTokenC = async (signer: any) => {
    try {
        return new ethers.Contract(newUSDTToken, usdtABI.abi, signer);
    } catch (e) {
        console.log("Error While usdtToken Contract Deployment", e);
        return e
    }
}

//snft Contract Object
export const snftC = async (signer: any) => {
    try {
        return new ethers.Contract(newSNFT, snftABI.abi, signer);
    } catch (e) {
        console.log("Error While SNFT Contract Deployment", e);
        return e
    }
}

//auction Contract Object
export const auctionC = async (signer: any) => {
    try {
        return new ethers.Contract(newAuction, auctionABI.abi, signer);
    } catch (e) {
        console.log("Error While auction Contract Deployment", e);
        return e
    }
}

//coBatching Contract Object
export const coBatchingC = async (signer: any) => {
    try {
        return new ethers.Contract(newCoBatching, cobatchingABI.abi, signer);
    } catch (e) {
        console.log("Error While coBatching Contract Deployment", e);
        return e
    }
}

//rewarder Contract Object
export const rewarderC = async (signer: any) => {
    try {
        return new ethers.Contract(newRewarder, rewardABI.abi, signer);
    } catch (e) {
        console.log("Error While rewarder Contract Deployment", e);
        return e
    }
}

//marketPlace Contract Object
export const marketPlaceC = async (signer: any) => {
    try {
        return new ethers.Contract(newMarketPlace, marketplaceABI.abi, signer);
    } catch (e) {
        console.log("Error While marketPlace Contract Deployment", e);
        return e
    }
}

//swap Contract Object
export const swapC = async (signer: any) => {
    try {
        return new ethers.Contract(newSwapping, swapABI.abi, signer);
    } catch (e) {
        console.log("Error While Swapping Contract Deployment", e);
        return e
    }
}

//generic nft Contract Object
export const genericNftC = async (signer: any, _nftContract: string) => {
    console.log(signer, _nftContract,"MyParams")
    try {
        return new ethers.Contract(_nftContract, snftABI.abi, signer);
    } catch (e) {
        console.log("Error While generic NFT Contract Deployment", e);
        return e
    }
}