import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ButtonComponent, Header, Loader } from '../../components';
import { String } from '../../constants';
import { styles } from './style';
import auth from '@react-native-firebase/auth';
import {
  addWatchUrl,
  getNewUpdatedViewCount,
  getPlayVideoList,
  get_coins,
} from '../../services/FireStoreServices';
import { Colors, F40014, F60024 } from '../../Theme';
import { CoinIcon, SecondsIcon } from '../../assets/icons';
import { handleFirebaseError } from '../../services';
import { InputContextProvide } from '../../context/CommonContext';
import { type } from '../../constants/types';

interface myArray {
  coin: number;
}
export const ViewLanding = () => {
  const { storeCreator: { coinBalance: { getBalance }, dispatchCoin } }: any = useContext(InputContextProvide)

  const [playing, setPlaying] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [playVideoList, setPlayVideoList]: number | any = useState(0);
  const controlRef: any = useRef<boolean>();
  const firstStart: any = useRef<boolean>(true);
  const [getWatchUniqId, setGetWatchUniqId] = useState([]);
  const [nextVideo, setNextVideo] = useState<number>(0);
  const [timer, setTimer] = useState<number>();
  const [loader, setLoader] = useState<boolean>(false);
  const userId = auth().currentUser?.uid;


  /**
     * get coin count
     
   */
  const GetCoins = async (params: string) => {
    let resCoinUpdate = 0;
    await get_coins().then(res => {
      videoList(res?._data?.watch_videos, params);
      resCoinUpdate = res?._data?.coin;
      setGetWatchUniqId(res?._data?.watch_videos);
      dispatchCoin({ types: type.GET_CURRENT_COIN, payload: res?._data?.coin })
    });

    return resCoinUpdate;
  };

  /**
       * for timer start given duration
     */

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }
    if (start) {
      controlRef.current = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        }
      }, 1000);
    } else {
      clearInterval(controlRef.current);
    }
    return () => clearInterval(controlRef.current);
  }, [start, controlRef, timer]);

  /**
     * useEffect for call timer count 0 then call GetEarning function
   */

  useEffect(() => {
    if (timer === 0) {
      GetEarning();
    }
  }, [timer]);

  /**
      * setCoin divide given duration by 1.1 return total coin 
    */
  const SetCoins = () => {
    return parseInt(playVideoList?.[nextVideo]?.require_duration / 1.1);
  };

  /**
      * getEarning is first timer is 0 setTime is o and clearInterval
      * firestore add user watch url in userTable and update coin
      * getNewUpdatedViewCount is update remider view and consumed view
    */

  const GetEarning = async () => {
    const getVideoId: string | number = playVideoList?.[nextVideo]?.video_Id;
    const getCampaignId: string | number = playVideoList?.[nextVideo]?.id;
    const remiderView: string | number =
      playVideoList?.[nextVideo]?.remaining_view;
    const consumed_view: string | number =
      playVideoList?.[nextVideo]?.consumed_view;
    if (timer === 0) {
      GetCoins("").then((res: number) => {
        setTimer(0);
        clearInterval(controlRef?.current);
        setPlaying(false);
        const totalAmount = res + SetCoins();
        addWatchUrl({ totalAmount, getWatchUniqId, getVideoId })
          .then(res => { })
          .catch(err => { });
      });
      getNewUpdatedViewCount({ getCampaignId, remiderView, consumed_view })
        .then(res => { })
        .catch(() => { });
    }
  };

  /**
        * onStageChange manage user video mode
      */

  const onStateChange = async (state: string) => {
    if (state === 'playing') {
      setPlaying(true);
      setStart(true);
    }
    if (state === 'ended') {
      setPlaying(false);
      setStart(false);
    }
    if (state === 'paused') {
      setPlaying(false);
      setStart(false);
    }
    if (state === 'buffering') {
      setPlaying(false);
      setStart(false);
    }
    if (state === 'unstarted') {
      setPlaying(false);
      setStart(false);
    }
    if (state === 'video cued') {
      setPlaying(false);
      setStart(false);
    }
  };
  /**
      * first get coin in header show
    */

  useEffect(() => {
    GetCoins('isRender');
  }, []);

  /**
     * filter is return own video not show and repeted video not show in list
      * videoList is our playlist in view tab show videos
      * getPlayVideoList is firestore compaign table return videolist
      * sortListByCoin is sort videolist by coin
      * TimestampWiseSort is sort by created time
    */
  const videoList = async (id: string, params: string) => {
    setLoader(true);
    getPlayVideoList()
      .then((res: any) => {
        console.log("res", res._docs)
        setLoader(false);
        const add_Video_Url: Array<any> = [];
        res._docs?.filter((res: any) => {
          if (
            res?._data?.upload_by !== userId &&
            !id?.includes(res?._data?.video_Id[0])
          ) {
            add_Video_Url.push(res?._data);
            return res?._data;
          }
        });
        const TimestampWiseSort = add_Video_Url?.sort(
          (res1: myArray, res2: myArray) => res2?.created - res1?.created,
        );

        const sortListByCoin = TimestampWiseSort?.sort(
          (res1: myArray, res2: myArray) => res2?.coin - res1?.coin,
        );

        setPlayVideoList(sortListByCoin);
        if (params.length > 0) {
          setLoader(false);
          setTimer(sortListByCoin[0]?.require_duration);
        }
      })
      .catch(error => {
        console.log('errorerror', error);

        setLoader(false);
        handleFirebaseError(error?.code);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  /**
        * Next button handle 
      */
  const NextVideoList = () => {
    if (nextVideo < playVideoList?.length - 1) {
      setNextVideo(nextVideo + 1);
      setTimer(playVideoList?.[nextVideo + 1]?.require_duration);

    }
  };

  /**
      *  reander design 
    */
  return (
    <>
      <SafeAreaView style={styles.safearea} />
      <StatusBar
        backgroundColor={Colors?.gradient1}
        barStyle={String?.StatusBar?.lightContent}
      />
      <View style={styles.container}>
        <Header coin={getBalance} title={String?.headerTitle?.view4view} />
        <ScrollView style={styles.main}>
          <View style={styles.videoWrapper}>
            <YoutubePlayer
              height={270}
              videoId={playVideoList?.[nextVideo]?.video_Id[0]}
              ref={controlRef}
              play={playing}
              onChangeState={onStateChange}
            />
          </View>
          <View style={styles.iconRow}>
            <View style={styles.iconWrapper}>
              <SecondsIcon />
              <View style={styles.marginLeft}>
                <Text
                  numberOfLines={1}
                  style={[F60024.textStyle, { color: Colors?.primaryRed }]}>
                  {timer}
                </Text>
                <Text style={F40014?.main}>{String?.viewTab?.second}</Text>
              </View>
            </View>
            <View style={styles.iconWrapper}>
              <CoinIcon />
              <View style={styles.marginLeft}>
                <Text
                  numberOfLines={1}
                  style={[F60024.textStyle, { color: Colors?.primaryRed }]}>
                  {SetCoins()}
                </Text>
                <Text style={F40014?.main}>{String?.viewTab?.coin}</Text>
              </View>
            </View>
          </View>
          <ButtonComponent
            onPrees={() => {
              NextVideoList();
            }}
            wrapperStyle={styles.marginTop}
            buttonTitle={String?.viewTab?.nextVideo}
          />
        </ScrollView>
      </View>
      {playVideoList?.[nextVideo]?.video_Id[0] == undefined && playVideoList?.length != 0 && <Loader />}
    </>
  );
};
{
  /* <WebView source={{ uri: 'https://youtu.be/NUyT3uhbS0g' }} /> */
}
