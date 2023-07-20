import { coBatchingC } from "../contractObjects";
import coBatchingABI from "../../newABIs/coBatching.json"
import { newCoBatching } from "@/connectivity/addressHelpers/addressHelper";
import { readFunction, signTransaction } from "@/services/AssetManagement";
import { transactionType } from "../web3Types";
export const data = {}
// import { coBatchingC } from "../contractObjects"
// import coBatchingABI from "../../newABIs/coBatching.json"
// import { newCoBatching } from "@/connectivity/addressHelpers/addressHelper";
// import { whichWalletConnected } from "../handleWallet";

// //read functions
async function temp1(_res: any, _id: number | undefined) {
    const object1 = _res;
    let data: any[] = [];
    for (let record = 0; record < object1.length; record++) {
        if (object1[record].length > 1 && typeof object1[record] === "object") {
            data[record] = await temp1(object1[record], _id)
        } else if (typeof object1[record] == "object" && _id == 1) {
            data[record] = object1[record].toString()
        } else if (typeof object1[record] == "object" && _id == 0) {
            data[record] = object1[record]['hex'].toString()
            data[record] = parseInt(data[record], 16);
        } else {
            data[record] = object1[record].toString()
        }
    }
    return data
}
async function temp(_res: any, _id: number | undefined) {
    let element: any[] = [];
    // console.log("abcd",_res);

    for (let index = 0; index < _res.length; index++) {
        if (typeof _res[index] === "object") {
            // console.log("aaa",_res[index]);
            // console.log("aaa",typeof _res[index]);
            // console.log("Length",_res[index].length);

            if (_res[index].length > 1) {
                element[index] = await temp1(_res[index], _id)
                //return data
            } else if (typeof _res[index] == "object" && _id == 0) {
                try {
                    element[index] = _res[index]['hex'].toString()
                    element[index] = parseInt(element[index], 16);
                } catch (e) {
                    console.log(e);

                }
            } else {
                element[index] = _res[index].toString()
            }
        } else {
            element[index] = _res[index]
        }

    }

    return element;
}

//1) activePoll
export const activepool = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    console.log("parms", _signer, _id, _chainId, _profileId, _poolid);
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("activepool"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("activepool response from NAPAWallet", value)
            res = await value;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            console.log("DATA", contract);
            const response = await contract.activepool(_poolid);
            console.log("activePool response from Metamask", response)
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling activepool() of co-batching", error);
        return res;
    }
}

//2) fetchMarketData
export const fetchMarketData = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    console.log("parms", _signer, _id, _chainId, _profileId, _poolid);
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("fetchMarketData"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("Fetchmarket data",value);  
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("fetchMarketData response from NAPAWallet", front_response)
            res = front_response;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.fetchMarketData(_poolid);
            // console.log("Response is ",response);
            const front_response = await temp(response, _id)
            console.log("fetchMarketData response from Metamask", front_response)
            res = front_response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling fetchMarketData() of co-batching", error);
        return res;
    }
}

//3) FetchPoolData
export const FetchPoolData = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("fetchPoolData"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            // const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("fetchPoolData response from NAPAWallet", value)
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("fetchPoolData response from NAPAWallet", front_response)
            // res = await value;
            res = front_response;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.fetchPoolData(_poolid);
            // console.log("fetchPoolData response from Metamask", response)
            const front_response = await temp(response, _id)
            console.log("fetchPoolData response from Metamask", front_response)
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling fetchPoolData() of co-batching", error);
        return res;
    }
}

// //4) FetchPoolDetails - 0
// export const FetchPoolDetails = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _from: string) => {
//     let res: any = -1;
//     try {
//         if (_id == 0) {
//             const params: any = {
//                 callData: {
//                     chainId: _chainId,
//                     profileId: _profileId,
//                     abi: JSON.stringify(coBatchingABI),
//                     contractAddress: JSON.stringify(newCoBatching),
//                     funcionName: JSON.stringify("fetchPoolDetails"),
//                     allParams: JSON.stringify([_from])
//                 }
//             };
//             //params will be injected within READ API CALL
//             const response: any = await readFunction(params);
//             const value = response?.data?.data?.transactionSuccess?.response;
//             console.log("fetchPoolDetails response from NAPAWallet", value)
//             const front_response = await temp(response?.data?.data?.transactionSuccess?.response,_id)
//             console.log("fetchPoolDetails response from NAPAWallet", front_response)
//             res = await value;
//         } else if (_id == 1) {
//             const contract = await coBatchingC(_signer);
//             const response = await contract.fetchPoolDetails(_from);
//             console.log("fetchPoolData response from Metamask", response)
//             const front_response = await temp(response,_id)
//             console.log("fetchPoolData response from Metamask", front_response)
//             res = response;
//             return res;
//         } else {
//             console.log("Wrong Wallet Connceted");

