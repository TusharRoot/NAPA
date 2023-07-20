import { snftC } from "../contractObjects"
import snftABI from "../../newABIs/snft.json"
import { newSNFT } from "@/connectivity/addressHelpers/addressHelper";
import { readFunction, signTransaction } from "@/services/AssetManagement";
import { transactionType } from "../web3Types";


//read functions
// 1) _exists
export const _exists = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string):Promise<boolean> => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(newSNFT),
                    funcionName: JSON.stringify("_exists"),
                    allParams: JSON.stringify([_tokenId])
                }
            };
            //params will be injected within READ API CALL
            const response:any = await readFunction(params);
            console.log("_exists response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)            
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("Exists response from SNFT from NAPAWallet", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await snftC(_signer);
            const response:any = await contract._exists(_tokenId);
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling _exists() of SNFT Token");
        return res;
    }
}
// 2) balanceOf
export const balanceOf = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _address: string) => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(newSNFT),
                    funcionName: JSON.stringify("balanceOf"),
                    allParams: JSON.stringify([_address])
                }
            };
            //params will be injected within READ API CALL
            const response:any = await readFunction(params);
            console.log("balanceOf response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)
            res = await response?.data?.data?.transactionSuccess?.response;
            return res;
        } else if (_id == 1) {
            const contract = await snftC(_signer);
            res = await contract.balanceOf(_address);
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling balanceOf() of SNFT Token");
    }
}
// 3) isApprovedForAll
export const isApprovedForAll = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _owner: string, _operator: string) => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(newSNFT),
                    funcionName: JSON.stringify("isApprovedForAll"),
                    allParams: JSON.stringify([_owner, _operator])
                }
            };
            //params will be injected within READ API CALL
            const response:any = await readFunction(params);
            console.log("isApprovedFroAll response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)
            res = await response?.data?.data?.transactionSuccess?.response;
            return res;
            //
        } else if (_id == 1) {
            const contract = await snftC(_signer);
            res = await contract.isApprovedForAll(_owner, _operator);
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling isApprovedForAll() of SNFT Token");
    }
}
// 4) ownerOf
export const ownerOf = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string) => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(newSNFT),
                    funcionName: JSON.stringify("ownerOf"),
                    allParams: JSON.stringify([_tokenId])
                }
            };
            //params will be injected within READ API CALL
            const response:any = await readFunction(params);
            console.log("ownerOf response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)
            res = await response?.data?.data?.transactionSuccess?.response;
            return res;
            //
        } else if (_id == 1) {
            const contract = await snftC(_signer);
            res = await contract.ownerOf(_tokenId);
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling ownerOf() of SNFT Token");
    }
}
// 4) tokenURI
export const tokenURI = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string) => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(newSNFT),
                    funcionName: JSON.stringify("tokenURI"),
                    allParams: JSON.stringify([_tokenId])
                }
            };
            //params will be injected within READ API CALL
            const response:any = await readFunction(params);
            console.log("tokenURI response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)
            res = await response?.data?.data?.transactionSuccess?.response;
            return res;
        } else if (_id == 1) {
            const contract = await snftC(_signer);
            res = await contract.tokenURI(_tokenId);
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling tokenURI() of SNFT Token");
    }
}
// 5) calculateTokens
export const calculateTokens = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _salePrice: string[], _tokenTypes: string[]) => {
    let res: any = -1;
    console.log(_signer, _id, _chainId, _profileId, _salePrice, _tokenTypes, "calculateTokens")
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(newSNFT),
                    funcionName: JSON.stringify("calculateTokens"),
                    allParams: JSON.stringify([_salePrice, _tokenTypes])
                }
            };
            //params will be injected within READ API CALL
            const response:any = await readFunction(params);
            console.log("calcalcal", response)
            res = await response;
            return response;
        } else if (_id == 1) {
            console.log("calculateTokens response from NAPATOKEN");
            const contract = await snftC(_signer)
            res = contract.calculateTokens(_salePrice, _tokenTypes);
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling calculateTokens() of SNFT Token");
        return res
    }
}

//Write functions

// 1) approve
export const approve = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _to: string, _tokenId: string): Promise<transactionType> => {
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(newSNFT),
                    funcionName: JSON.stringify("approve"),
                    allParams: JSON.stringify([_to, _tokenId])
                }
            };
            //params will be injected within API CALL
            const response:any = await signTransaction(params);
            console.log("Approve Reponse for SNFT from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        } else if (_id == 1) {
            const contract = await snftC(_signer);
            const response:any = await contract.approve(_to, _tokenId);
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("Approve Reponse for SNFT from  Metamask", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling approve() of SNFT Token");
        return res;
    }
}
// 2) lazyMint
export const lazyMint = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _tokenId: string, _seller: string, _salePrice: string, _tokenSelect: string, _tokenUri: string, _transferToNapa: boolean, ethAmount: string): Promise<transactionType> => {
    console.log(_signer, _id, _chainId, _profileId, _tokenId, _seller, _salePrice, _tokenSelect, _tokenUri, _transferToNapa, ethAmount,"Me Gustas Tu")
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(newSNFT),
                    funcionName: JSON.stringify("lazyMint"),
                    allParams: JSON.stringify([_tokenId, _seller, _salePrice, _tokenSelect, _tokenUri, _transferToNapa, { value: ethAmount }])
                }
            };
            //params will be injected within API CALL
            const response:any = await signTransaction(params);
            console.log("LazyMint Response from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        } else if (_id == 1) {
            const contract = await snftC(_signer);
            const response:any = await contract.lazyMint(_tokenId, _seller, _salePrice, _tokenSelect, _tokenUri, _transferToNapa, { value: ethAmount });
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("LazyMint Response for SNFT from  Metamask", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling lazyMint() of SNFT Token");
        return res;
    }
}
// 3) setApprovalForAll
export const setApprovalForAll = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _operator: string, _approved: boolean): Promise<transactionType> => {
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(snftABI),
                    contractAddress: JSON.stringify(newSNFT),
                    funcionName: JSON.stringify("setApprovalForAll"),
                    allParams: JSON.stringify([_operator, _approved])
                }
            };
            //params will be injected within API CALL
            console.log("Wait Transaction is under process....");
            const response:any = await signTransaction(params);
            console.log("setApprovalForAll Reponse from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        } else if (_id == 1) {
            const contract = await snftC(_signer);
            const response:any = await contract.setApprovalForAll(_operator, _approved);
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
        console.log(e, "Error while calling setApprovalForAll() of SNFT Token");
        return res;
    }
}
