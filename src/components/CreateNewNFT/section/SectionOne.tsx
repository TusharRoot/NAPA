import React  from 'react'
import styles from './SectionOne.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { _fetchSingleMarketItem } from '@/connectivity/walletController/allContractsCallHelper/marketPlace';
import { SnftResponse } from '@/types/marketplace';

export default function SectionOne() {
    const { push } = useRouter();
    const router = useRouter();
    const [tokenId, setTokenId] = React.useState<any>();
    const [contract, setContract] = React.useState<any>();
    const [item, setItem] = React.useState<any>();

    // 3&contractAddress=0x5dba9fa28cb4e76ac617e2843c7a3e24effa9eb2
    const getNFTData = async (
        _tknId: string | number, _contract: string
    ): Promise<nftData> => {
        console.log("internalDatainternalDatainternalData",_tknId, _contract)
        const url = `https://deep-index.moralis.io/api/v2/nft/${router.query?.contractAddress}/${router.query?.tokenId}?chain=sepolia&format=decimal&normalizeMetadata=true&media_items=false`

        try {
            const res = await axios.get(url, {
                headers: {
                    'accept': 'application/json',
                    'X-API-Key': 'gxFx0RWobr82DUQZD7W2qwtsfaW63p6QtIJh7pZSvRshWexNbv58m9Dc1hai9ZLl'
                }
            })
            console.log("datadatadata",res)
            const allData = {
                itemId: _tknId,
                nftContract: _contract,
                tokenId: _tknId,
                owner: res.data.owner_of,
                price: "",
                paymentMode: "",
                isCobatchable: false,
                sold: false,
                image: res.data.normalized_metadata.image,
                contract_name: res.data.name,
                contract_symbol: res.data.symbol,
                description: res?.data?.normalized_metadata?.description
            }
            console.log("RESPONSE",allData)
            return allData;
        } catch (e: any) {
            console.log(e, " Error while fetching NFT Metadata");
            return e;
        }
    }
    type nftData = {
        image: string,
        contract_name: string,
        contract_symbol: string,
        description: string,
        itemId: string | number,
        nftContract: string,
        tokenId: string | number,
        owner: string,
        price: string,
        paymentMode: string,
        isCobatchable: boolean,
        sold: boolean
    }

    const convertToSNFT = async (): Promise<any> => {
        let data: any;
        try {
            const internalData: nftData = await getNFTData(tokenId, contract);
            console.log(internalData,tokenId, contract, "internalDatainternalDatainternalData")
            if (true) {
                data = {
                    itemId: internalData.itemId,
                    SNFTAddress: internalData.nftContract,
                    tokenId: internalData.tokenId,
                    owner: internalData.owner,
                    amount: internalData.price,
                    currencyType: internalData.paymentMode,
                    isCoBatchable: internalData.isCobatchable,
                    listed: internalData.sold,
                    SNFTDescription: await internalData.description,
                    SNFTTitle: await internalData.contract_name,
                    SNFTCollection: await internalData.contract_name,
                    marketplace_listed: internalData.sold,
                    thumbnail: await internalData.image
                }
            }
            console.log(data,"datadatadata")
            return data
        }
        catch (e: any) {
            console.log("Error While Fetching MarketPlace NFTs from web3 MarketPlace", e);
            return data;
        }
    }
    const setMarketData = async () => {
        let localItem: SnftResponse | undefined = {
            amount: "-1",
            createdAt: "", currencyType: "", duration: "", mintId: "", postId: "",
            profileId: "", snftId: "", type: "", updatedAt: "", accountId: "",
            generatorId: "", generatorName: "", genre: "", lazyMinted: "",
            listed: "", marketplace_listed: "", maxOffer: "", napaTokenEarned: "",
            payoutsCategory: "", SNFTAddress: "", SNFTCollection: "", SNFTDescription: "", SNFTTitle: "", thumbnail: "", tokenId: "", tokenUri: "", userImage: "", userName: "", videoURL: "", isWeb3Listed: false
        };
        const newData = await convertToSNFT();
        console.log(newData, "web3Object")
        localItem.snftId = newData?.itemId;
        localItem.currencyType = newData?.currencyType;
        localItem.amount = newData?.amount;
        localItem.mintId = newData?.tokenId;
        localItem.SNFTDescription = newData?.SNFTDescription;
        localItem.SNFTTitle = newData?.SNFTTitle;
        localItem.SNFTCollection = newData?.SNFTCollection;
        localItem.SNFTAddress = newData?.SNFTAddress;
        localItem.generatorName = newData?.seller;
        localItem.marketplace_listed = newData?.listed;
        localItem.thumbnail = newData?.thumbnail;
        localItem.tokenUri = newData?.SNFTDescription;
        localItem.tokenId = newData?.tokenId;
        localItem.listed = newData?.listed;
        localItem.lazyMinted = "false";
        localItem.isWeb3Listed = true;
        localItem.generatorId = newData?.owner;
        console.log(localItem, "localItemlocalItem");
        console.log("IsSetting",item?.SNFTDescription)
        if(item?.SNFTDescription === undefined){
            console.log("IsSetting",localItem)
            setItem(localItem)
        }
        return localItem;
    }

    React.useEffect(() => {
        console.log(router.query?.contractAddress !== 'undefined', router.query?.tokenId !== 'undefined' ,"NEW-PARAMS")
        if (router.query?.contractAddress && router.query?.tokenId) {
            if(router.query?.contractAddress !== 'undefined' && router.query?.tokenId !== 'undefined'){
                console.log("_ITEM_","inside")
                setContract(router.query?.contractAddress);
                setTokenId(router.query?.tokenId);
                setMarketData()
            }
        }
        console.log(item,"_ITEM_")
    }, [router.query?.contractAddress,router.query?.tokenId])


    return (
        <div className={styles.SectionOne}>
            <div className={styles.CustomGridContainer}>
                <div className={styles.CustomGrid}>
                    <div className={styles.imgPerntScone}>
                        <Image src="/img/crat_nft_tow_aj.png" alt="" width={540} height={540} />
                    </div>
                </div>
                <div className={styles.CustomGrid}>
                    <div className={styles.ScOneLeftCont}>
                        <h1>{item?.contract_name}</h1>
                        <p>Abilities or he perfectly pretended so strangers be exquisite. Oh to another chamber pleased imagine do in.</p>
                        <div className={styles.imgAndperaFlex}>
                            <Image src="/img/tombradley_img_aj.svg" alt="" width={40} height={40} />
                            <p>{item?.SNFTDescription}{" "}{"Ney"}</p>
                        </div>
                        {/* <div className={styles.CurrentBitBox}>
                        <div className={styles.CurrentBitBoxInrr}>
                            <p>Current Bit</p>
                            <div className={styles.imgAdnHH}>
                                <Image
                                    src="/img/napa_ic.svg"
                                    height="28px"
                                    width="28px"
                                    alt=""
                                    className=""
                                />
                                <h3>0.24</h3>
                            </div>
                        </div>
                        <div className={styles.CurrentBitBoxInrr}>
                            <p>Ending In</p>
                            <div className={styles.imgAdnHH}>
                                <h3>4 h 32 min</h3>
                            </div>
                        </div>
                    </div> */}
                        <div className={styles.thrBtnPrnt}>
                            <Link href="/create-new-nft" ><a className={styles.linkPernt}>Edit</a></Link>
                            {/* <div
                      onClick={() => push(`snft-details?id=${snft.snftId}&marketId=${snft?.itemId}`)}
                    className={styles.TipsTulsOverlay}
                  > */}
                            {/* <Link href="/sell-nft-page-sc" ><a className={styles.linkPernt}>Sell</a></Link> */}

                            <button onClick={() => push(`sell-nft-page-sc?contract=${contract}&tokenId=${tokenId}`)} className={styles.linkPernt} style={{ cursor: "poiner", backgroundColor: "black" }}>Sell</button>

                            {/* <Link  href="/" ><a className={styles.linkPernt}>Cancel</a></Link>
                        <Link  href="/" ><a className={styles.linkPernt}>Low Price</a></Link>
                        <Link  href="/" ><a className={styles.linkPernt}>Buy Now for 0.24 NAPA</a></Link> */}
                            <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                                <div className={styles.butnPernt}>
                                    <button role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Image src="/img/tow_dot_white_img.svg" alt="" width={32} height={32} />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Add to Watchlist
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Ask DAVE
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="co-batching-pools">
                                                Create New Pool
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
// for create new pool the NFT or SFT will be added to co-bathing pools on step 2 //