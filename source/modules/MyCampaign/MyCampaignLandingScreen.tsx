import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text, Image, FlatList, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator, Linking, Platform, BackHandler, } from 'react-native';
import { Header } from '../../components';
import { LocalStorageKeys, ROUTES, String } from '../../constants';
import { styles } from './style';
import { colorBackGround, Colors, darkBackGround, F40010, F40012, F40014, F50013, lightBackGround } from '../../Theme';
import { InputContextProvide } from '../../context/CommonContext';
import { GetVideoCampaign, campaignHistory, get_coins } from '../../services/FireStoreServices';
import { type } from '../../constants/types';
import { PlusIcon } from '../../assets/icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { lastSeen } from '../../services';
import { useState } from 'react';
import { Anaylitics } from '../../constants/analytics';
import GiftModel from '../../components/GiftModel';
import remoteConfig from '@react-native-firebase/remote-config';
import * as LocalStorage from '../../services/LocalStorage';

export const MyCampaignLandingScreen = () => {
  const { headerTitle, commonString } = String
  const navigation = useNavigation()
  let route: object | any = useRoute()
  const [showRateUsModel, setshowRateUsModel] = useState(false)
  /**context data coin and campaign data */
  const { storeCreator: { isInternetBack, campaignData: { loding, getCampaignData, stickeyIndex }, coinBalance: { getBalance }, dispatchcampaign, darkModeTheme, dispatchCoin, setVideoUrl } }: any = useContext(InputContextProvide)
  const [loading, setLoading] = useState(false)
  const [getConfigData, setGetConfingData] = useState()

  /**
 * 
 * @param params list of current campaign data list
 * To Render History  firebase table campaign_history.. Video And Get data from api and create stickey header index
 * index will show which index header stickey
 */
  const getHistoryData = async (params: Array<object> | any) => {
    let historyList = await campaignHistory()
    if (params?.length > 0 && historyList?.length > 0) {
      Anaylitics("history_campaign_get")
      dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: { data: [...params, { stickeyHeader: "Past Campaign" }, ...historyList], index: [0, params.length] } })
    }
    else if (params?.length <= 0 && historyList?.length > 0) {
      dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: { data: [{ stickeyHeader: "Past Campaign" }, ...historyList], index: [0] } })
    }
    else {
      dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: { data: params, index: [0] } })
    }
  }

  /**
  * Get current campaign list data from campaign table    
  *
  **/
  const getVideoUrl = async (params: string) => {
    params ? setLoading(true) : dispatchcampaign({ types: type.CAMPAIGN_LOADING, payload: true })
    await GetVideoCampaign().then((res: any) => {
      const getVideoUrl: any = []
      res._docs?.filter((res: any) => {
        if (res?._data?.remaining_view > 0) {
          getVideoUrl.push(res?._data)
          return res?._data
        }
      });                          // get current videoList and video liste there add stickey header index0
      getVideoUrl?.length > 0 && getVideoUrl.unshift({ stickeyHeader: "Current Campaign" })
      getHistoryData(getVideoUrl)
    }).
      catch((error) => dispatchcampaign({ types: type.CAMPAIGN_ERROR, payload: error.message })).
      finally(() => params && setLoading(false))
  }

  /** Call firebase api */
  useEffect(() => {
    if (!route?.params?.createCampaign) {
      getVideoUrl("")
    }
  }, [dispatchcampaign, isInternetBack])

  const getUserBalance = async () => {
    await get_coins().then(async (res: any) => {
      dispatchCoin({ types: type.GET_CURRENT_COIN, payload: res?._data?.coin })
    })
  }
  const getValue = async () => {
    await LocalStorage.getValue(LocalStorageKeys?.getRating).then((res) => {
      console.log("res", res)
    }).catch((err) => {
      console.log("err", err);

    })
  }
  useEffect(() => {
    getUserBalance();
    configUrl()
    getValue()
    setshowRateUsModel(route?.params?.addCampaign)
  }, [])

  /** convert last seen by uploaded video  */
  const getUploadedTime = useCallback((item: any) => {
    return lastSeen(item)
  }, [getCampaignData])
  /**
   * Render flatlist function to diplay list of video uploaded 
   */
  const renderCampaignList = ({ item, index }: any) => {
    let fillValue = item?.consumed_view * 100 / item?.expected_view
    return (
      <>
        {
          item?.stickeyHeader?.length > 0 ?
            (<View key={index?.toString()} style={[styles.stickeyHeaderView,
            { backgroundColor: darkModeTheme ? Colors.drakStickey : Colors.shadowPink }]}>
              <Text style={[styles.stickeyText, colorBackGround(darkModeTheme)]}>
                {item?.stickeyHeader}
              </Text>
            </View>)
            :
            <View key={index?.toString()} style={[styles.container, lightBackGround(darkModeTheme), { shadowColor: darkModeTheme ? Colors.darkModeColor1 : Colors.whiteShadow, elevation: darkModeTheme ? 0 : 8 }]}>
              <Image
                style={styles.thumbNilImage}
                source={{ uri: item?.thumbnail_url }} />
              <View style={styles.discription}>
                <Text
                  style={[F50013.main, colorBackGround(darkModeTheme)]}
                  numberOfLines={1}>
                  {item?.video_title}
                </Text>
                <Text
                  style={[F40012.main, F40012.color06, colorBackGround(darkModeTheme)]}
                  numberOfLines={1}>
                  {getUploadedTime(item)}
                </Text>
                <View style={styles.fillContainer}>
                  <View style={[styles.fillView, { width: `${fillValue + "%"}` }]} />
                </View>
                <View style={styles.countOfView}>
                  <Text style={[F40014.main, F40014.color,]}>
                    {item?.consumed_view + "/" + item?.expected_view}
                  </Text>
                  <Text style={[F40010.main, styles.views]}>
                    {commonString.viewsofthisvideo}
                  </Text>
                </View>
              </View>
            </View>
        }
      </>
    )
  }

  const handleEmptyData = () => {
    return (
      <>
        {
          !loading && getCampaignData?.length <= 0 &&
          <View style={[styles.emptyList, darkBackGround(darkModeTheme)]}>
            <Text style={[F50013.main, styles.textAlign, colorBackGround(darkModeTheme)]}>
              {commonString?.emptyList}
            </Text>
          </View>
        }
      </>
    )
  }
  const configUrl = () => {
    remoteConfig().fetchAndActivate().then(() => {
      const getConfigValue: any = remoteConfig().getValue("share_link").asString()
      const details = JSON?.parse(getConfigValue)
      setGetConfingData(details)
    })
  }
  console.log("showRateUsModel", showRateUsModel)

  const actionLinking = async () => {
    const { android, ios }: any = getConfigData;
    (Anaylitics("give rating by create-campaign"),
      Platform?.OS == 'android' ? Linking.openURL(android || 'https://play.google.com/store/apps/details?id=com.bytes.uview')
        : Linking.openURL(ios || 'https://apps.apple.com/us/app/uview-increase-youtube-views/id1658265805'))
    await LocalStorage.setValue(LocalStorageKeys.getRating, false)
    setshowRateUsModel(false)
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <View style={[styles.mainContainer, darkBackGround(darkModeTheme)]}>
        <Header
          title={headerTitle?.myCampaign} />
        {loding ? (<View style={styles.loader}><ActivityIndicator color={Colors.primaryRed} size={'large'} /></View>) :
          (<>
            <FlatList
              keyExtractor={(item) => item?.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled
              style={[styles.flatList, darkBackGround(darkModeTheme)]}
              data={getCampaignData}
              stickyHeaderIndices={stickeyIndex}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    Anaylitics("campaign_pull_to_referesh");
                    getVideoUrl("loading")
                  }}
                  colors={[Colors.gray]}
                  tintColor={Colors.gray}
                />
              }
              renderItem={renderCampaignList}
              ListEmptyComponent={handleEmptyData}
              contentContainerStyle={styles.flatlistContain}
            />
            <TouchableOpacity
              onPress={() => {
                setVideoUrl("");
                Anaylitics("add_video_click");
                navigation.navigate(ROUTES.ADDVIDEO)
              }}
              activeOpacity={0.8}
              style={styles.addIcon}>
              <PlusIcon />
            </TouchableOpacity>
          </>
          )
        }
      </View>
      {
        showRateUsModel && <GiftModel isVisible={showRateUsModel} setIsVisible={setshowRateUsModel}
          saveButtonTitle={'MAYBE LATER 🙁'}
          cancleButtonTitle={'RATE US 😍'}
          subTitle={`Your opinion matters to us!. Do you have a moment to rate our app?`}
          title2={'Enjoying UView?'}
          showRating={true}
          CancleOnPress={() => { actionLinking() }}
          onPress={() => { setshowRateUsModel(false) }} />
      }
    </>
  );
};
