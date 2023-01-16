import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ButtonComponent, Header } from '../../components';
import { String } from '../../constants';
import { styles } from './style';
import {
  addWatchUrl,
  bytesVideoListData,
  getNewUpdatedViewCount,
  getPlayVideoList,
  getUserID,
  get_coins,
} from '../../services/FireStoreServices';
import { colorBackGround, Colors, darkBackGround, F40014, F60024 } from '../../Theme';
import { CoinIcon, SecondsIcon } from '../../assets/icons';
import { handleFirebaseError } from '../../services';
import { InputContextProvide } from '../../context/CommonContext';
import { type } from '../../constants/types';
import { person } from './increment';
import Lottie from 'lottie-react-native';



export const ViewLanding = () => {
  const { storeCreator: { coinBalance: { getBalance, watchVideoList }, dispatchCoin, videoLandingData: { videoData, videoLoading, docData, videoId, bytesDocData, isBytesVideoLoading, nextVideo }, dispatchVideoLandingData, darkModeTheme } }: any = useContext(InputContextProvide)
  const { darkModeColor, white } = Colors

  console.log("darkModeTheme", darkModeTheme);

  const [playing, setPlaying] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const controlRef: any = useRef<boolean>();
  const firstStart: any = useRef<boolean>(true);
  const [timer, setTimer] = useState<number>();
  const [isAnimation, setIsAnimantion] = useState(false)
  const animationProgress = useRef(new Animated.Value(0))

  const GetCoins = async (params: string) => {
    await get_coins().then(async (res: any) => {
      dispatchCoin({ types: type.GET_CURRENT_COIN, payload: res?._data?.coin })
      dispatchCoin({ types: type.USER_WATCH_VIDEO_LIST, payload: res?._data?.watch_videos })
      GetLiveVideoList(params, res?._data?.watch_videos)
    });
  };

  useEffect(() => {
    GetCoins("isInitialRenderUpdate");
  }, []);

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

  const showAnimation = () => {
    setIsAnimantion(true)
    Animated.timing(animationProgress?.current, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      console.log("finished", finished)
      if (finished) {
        setIsAnimantion(false)
      }
    })
  };

  const GetEarning = async () => {
    const { id, remaining_view, consumed_view, video_Id, expected_view, coin } = videoData?.[nextVideo]
    if (timer === 0) {
      setTimer(0);
      clearInterval(controlRef?.current);

      const totalAmount = getBalance + (coin / expected_view);

      dispatchCoin({ types: type.USER_WATCH_VIDEO_LIST, payload: watchVideoList?.length > 0 ? [...watchVideoList, video_Id[0]] : [video_Id[0]] })

      await addWatchUrl(watchVideoList, video_Id[0], totalAmount, isBytesVideoLoading)

      await getNewUpdatedViewCount(id, remaining_view, consumed_view, expected_view, videoData?.[nextVideo], isBytesVideoLoading).catch(() => handleFirebaseError("coin not update"))
      dispatchCoin({ types: type.GET_CURRENT_COIN, payload: totalAmount })
    }
  }

  useEffect(() => {
    if (timer === 0) {
      GetEarning();
      animationProgress?.current.setValue(0)
      showAnimation()
    }
  }, [timer]);

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
  

  const getBytesVideoList = async () => {
    dispatchVideoLandingData({ types: type.VIDEO_LOADING, payload: true })
    let data = await bytesVideoListData(bytesDocData)
    let bytesVideo = data?.map((item: any) => item?._data)
    !isBytesVideoLoading && (setTimer(bytesVideo[0]?.require_duration))
    if (bytesVideo?.length > 0) {
      dispatchVideoLandingData({ types: type.BYTES_VIDEO_DATA, payload: { _vid: bytesVideo, bytes_doc: data[data?.length - 1] } })
    }
    else { dispatchVideoLandingData({ types: type.VIDEO_LOADING, payload: false }) }
  }

  let add_Video_Url: Array<any> | any = []
  async function GetLiveVideoList(params: string, watchVideoList: any) {

    dispatchVideoLandingData({ types: type.VIDEO_LOADING, payload: true })
    let docOS: any = Object.keys(docData).length > 0 ? docData : person?.retryDocument

    getPlayVideoList(docOS)
      .then(async (res: any) => {
        res?._docs?.length >= 5 ? person.getInc() : (person.increment3())
        res._docs?.filter((res: any) => {
          if (res?._data?.upload_by !== getUserID() && !watchVideoList?.includes(res?._data?.video_Id[0])) {
            add_Video_Url.push(res?._data)
            return res?._data
          }
        });

        if (add_Video_Url?.length > 0) {
          person?.emptyCount();
          dispatchVideoLandingData({ types: type.VIDEO_DATA, payload: { _vid: add_Video_Url, _doc: res?._docs[res?._docs?.length - 1], _vID: watchVideoList } })
          params?.length > 0 && (setTimer(add_Video_Url[0]?.require_duration))
        } else {
          if (person.retryCount >= 3) {
            dispatchVideoLandingData({ types: type.BYTESVIDEO_LOAD, payload: true })
            !isBytesVideoLoading && getBytesVideoList()
          }
          else {
            person?.retryDoc(res?._docs[res?._docs?.length - 1])
            GetLiveVideoList("isRender", watchVideoList);
          }
        }

      })
      .catch(error => {
        dispatchVideoLandingData({ types: type.VIDEO_ERROR, payload: error.message })
        handleFirebaseError(error?.code);
      })
      .finally(() => {
        dispatchVideoLandingData({ types: type.VIDEO_LOADING, payload: false })
      });
  }

  const NextVideoList = () => {
    if (nextVideo <= videoData?.length - 1) {
      if (nextVideo === videoData?.length - 1) {
        if (!isBytesVideoLoading) {
          GetLiveVideoList("", watchVideoList)
        } else {
          getBytesVideoList()
        }
      }
      else {
        dispatchVideoLandingData({ types: type.NEXT_VIDEO, payload: nextVideo + 1 })
        setTimer(videoData?.[nextVideo + 1]?.require_duration);
      }
    }
  };

  const onPreesNext = (time: number) => {
    let intialSetTime: number | any;
    clearTimeout(intialSetTime)
    return () => {
      if (intialSetTime) clearTimeout(intialSetTime)
      intialSetTime = setTimeout(() => {
        NextVideoList()
      }, time)
    }
  }

  let debounce = onPreesNext(400)
  return (
    <>

      <><SafeAreaView style={styles.safearea} /><StatusBar
        backgroundColor={Colors?.gradient1}
        barStyle={String?.StatusBar?.lightContent}
      />
        <View style={[styles.container, darkBackGround(darkModeTheme)]}>
          <Header coin={getBalance} title={String?.headerTitle?.view4view} />
          <ScrollView style={styles.main}>
            <View style={styles.videoWrapper}>
              <YoutubePlayer
                height={270}
                videoId={videoData?.[nextVideo]?.video_Id[0]}
                ref={controlRef}
                play={playing}
                onChangeState={onStateChange}
              />
            </View>
            {
              videoLoading ?
                <View style={{ flex: 1, marginTop: "20%", justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size={"large"} color={Colors.linear_gradient} />
                </View> :
                <>
                  <View style={styles.iconRow}>
                    <View style={styles.iconWrapper}>
                      <SecondsIcon />
                      <View style={styles.marginLeft}>
                        <Text
                          numberOfLines={1}
                          style={[F60024.textStyle, { color: Colors?.primaryRed },]}>
                          {timer}
                        </Text>

                        <Text style={[F40014?.main, colorBackGround(darkModeTheme)]}>{String?.viewTab?.second}</Text>
                      </View>
                    </View>
                    <View style={styles.iconWrapper}>
                      <CoinIcon />
                      <View style={styles.marginLeft}>
                        <Text
                          numberOfLines={1}
                          style={[F60024.textStyle, { color: Colors?.primaryRed }]}>
                          {videoData?.[nextVideo]?.coin}
                        </Text>
                        <Text style={[F40014?.main, colorBackGround(darkModeTheme)]}>{String?.viewTab?.coin}</Text>
                      </View>
                    </View>
                  </View>

              
                  <ButtonComponent
                    loading={videoLoading}
                    onPrees={() => { debounce(); }}
                    wrapperStyle={styles.marginTop}
                    buttonTitle={String?.viewTab?.nextVideo} />

                </>}
          </ScrollView>



        </View>
        {isAnimation &&
          <Lottie style={{
            position: 'absolute',
            top: 0,
            bottom: -230,
            left: 0, right: 0,

          }}
            source={require('../../assets/animation.json')}
            
          progress={animationProgress.current}
          />}</>

    </>
  );
};