//         }
//         return res;
//     } catch (error) {
//         console.log("Error while calling fetchPoolDetails() of co-batching", error);
//         return res;
//     }
// }

//5) FetchPoolMembers - 1
export const fetchPoolmember = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("fetchPoolmember"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("fetchPoolmember response from NAPAWallet", value)
            // res = await value;
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("fetchPoolmember response from NAPAWallet", front_response)
            res = front_response;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.fetchPoolmember(_poolid);
            // console.log("fetchPoolmember response from Metamask", response)
            // res = response;
            const front_response = await temp(response, _id)
            console.log("fetchPoolmember response from Metamask", front_response)
            res = front_response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling fetchPoolmember() of co-batching", error);
        return res;
    }
}

//6) fetchVotedStatus - 1
export const fetchVotedStatus = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("fetchVotedStatus"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("fetchVotedStatus response from NAPAWallet", value)
            res = await value;
            // res = front_response;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.fetchVotedStatus(_poolid);
            console.log("fetchVotedStatus response from Metamask", response)
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling fetchVotedStatus() of co-batching", error);
        return res;
    }
}

//7) fractionSeller - 1
export const fractionSeller = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string, _address: string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("fractionSeller"),
                    allParams: JSON.stringify([_poolid, _address])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("fractionSeller response from NAPAWallet", value)
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("fractionSeller respondfdse from NAPAWallet", front_response)

            res = front_response;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.fractionSeller(_poolid, _address);
            const front_response = await temp(response, _id)
            console.log("fractionSeller response from Metamask", front_response)
            res = front_response;
            // console.log("fractionSeller response from Metamask", response)
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling fractionSeller() of co-batching", error);
        return res;
    }
}

//8) isResaleActive - 1
export const isResaleActive = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("isResaleActive"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("isResaleActive response from NAPAWallet", value)
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("isResaleActive respondfdse from NAPAWallet", front_response)
            res = front_response;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.isResaleActive(_poolid);
            // console.log("isResaleActive response from Metamask", response)
            const front_response = await temp(response, _id)
            console.log("isResaleActive response from Metamask", front_response)
            res = front_response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling isResaleActive() of co-batching", error);
        return res;
    }
}

//9) itempoolinfo - 1
export const itempoolinfo = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("itempoolinfo"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("itempoolinfo response from NAPAWallet", value)
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("itempoolinfo respondfdse from NAPAWallet", front_response)
            res = front_response;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.itempoolinfo(_poolid);
            // console.log("itempoolinfo response from Metamask", response)
            const front_response = await temp(response, _id)
            console.log("itempoolinfo response from Metamask", front_response)
            res = front_response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling itempoolinfo() of co-batching", error);
        return res;
    }
}

//10) memberPercentage - 1
export const memberPercentage = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string, _address: string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("memberPercentage"),
                    allParams: JSON.stringify([_poolid, _address])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("memberPercentage response from NAPAWallet", value)
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("memberPercentage respondfdse from NAPAWallet", front_response)
            res = front_response;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.memberPercentage(_poolid, _address);
            // console.log("memberPercentage response from Metamask", response)
            const front_response = await temp(response, _id)
            console.log("memberPercentage response from Metamask", front_response)
            res = front_response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling memberPercentage() of co-batching", error);
        return res;
    }
}

//11) participantList - consult vivek 
export const participantList = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string, _index: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("participantList"),
                    allParams: JSON.stringify([_poolid, _index])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("participantList response from NAPAWallet", value)
            res = await value;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.participantList(_poolid, _index);
            console.log("participantList response from Metamask", response)
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling participantList() of co-batching", error);
        return res;
    }
}

//12) participants
export const participants = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string, _address: string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("participants"),
                    allParams: JSON.stringify([_poolid, _address])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("participants respondfdse from NAPAWallet", front_response)
            res = front_response;
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("participants response from NAPAWallet", value)
            // res = await value;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.participants(_poolid, _address);
            // console.log("participantList response from Metamask", response)
            const front_response = await temp(response, _id)
            console.log("participants response from Metamask", front_response)
            res = front_response;
            // res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling participants() of co-batching", error);
        return res;
    }
}

