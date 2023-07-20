import React, { useState } from 'react';
import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './LiveStreamDeails.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function LiveStreamDetailsSc() {
  let streams = [
    {
      title: 'Bless the Fallout Sadness',
      streamImg: '/assets/images/streamCard1.png',
      userName: 'Marta Thornton',
      status: '01:46:37',
      viewers: '17,4K viewers',
      duration: '1 day ago',
    },
    {
      title: 'All that Remains of Them',
      userName: 'Catherine Patton',
      avatar: '/img/user_had.png',
      streamImg: '/assets/images/streamCard2.png',
      status: '04:24:59',
      viewers: '11,2K viewers',
      duration: '3 days ago',
    },
    {
      title: 'Northlane as your Personal Radar ',
      streamImg: '/assets/images/streamCard1.png',
      userName: 'Marta Thornton',
      status: '02:31:18',
      viewers: '22,1K viewers',
      duration: '5 days ago',
    },
    {
      title: 'Fly in Parallel Worlds with a Thrill',
      userName: 'Catherine Patton',
      avatar: '/img/user_had.png',
      streamImg: '/assets/images/streamCard2.png',
      status: '01:09:11',
      viewers: '18,9K viewers',
      duration: '7 days ago',
    },
    {
      title: 'Molecules of your Strange Feelings',
      streamImg: '/assets/images/streamCard1.png',
      userName: 'Marta Thornton',
      status: '03:57:41',
      viewers: '9,5K viewers',
      duration: '9 days ago',
    },
    {
      title: 'Stairs to the Future of Beauty',
      userName: 'Catherine Patton',
      avatar: '/img/user_had.png',
      streamImg: '/assets/images/streamCard2.png',
      status: '02:16:37',
      viewers: '15,3K viewers',
      duration: '12 days ago',
    },
    {
      title: 'Infinite Space of variations',
      streamImg: '/assets/images/streamCard1.png',
      userName: 'Marta Thornton',
      status: '05:20:34',
      viewers: '10,6K viewers',
      duration: '14 days ago',
    },
    {
      title: 'Futuristic Fierce Radiant Cube',
      userName: 'Catherine Patton',
      avatar: '/img/user_had.png',
      streamImg: '/assets/images/streamCard2.png',
      status: '03:51:42',
      viewers: '13,8K viewers',
      duration: '18 days ago',
    },
  ];
  const [show, setShow] = useState(false);
  const [tabActive, settabActive] = useState('list');

  const [Tabshow, setTabShow] = useState(false);
  const [chatButtonshow, setchatButtonshow] = useState(false);

  return (
    <>
      <div className={styles.LiveStreamDetailsBg}>
        <div className={styles.lstreamvideo}>
          <img src="/img/lstreambg.jpg" className={styles.lstreamBgImg} />
          <div className={styles.lsStreamsframe}>
            <video
              width={'100%'}
              height={'400'}
              preload="auto"
              autoPlay
              muted
              loop
              src="/img/coming_soon.mp4"
            >
              The “video” tag is not supported by your browser.
            </video>
          </div>
        </div>

        <div className={`${styles.container} `}>
          <Container className={`${styles.settingsContainer} asinnerContainer`}>
            <div className={styles.videoBtns}>
              <img
                src="/img/pause_icon.svg"
                alt=""
                height="24px"
                width="24px"
              />
              <img
                src="/img/volume_icon.svg"
                alt=""
                height="24px"
                width="24px"
              />
              <div className={styles.videoTime}>
                <span className={styles.startIcon}></span>01:46:37
              </div>
            </div>
            <h1 className={styles.settings}>Futuristic Fierce Radiant Cube</h1>
            <div className="d-flex justify-content-between align-items-center lsvideo-info">
              <div className="lsUser">
                <Image
                  src="/img/tablegirl01.png"
                  height="40px"
                  width="40px"
                  alt=""
                  className=""
                />
                <p>Dorothy Mccoy</p>
              </div>
              <div className="d-flex align-items-center">
                <div className="ls-top-label">
                  <div className="like">
                    <img
                      src="/img/fb-icon.svg"
                      height="24px"
                      width="24px"
                      alt=""
                      className=""
                    />
                    1 523
                  </div>
                  <div className="report">
                    <img
                      src="/img/reward-white_icon.svg"
                      height="24px"
                      width="24px"
                      alt=""
                      className=""
                    />
                    478
                  </div>
                  <div className="view">
                    <img
                      src="/img/user_icon.svg"
                      height="24px"
                      width="24px"
                      alt=""
                      className=""
                    />
                    2 495
                  </div>
                  <div className="uplaod">
                    <img
                      src="/img/upload-icon.svg"
                      height="24px"
                      width="24px"
                      alt=""
                      className=""
                    />
                  </div>
                </div>
                <div className="d-flex position-relative">
                  <div className={`${styles.firstGridmian} reward_btn`}>
                    <button>Reward</button>
                  </div>
                  <div className={`${styles.firstGridmian} show_chat_btn`}>
                    <button
                      onClick={() => {
                        setShow(true);
                        setchatButtonshow(true);
                      }}
                      className={chatButtonshow ? 'openChat' : ''}
                    >
                      Show Chat
                    </button>
                  </div>
                  {/* chat  */}
                  {show && (
                    <div className={styles.showChatBox}>
                      <div className={styles.chatList}>
                        <img
                          src="/img/arrow_down_icon.svg"
                          className={styles.chatDownIcon}
                          onClick={() => {
                            setShow(false);
                            setchatButtonshow(false);
                          }}
                        />
                        <div className={styles.viewersTab}>
                          <div className={styles.chatListItem}>
                            <img
                              src="/img/feed_small_img02.png"
                              alt=""
                              height="32px"
                              width="32px"
                            />
                            <div>
                              <p className={styles.clientName}>Tom Bradley</p>
                              <p className={styles.clientMesaage}>
                                Abroad no chatty others my silent an. Fat way
                                appear denote who wholly narrow gay settle.
                              </p>
                            </div>
                          </div>
                          <div className={styles.chatListItem}>
                            <img
                              src="/img/feed_small_img03.png"
                              alt=""
                              height="32px"
                              width="32px"
                            />
                            <div>
                              <p className={styles.clientName}>Rufus Flores</p>
                              <p className={styles.clientMesaage}>
                                Valley afford uneasy joy she thrown though bed
                                set. In me forming general.
                              </p>
                            </div>
                          </div>
                          <div className={styles.chatListItem}>
                            <img
                              src="/img/feed_small_img04.png"
                              alt=""
                              height="32px"
                              width="32px"
                            />
                            <div>
                              <p className={styles.clientName}>
                                Howard Copeland
                              </p>
                              <p className={styles.clientMesaage}>
                                Change wholly say why eldest period.
                              </p>
                            </div>
                          </div>
                          <div className={styles.chatListItem}>
                            <img
                              src="/img/feed_small_img05.png"
                              alt=""
                              height="32px"
                              width="32px"
                            />
                            <div>
                              <p className={styles.clientName}>
                                Marta Thornton
                              </p>
                              <p className={styles.clientMesaage}>
                                By disposed replying mr me unpacked no. As
                                moonlight of my resolving unwilling.
                              </p>
                            </div>
                          </div>
                          <div className={styles.chatListItem}>
                            <img
                              src="/img/feed_small_img06.png"
                              alt=""
                              height="32px"
                              width="32px"
                            />
                            <div>
                              <p className={styles.clientName}>Rufus Flores</p>
                              <p className={styles.clientMesaage}>
                                Oh he decisively impression attachment
                                friendship so if everything.
                              </p>
                            </div>
                          </div>
                          <div className={styles.chatListItem}>
                            <img
                              src="/img/feed_small_img07.png"
                              alt=""
                              height="32px"
                              width="32px"
                            />
                            <div>
                              <p className={styles.clientName}>Patricia Rose</p>
                              <p className={styles.clientMesaage}>
                                Whose her enjoy chief new young. Felicity if ye
                                required likewise so doubtful. On so attention
                                necessary at by provision otherwise existence.
                              </p>
                            </div>
                          </div>
                          <div className={styles.chatListItem}>
                            <img
                              src="/img/feed_small_img03.png"
                              alt=""
                              height="32px"
                              width="32px"
                            />
                            <div>
                              <p className={styles.clientName}>Rufus Flores</p>
                              <p className={styles.clientMesaage}>
                                Valley afford uneasy joy she thrown though bed
                                set. In me forming general.
                              </p>
                            </div>
                          </div>
                          <div className={styles.chatListItem}>
                            <img
                              src="/img/feed_small_img06.png"
                              alt=""
                              height="32px"
                              width="32px"
                            />
                            <div>
                              <p className={styles.clientName}>Rufus Flores</p>
                              <p className={styles.clientMesaage}>
                                Oh he decisively impression attachment
                                friendship so if everything.
                              </p>
                            </div>
                          </div>
                          <div className={styles.chatListItem}>
                            <img
                              src="/img/feed_small_img06.png"
                              alt=""
                              height="32px"
                              width="32px"
                            />
                            <div>
                              <p className={styles.clientName}>Rufus Flores</p>
                              <p className={styles.clientMesaage}>
                                Oh he decisively impression attachment
                                friendship so if everything.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.sendMsgBox}>
                        <div
                          className={styles.accountIcon}
                          onClick={() => {
                            setTabShow(true);
                            setShow(false);
                            setchatButtonshow(true);
                          }}
                        >
                          <img
                            src="/img/user_icon.svg"
                            width="24px"
                            height="24px"
                          />
                        </div>
                        <input
                          className={styles.sendMesginput}
                          type="text"
                          placeholder="Message.."
                        />
                        <button className={styles.sendMesgButton}>Send</button>
                      </div>
                    </div>
                  )}
                  {/* Viewers screen */}
                  {Tabshow && (
                    <div className={styles.viwerList}>
                      <div className={styles.viwerListBox}>
                        <p className={styles.vTitles}>Viewers 2 495</p>

                        <div className={styles.vierstabs}>
                          <p
                            className={tabActive == 'list' ? 'active' : ''}
                            onClick={() => {
                              settabActive('list');
                            }}
                          >
                            List
                          </p>
                          <p
                            className={tabActive == 'heatmap' ? 'active' : ''}
                            onClick={() => {
                              settabActive('heatmap');
                            }}
                          >
                            Heatmap
                          </p>
                        </div>

                        {/* viewer list */}
                        {tabActive == 'list' && (
                          <div className={styles.viewersList}>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img01.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>
                                Marta Thornton
                              </p>
                              <p className={styles.viewersCountry}>USA</p>
                            </div>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img02.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>Rufus Flores</p>
                              <p className={styles.viewersCountry}>Germany</p>
                            </div>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img03.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>Tom Bradley</p>
                              <p className={styles.viewersCountry}>Italy</p>
                            </div>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img04.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>
                                Catherine Patton
                              </p>
                              <p className={styles.viewersCountry}>France</p>
                            </div>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img05.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>
                                Howard Copeland
                              </p>
                              <p className={styles.viewersCountry}>Ukraine</p>
                            </div>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img06.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>
                                Patricia Rose
                              </p>
                              <p className={styles.viewersCountry}>USA</p>
                            </div>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img07.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>
                                Rosemary Chapman
                              </p>
                              <p className={styles.viewersCountry}>Norway</p>
                            </div>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img08.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>
                                Marcus Harris
                              </p>
                              <p className={styles.viewersCountry}>Iceland</p>
                            </div>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img01.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>
                                Carole Hansen
                              </p>
                              <p className={styles.viewersCountry}>Ukraine</p>
                            </div>
                            <div className={styles.viewersListitem}>
                              <img
                                src="/img/feed_small_img06.png"
                                alt=""
                                height="32px"
                                width="32px"
                              />
                              <p className={styles.viewersName}>
                                Patricia Rose
                              </p>
                              <p className={styles.viewersCountry}>USA</p>
                            </div>
                          </div>
                        )}
                        {/* HeatMap Tab */}
                        {tabActive == 'heatmap' && (
                          <div className={styles.heatMapTab}>
                            <div className="row">
                              <div className="col-6">
                                <p className={styles.heatMaplist}>
                                  <span className="bg_yellow"></span>746 USA
                                </p>
                                <p className={styles.heatMaplist}>
                                  <span className="bg_yellow2"></span>489
                                  Germany
                                </p>
                                <p className={styles.heatMaplist}>
                                  <span className="bg_yellow3"></span>265 Italy
                                </p>
                                <p className={styles.heatMaplist}>
                                  <span className="bg_pink1"></span>183 France
                                </p>
                                <p className={styles.heatMaplist}>
                                  <span className="bg_pink2"></span>172 Ukraine
                                </p>
                              </div>
                              <div className="col-6">
                                <p className={styles.heatMaplist}>
                                  <span className="bg_pink3"></span>146 Norway
                                </p>
                                <p className={styles.heatMaplist}>
                                  <span className="bg_pink4"></span>129 Poland
                                </p>
                                <p className={styles.heatMaplist}>
                                  <span className="bg_pink5"></span>104 Iceland
                                </p>
                                <p className={styles.heatMaplist}>
                                  <span className="bg_pink6"></span>96 Sweden
                                </p>
                                <p className={styles.heatMaplist}>
                                  <span className="bg_pink7"></span>74 Denmark
                                </p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <img
                                src="/img/heatmap.png"
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles.sendMsgBox}>
                        <div
                          className={styles.accountIcon}
                          onClick={() => {
                            setShow(false);
                            setchatButtonshow(false);
                            setTabShow(false);
                          }}
                        >
                          <img
                            src="/img/exit_icon.svg"
                            width="24px"
                            height="24px"
                          />
                        </div>
                        <input
                          className={styles.sendMesginput}
                          type="text"
                          placeholder="Message.."
                        />
                        <button className={styles.sendMesgButton}>Send</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-start lstream-desc">Description Text</p>
            <div className="addBar d-flex align-items-center">
              <div>
                <label>Country</label>
                <p>USA, New York</p>
              </div>
              <div>
                <label>Auction Items</label>
                <p>Yes</p>
              </div>
              <div>
                <label>Stream for Sale in NAPA Marketplace</label>
                <p>Yes</p>
              </div>
            </div>
          </Container>

          <div className="lsream_links">
            <Container
              className={`${styles.settingsContainer} asinnerContainer`}
            >
              <h1 className={styles.settings}>Creator Links</h1>
              <div className={styles.succesBtnThree}>
                <button className={styles.SuccesFrstBtn}>
                  <img
                    src="/img/website_icon_24.png"
                    height="24px"
                    width="24px"
                    alt=""
                    className=""
                  />
                  Website
                </button>
                <button className={styles.SuccesSecBtn}>
                  <img
                    src="/img/twitter_icon_24.png"
                    height="24px"
                    width="24px"
                    alt=""
                    className=""
                  />
                  Twitter
                </button>
                <button className={styles.SuccesthiBtn}>
                  <img
                    src="/img/facebook_icon_24.png"
                    height="24px"
                    width="24px"
                    alt=""
                    className=""
                  />
                  Facebook
                </button>
              </div>
            </Container>
          </div>

          <div className="">
            <Container
              className={`${styles.settingsContainer} asinnerContainer`}
            >
              <h1 className={styles.settings}>
                Items for Sale or Auction in the Stream
              </h1>
              <div className={styles.CustomGridContainer}>
                <div className={styles.CustomGrid}>
                  <div className={styles.TipsTulsOverlay}>
                    <div className={styles.boxinnrcont}>
                      {/* <Link href="#"> */}
                      <div className={`${styles.apernt} hovereffect`}>
                        <Image
                          src="/img/lstream_1.jpg"
                          height="420px"
                          width="384px"
                          alt=""
                          className="evmtimg"
                        />
                        <div className={styles.downCont}>
                          <h3>Fly in Parallel Worlds with a Thrill</h3>
                          <div className={styles.flexPernt}>
                            <div className={styles.currentBit}>
                              <h5>Address</h5>
                              <div className={styles.txtimgFlex}>
                                <p>0xUyha8Jkt...298j2</p>
                              </div>
                            </div>
                            <div className={styles.endingIn}>
                              <p>Project</p>
                              <h3>Raphael Hallucination</h3>
                            </div>
                          </div>
                          <div className={styles.flexPernt}>
                            <div className={styles.currentBit}>
                              <h5>Bid Price</h5>
                              <div className={styles.txtimgFlex}>
                                <Image
                                  src="/img/ab_napa_icon_card_02.png"
                                  height="24px"
                                  width="24px"
                                  alt=""
                                />
                                <p className={`${styles.largefont} ms-3`}>
                                  0,02
                                </p>
                              </div>
                            </div>
                            <div className={styles.endingIn}>
                              <p>Ending In</p>
                              <h3 className={styles.largefont}>02 : 32 : 44</h3>
                            </div>
                          </div>

                          <div className={`${styles.chosBtnPernt} d-flex`}>
                            <Link href="#">
                              <a className={styles.BtnPerntBuy}>
                                Buy for
                                <img
                                  src="img/napa_icon-black.svg"
                                  alt=""
                                  width="12px"
                                  height="12px"
                                />
                                0,05
                              </a>
                            </Link>
                            <Link href="#">
                              <a>Place a Bid</a>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* </Link> */}
                    </div>
                  </div>
                </div>
                <div className={styles.CustomGrid}>
                  <div className={styles.TipsTulsOverlay}>
                    <div className={styles.boxinnrcont}>
                      {/* <Link href="#"> */}
                      <div className={`${styles.apernt} hovereffect`}>
                        <Image
                          src="/img/lstream_2.jpg"
                          height="420px"
                          width="384px"
                          alt=""
                          className="evmtimg"
                        />
                        <div className={styles.downCont}>
                          <h3>Molecules of your Strange Feelings</h3>
                          <div className={styles.flexPernt}>
                            <div className={styles.currentBit}>
                              <h5>Address</h5>
                              <div className={styles.txtimgFlex}>
                                <p>92hUtsl90x...a18jH</p>
                              </div>
                            </div>
                            <div className={styles.endingIn}>
                              <p>Project</p>
                              <h3>Illusions of Darkness</h3>
                            </div>
                          </div>
                          <div className={styles.flexPernt}>
                            <div className={styles.currentBit}>
                              <h5>Bid Price</h5>
                              <div className={styles.txtimgFlex}>
                                <Image
                                  src="/img/ab_napa_icon_card_02.png"
                                  height="24px"
                                  width="24px"
                                  alt=""
                                />
                                <p className={`${styles.largefont} ms-3`}>
                                  0,03
                                </p>
                              </div>
                            </div>
                            <div className={styles.endingIn}>
                              <p>Ending In</p>
                              <h3 className={styles.largefont}>01 : 26 : 53</h3>
                            </div>
                          </div>

                          <div className={`${styles.chosBtnPernt} d-flex`}>
                            <Link href="#">
                              <a className={styles.BtnPerntBuy}>
                                Buy for
                                <img
                                  src="img/napa_icon-black.svg"
                                  alt=""
                                  width="12px"
                                  height="12px"
                                />
                                0,05
                              </a>
                            </Link>
                            <Link href="#">
                              <a>Place a Bid</a>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* </Link> */}
                    </div>
                  </div>
                </div>
                <div className={styles.CustomGrid}>
                  <div className={styles.TipsTulsOverlay}>
                    <div className={styles.boxinnrcont}>
                      {/* <Link href="#"> */}
                      <div className={`${styles.apernt} hovereffect`}>
                        <Image
                          src="/img/lstream_3.jpg"
                          height="420px"
                          width="384px"
                          alt=""
                          className="evmtimg"
                        />
                        <div className={styles.downCont}>
                          <h3>The Devil Wears Prada on Wednesday</h3>
                          <div className={styles.flexPernt}>
                            <div className={styles.currentBit}>
                              <h5>Address</h5>
                              <div className={styles.txtimgFlex}>
                                <p>TyzM9eR3LY...VitWK</p>
                              </div>
                            </div>
                            <div className={styles.endingIn}>
                              <p>Project</p>
                              <h3>Of Aliens & Men</h3>
                            </div>
                          </div>
                          <div className={styles.flexPernt}>
                            <div className={styles.currentBit}>
                              <h5>Bid Price</h5>
                              <div className={styles.txtimgFlex}>
                                <Image
                                  src="/img/ab_napa_icon_card_02.png"
                                  height="24px"
                                  width="24px"
                                  alt=""
                                />
                                <p className={`${styles.largefont} ms-3`}>
                                  0,01
                                </p>
                              </div>
                            </div>
                            <div className={styles.endingIn}>
                              <p>Ending In</p>
                              <h3 className={styles.largefont}>05 : 46 : 17</h3>
                            </div>
                          </div>

                          <div className={`${styles.chosBtnPernt} d-flex`}>
                            <Link href="#">
                              <a className={styles.BtnPerntBuy}>
                                Buy for
                                <img
                                  src="img/napa_icon-black.svg"
                                  alt=""
                                  width="12px"
                                  height="12px"
                                />
                                0,05
                              </a>
                            </Link>
                            <Link href="#">
                              <a>Place a Bid</a>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <div className={styles.previousStreams}>
            <Container
              className={`${styles.settingsContainer} asinnerContainer`}
            >
              <h1 className={`${styles.settings} mb-5`}>Previous Streams</h1>

              <div className={styles.streamCardContainer}>
                {streams.map((val, index) => {
                  return (
                    <div key={index} className={styles.streamCard}>
                      <div className={styles.streamStatusContainer}>
                        <p className={styles.streamStatus}>{val.status}</p>
                        <p className={styles.streamViewers}>{val.viewers}</p>
                        <p className={styles.streamDuration}>{val.duration}</p>
                      </div>
                      <img
                        alt=""
                        className={styles.liveStreams}
                        src={val.streamImg}
                      />
                      <h5 className={styles.streamTitle}>{val.title}</h5>
                    </div>
                  );
                })}
              </div>
            </Container>
          </div>

          <Footer footerIconShow={false} />
        </div>
      </div>
    </>
  );
}
