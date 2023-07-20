const chainList = [
    { name: "eth", hex: "0x1" },
    { name: "goerli", hex: "0x5" },
    { name: "sepolia", hex: "0xaa36a7" },
    { name: "bsc testnet", hex: "0x61" },
    { name: "bsc", hex: "0x38" },
    { name: "polygon", hex: "0x89" },
    { name: "mumbai", hex: "0x13881" },
    { name: "avalanche", hex: "0xa86a" },
    { name: "avalanche testnet", hex: "0xa869" },
    { name: "fantom", hex: "0xfa" },
    { name: "palm", hex: "0x2a15c308d" },
    { name: "cronos", hex: "0x19" },
    { name: "cronos testnet", hex: "0x152" },
    { name: "arbitrum", hex: "0xa4b1" },
];

export const getChainIdForOtherWallet = async (chainHex: any) => {
    let chain: any;
    try {
        if ((chainHex) == chainList[0]?.hex) {
            chain = 0;
            console.log(chain, "for ETH Network");
        } else if ((chainHex) == chainList[1]?.hex) {
            chain = 1;
            console.log(chain, "for GOERLI Network");
        } else if ((chainHex) == chainList[2]?.hex) {
            chain = 2;
            console.log(chain, "for SEPOLIA Network");
        } else if ((chainHex) == chainList[3]?.hex) {
            chain = 3;
            console.log(chain, "for BNB TEST Network");
        } else if ((chainHex) == chainList[4]?.hex) {
            chain = 4;
            console.log(chain, "for BNB MAIN Network");
        } else if ((chainHex) == chainList[5]?.hex) {
            chain = 5;
            console.log(chain, "for POLYGON MAIN Network");
        } else if ((chainHex) == chainList[6]?.hex) {
            chain = 6;
            console.log(chain, "for MUMBAI TEST Network");
        } else {
            console.log("Sent Wrong Network Hex");
            return 0;
        }
    } catch (e: any) {
        console.log(e, "Error while getting the chainId")
        return 0;
    }
    return chain;
}