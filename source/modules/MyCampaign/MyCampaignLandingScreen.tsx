import React, { useContext, useEffect } from 'react';
import { View, Text, Image, FlatList, SafeAreaView, } from 'react-native';
import { Header, Loader } from '../../components';
import { String } from '../../constants';
import { styles } from './style';
import EarnCoin from '../../assets/icons/EarnCoin';
import { F40010, F40012, F40014, F50013 } from '../../Theme';
import { InputContextProvide } from '../../context/CommonContext';
import { GetVideoCampaign } from '../../services/FireStoreServices';
import { type } from '../../constants/types';

export const MyCampaignLandingScreen = () => {
  const { storeCreator: { campaignData, dispatchcampaign } }: any = useContext(InputContextProvide)
  const { loding, getCampaignData } = campaignData;

  const getVideoUrl = async () => {
    dispatchcampaign({ types: type.CAMPAIGN_LOADING, payload: true })
    await GetVideoCampaign().then((res: any) => {
      const getVideoUrl: any = []
      res._docs?.filter((res: any) => {
        if (res?._data?.remiderView > 0) {
          getVideoUrl.push(res?._data)
          return res?._data
        }
      });
      dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: getVideoUrl })
    }).
      catch((error) => dispatchcampaign({ types: type.CONFIRM_PASSWORD_ERROR, payload: error.message }))
  }

  useEffect(() => {
    getVideoUrl()
  }, [dispatchcampaign])


  const renderCampaignList = ({ item }: any) => {
    let fillValue = item?.remiderView * 100 / item?.expectedView
    return (
      <View style={styles.container}>
        <Image
          style={styles.thumbNilImage}
          source={{ uri: `http://img.youtube.com/vi/${item?.videoId[0]}/0.jpg` }} />
        <View style={styles.discription}>
          <Text
            style={F50013.main}
            numberOfLines={1}>
            {"8 days ago"}
          </Text>
          <Text
            style={[F40012.main, F40012.color06]}
            numberOfLines={1}>
            {"Avatar 2 The Way Of Water Full"}
          </Text>
          <View style={styles.fillContainer}>
            <View style={[styles.fillView, { width: `${fillValue + "%"}` }]} />
          </View>
          <View style={styles.countOfView}>
            <Text style={[F40014.main, F40014.color]}>
              {item?.remiderView + "/" + item?.expectedView}
            </Text>
            <Text style={[F40010.main, styles.views]}>
              views of this video
            </Text>
          </View>
        </View>
      </View>
    )
  }

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
          (<FlatList
            scrollEnabled
            style={styles.flatList}
            data={getCampaignData}
            renderItem={renderCampaignList}
          />)
        }
      </View>
    </>
  );
};
