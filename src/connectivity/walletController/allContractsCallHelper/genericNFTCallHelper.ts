import { genericNftC  } from "../contractObjects"
import nftABI from "../../newABIs/snft.json"
import { readFunction, signTransaction } from "@/services/AssetManagement";
import { transactionType } from "../web3Types";


//read functions
// 1) _exists
export const _exists = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string,_nftContract:string):Promise<boolean> => {
    console.log(_signer, _id, _chainId, _profileId, _tokenId,_nftContract,"_exists response from USDTTOKEN")
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(nftABI),
                    contractAddress: JSON.stringify(_nftContract),
                    funcionName: JSON.stringify("_exists"),
                    allParams: JSON.stringify([_tokenId])
                }
            };
            //params will be injected within READ API CALL
            const response:any = await readFunction(params);
            console.log("_exists response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)            
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("Exists response from NFT from NAPAWallet", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await genericNftC(_signer,_nftContract);
            const response:any = await contract._exists(_tokenId);
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling _exists() of NFT Token");
        return res;
    }
}

//Write functions

// 1) approve
export const approve = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _to: string, _tokenId: string,_nftContract:string): Promise<transactionType> => {
    console.log(_signer, _id, _chainId, _profileId, _to, _tokenId,_nftContract,"Approve Params")
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(nftABI),
                    contractAddress: JSON.stringify(_nftContract),
                    funcionName: JSON.stringify("approve"),
                    allParams: JSON.stringify([_to, _tokenId])
                }
            };
            //params will be injected within API CALL
            console.log("Transaction under process for approve() of NFT...");
            const response:any = await signTransaction(params);
            console.log("Approve Reponse for NFT from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        } else if (_id == 1) {
            const contract = await genericNftC(_signer,_nftContract);
            const response:any = await contract.approve(_to, _tokenId);
            console.log("Transaction under process for approve() of NFT...");
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("Approve Reponse for NFT from  Metamask", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling approve() of NFT Token");
        return res;
    }
}
// 2) lazyMint
export const lazyMint = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string, _seller: string, _salePrice: string, _tokenSelect: string, _tokenUri: string, _transferToNapa: boolean, _ethAmount: string,_nftContract:string): Promise<transactionType> => {
    console.log(_signer, _id, _chainId, _profileId, _tokenId, _seller, _salePrice, _tokenSelect, _tokenUri, _transferToNapa, _ethAmount,"Me Gustas Tu")
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(nftABI),
                    contractAddress: JSON.stringify(_nftContract),
                    funcionName: JSON.stringify("lazyMint"),
                    allParams: JSON.stringify([_tokenId, _seller, _salePrice, _tokenSelect, _tokenUri, _transferToNapa, { value: _ethAmount }])
                }
            };
            //params will be injected within API CALL
            console.log("Transaction under process for lazyMint() of NFT...");
            const response:any = await signTransaction(params);
            console.log("LazyMint Response from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        } else if (_id == 1) {
            const contract = await genericNftC(_signer,_nftContract);
            const response:any = await contract.lazyMint(_tokenId, _seller, _salePrice, _tokenSelect, _tokenUri, _transferToNapa, { value: _ethAmount });
            console.log("Transaction under process for lazyMint() of NFT...");
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("LazyMint Response for NFT from  Metamask", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling lazyMint() of NFT Token");
        return res;
    }
}
// 3) setApprovalForAll
export const setApprovalForAll = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _operator: string, _approved: boolean,_nftContract:string): Promise<transactionType> => {
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(nftABI),
                    contractAddress: JSON.stringify(_nftContract),
                    funcionName: JSON.stringify("setApprovalForAll"),
                    allParams: JSON.stringify([_operator, _approved])
                }
            };
            //params will be injected within API CALL
            console.log("Transaction under process for setApprovalForAll() of NFT...");
            const response:any = await signTransaction(params);
            console.log("setApprovalForAll Reponse from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        } else if (_id == 1) {
            const contract = await genericNftC(_signer,_nftContract);
            const response:any = await contract.setApprovalForAll(_operator, _approved);
            console.log("Transaction under process for setApprovalForAll() of NFT...");
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("setApprovalForAll Reponse from  Metamask", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling setApprovalForAll() of NFT Token");
        return res;
    }
}