//13) pools
export const pools = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("pools"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("pools response from NAPAWallet", value)
            // res = await value;
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("pools respondfdse from NAPAWallet", front_response)
            res = front_response;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.pools(_poolid);
            // console.log("pools response from Metamask", response)
            // res = response;
            const front_response = await temp(response, _id)
            console.log("pools response from Metamask", front_response)
            res = front_response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling pools() of co-batching", error);
        return res;
    }
}

//14) resaleItem
export const resaleItem = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _nftid: number | string, _newprice: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("resaleItem"),
                    allParams: JSON.stringify([_nftid, _newprice])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("resaleItem respondfdse from NAPAWallet", front_response)
            res = front_response;
            // res = await value;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.resaleItem(_nftid, _newprice);
            // console.log("resaleItem response from Metamask", response)
            const front_response = await temp(response, _id)
            console.log("resaleItem response from Metamask", front_response)
            res = front_response;
            // res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling resaleItem() of co-batching", error);
        return res;
    }
}

//15) resalepooliteminfo
export const resalepooliteminfo = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("resalepooliteminfo"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("resalepooliteminfo response from NAPAWallet", value)
            res = await value;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.resalepooliteminfo(_poolid);
            console.log("resalepooliteminfo response from Metamask", response)
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling resalepooliteminfo() of co-batching", error);
        return res;
    }
}

//16) returnpoolId
export const returnpoolId = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _itemid: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("returnpoolId"),
                    allParams: JSON.stringify([_itemid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            // const value = response?.data?.data?.transactionSuccess?.response;
            // console.log("returnpoolId response from NAPAWallet", value)
            const front_response = await temp(response?.data?.data?.transactionSuccess?.response, _id)
            console.log("returnpoolId respondfdse from NAPAWallet", front_response)
            res = front_response;
            // res = await value;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.returnpoolId(_itemid);
            // console.log("returnpoolId response from Metamask", response)
            // res = response;
            const front_response = await temp(response, _id)
            console.log("returnpoolId response from Metamask", front_response)
            res = front_response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling returnpoolId() of co-batching", error);
        return res;
    }
}

//17) votingResult-vivek bhai
export const votingResult = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string) => {
    let res: any = -1;
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("votingResult"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //params will be injected within READ API CALL
            const response: any = await readFunction(params);
            const value = response?.data?.data?.transactionSuccess?.response;
            console.log("votingResult response from NAPAWallet", value)
            res = await value;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response = await contract.votingResult(_poolid);
            console.log("votingResult response from Metamask", response)
            res = response;
            return res;
        } else {
            console.log("Wrong Wallet Connceted");

        }
        return res;
    } catch (error) {
        console.log("Error while calling votingResult() of co-batching", error);
        return res;
    }
}




// -----------------------------------------------------------------------------------------
//Write Function

// 1) CreatePoll
export const createPool = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _itemid: number | string, _maxParticipants: number | string, _maxContribution: number | string, _biddingTime: number | string, _pooltype: string | number, _ethAmount: string | number): Promise<transactionType> => {
    console.log("DATA that we get", _signer, _id, _chainId, _profileId, _itemid, _maxParticipants, _maxContribution, _biddingTime, _pooltype, _ethAmount);

    let res: transactionType = {
        response: "-1",
        transactionHash: "-1"
    };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("createPool"),
                    allParams: JSON.stringify([_itemid, _maxParticipants, _maxContribution, _biddingTime, _pooltype, { value: _ethAmount }])
                }
            };
            //Params will be injected withing API Call
            const response: any = await signTransaction(params);
            console.log("CreatePoll Response", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response: any = await contract.createPool(_itemid, _maxParticipants, _maxContribution, _biddingTime, _pooltype, { value: _ethAmount });
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("CreatePoll Response", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    } catch (error) {
        console.log("Error while calling CreatePoll() of CoBatching", error);
        return res;
    }
}

//2 JoinPool
export const joinPool = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string, _amount: number | string, _ethAmount: string | number): Promise<transactionType> => {
    console.log("DATA that we get", _signer, _id, _chainId, _profileId, _poolid, _amount, _ethAmount);

    let res: transactionType = {
        response: "-1",
        transactionHash: "-1"
    };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("joinPool"),
                    allParams: JSON.stringify([_poolid, _amount, { value: _ethAmount }])
                }
            };
            //Params will be injected withing API Call
            const response: any = await signTransaction(params);
            console.log("joinPool Response", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response: any = await contract.joinPool(_poolid, _amount, { value: _ethAmount });
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("joinPool Response", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    } catch (error) {
        console.log("Error while calling joinPool() of CoBatching", error);
        return res;
    }
}

