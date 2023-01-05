import React, { useContext, useEffect } from 'react';
import { View, Text, Image, FlatList, SafeAreaView, TouchableOpacity, } from 'react-native';
import { Header, Loader } from '../../components';
import { ROUTES, String } from '../../constants';
import { styles } from './style';
import EarnCoin from '../../assets/icons/EarnCoin';
import { Colors, F40010, F40012, F40014, F50013 } from '../../Theme';
import { InputContextProvide } from '../../context/CommonContext';
import { GetVideoCampaign } from '../../services/FireStoreServices';
import { type } from '../../constants/types';
import { PlusIcon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';

export const MyCampaignLandingScreen = () => {
  const navigation = useNavigation()
  const { storeCreator: { campaignData: { loding, getCampaignData }, dispatchcampaign } }: any = useContext(InputContextProvide)

  const getVideoUrl = async () => {
    dispatchcampaign({ types: type.CAMPAIGN_LOADING, payload: true })
    await GetVideoCampaign().then((res: any) => {
      const getVideoUrl: any = []
      res._docs?.filter((res: any) => {
        if (res?._data?.remaining_view > 0) {
          getVideoUrl.push(res?._data)
          return res?._data
        }
      });
      dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: getVideoUrl })
    }).
      catch((error) => dispatchcampaign({ types: type.CONFIRM_PASSWORD_ERROR, payload: error.message }))
      .finally(() => dispatchcampaign({ types: type.CAMPAIGN_LOADING, payload: false }))
  }

  useEffect(() => {
    getVideoUrl()
  }, [dispatchcampaign])

  const renderCampaignList = ({ item }: any) => {
    let fillValue = item?.consumed_view * 100 / item?.expected_view
    let d: any = new Date(item?.created?.seconds * 1000)
    let date2 = new Date(Date.now())
    let Difference_In_Time = d.getTime() - date2.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    let today = Difference_In_Days.toString().slice(0, 1)
    today = parseInt(today) == 0 ? "Today" : `${Difference_In_Days.toFixed()} day ago`
    return (
      // <></>
      <View style={styles.container}>
        <Image
          style={styles.thumbNilImage}
          source={{ uri: `http://img.youtube.com/vi/${item?.video_Id[0]}/0.jpg` }} />

        <View style={styles.discription}>
          <Text
            style={F50013.main}
            numberOfLines={1}>
            {"Avatar 2 The Way Of Water Full"}
          </Text>
          <Text
            style={[F40012.main, F40012.color06]}
            numberOfLines={1}>
            {today}
          </Text>
          <View style={styles.fillContainer}>
            <View style={[styles.fillView, { width: `${fillValue + "%"}` }]} />
          </View>
          <View style={styles.countOfView}>
            <Text style={[F40014.main, F40014.color]}>
              {item?.consumed_view + "/" + item?.expected_view}
            </Text>
            <Text style={[F40010.main, styles.views]}>
              views of this video
            </Text>
          </View>
        </View>
      </View>

    )
  }

  console.log("getCampaignData", getCampaignData);

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <View style={styles.mainContainer}>
        <Header
          EarnCoin={<EarnCoin />}
          coinsAmt={"100"}
          title={String?.headerTitle?.myCampaign} />
        <View style={styles.height} />
        {loding ? (<Loader />) :
          (
            <>
              <FlatList
                scrollEnabled
                style={styles.flatList}
                data={getCampaignData}
                renderItem={renderCampaignList}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.ADDVIDEO)}
                activeOpacity={0.8}
                style={{
                  position: "absolute",
                  height: 60,
                  width: 60,
                  bottom: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 30,
                  right: 20,
                  backgroundColor: Colors.primaryRed
                }}>
                <PlusIcon />
              </TouchableOpacity>
            </>
          )
        }
      </View>
    </>
  );
};
