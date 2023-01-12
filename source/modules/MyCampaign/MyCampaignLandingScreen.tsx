import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text, Image, FlatList, SafeAreaView, TouchableOpacity, Dimensions, } from 'react-native';
import { Header, Loader } from '../../components';
import { ROUTES, String } from '../../constants';
import { styles } from './style';
import { Colors, F40010, F40012, F40014, F50013, F60024 } from '../../Theme';
import { InputContextProvide } from '../../context/CommonContext';
import { GetVideoCampaign, campaignHistory, deleteRemaining } from '../../services/FireStoreServices';
import { type } from '../../constants/types';
import { PlusIcon } from '../../assets/icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { lastSeen } from '../../services';
import { Fonts } from '../../../android/app/build/intermediates/assets/debug/mergeDebugAssets/custom';

export const MyCampaignLandingScreen = () => {
  const { headerTitle, commonString } = String
  const navigation = useNavigation()
  let route: object | any = useRoute()
  
  /**context data coin and campaign data */
  const { storeCreator: { loading, setLoading, campaignData: { loding, getCampaignData, stickeyIndex }, dispatchcampaign } }: any = useContext(InputContextProvide)

  /**
 * 
 * @param params list of campaign data
 * To Render History Video And Get data from api and create stickey header  
 */
  const getHistoryData = async (params: Array<object> | any) => {
    let historyList = await campaignHistory()
    if (historyList?.length > 0) {
      dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: { data: [...params, { stickeyHeader: "Past Campaign" }, ...historyList], index: [0, params.length,] } })
    }
    else if (params?.length <= 0) {
      dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: { data: [{ stickeyHeader: "Past Campaign" }, ...historyList], index: [0] } })
    }
    else {
      dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: { data: params, index: [0] } })
    }
  }

  /**
  * Get data from firebase for campaign list   
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
      });
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
            (<View style={{ height: 34, justifyContent: "center", backgroundColor: Colors.paginationGray, paddingLeft: 12 }}>
              <Text style={{ color: "black", fontSize: 16, fontWeight: "500", fontFamily: Fonts.InterMedium }}>
                {item?.stickeyHeader}
              </Text>
            </View>)
            :
            <View style={styles.container}>
              <Image
                style={styles.thumbNilImage}
                source={{ uri: `http://img.youtube.com/vi/${item?.video_Id[0]}/0.jpg` }} />
              <View style={styles.discription}>
                <Text
                  style={F50013.main}
                  numberOfLines={1}>
                  {item?.video_title}
                </Text>
                <Text
                  style={[F40012.main, F40012.color06]}
                  numberOfLines={1}>
                  {getUploadedTime(item)}
                </Text>
                <View style={styles.fillContainer}>
                  <View style={[styles.fillView, { width: `${fillValue + "%"}` }]} />
                </View>
                <View style={styles.countOfView}>
                  <Text style={[F40014.main, F40014.color]}>
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
          <View style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={F50013.main}>
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
      <View style={styles.mainContainer}>
        <Header
          title={headerTitle?.myCampaign} />
        {loding ? (<Loader />) :
          (<>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled
              style={[styles.flatList]}
              data={getCampaignData}
              stickyHeaderIndices={stickeyIndex}
              refreshing={loading}
              onRefresh={() => getVideoUrl("loading")}
              renderItem={renderCampaignList}
              ListEmptyComponent={handleEmptyData}
              contentContainerStyle={{ flexGrow: 1 }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.ADDVIDEO)}
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
