import { napaTokenC } from "../contractObjects"
import napaABI from "../../newABIs/napaToken.json"
import { newNapaToken } from "@/connectivity/addressHelpers/addressHelper";
import { readFunction, signTransaction } from "@/services/AssetManagement";
import { transactionType } from "../web3Types";

//read functions

// 1) allowance
export const allowance = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _owner: string, _spender: string): Promise<number> => {
    let res: any = -1;
    console.log(_owner, _spender, "function params");
    console.log(_signer, _id, _chainId, _profileId, _owner, _spender, "ALL PARAMS");
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(napaABI),
                    contractAddress: JSON.stringify(newNapaToken),
                    funcionName: JSON.stringify("allowance"),
                    allParams: JSON.stringify([_owner, _spender])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess.response.hex;
            console.log("allowance-napaToken-NAPA_WALLET", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await napaTokenC(_signer);
            const response: any = await contract.allowance(_owner, _spender);
            res = response;
            console.log(response, "allowance-napaToken-METAMASK");
            return response;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling Allowance() of NAPA Token");
        return res;
    }
}
// 2) balanceOf
export const balanceOf = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _account: string): Promise<number> => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(napaABI),
                    contractAddress: JSON.stringify(newNapaToken),
                    funcionName: JSON.stringify("balanceOf"),
                    allParams: JSON.stringify([_account])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess.response.hex;
            console.log("balanceOf-napaToken-NAPA_WALLET", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await napaTokenC(_signer);
            res = await contract.balanceOf(_account);
            console.log("balanceOf-napaToken-METAMASK", ((res).toString()) / (10 ** 18));
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling balanceOf() of NAPA Token");
        return res;
    }
}
// 3) decimals
export const decimals = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string): Promise<number> => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(napaABI),
                    contractAddress: JSON.stringify(newNapaToken),
                    funcionName: JSON.stringify("decimals"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess.response;
            console.log("decimals-napaToken-NAPA_WALLET", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await napaTokenC(_signer);
            res = await contract.decimals();
            console.log("decimals-napaToken-METAMASK", res);
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling decimals() of NAPA Token");
        return res;
    }
}
// // 4) owner
export const owner = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string): Promise<string> => {
    let res: any = "";
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(napaABI),
                    contractAddress: JSON.stringify(newNapaToken),
                    funcionName: JSON.stringify("owner"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess.response;
            console.log("owner-napaToken-NAPA_WALLET", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await napaTokenC(_signer);
            res = await contract.owner();
            console.log("owner-napaToken-METAMASK", res);
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling Owner() of NAPA Token");
        return res;
    }
}
// // 5) totalSupply
export const totalSupply = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string): Promise<number> => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(napaABI),
                    contractAddress: JSON.stringify(newNapaToken),
                    funcionName: JSON.stringify("totalSupply"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess.response.hex;
            console.log("totalSupply-napaToken-NAPA_WALLET", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await napaTokenC(_signer);
            res = await contract.totalSupply();
            console.log("totalSupply-napaToken-METAMASK", res);
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling totalSupply() of NAPA Token");
        return res;
    }
}
// 6) treasuryWallet
export const treasuryWallet = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string): Promise<string> => {
    let res: any = "";
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(napaABI),
                    contractAddress: JSON.stringify(newNapaToken),
                    funcionName: JSON.stringify("treasuryWallet"),
                    allParams: JSON.stringify([])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess.response;
            console.log("treasuryWallet-napaToken-NAPA_WALLET", value)
            res = await value;
            return res;
            //
        } else if (_id == 1) {
            const contract = await napaTokenC(_signer);
            res = await contract.treasuryWallet();
            console.log("treasuryWallet-napaToken-METAMASK", res);
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling treasuryWallet() of NAPA Token");
        return res;
    }
}

//------------------------------------------------------------------------------------------

//Write Functions

//1) approve
export const approve = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _spender: string, _amount: string): Promise<transactionType> => {
    let res: transactionType = { response: "-1", transactionHash: "-1" };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(napaABI),
                    contractAddress: JSON.stringify(newNapaToken),
                    funcionName: JSON.stringify("approve"),
                    allParams: JSON.stringify([_spender, _amount])
                }
            };
            //params will be injected within API CALL
            const response: any = await signTransaction(params);
            console.log("approve-napaToken-NAPA_WALLET", response)
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        } else if (_id == 1) {
            const contract = await napaTokenC(_signer);
            const response: any = await contract.approve(_spender, _amount);
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("approve-napaToken-METAMASK", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling approve() of NAPA Token");
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
                    abi: JSON.stringify(napaABI),
                    contractAddress: JSON.stringify(newNapaToken),
                    funcionName: JSON.stringify("transfer"),
                    allParams: JSON.stringify([_to, _amount])
                }
            };
            //params will be injected within API CALL
            const response: any = await signTransaction(params);
            console.log("transfer Reponse for NAPA tkn from  NAPA WALLET", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
            //
        } else if (_id == 1) {
            const contract = await napaTokenC(_signer);
            const response: any = await contract.transfer(_to, _amount);
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("transfer Reponse for NAPA tkn from  NAPA WALLET", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    }
    catch (e) {
        console.log(e, "Error while calling transfer() of NAPA Token");
        return res;
    }
}
// const { napaWalletAccount, metaMaskAccount } = useWebThree()
//   // @ts-ignore
//   console.log("napaWalletAccount?.activeWalletAC", napaWalletAccount?.activeWalletAC);
//   console.log("metaMaskAccount", metaMaskAccount);