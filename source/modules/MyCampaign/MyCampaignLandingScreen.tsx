import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text, Image, FlatList, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator, } from 'react-native';
import { Header } from '../../components';
import { ROUTES, String } from '../../constants';
import { styles } from './style';
import { colorBackGround, Colors, darkBackGround, F40010, F40012, F40014, F50013, lightBackGround } from '../../Theme';
import { InputContextProvide } from '../../context/CommonContext';
import { GetVideoCampaign, campaignHistory } from '../../services/FireStoreServices';
import { type } from '../../constants/types';
import { PlusIcon } from '../../assets/icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { lastSeen } from '../../services';
import { useState } from 'react';
import { crashlyticslog } from '../../services/crashlyticslog';
export const MyCampaignLandingScreen = () => {
  const { headerTitle, commonString } = String
  const navigation = useNavigation()
  let route: object | any = useRoute()

  /**context data coin and campaign data */
  const { storeCreator: { campaignData: { loding, getCampaignData, stickeyIndex }, dispatchcampaign, darkModeTheme, setVideoUrl } }: any = useContext(InputContextProvide)
  const [loading, setLoading] = useState(false)
  /**
 * 
 * @param params list of current campaign data list
 * To Render History  firebase table campaign_history.. Video And Get data from api and create stickey header index
 * index will show which index header stickey
 */
  const getHistoryData = async (params: Array<object> | any) => {
    let historyList = await campaignHistory()
    if (params?.length > 0 && historyList?.length > 0) {
      crashlyticslog(`get user uploaded complete campaign list @ ${ROUTES.MYCAMPAIGN_LANDING}`)
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
    crashlyticslog(`get user upload campaign list @ ${ROUTES.MYCAMPAIGN_LANDING}`)
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
  }, [dispatchcampaign])

  /** convert last seen by uploaded video  */
  const getUploadedTime = useCallback((item: any) => {
    return lastSeen(item)
  }, [getCampaignData])

  /**
   * Render flatlist function to diplay list of video uploaded 
   */
  const renderCampaignList = ({ item }: any) => {
    let fillValue = item?.consumed_view * 100 / item?.expected_view

    return (
      <>
        {
          item?.stickeyHeader?.length > 0 ?
            (<View style={[styles.stickeyHeaderView,
            { backgroundColor: darkModeTheme ? Colors.drakStickey : Colors.shadowPink }]}>
              <Text style={[styles.stickeyText, colorBackGround(darkModeTheme)]}>
                {item?.stickeyHeader}
              </Text>
            </View>)
            :
            <View style={[styles.container, lightBackGround(darkModeTheme), { shadowColor: darkModeTheme ? Colors.darkModeColor1 : Colors.whiteShadow }]}>
              <Image
                style={styles.thumbNilImage}
                source={{ uri: `http://img.youtube.com/vi/${item?.video_Id[0]}/0.jpg` }} />
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
          !loading && !loding && getCampaignData?.length <= 0 &&
          <View style={[styles.emptyList, darkBackGround(darkModeTheme)]}>
            <Text style={[F50013.main, styles.textAlign, colorBackGround(darkModeTheme)]}>
              {commonString?.emptyList}
            </Text>
          </View>
        }
      </>
    )
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <View style={[styles.mainContainer, darkBackGround(darkModeTheme)]}>
        <Header
          title={headerTitle?.myCampaign} />
        {loding ? (<View style={styles.loader}><ActivityIndicator color={Colors.primaryRed} size={'large'} /></View>) :
          (<>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled
              style={[styles.flatList, darkBackGround(darkModeTheme)]}
              data={getCampaignData}
              stickyHeaderIndices={stickeyIndex}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    crashlyticslog(`on referesh campaign list @ ${ROUTES.MYCAMPAIGN_LANDING}`);
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
                setVideoUrl("")
                crashlyticslog(`add campaign video @ ${ROUTES.MYCAMPAIGN_LANDING}`);
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
    </>
  );
};
