import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, ActivityIndicator, Animated, Alert, Platform, PixelRatio } from 'react-native';
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe';
import { ButtonComponent, Header } from '../../components';
import { getNotificationToken, LocalStorageKeys, String } from '../../constants';
import { styles } from './style';
import { bytesVideoListData, setAutoPlay, setAutoPlayAndTime, EarnCoin, GetCurrentPlayCampaign, getUserID, get_coins, userDeatil, userSession, setSessionAndAutoPlay, newAddWatchUrl, updateCampaignViews, getUnkonwnCampaign, deleteAccoutCampaign, setAutoPlayAndTimeForAds, purchaseVideoListQuery, expireMemberShip } from '../../services/FireStoreServices';
import { colorBackGround, Colors, darkBackGround, F40014, F60024 } from '../../Theme';
import { CoinIcon, SecondsIcon } from '../../assets/icons';
import { handleFirebaseError } from '../../services';
import { InputContextProvide } from '../../context/CommonContext';
import { type } from '../../constants/types';
import { person } from './increment';
import Lottie from 'lottie-react-native';
import * as LocalStorage from '../../services/LocalStorage';
import { Anaylitics } from '../../constants/analytics';
import { AdsClass } from '../../services/AdsLoad';
import { CamptionConformationModel } from '../../components/CamptionConformationModel';
import { type as keys, } from '../../constants/types';
import { getSocialLoginValue } from '../../constants/settingProfileArr';
import ToggleSwitch from 'toggle-switch-react-native'
import Tooltip from 'react-native-walkthrough-tooltip';
import BottomSheet from '../../components/BottomSheet';
import { getItems, initilizeIAPConnection, onGetProdutId, onPurchase } from '../../services/InAppPurchaseServices';
import { showMessage } from 'react-native-flash-message';
import * as RNIap from 'react-native-iap';
import { updatCampaignData } from './interface';
import { useTranslation } from 'react-i18next';
import { po } from '../../Language/portuguese';
import { en } from '../../Language/english';
import i18next from 'i18next';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

