import { usdtTokenC } from "../contractObjects"
import usdtABI from "../../newABIs/usdtToken.json"
import { newUSDTToken } from "@/connectivity/addressHelpers/addressHelper";
import { readFunction, signTransaction } from "@/services/AssetManagement";
import { transactionType } from "../web3Types";

//read functions


// 1) allowance
export const allowance = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _owner: string, _spender: string) => {
    let res: any = -1;
    console.log(_signer, _id, _chainId, _profileId, _owner, _spender, "ALL PARAMS");
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: 2,
                    profileId: _profileId,
                    abi: JSON.stringify(usdtABI),
                    contractAddress: JSON.stringify(newUSDTToken),
                    funcionName: JSON.stringify("allowance"),
                    allParams: JSON.stringify([_owner, _spender])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess.response.hex;
            console.log("allowance response from USDT Token", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await usdtTokenC(_signer);
            const response: any = await contract.allowance(_owner, _spender);
            res = response;
            console.log(response, "Allowance Response");
            return response;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling Allowance() of USDT Token");
        return res;
    }
}
// 2) balanceOf
export const balanceOf = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _account: string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(usdtABI),
                    contractAddress: JSON.stringify(newUSDTToken),
                    funcionName: JSON.stringify("balanceOf"),
                    allParams: JSON.stringify([_account])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess.response.hex;
            console.log("balanceOf response for USDTTOKEN from NAPA WALLET: ", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await usdtTokenC(_signer);
            res = await contract.balanceOf(_account);
            console.log("balanceOf response for USDTTOKEN from  METAMASK: ", ((res).toString()) / (10 ** 18));
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling balanceOf() of USDT Token");
    }
}
// 3) decimals
export const decimals = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string) => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(usdtABI),
                    contractAddress: JSON.stringify(newUSDTToken),
                    funcionName: JSON.stringify("decimals"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            console.log("Decimals response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)
            res = await response?.data?.data?.transactionSuccess?.response;
            return res;
            //
        } else if (_id == 1) {
            const contract = await usdtTokenC(_signer);
            res = await contract.decimals();
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling decimals() of USDT Token");
    }
}
// 4) owner
export const owner = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string) => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(usdtABI),
                    contractAddress: JSON.stringify(newUSDTToken),
                    funcionName: JSON.stringify("owner"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            console.log("Owner response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)
            res = await response?.data?.data?.transactionSuccess?.response;
            return res;
            //
        } else if (_id == 1) {
            const contract = await usdtTokenC(_signer);
            res = await contract.owner();
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling Owner() of USDT Token");
    }
}
// 5) totalSupply
export const totalSupply = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string) => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(usdtABI),
                    contractAddress: JSON.stringify(newUSDTToken),
                    funcionName: JSON.stringify("totalSupply"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            console.log("totalSupply response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)
            res = await response?.data?.data?.transactionSuccess?.response;
            return res;
            //
        } else if (_id == 1) {
            const contract = await usdtTokenC(_signer);
            res = await contract.totalSupply();
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling totalSupply() of USDT Token");
    }
}
// 6) treasuryWallet
export const treasuryWallet = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string) => {
    let res: any;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(usdtABI),
                    contractAddress: JSON.stringify(newUSDTToken),
                    funcionName: JSON.stringify("treasuryWallet"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            console.log("treasuryWallet response from USDTTOKEN", response?.data?.data?.transactionSuccess?.response)
            res = await response?.data?.data?.transactionSuccess?.response;
            return res;
            //
        } else if (_id == 1) {
            const contract = await usdtTokenC(_signer);
            res = await contract.treasuryWallet();
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling treasuryWallet() of USDT Token");
    }
}

//------------------------------------------------------------------------------------------

//Write Functions

//1) approve
export const approve = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _spender: string, _amount: string): Promise<transactionType> => {
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            console.log(_signer, _id, _chainId, _profileId, _spender, _amount,"USDTPARAM")
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(usdtABI),
                    contractAddress: JSON.stringify(newUSDTToken),
                    funcionName: JSON.stringify("approve"),
                    allParams: JSON.stringify([_spender, _amount])
                }
            };
            //params will be injected within API CALL
            const response: any = await signTransaction(params);
            console.log("Approve response USDTTOKEN from NAPA wallet", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        } else if (_id == 1) {
            const contract = await usdtTokenC(_signer);
            const response: any = await contract.approve(_spender, _amount);
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("Approval response for USDT from Metamask", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return response;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling approve() of USDT Token");
        return res;
    }
}
//2) transfer
export const transfer = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _to: string, _amount: string): Promise<transactionType> => {
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(usdtABI),
                    contractAddress: JSON.stringify(newUSDTToken),
                    funcionName: JSON.stringify("transfer"),
                    allParams: JSON.stringify([_to, _amount])
                }
            };
            //params will be injected within API CALL
            const response: any = await signTransaction(params);
            console.log("transfer response for USDTTOKEN from NAPA wallet", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
        } else if (_id == 1) {
            const contract = await usdtTokenC(_signer)
            const response: any = await contract.transfer(_to, _amount);
            const processedTransaction = await response.wait();;
            res.response = processedTransaction;
            console.log("transfer response for USDTTOKEN from Metamask", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return response;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling transfer() of USDT Token");
        return res;
    }
}