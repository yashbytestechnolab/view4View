import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, ActivityIndicator, Animated } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ButtonComponent, Header } from '../../components';
import { getNotificationToken, LocalStorageKeys, String } from '../../constants';
import { styles } from './style';
import { addWatchUrl, bytesVideoListData, EarnCoin, getNewUpdatedViewCount, getPlayVideoList, getUserID, get_coins, userDeatil, } from '../../services/FireStoreServices';
import { colorBackGround, Colors, darkBackGround, F40014, F60024 } from '../../Theme';
import { CoinIcon, SecondsIcon } from '../../assets/icons';
import { handleFirebaseError } from '../../services';
import { InputContextProvide } from '../../context/CommonContext';
import { type } from '../../constants/types';
import { person } from './increment';
import Lottie from 'lottie-react-native';
import * as LocalStorage from '../../services/LocalStorage';
import { Anaylitics } from '../../constants/analytics';
import { Rating } from '../../services/Rating';
import { AdsClass } from '../../services/AdsLoad';
import { CamptionConformationModel } from '../../components/CamptionConformationModel';
import { type as keys, } from '../../constants/types';

export const ViewLanding = () => {
  const { storeCreator: { reward, isInternetBack, setToken, coinBalance: { getBalance, watchVideoList }, dispatchCoin, videoLandingData: { videoData, videoLoading, docData, bytesDocData, isBytesVideoLoading, nextVideo }, dispatchVideoLandingData, darkModeTheme, setGetReferralCode } }: any = useContext(InputContextProvide)
  const [playing, setPlaying] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const controlRef: any = useRef<boolean>();
  const firstStart: any = useRef<boolean>(true);
  const [timer, setTimer] = useState<number>();
  const [isAnimation, setIsAnimantion] = useState(false)
  const animationProgress = useRef(new Animated.Value(0))
  const [onLoadStop, setOnLoadStop] = useState(false)
  const [isAdsAlertDisplay, setIsAlertDisplay] = useState(false);

  const GetCoins = async (params: string) => {
    // @ signin screen name in crash console  
    await get_coins().then(async (res: any) => {
      dispatchCoin({ types: type.GET_CURRENT_COIN, payload: res?._data?.coin })
      dispatchCoin({ types: type.USER_WATCH_VIDEO_LIST, payload: res?._data?.watch_videos })
      GetLiveVideoList(params, res?._data?.watch_videos)
      Anaylitics("get_user_detail", { current_balance: res?._data?.coin })
    });
  };

  const notificationToken = async () => {
    let Ntoken: string | null | undefined | any = await LocalStorage.getValue(LocalStorageKeys.notificationToken)
    if (Ntoken == null || Ntoken == undefined) {
      let notificationTokenData: any = await getNotificationToken()
      setToken(notificationTokenData)
    } else {
      setToken(Ntoken || "")
    }
  }
  const openRatingPopup = async () => {
    await Rating()
  }
  
  const GetReferralCode = async () => {
    await userDeatil().then(async (res: any) => {
      setGetReferralCode(res?.referral_code)
    });
  };

  useEffect(() => {
    GetCoins("isInitialRenderUpdate");
    notificationToken()
    GetReferralCode()
  }, []);

  useEffect(() => {
    let unmountPopup = setTimeout(() => openRatingPopup(), 2000)
    return () => { unmountPopup }
  }, [])


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
    if (!isInternetBack) setStart(false)
    else if (playing) setStart(true)
  }, [isInternetBack])

  const showAnimation = () => {
    setIsAnimantion(true)
    Animated.timing(animationProgress?.current, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(({ finished }) => {
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
      dispatchCoin({ types: type.USER_WATCH_VIDEO_LIST, payload: watchVideoList?.length > 0 ? [...watchVideoList, video_Id[1]] : [video_Id[1]] })
      await addWatchUrl(watchVideoList, video_Id[1], totalAmount, isBytesVideoLoading)
      await getNewUpdatedViewCount(id, remaining_view, consumed_view, expected_view, videoData?.[nextVideo], isBytesVideoLoading).catch(() => handleFirebaseError("coin not update"))
      dispatchCoin({ types: type.GET_CURRENT_COIN, payload: totalAmount })
      Anaylitics("watch_video_sucess", { earn_from_video: (coin / expected_view), user_total_balance: totalAmount, user_balance: getBalance })
    }
  }
  /**
   * user get referral code and set in csetGetReferralCode context 
   */


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
      setStart(false);
    }
    if (state === 'buffering') {
      setStart(false);
    }
    if (state === 'unstarted') {
      setStart(false);
    }
    if (state === 'video cued') {
      setStart(false);
    }
  };

  const getBytesVideoList = async (params: string) => {
    dispatchVideoLandingData({ types: type.VIDEO_LOADING, payload: true })
    let data = await bytesVideoListData(bytesDocData)
    let bytesVideo = data?.map((item: any) => item?._data)
    if ((!isBytesVideoLoading || params?.length > 0) && bytesVideo?.length > 0) (setTimer(bytesVideo[0]?.require_duration))
    if (bytesVideo?.length > 0) {
      dispatchVideoLandingData({ types: type.BYTES_VIDEO_DATA, payload: { _vid: bytesVideo, bytes_doc: data[data?.length - 1] } })
    }
    else { setOnLoadStop(true); dispatchVideoLandingData({ types: type.VIDEO_LOADING, payload: false }) }
  }

  let add_Video_Url: Array<any> | any = []
  async function GetLiveVideoList(params: string, watchVideoList: any) {
    dispatchVideoLandingData({ types: type.VIDEO_LOADING, payload: true })
    let docOS: any = Object.keys(docData)?.length > 0 ? docData : person?.retryDocument
    getPlayVideoList(docOS)
      .then(async (res: any) => {
        res?._docs?.length >= 5 ? person.getInc() : (person.increment3())

        res._docs?.filter((res: any) => {
          if (res?._data?.upload_by !== getUserID() && !watchVideoList?.includes(res?._data?.video_Id[1])) {
            add_Video_Url.push(res?._data)
            return res?._data
          }
        });

        if (add_Video_Url?.length > 0) {
          person?.emptyCount();
          params?.length > 0 && (setTimer(add_Video_Url[0]?.require_duration))
          dispatchVideoLandingData({ types: type.VIDEO_DATA, payload: { _vid: add_Video_Url, _doc: res?._docs[res?._docs?.length - 1], _vID: watchVideoList } })
        } else {
          if (person.retryCount >= 3) {
            dispatchVideoLandingData({ types: type.BYTESVIDEO_LOAD, payload: true })
            !isBytesVideoLoading && getBytesVideoList("")
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
      if (nextVideo === videoData?.length - 1 && !onLoadStop) {
        if (!isBytesVideoLoading) {
          GetLiveVideoList("onNetUserVideo", watchVideoList)
        } else {
          getBytesVideoList("onNetBytesVideo")
        }
      }
      else if (onLoadStop) {
        return
      }
      else {
        dispatchVideoLandingData({ types: type.NEXT_VIDEO, payload: nextVideo + 1 })
        setTimer(videoData?.[nextVideo + 1]?.require_duration);
      }
    }
  }

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

  let debounce = onPreesNext(100)


  const rewardCoin = () => {
    EarnCoin(getBalance, (reward?.adsReward || 100))?.then((res) => {
      dispatchCoin({ types: keys.GET_CURRENT_COIN, payload: getBalance + (reward?.adsReward || 100) })
      Anaylitics("earn_coin_show_ads_completed", {
        current_user_balance: getBalance + (reward?.adsReward || 100)
      })
    })
    setTimeout(() => {
      showAnimation()
    }, 3000);
  }


  return (
    <>
      <SafeAreaView style={styles.safearea} /><StatusBar
        backgroundColor={Colors?.gradient1}
        barStyle={String?.StatusBar?.lightContent}
      />
      <View style={[styles.container, darkBackGround(darkModeTheme)]}>
        <Header coin={getBalance} title={String?.headerTitle?.view4view} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.main} contentContainerStyle={{paddingBottom:120}}>
          <View style={styles.videoWrapper} key={nextVideo?.toString()}>
            {isInternetBack &&
              <YoutubePlayer
                height={270}
                videoId={videoData?.[nextVideo]?.video_Id[0]}
                play={playing}
                onChangeState={onStateChange}
                onError={(err) => console.log("wrr", err)} />}
          </View>
          {videoLoading || !isInternetBack ?
            <View style={styles.loader}>
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
                      {timer > 0 ? timer : 0}
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
                      {videoData?.[nextVideo]?.coin > 0 ? (videoData?.[nextVideo]?.coin / videoData?.[nextVideo]?.expected_view) : 0}
                    </Text>
                    <Text style={[F40014?.main, colorBackGround(darkModeTheme)]}>{String?.viewTab?.coin}</Text>
                  </View>
                </View>
              </View>
              <ButtonComponent
                loading={videoLoading}
                onPrees={() => {
                  Anaylitics("next_video_click", {
                    user_balance: getBalance,
                    video_id: videoData?.[nextVideo]?.video_Id[0],
                    video_duration: timer,
                    earn_from_video: videoData?.[nextVideo]?.coin / videoData?.[nextVideo]?.expected_view,
                    expected_view: videoData?.[nextVideo]?.expected_view,
                    remaining_view: videoData?.[nextVideo]?.remaining_view
                  });
                  debounce()
                }}
                wrapperStyle={styles.marginTop}
                buttonTitle={String?.viewTab?.nextVideo} />
              {person?.home_ads && <ButtonComponent
                onPrees={() => {
                  Anaylitics("earn_coin_show_ads", {
                    current_user_balance: getBalance
                  })
                  AdsClass.showAds(() => {
                    setIsAlertDisplay(true);
                  }, rewardCoin);
                }}
                wrapperStyle={styles.marginTop}
                buttonTitle={String?.viewTab?.watchAdd(reward?.adsReward)} />}
            </>
          }

        </ScrollView>
      </View>
      {isAdsAlertDisplay &&
        <CamptionConformationModel
          titleText={'Warning!!'}
          descriptionText={`We don't have any rewards ads to display. Please try again!!`}
          isVisible={isAdsAlertDisplay}
          descriptionStyle={{ paddingHorizontal: 20 }}
          setIsVisible={setIsAlertDisplay}
          actionTitle={"Close"}
          onPress={() => {
            setIsAlertDisplay(false)
          }
          }
        />
      }
      {isAnimation &&
        <Lottie style={styles.animation}
          source={require('../../assets/animation.json')} progress={animationProgress.current} />}
    </>
  );
};