//3 sellFraction
export const sellFraction = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string): Promise<transactionType> => {
    console.log("DATA that we get", _signer, _id, _chainId, _profileId, _poolid);

    let res: transactionType = {
        response: "-1",
        transactionHash: "-1"
    };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("sellFraction"),
                    allParams: JSON.stringify([_poolid])
                }
            };
            //Params will be injected withing API Call
            const response: any = await signTransaction(params);
            console.log("sellFraction Response", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response: any = await contract.sellFraction(_poolid);
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("sellFraction Response", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    } catch (error) {
        console.log("Error while calling sellFraction() of CoBatching", error);
        return res;
    }
}


//4 BuyFraction
export const BuyFraction = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string, _sellerAddress: string, _amount: number | string, _ethAmount: string | number
): Promise<transactionType> => {
    console.log("DATA that we get", _signer, _id, _chainId, _profileId, _poolid, _sellerAddress, _amount, _ethAmount);

    let res: transactionType = {
        response: "-1",
        transactionHash: "-1"
    };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("BuyFraction"),
                    allParams: JSON.stringify([_poolid, _sellerAddress, _amount, { value: _ethAmount }])
                }
            };
            //Params will be injected withing API Call
            const response: any = await signTransaction(params);
            console.log("BuyFraction Response", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response: any = await contract.BuyFraction(_poolid, _sellerAddress, _amount, { value: _ethAmount });
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("BuyFraction Response", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    } catch (error) {
        console.log("Error while calling BuyFraction() of CoBatching", error);
        return res;
    }
}

//reListItem
export const reListItem = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string, _newPrice: number | string
): Promise<transactionType> => {
    console.log("DATA that we get", _signer, _id, _chainId, _profileId, _poolid, _newPrice);

    let res: transactionType = {
        response: "-1",
        transactionHash: "-1"
    };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("reListItem"),
                    allParams: JSON.stringify([_poolid, _newPrice])
                }
            };
            //Params will be injected withing API Call
            const response: any = await signTransaction(params);
            console.log("reListItem Response", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response: any = await contract.reListItem(_poolid, _newPrice);
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("reListItem Response", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    } catch (error) {
        console.log("Error while calling reListItem() of CoBatching", error);
        return res;
    }
}

//voteForPrice
export const voteForPrice = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string, __accept: boolean): Promise<transactionType> => {
    console.log("DATA that we get", _signer, _id, _chainId, _profileId, _poolid, __accept);
    let res: transactionType = {
        response: "-1",
        transactionHash: "-1"
    };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("voteForPrice"),
                    allParams: JSON.stringify([_poolid, __accept])
                }
            };
            //Params will be injected withing API Call
            const response: any = await signTransaction(params);
            console.log("voteForPrice Response", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response: any = await contract.voteForPrice(_poolid, __accept);
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("voteForPrice Response", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    } catch (error) {
        console.log("Error while calling voteForPrice() of CoBatching", error);
        return res;
    }
}

//endPool
export const endPool = async (_signer: any, _id: number | undefined, _chainId: string | undefined, _profileId: string, _poolid: number | string, _itemid
    : number | string): Promise<transactionType> => {
    console.log("DATA that we get", _signer, _id, _chainId, _profileId, _poolid, _itemid);
    let res: transactionType = {
        response: "-1",
        transactionHash: "-1"
    };
    try {
        if (_id == 0) {
            const params: any = {
                callData: {
                    chainId: _chainId,
                    profileId: _profileId,
                    abi: JSON.stringify(coBatchingABI),
                    contractAddress: JSON.stringify(newCoBatching),
                    funcionName: JSON.stringify("voteForPrice"),
                    allParams: JSON.stringify([_poolid, _itemid])
                }
            };
            //Params will be injected withing API Call
            const response: any = await signTransaction(params);
            console.log("voteForPrice Response", response);
            const transactionHash: any = await response?.data?.data.transactionSuccess.response.hash;
            res.response = await response;
            res.transactionHash = await transactionHash;
            return res;
        } else if (_id == 1) {
            const contract = await coBatchingC(_signer);
            const response: any = await contract.voteForPrice(_poolid, _itemid);
            const processedTransaction = await response.wait();
            res.response = processedTransaction;
            console.log("voteForPrice Response", processedTransaction);
            const transactionHash: any = await processedTransaction?.transactionHash;
            res.transactionHash = transactionHash;
            return res;
        } else {
            console.log("Wrong Wallet Connected");
        }
        return res;
    } catch (error) {
        console.log("Error while calling voteForPrice() of CoBatching", error);
        return res;
    }
}
