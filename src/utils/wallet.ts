import Web3 from 'web3';
const crypt = require("crypto");
const ethers = require("ethers");
const token = require("./napaToken.json")

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

export const getWeb3 = async () => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      resolve(web3);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAlreadyConnectedWeb3 = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let web3: any;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      }
      resolve(web3);
    } catch (error) {
      reject(error);
    }
  });
};

export const getChainId = (chainId: string) => {
  if (chainId == '0x1') {
    return '0';
  } else if (chainId == '0x5') {
    return '1';
  } else if (chainId == '0xaa36a7') {
    return '2';
  } else if (chainId == '0x89') {
    return '5';
  } else if (chainId == '0x13881') {
    return '6';
  } else return '0';
};

export const decryptString = (ciphertext: string) => {
  const decipher = crypt.createDecipher("aes-256-cbc", 'secret key');
  let decrypted = decipher.update(ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// @ts-ignore
export const getFees = async (recepient: string, amount: string, nw: number,contractAddress:string) => {
  console.log(recepient, amount, nw, contractAddress);
  
    let provider;
    if (Number(nw) == 0) {
        provider = new ethers.providers.JsonRpcProvider("https://eth.getblock.io/acfb8004-9fb8-42c5-a5b2-da8000aaecfa/mainnet/")
    } else if (Number(nw) == 1) {
        provider = new ethers.providers.JsonRpcProvider("https://eth.getblock.io/acfb8004-9fb8-42c5-a5b2-da8000aaecfa/goerli/")
    } else if (Number(nw) == 2) {
        provider = new ethers.providers.JsonRpcProvider("https://eth.getblock.io/acfb8004-9fb8-42c5-a5b2-da8000aaecfa/sepolia/")
    } else if (Number(nw) == 3) {
        provider = new ethers.providers.JsonRpcProvider("https://bsc.getblock.io/acfb8004-9fb8-42c5-a5b2-da8000aaecfa/mainnet/")
    } else if (Number(nw) == 4) {
        provider = new ethers.providers.JsonRpcProvider("https://bsc.getblock.io/acfb8004-9fb8-42c5-a5b2-da8000aaecfa/testnet/")
    } else if (Number(nw) == 5) {
        provider = new ethers.providers.JsonRpcProvider("https://matic.getblock.io/acfb8004-9fb8-42c5-a5b2-da8000aaecfa/mainnet/")
    } else if (Number(nw) == 6) {
        provider = new ethers.providers.JsonRpcProvider("https://matic.getblock.io/acfb8004-9fb8-42c5-a5b2-da8000aaecfa/testnet/")
    } else {
        console.log("wrong N/W id");
        return 0;
    }

    const contract = new ethers.Contract(contractAddress, token.abi, provider);
    const _amount = ethers.utils.parseEther(amount); 

    try {
        const gasEstimate = await contract.estimateGas.transfer(recepient, _amount);
        const gasPrice = await provider.getGasPrice();
        const gasFees = gasEstimate.mul(gasPrice);
        const gasFeesInEther = ethers.utils.formatEther(gasFees);    
        console.log('Transfer Gas Estimate:', gasEstimate.toString());
        console.log('Gas Price:', gasPrice.toString());
        console.log('Gas Fees:', gasFeesInEther, 'ETH');
        return {
          gasEstimate:gasEstimate.toString(),
          gasPrice:gasPrice.toString(),
          gasFeesInEther: gasFeesInEther
        }
      } catch (error) {
        console.error('Error:', error);
      }
}