export const ViewLanding = () => {

  firestore.FieldValue.serverTimestamp()
  const { t } = useTranslation()

  const { storeCreator: { reward, adsCount, setAdsCount, isInternetBack, setToken, coinBalance: { getBalance, watchVideoList, purchaseCoin },
    dispatchCoin,
    videoLandingData: { videoData, videoLoading, docData, purchaseDocument, purchaseCampaignListFlag, bytesDocData, isBytesVideoLoading, nextVideo },
    dispatchVideoLandingData, darkModeTheme, setGetReferralCode, isTooltipRemaining, setIsTooltipRemaining, } }: any =
    useContext(InputContextProvide)

  const [playing, setPlaying] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [isAutoPlayEnable, setIsAutoPlayEnable] = useState<boolean>(false);
  const [remainingAutoPlayTime, setRemainingAutoPlayTime]: any = useState(0);
  const controlRef: any = useRef<boolean>();
  const firstStart: any = useRef<boolean>(true);
  const animationProgress = useRef(new Animated.Value(0))
  const [timer, setTimer] = useState<number>();
  const [isAnimation, setIsAnimantion] = useState(false)
  const [onLoadStop, setOnLoadStop] = useState(false)
  const [isAdsAlertDisplay, setIsAlertDisplay] = useState(false);
  const [onFinishedVideo, setOnFinishedVideo] = useState(false);
  const [youtubePlayerTooltip, setYoutubePlayerTooltip]: any = useState(isTooltipRemaining);
  const [coinTooltip, setCoinTooltip] = useState(false);
  const [nextButtonTooltip, setNextButtonTooltip] = useState(false);
  const [autoPlayTooltip, setAutoPlayTooltip] = useState(false);
  const [lastEarnCoins, setLastEarnCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [videoWatchUpdateCount, setVideoWatchUpdateCount] = useState(0)

  let bottomRef: any = useRef<boolean>();


  const dateFormat = (date: any, month: string | number) => {
    return `${(date.getFullYear() + "," + date.getMonth() + month) + "," + date.getDate() + ","}`.toString()
  }

  const checkMembershipDetail = (second: string | any) => {
    let purchaseDate: string | number | Date = new Date(second * 1000);
    purchaseDate = dateFormat(purchaseDate, 2);

    let currentDate: string | number | Date = new Date().toUTCString()
    currentDate = new Date(currentDate)
    currentDate = dateFormat(currentDate, 1)

    if (purchaseDate < currentDate) {
      expireMemberShip()
    }
  }

  const GetCoins = async () => {
    // @ signin screen name in crash console  
    await get_coins().then(async (res: any) => {
      (res?._data?.purchaseDetail?.memberShipPurchase && checkMembershipDetail(res?._data?.purchaseDetail?.lastPurchaseDate?._seconds))
      let memberShipPurchase: boolean | any = res?._data?.purchaseDetail?.memberShipPurchase || false
      setAdsCount(res?._data?.ads_watch || 0)
      setVideoWatchUpdateCount(res?._data?.video_watch_count || 0)
      dispatchCoin({ types: type.GET_CURRENT_COIN, payload: res?._data?.coin, memberShipPurchase })
      getPurchaseVideoList()
      Anaylitics("get_user_detail", { current_balance: res?._data?.coin })
    });
  };

  const result = (add_Video_Url: Array<object> | any) => {
    let data: any = {}
    const arr: Array<object> = []
    function randomNumberGenerator() {
      let randomNumber: number | any = Math.floor(Math.random() * add_Video_Url.length)
      if (data[randomNumber]) {
        randomNumberGenerator()
      }
      else {
        data[randomNumber] = "repeated"
        arr.push(add_Video_Url[randomNumber])
      }
    }
    function creareVideoArray() {
      for (let j = 0; j < add_Video_Url?.length; j++) {
        randomNumberGenerator()
      }
    }
    creareVideoArray()
    return arr
  }

  const dispatchWrap = () => {
    dispatchVideoLandingData({ types: type.PURCHASE_CAMPAIGN, payload: false });
    GetLiveVideoList("isRender", [])
  }

  const getPurchaseVideoList = async () => {
    let docOS: any = Object.keys(purchaseDocument)?.length > 0 ? purchaseDocument : {}
    try {
      let add_Video_Url: Array<any> | any = []
      let purchaseData = await purchaseVideoListQuery(docOS)
      purchaseData?.filter((res: any) => {
        if (!res?._data?.user_views?.includes(getUserID()) && res?._data?.upload_by !== getUserID()) {
          add_Video_Url.push(res?._data)
        }
      });
      if (add_Video_Url?.length > 0) {
        let modifiyArry: any = result(add_Video_Url)
        setTimer(modifiyArry[0]?.require_duration)
        dispatchVideoLandingData({ types: type.VIDEO_DATA, payload: { _vid: modifiyArry, _docPurchase: purchaseData[purchaseData?.length - 1], _vID: [], _doc: {} } })
        dispatchVideoLandingData({ types: type.PURCHASE_CAMPAIGN, payload: true })
      } else {
        dispatchWrap()
      }
    }
    catch (error) {
      dispatchWrap
    }
  }

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
    getUnkonwnCampaign(docOS)
      .then(async (res: any) => {
        res?._docs?.length >= 5 ? person.getInc() : (person.increment3())
        res._docs?.filter((res: any) => {
          // if (!res?._data?.user_views?.includes(getUserID()) && res?._data?.upload_by !== getUserID()) {
            add_Video_Url.push(res?._data)
            return res?._data
          // }
        });
        if (add_Video_Url?.length > 0) {
          let modifiyArry: any = result(add_Video_Url)
          person?.emptyCount();
          params?.length > 0 && (setTimer(modifiyArry[0]?.require_duration))
          dispatchVideoLandingData({ types: type.VIDEO_DATA, payload: { _vid: modifiyArry, _doc: res?._docs[res?._docs?.length - 1], _vID: watchVideoList, _docPurchase: {} } })
        } else {
          if (person.retryCount >= 6) {
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
        handleFirebaseError(error?.code, t);
      })
      .finally(() => {
        dispatchVideoLandingData({ types: type.VIDEO_LOADING, payload: false })
      });
  }


  const notificationToken = async () => {
    let Ntoken: string | null | undefined | any = await LocalStorage.getValue(LocalStorageKeys.notificationToken)
    if (Ntoken == null || Ntoken == undefined) {
      let notificationTokenData: any = await getNotificationToken()
      setToken(notificationTokenData)
      userSession(notificationTokenData)
    } else {
      userSession(Ntoken)
      setToken(Ntoken || "")
    }
  }

  const GetReferralCode = async () => {
    await userDeatil().then(async (res: any) => {
      // setIsAutoPlayEnable(res?.auto_play);
      // if(res?.auto_play && Number(res?.remaining_time) > 0){
      //   setPlaying(true);
      // }
      // setRemainingAutoPlayTime(res?.remaining_time);
      setGetReferralCode(res?.referral_code)
    });
  };

  useEffect(() => {
    GetCoins();
    notificationToken()
    GetReferralCode()
    getSocialLoginValue()
  }, []);

  const getAutoPlayVal = async () => {
    let autoPlayVal: any = await LocalStorage.getValue(LocalStorageKeys?.isAutoPlayEnable)
    setIsAutoPlayEnable(autoPlayVal || false);
    if (autoPlayVal == true) {
      autoPlayHandler();
    }
  }

  useEffect(() => {
    getAutoPlayVal();
  }, [])

  useEffect(() => {
    userDeatil().then(async (res: any) => {
      if (res?.hasOwnProperty('remaining_time')) {
        setRemainingAutoPlayTime(res?.remaining_time);
        setIsAutoPlayEnable(res?.auto_play);
        res?.auto_play === true && setPlaying(true);
      } else {
        setSessionAndAutoPlay(600);
        setRemainingAutoPlayTime(600);
        setIsAutoPlayEnable(false);
        setPlaying(true);
      }

    })
  }, [])

  useEffect(() => {
    if (isAutoPlayEnable && remainingAutoPlayTime == 0) {
      bottomRef.open();
    }
  }, [remainingAutoPlayTime])


  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }
    if (start) {
      controlRef.current = setInterval(async () => {
        if (timer > 0) {
          setTimer(timer - 1);
          if (isAutoPlayEnable && remainingAutoPlayTime == 0) {
            await setAutoPlayAndTime(!isAutoPlayEnable, remainingAutoPlayTime);
            setPlaying(false);
            setIsAutoPlayEnable(false);
          }
          if (remainingAutoPlayTime > 0 && isAutoPlayEnable) {
            setRemainingAutoPlayTime(remainingAutoPlayTime - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(controlRef.current);
    }
    return () => clearInterval(controlRef.current);
  }, [start, controlRef, timer, remainingAutoPlayTime]);

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
    setOnFinishedVideo(true)
    const { id, expected_view, coin } = videoData?.[nextVideo]
    if (timer === 0) {
      if (isTooltipRemaining) {
        setCoinTooltip(true);
        setLastEarnCoins(videoData?.[nextVideo]?.coin / videoData?.[nextVideo]?.expected_view);
      }
      let timer = Math.floor(Math.random() * (1200 - 500 + 1) + 300)
      setTimer(0);
      clearInterval(controlRef?.current);
      setTimeout(async () => {
        await GetCurrentPlayCampaign(id, isBytesVideoLoading).then(async (res: any) => {
          const totalAmount = getBalance + (coin / expected_view);
          let getAppendUserId: Array<string | any> = (res?._data?.user_views == undefined) ? [getUserID()] : [...res?._data?.user_views, getUserID()]
          // await newAddWatchUrl(totalAmount, videoWatchUpdateCount)
          const { remaining_view, consumed_view, upload_by } = res?._data;
          let updatCampaignData: updatCampaignData = {
            addFiled: res?._data?.user_views == undefined,
            id,
            remaining_view,
            consumed_view,
            expected_view,
            videoData: videoData?.[nextVideo],
            upload_by,
            isBytesVideoLoading,
            getAppendUserId,
          }
          await updateCampaignViews(updatCampaignData)
            .catch(() => { debounce(); handleFirebaseError("coin not update", t); setOnFinishedVideo(false) })
          setOnFinishedVideo(false)
          dispatchCoin({ types: type.GET_CURRENT_COIN, payload: totalAmount })
          Anaylitics("watch_video_sucess", { earn_from_video: (coin / expected_view), user_total_balance: totalAmount, user_balance: getBalance })
          setVideoWatchUpdateCount(videoWatchUpdateCount + 1)
          //add condition
          if (isAutoPlayEnable) {
            await setAutoPlayAndTime(isAutoPlayEnable, remainingAutoPlayTime)
            debounce()
            Anaylitics("autoplay_next_video_click", {
              user_balance: getBalance,
              video_id: (videoData?.[nextVideo]?.youtube_video_id || videoData?.[nextVideo]?.video_Id?.[0]),
              video_duration: timer,
              earn_from_video: videoData?.[nextVideo]?.coin / videoData?.[nextVideo]?.expected_view,
              expected_view: videoData?.[nextVideo]?.expected_view,
              remaining_view: videoData?.[nextVideo]?.remaining_view
            });
          }
        }).catch(() => { debounce(); setOnFinishedVideo(false) })
      }, timer);
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


  const NextVideoList = () => {
    if (nextVideo <= videoData?.length - 1) {
      if (nextVideo === videoData?.length - 1 && !onLoadStop) {
        if (purchaseCampaignListFlag) {
          getPurchaseVideoList()
        } else {
          if (!isBytesVideoLoading) {
            GetLiveVideoList("onNetUserVideo", watchVideoList)
          } else {
            getBytesVideoList("onNetBytesVideo")
          }
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
    let rewarShare: rewardShare = { reward: (reward?.adsReward || 100), adsCount, getBalance }
    EarnCoin(rewarShare)?.then((res) => {
      dispatchCoin({ types: keys.GET_CURRENT_COIN, payload: getBalance + (reward?.adsReward || 100) })
      setAdsCount(adsCount + 1)
      Anaylitics("earn_coin_show_ads_completed", {
        current_user_balance: getBalance + (reward?.adsReward || 100)
      })
    })
    setTimeout(() => {
      showAnimation()
    }, 3000);
  }

  const autoPlayHandler = async () => {
    Anaylitics("autoplay_switch_click", { auto_play_mode: !isAutoPlayEnable })
    if (timer == 0) {
      debounce();
    }
    if (isAutoPlayEnable == false && remainingAutoPlayTime > 0) {
      setAutoPlay(!isAutoPlayEnable).then(() => {
        setIsAutoPlayEnable(true);
        userDeatil().then(async (res: any) => {
          setPlaying(true);
          setRemainingAutoPlayTime(res?.remaining_time);
        });
      })

      Anaylitics("autoplay_next_video_click", {
        user_balance: getBalance,
        video_id: (videoData?.[nextVideo]?.youtube_video_id || videoData?.[nextVideo]?.video_Id?.[0]),
        video_duration: timer,
        earn_from_video: videoData?.[nextVideo]?.coin / videoData?.[nextVideo]?.expected_view,
        expected_view: videoData?.[nextVideo]?.expected_view,
        remaining_view: videoData?.[nextVideo]?.remaining_view
      });
      onPreesNext(100);
    } else {
      //stop time;
      if (remainingAutoPlayTime == 0) {
        bottomRef.open();
      } else {
        setAutoPlayAndTime(!isAutoPlayEnable, remainingAutoPlayTime).then(() => {
          setPlaying(false);
          setIsAutoPlayEnable(false);
        })
      }
    }
  }

  const displayPlayTime = () => {
    const totalMinutes = Math.floor(remainingAutoPlayTime / 60);
    const seconds = (remainingAutoPlayTime % 60) < 10 ? "0" + (remainingAutoPlayTime % 60) : (remainingAutoPlayTime % 60);
    const hours = (Math.floor(totalMinutes / 60)) < 10 ? "0" + (Math.floor(totalMinutes / 60)) : Math.floor(totalMinutes / 60);
    const minutes = (totalMinutes % 60) < 10 ? "0" + (totalMinutes % 60) : totalMinutes % 60;
    return <Text style={[F40014?.main, colorBackGround(darkModeTheme), { marginTop: 10, fontSize: 10, color: Colors.primaryRed }]}>{hours + ":" + minutes + ":" + seconds}</Text>
  }

  const youtubePlayerErrorHandler = async (err: any, videoId: string, videoData: any) => {
    try {
      await getYoutubeMeta(videoId);
    } catch (error) {
      deleteAccoutCampaign(videoData?.id).then((res) => {
        debounce()
      })
    }
  }

  const rewardMin = () => {
    showMessage({
      message: `5:00 Minutes Cradited to Auto Play video`,
      type: 'success',
      duration: 2000
    })
    setAutoPlayAndTimeForAds(true, 300, (adsCount + 1));
    setRemainingAutoPlayTime(300);
    setAdsCount(adsCount + 1);
    setPlaying(true);
    setIsAutoPlayEnable(true);
  }

  const showRewardAd = () => {
    bottomRef.close();
    Anaylitics("earn_coin_show_ads", {
      current_user_balance: getBalance
    })
    AdsClass.showAds(() => {
      setIsAlertDisplay(true);
    }, rewardMin);
  }

  const connectInit = async () => {
    const isConnectedIAP: any =await initilizeIAPConnection();
    console.log("isConnectedIAP", isConnectedIAP);

    setIsLoading(true)
    if (isConnectedIAP) {
      // const getIAPData = async () => {
      let IAPData = undefined   //await getPurchaseData();
      // {\\\
      // IAPData == undefined ? setParseData(getInAppPurchasetaticData) : setParseData(IAPData)
      // IAPData == undefined ? setParseData(getInAppPurchaseAutoPlay) : setParseData(IAPData)
      // }
      let storeProducts: any = await getItems()
      setIsLoading(false);
      // }  
      // getIAPData()
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    connectInit();
  }, []);

  useEffect(() => {
    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase: any) => {
        console.log("purchase", purchase);
        const receipt = Platform.OS === 'ios' ? purchase?.transactionReceipt : purchase?.purchaseToken;
        console.log("purchase", receipt);
        if (receipt) {
          if (Platform.OS === 'ios') {
            await RNIap?.finishTransaction({ purchase: purchase }).then(() => {
              // onRewardCoin (purchase?.productId)
              setAutoPlayAndTime(true, 3600);
              setRemainingAutoPlayTime(3600);
              setIsAutoPlayEnable(true);
              RNIap.clearTransactionIOS();
              setIsLoading(false);
            }).catch(err => {
              _onError(err.message)
            });
          }
          if (Platform.OS === 'android') {
            console.log("android");
            RNIap.acknowledgePurchaseAndroid({ token: purchase?.purchaseToken }).then(async () => {
              console.log("purchase?.purchaseToken", purchase?.purchaseToken);
              await RNIap?.finishTransaction({ purchase: purchase, isConsumable: true }).then((res: any) => {
                setAutoPlayAndTime(true, 3600);
                setRemainingAutoPlayTime(3600);
                setIsAutoPlayEnable(true);
                setPlaying(true);
                showMessage({
                  message: `1:00 Hour Cradited to Auto Play video`,
                  type: 'success',
                  duration: 2000
                })
              })
            }).catch(err => {
              setIsLoading(false);
              // console.log("err:", JSON.stringify(err));
              _onError(err.message)
            });
          }
        }
      },
    );

    purchaseErrorSubscription = RNIap.purchaseErrorListener(
      (error: any) => {
        if (error?.code !== 'E_USER_CANCELLED') {
          showMessage({
            message: error?.message,
            type: 'danger',
            duration: 6000
          });
        }
        setIsLoading(false)
        if (error?.code === 'E_USER_CANCELLED') {
          return
        }
      },
    );
    return (() => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }

    });
  }, []);

  const isFocus = useIsFocused()

  useEffect(() => {
    if (!isFocus) {
      purchaseUpdateSubscription?.remove();
      purchaseUpdateSubscription = null;
      purchaseErrorSubscription?.remove();
      purchaseErrorSubscription = null;
    }
  }, [isFocus])


  const _onError = async (message: any) => {
    if (Platform.OS === 'ios') {
      await RNIap.clearTransactionIOS();
      await RNIap.clearProductsIOS()
    }
    setIsLoading(false)
    console.log("_onError", message);
    // showMessage({
    //   message: message,
    //   type: 'danger',
    //   duration: 6000
    // })
    // navigation.goBack()
  }

  const onPressBuyAutoPlay = async (productData: any) => {
    await connectInit();
    bottomRef.close();
    setIsLoading(true)
    let sku = onGetProdutId(productData);
    try {
      sku && onPurchase(sku);
    } catch (error) {
      setIsLoading(false)
      // console.log("error==>", error);
    }
  }

  let rewardText = i18next.language.substring(0, 2) == "en" ? en.translation.watchAdd : po.translation.watchAdd

  return (
    <>
      <SafeAreaView style={styles.safearea} />
      <StatusBar
        backgroundColor={Colors?.gradient1}
        barStyle={String?.StatusBar?.lightContent}
      />
      <View style={[styles.container, darkBackGround(darkModeTheme)]}>
        <Header
          coin={getBalance}
          tooltip={coinTooltip}
          title={t("view4view")}
          setTooltip={setCoinTooltip}
          setNextButtonTooltip={setNextButtonTooltip}
          lastAddedCoins={lastEarnCoins}
        />
        {videoLoading || !isInternetBack || isLoading ?
          <View style={styles.loader}>
            <ActivityIndicator size={"large"} color={Colors.linear_gradient} />
          </View> :
          <>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.main} contentContainerStyle={{ paddingBottom: 120 }}>
              <View style={styles.videoWrapper} key={nextVideo?.toString()}>
                {isInternetBack && (videoData?.[nextVideo]?.youtube_video_id?.length > 0 || videoData?.[nextVideo]?.video_Id?.[0]?.length > 0) && !videoLoading &&
                  <>
                    <Tooltip
                      isVisible={youtubePlayerTooltip}
                      content={
                        <View>
                          <Text style={[colorBackGround(darkModeTheme)]}>
                            {t("EarnCoin")}
                          </Text>
                        </View>
                      }
                      contentStyle={[darkBackGround(darkModeTheme)]}
                      placement="top"
                      onClose={() => {
                        setYoutubePlayerTooltip(false);
                        setAutoPlayTooltip(true);
                        setPlaying(true);
                      }}
                      useInteractionManager={true}
                    >
                    </Tooltip>
                    <YoutubePlayer
                      height={270}
                      videoId={videoData?.[nextVideo]?.youtube_video_id || videoData?.[nextVideo]?.video_Id?.[0]}
                      play={playing}
                      onChangeState={onStateChange}
                      onError={(err: any) => { debounce(); youtubePlayerErrorHandler(err, (videoData?.[nextVideo]?.youtube_video_id || videoData?.[nextVideo]?.video_Id[0]), videoData?.[nextVideo]) }} />
                  </>
                }
              </View>

              <View style={styles.iconRow}>
                <View style={styles.iconWrapper}>
                  <View style={styles.marginLeft}>
                    <View style={styles.commonActionContainer}>
                      <View style={styles.iconTextWrapper}>
                        <View style={styles.secondIcon}>
                          <SecondsIcon />
                        </View>
                        <Text
                          numberOfLines={1}
                          style={[F60024.textStyle, { color: Colors?.primaryRed, justifyContent: 'center', alignItems: 'center', marginLeft: 7, flex: 1, fontSize: 22 }]}>
                          {timer > 0 ? timer : 0}
                        </Text>
                      </View>
                      <Text style={[F40014?.main, colorBackGround(darkModeTheme), { fontSize: 10 }]}>{t("second")}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.iconWrapper}>
                  <View style={styles.marginLeft}>
                    <View style={styles.commonActionContainer}>
                      <View style={styles.iconTextWrapper}>
                        <CoinIcon />
                        <Text
                          numberOfLines={1}
                          style={[F60024.textStyle, { color: Colors?.primaryRed }, { color: Colors?.primaryRed, justifyContent: 'center', alignItems: 'center', marginLeft: 7 }]}>
                          {videoData?.[nextVideo]?.coin > 0 ? (videoData?.[nextVideo]?.coin / videoData?.[nextVideo]?.expected_view) : 0}
                        </Text>
                      </View>
                      <Text style={[F40014?.main, colorBackGround(darkModeTheme), { fontSize: 10 }]}>{t("coin")}</Text>
                    </View>
                    {/* <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}> */}
                    {/* </View> */}
                  </View>
                </View>

                <View style={[styles.iconWrapper]}>
                  <View style={[styles.marginLeft, { marginBottom: 13 }]}>
                    {displayPlayTime()}
                    <Tooltip
                      isVisible={autoPlayTooltip}
                      contentStyle={[
                        {
                          width: 220,
                          marginTop: 0,
                          marginLeft: 0,
                        },
                        darkBackGround(darkModeTheme),
                      ]}
                      arrowStyle={{
                        marginTop: 0,
                        marginLeft: 0,
                      }}
                      content={
                        <View>
                          <Text style={[colorBackGround(darkModeTheme)]}>
                            {t('Enable')}
                          </Text>
                        </View>
                      }
                      placement="top"
                      onClose={() => {
                        setAutoPlayTooltip(false);
                        autoPlayHandler();
                      }}
                      useInteractionManager={true}>
                      <ToggleSwitch
                        // key={item?.id}
                        isOn={isAutoPlayEnable}
                        onColor={Colors?.primaryRed}
                        offColor={Colors?.toggleBG}
                        size="small"
                        onToggle={() => autoPlayHandler()}
                      />
                    </Tooltip>
                    <Text style={[F40014?.main, colorBackGround(darkModeTheme), { fontSize: 10, marginTop: 10 }]}>{t("autoPlay")}</Text>
                  </View>
                </View>

              </View>
              <Tooltip
                isVisible={nextButtonTooltip}
                contentStyle={[
                  {
                    width: 230,
                    marginTop: 25,
                    marginLeft: 0,
                  },
                  darkBackGround(darkModeTheme),
                ]}
                arrowStyle={{
                  marginTop: 25,
                  marginLeft: 0,
                }}
                content={
                  <View>
                    <Text style={[colorBackGround(darkModeTheme)]}>
                      {t("Explore")}
                    </Text>
                  </View>
                }
                placement="top"
                onClose={() => {
                  setNextButtonTooltip(false);
                  setIsTooltipRemaining(false);
                }}
                useInteractionManager={true}
              >
                <ButtonComponent
                  loading={videoLoading || onFinishedVideo}
                  onPrees={() => {
                    debounce()
                    Anaylitics("next_video_click", {
                      user_balance: getBalance,
                      video_id: (videoData?.[nextVideo]?.youtube_video_id || videoData?.[nextVideo]?.video_Id?.[0]),
                      video_duration: timer,
                      earn_from_video: videoData?.[nextVideo]?.coin / videoData?.[nextVideo]?.expected_view,
                      expected_view: videoData?.[nextVideo]?.expected_view,
                      remaining_view: videoData?.[nextVideo]?.remaining_view
                    });
                  }}
                  disable={videoLoading || onFinishedVideo}
                  wrapperStyle={styles.marginTop}
                  buttonTitle={t("nextVideo")} />
              </Tooltip>
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
                buttonTitle={t(rewardText(reward?.adsReward))} />}
            </ScrollView>
          </>
        }
        <BottomSheet
          bottomRef={(ref: any) => bottomRef = ref}
          watchAdsHandler={() => showRewardAd()}
          onPressBuyAutoPlay={(data: any) => onPressBuyAutoPlay(data)}
        />
      </View>
      {isAdsAlertDisplay &&
        <CamptionConformationModel
          titleText={t('Warning')}
          descriptionText={t('RewardsAds')}
          isVisible={isAdsAlertDisplay}
          descriptionStyle={{ paddingHorizontal: 20 }}
          setIsVisible={setIsAlertDisplay}
          actionTitle={t("Close")}
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




{/** Auto Play */ }
// useEffect(() => {
//   userDeatil().then(async (res: any) => {
//     if(res?.hasOwnProperty('remaining_time')){
//       userSession();
//     } else {
//       setSessionAndAutoPlay(1800)
//       setRemainingAutoPlayTime(1800)
//     }

//   })
// }, [])
{/** Auto Play */ }






  // const GetEarning = async () => {
  //   const { id, remaining_view, consumed_view, video_Id, expected_view, coin } = videoData?.[nextVideo]
  //   if (timer === 0) {
  //     setTimer(0);
  //     clearInterval(controlRef?.current);
  //     const totalAmount = getBalance + (coin / expected_view);
  //     dispatchCoin({ types: type.USER_WATCH_VIDEO_LIST, payload: watchVideoList?.length > 0 ? [...watchVideoList, video_Id[1]] : [video_Id[1]] })
  //     await addWatchUrl(watchVideoList, video_Id[1], totalAmount, isBytesVideoLoading)
  //     await getNewUpdatedViewCount(id, remaining_view, consumed_view, expected_view, videoData?.[nextVideo], isBytesVideoLoading).catch(() => handleFirebaseError("coin not update"))
  //     dispatchCoin({ types: type.GET_CURRENT_COIN, payload: totalAmount })
  //     Anaylitics("watch_video_sucess", { earn_from_video: (coin / expected_view), user_total_balance: totalAmount, user_balance: getBalance })
  //   }
  // }
/**
 * user get referral code and set in csetGetReferralCode context 
 */
