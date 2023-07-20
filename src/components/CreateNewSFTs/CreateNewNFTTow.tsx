import React, { useEffect } from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './CreateNewNFTTow.module.scss';
import SectionOne from './section/SectionOne';
import SectionTow from './section/SectionTow';
import SectionThreeTbl from './section/SectionThreeTbl';
import SectionFourTbl from './section/SectionFourTbl';
import SectionFiveSlider from './section/SectionFiveSlider';
import { SnftResponse } from '../../types/marketplace';
import { getSnft } from '../../services/MarketplaceApi';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { ErrorIcon } from '../assets';
import { FadeLoader } from 'react-spinners';
import useProfile from '../../hooks/useProfile';


import { _fetchSingleMarketItem } from '@/connectivity/walletController/allContractsCallHelper/marketPlace';

export default function CreateNewNFTTow() {
  const router = useRouter();
  const [snftDetails, setSnftDetails] = React.useState<SnftResponse | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const { profileId } = useProfile();


  const checkWeb3MarketItem = async (id: any) => {
    if (typeof id === 'string' && Number(id) > 0) {
      console.log("TYPECHECK", typeof id)
    } else {
      console.log("went wrong")
      console.log("TYPECHECK", typeof id)
      handleGetSnft();
    }
  }


  useEffect(() => {
    checkWeb3MarketItem(router?.query?.marketId)
    if(typeof router?.query?.marketId === 'string' && Number(router?.query?.marketId) === 0 && typeof router?.query?.id !=='undefined'){
      console.log("went wrong")
      handleGetSnft();
    }
    console.log(router?.query?.marketId, "getMetadata_1",typeof router?.query?.marketId);
    console.log(router?.query?.id, "getMetadata_2",typeof router?.query?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetSnft = async () => {
    setLoading(true);
    const { data, error, message }: any = await getSnft(
      router?.query?.id as string
    );
    console.log(data, error, message, "GETNFT-Res")
    if (error) {
      setLoading(false);
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      return;
    }
    console.log(data?.data || [], "IsDataAvl")
    setSnftDetails(data?.data || []);
    setLoading(false);
  };

  return (
    <>
      <div className="CreateNewnftTow">
        {loading ? (
          <div className={styles.loaderContainer}>
            <FadeLoader color="#ffffff" />
          </div>
        ) : (
          <>
            <SectionOne _snftDetails={snftDetails} profileId={profileId} marketId={router?.query?.marketId} />
            <SectionTow snftDetails={snftDetails} />
            <SectionThreeTbl />
            {snftDetails?.type !== 'Fixed Price' && (
              <SectionFourTbl snftDetails={snftDetails} />
            )}
            <SectionFiveSlider />
          </>
        )}
      </div>
    </>
  );
}