import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Select from 'react-select';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './MyNFTs.module.scss';
import Link from 'next/link';
// import { commanNFTContract } from '@/connectivity/contractObjects/commanNFTContract';
// import {
//   getApproved,
//   //  transferFrom
// } from '@/connectivity/callHelpers/commanNFTCallHandlers';
import axios from 'axios';
import { nftAddress } from '@/connectivity/addressHelpers/addressHelper';
// import { newSNFT } from '@/connectivity/addressHelpers/addressHelper';
// import useProfile from '../../hooks/useProfile';
import useWebThree from '@/hooks/useWebThree';
import { FadeLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import { ArrowDownIcon } from '../assets';
import DatePicker from "react-datepicker";
import { getAllNFTsOfUser } from '@/services/AssetManagement';
import { getChainId } from '@/utils/wallet';
import { getCookie } from 'cookies-next';
import useProfile from '@/hooks/useProfile';

export default function MyNFTs(props: any) {
  // const { address, signer } = useWebThree();
  const { profileId } = useProfile();
  const { napaWalletAccount, metaMaskAccount } = useWebThree()
  const options = [
    { value: '', label: '(project name)' },

  ];
  const optionstow = [
    { value: '1', label: 'High to Low' },
    { value: '2', label: 'Low to High' },
    // { value: '3', label: 'Price 50 MRP' },
  ];
  const optionsthree = [
    { value: '1', label: 'High to Low' },
    { value: '2', label: 'Low to High' },
    // { value: '3', label: '100%' },
  ];
  const limitOptions = [
    { value: 24, label: '24 Assets' },
    { value: 36, label: '36 Assets' },
    { value: 48, label: '48 Assets' },
    { value: 60, label: '60 Assets' },
  ];
  const [active, setActive] = React.useState(false);

  const [nfts, setNfts] = useState<any[]>([
    {
      tokenId: '',
      shortContractAddress: '',
      contractAddress: '',
      id: '',
      name: '',
      description: '',
      attributes: '',
      image: '',
      onSold: '',
      avatar: ''
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  // const { profileId } = useProfile();

  const handleClick = () => {
    setActive(!active);
  };

  const [isActiveTwo, setActiveTwo] = React.useState(false);
  const [startDate, setStartDate] = React.useState<any>(null);
  const [endDate, setEndDate] = React.useState<any>();
  const [limit, setLimit] = React.useState<any>(limitOptions[0]);
  const toggleClass = () => {
    setActiveTwo(!isActiveTwo);
  };

  ///
  const ref: any = useRef(null);
  const { onClickOutside } = props;

  const sortNfts = (nfts: any) => {
    //@ts-ignore
    nfts.sort((a, b) => {
      const num1 = +(a.tokenId);
      const num2 = +(b.tokenId);
      // if (num1 < num2) return -1;
      // if (num1 > num2) return 1;
      // return 0;
      return num1 - num2
    });
    return nfts;
  };

  useEffect(() => {
    console.log(profileId, "profileId")
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(isActiveTwo);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClickOutside]);

  // fetch nfts starts here
  const loadNFTs: () => Promise<object[]> = async () => {
    let currentChainId
    if (window.ethereum) {
      currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      })
    }
    const metaMaskNetwork = getChainId(currentChainId)
    const walletNetwork = getCookie('networkType')
    setLoading(true);
    let dt: any = [];
    let newItems: any = [];
    try {
      // @ts-ignore
      const res = await getAllNFTsOfUser(metaMaskAccount ? metaMaskNetwork : walletNetwork, (metaMaskAccount || napaWalletAccount?.activeWalletAC))
      // @ts-ignore
      console.log(res?.data?.data?.tokenData?.response?.result, "----NFTs----");
      await Promise.all(
        // @ts-ignore
        res?.data?.data?.tokenData?.response?.result.map(async (data: any) => {
          let splitted =
            data.token_address.slice(0, 6) +
            '...' +
            data.token_address.slice(38, data.token_address.length);
          console.log('inside if');
          if ((nftAddress).toString() !== data.token_address) {
            let ff = await data.token_uri;
            let meta: any = await axios.get(ff);
            let item = {
              tokenId: await data.token_id,
              shortContractAddress: splitted,
              contractAddress: data.token_address,
              id: await meta?.data?.id,
              name: await meta?.data?.name,
              description: await meta?.data?.description,
              attributes: await meta?.data?.attributes,
              image: await meta?.data?.image,
              avatar: await meta?.data?.avatar,
              // onSold: isOnSold,
            };
            newItems.push(item);
          }
        })
      );
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      const sortedItems = sortNfts(newItems);
      setNfts(sortedItems);
      setLoading(false);
    }, 300);
    return dt;
  };

  useEffect(() => {
    if (metaMaskAccount || napaWalletAccount) {
      loadNFTs();
    }
  }, [metaMaskAccount, napaWalletAccount]);

  // fetch NFTs working ends

  return (
    <>
      <div className={styles.tipandtotolmain}>
        <div className="select_main slectmainmargnsmll">
          <div style={{ justifyContent: "space-between" }} className="select_main select_main_NFT slectmainmargnsmll slectmainmargnsmlltwo">
            {/* <div style={{width:"100%"}} className="select_main slectmainmargnsmll"> */}
            <Select
              options={options}
              // menuIsOpen={true}
              className="select_pernt slctrspnsv"
              placeholder="Project"
              classNamePrefix="cntrslct"
            />
            <Select
              options={optionsthree}
              // menuIsOpen={true}
              className="select_pernt slctrspnsv"
              placeholder="Price"
              classNamePrefix="cntrslct"
            />
            <div style={{ zIndex: "2" }} className="datepickerBox">
              <div className={styles.datepickerBox}>
                <DatePicker
                  className={styles.dateStart}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="From Date"
                />
                <img height={13} width={13} src={ArrowDownIcon} alt="" />
              </div>
            </div>
            <div style={{ zIndex: "2" }} className="datepickerBox">
              <div className={styles.datepickerBox}>
                <DatePicker
                  className={styles.dateStart}
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="To Date"
                />
                <img height={13} width={13} src={ArrowDownIcon} alt="" />
              </div>
            </div>
            <Select
              options={optionstow}
              // menuIsOpen={true}
              className="select_pernt slctrspnsv"
              placeholder="Rating"
              classNamePrefix="cntrslct"
            />
            <Select
              //@ts-ignore
              options={limitOptions}
              // menuIsOpen={true}
              className="select_pernt slctrspnsv"
              placeholder="Limit"
              classNamePrefix="cntrslct"
              defaultValue={limit}
              onChange={setLimit}
            />
          </div>
        </div>

        <div className={styles.AnyObjects}>
          <button className={styles.FilterButton} onClick={handleClick}>
            Filters
          </button>
        </div>
        <div
          className={
            active
              ? `${styles.FilterBox} ${styles.active}`
              : `${styles.FilterBox}`
          }
        >
          <button className={styles.ExitButton} onClick={handleClick}>
            <Image src="/img/exit_icon.svg" alt="" width="24px" height="24px" />
          </button>
          <div className={`${styles.MobileDatpcker} MobileDatpckertips`}>
            <div style={{ textAlign: "start" }} className="select_main">
              <Select
                options={options}
                // menuIsOpen={true}
                className="select_pernt slctrspnsv"
                placeholder="Project"
                classNamePrefix="cntrslct"
              />
              <Select
                options={optionsthree}
                // menuIsOpen={true}
                className="select_pernt slctrspnsv"
                placeholder="Price"
                classNamePrefix="cntrslct"
              />
              <div style={{ marginRight: "0", marginBottom: "6px" }} className="datepickerBox">
                <div className={styles.datepickerBox}>
                  <DatePicker
                    className={styles.dateStart}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="From Date"
                  />
                  <img className={styles.arrowIcon} height={13} width={13} src={ArrowDownIcon} alt="" />
                </div>
              </div>
              <div style={{ marginRight: "0" }} className="datepickerBox">
                <div className={styles.datepickerBox}>
                  <DatePicker
                    className={styles.dateStart}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="To Date"
                  />
                  <img className={styles.arrowIcon} height={13} width={13} src={ArrowDownIcon} alt="" />
                </div>
              </div>
              <Select
                options={optionstow}
                // menuIsOpen={true}
                className="select_pernt slctrspnsv"
                placeholder="Rating"
                classNamePrefix="cntrslct"
              />
              <Select
                //@ts-ignore
                options={limitOptions}
                // menuIsOpen={true}
                className="select_pernt slctrspnsv"
                placeholder="Limit"
                classNamePrefix="cntrslct"
                defaultValue={limit}
                onChange={setLimit}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonperntAj}>
          <div
            className={
              isActiveTwo
                ? `${styles.PstnBtnEnter} ${styles.Active}`
                : `${styles.PstnBtnEnter}`
            }
          >
            <input type="text" placeholder="Enter name or eth address.." />
          </div>
          <button onClick={toggleClass}>
            <Image
              src="/img/search_icon_aj.svg"
              alt=""
              height="24px"
              width="24px"
              className=""
            />
          </button>
          {/* <button className={styles.marginPrnt}><Image src='/img/grid_ic_light.svg' alt='' height="24px" width="24px" className='' /></button>
                        <button><Image src='/img/grid_ic_dark.svg' alt='' height="24px" width="24px" className='' /></button> */}
          <button className={styles.CreateNFTBtn}>
            <Link href="/create-new-nft">
              <a>Create New NFT</a>
            </Link>
          </button>
          {/* pstnbx */}
          <div className={styles.PstnSetBxMain}>
            <div
              className={
                isActiveTwo
                  ? `${styles.ScrollPstn} ${styles.Active}`
                  : `${styles.ScrollPstn}`
              }
            >
              <div className={styles.PositionProject}>
                <div className={styles.ProjectPsnIn}>
                  <div className={styles.UpScPstn}>
                    <p>Projects</p>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst01.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          Futuristic<span>Fierce</span>
                        </h6>
                        <p>8,213 items</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>0.24</h5>
                    </div>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst02.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          <span>Man in</span> Futuristic
                        </h6>
                        <p>2,347 items</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>1.03</h5>
                    </div>
                  </div>
                </div>
                {/* secnd */}
                <div className={styles.ProjectPsnIn}>
                  <div className={styles.UpScPstn}>
                    <p>Items</p>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst03.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          Futuristic <span>Spaces</span>
                        </h6>
                        <p>Ending In 5h 44 min</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>3.14</h5>
                    </div>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst04.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          <span>Horizont</span> Futuristic
                        </h6>
                        <p>Ending In 2h 22 min</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>3.16</h5>
                    </div>
                  </div>
                </div>
                {/* lstOne */}
                <div className={styles.ProjectPsnIn}>
                  <div className={styles.UpScPstn}>
                    <p>Projects</p>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst01.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          Futuristic<span>Fierce</span>
                        </h6>
                        <p>8,213 items</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>0.24</h5>
                    </div>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst02.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          <span>Man in</span> Futuristic
                        </h6>
                        <p>2,347 items</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>1.03</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* pstnbx */}
        </div>
      </div>

      {/* other */}

      <div className={styles.scrollPernt}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <FadeLoader color="#ffffff" />
          </div>
        ) : nfts?.length ? (
          <div className={styles.CustomGridContainer}>
            {nfts.map((snft: any, index) => {
              return (
                <div key={index} className={styles.CustomGrid}>
                  <div
                    onClick={() => push(`nft-details?tokenId=${snft.tokenId}&contractAddress=${snft.contractAddress}`)}
                    className={styles.TipsTulsOverlay}
                  >
                    <div className={styles.boxinnrcont}>
                      {/* <Link href=""> */}
                      <div className={`${styles.apernt} hovereffect`}>
                        <img
                          src={`${snft.image}`}
                          height="372px"
                          width="282px"
                          alt=""
                          className="evmtimg"
                        />
                        <div className={styles.upCont}>
                          <img
                            style={{ borderRadius: '50px' }}
                            src={`${snft.avatar
                              ? snft.avatar
                              : '/assets/images/img_avatar.png'
                              }`}
                            height="40px"
                            width="40px"
                            alt=""
                            className=""
                          />
                          <p>@{snft.name}</p>
                        </div>
                        <div className={styles.downCont}>
                          <h3>{snft.description}</h3>
                          {/* <div className={styles.flexPernt}>
                            <div className={styles.currentBit}>
                              <h5>Current Bid</h5>
                              <div className={styles.txtimgFlex}>
                                <Image
                                  src="/img/etherium_ic.svg"
                                  height="24px"
                                  width="24px"
                                  alt=""
                                  className=""
                                />
                                <p>{snft.amount}</p>
                              </div>
                            </div>
                            <div className={styles.endingIn}>
                              <p>Ending In</p>
                              <h3>{snft.duration}</h3>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.messageContainer}>
            <h3>No Data Found</h3>
          </div>
        )}
      </div>

    </>
  );
}
