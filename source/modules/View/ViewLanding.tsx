import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ButtonComponent, Header } from '../../components';
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


export const ViewLanding = () => {
  const { storeCreator: { coinBalance: { getBalance }, dispatchCoin } }: any = useContext(InputContextProvide)

  const [playing, setPlaying] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const controlRef: any = useRef<boolean>();
  const firstStart: any = useRef<boolean>(true);
  const [getVideoId, setGetVideoId] = useState([]);
  const [nextVideo, setNextVideo] = useState<number>(0);
  const [timer, setTimer] = useState<number>();
  const [loader, setLoader] = useState<boolean>(false);
  const userId = auth().currentUser?.uid;
  const [liveData, setLiveData] = useState()
  const [limit, setLimit] = useState<number>(1)
  const [docId, setDocId] = useState()

  const GetCoins = async (params: string) => {
    let resCoinUpdate = 0;
    await get_coins().then(res => {
      resCoinUpdate = res?._data?.coin;
      setGetVideoId(res?._data?.watch_videos);
      dispatchCoin({ types: type.GET_CURRENT_COIN, payload: res?._data?.coin })
    });

    return resCoinUpdate;
  };

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



  useEffect(() => {
    if (timer === 0) {
      GetEarning();
    }
  }, [timer]);

  const SetCoins = () => {
    return parseInt(liveData?.[nextVideo]?.require_duration / 1.1);
  };

  const GetEarning = async () => {
    const getCampaignId: string | number = liveData?.[nextVideo]?.id;
    const remiderView: string | number = liveData?.[nextVideo]?.remaining_view;
    const consumed_view: string | number = liveData?.[nextVideo]?.consumed_view;
    let getCurrenData: any = liveData?.[nextVideo]?.video_Id[0];
    if (timer === 0) {
      GetCoins("").then((res: number) => {
        setTimer(0);
        clearInterval(controlRef?.current);
        setPlaying(false);
        const totalAmount = res + SetCoins();
        addWatchUrl({ totalAmount, getVideoId, getCurrenData })
      });
      getNewUpdatedViewCount({ getCampaignId, remiderView, consumed_view })

    }

  }


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

  useEffect(() => {
    GetCoins('isRender');
  }, []);
  useEffect(() => {
    GetLiveVideoList("parms", "null", docId)
  }, [])


  const GetLiveVideoList = (params: string, prams1: string, docId: any) => {

    setLimit(limit + 1)
    setLoader(true);
    getPlayVideoList(prams1, docId)
      .then((res: any) => {
        setNextVideo(0);
        let add_Video_Url: Array<any> = []
        res._docs?.filter((res: any) => {
          if (res?._data?.upload_by !== userId && !getVideoId?.includes(res?._data?.video_Id[0])) {
            add_Video_Url.push(res?._data)
            return res?._data
          }
        });
        setDocId(res?._docs[res?._docs?.length - 1])
        setLoader(false);
        setLiveData(add_Video_Url)
        if (params.length > 0) {
          setLoader(false);
          setTimer(add_Video_Url[0]?.require_duration)
        }
      })
      .catch(error => {
        setLoader(false);
        handleFirebaseError(error?.code);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  const NextVideoList = () => {
    if (nextVideo <= liveData?.length - 1) {
      if (nextVideo === liveData?.length - 1) {
        GetLiveVideoList("", "", docId)
      }
      else {
        setNextVideo(nextVideo + 1);
        setTimer(liveData?.[nextVideo + 1]?.require_duration);
      }
    }
  };
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
              videoId={liveData?.[nextVideo]?.video_Id[0]}
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
            loading={loader}
            onPrees={() => {
              NextVideoList()
            }}
            wrapperStyle={styles.marginTop}
            buttonTitle={String?.viewTab?.nextVideo}
          />
        </ScrollView>
      </View>
    </>
  );
};
