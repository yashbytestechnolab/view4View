import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header } from '../../../components';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ROUTES, String } from '../../../constants';
import { styles } from './style';
import { createCampaign, get_coins, payCoin } from '../../../services/FireStoreServices';

export const CreateCampaign = () => {
  const route = useRoute<{
    params: any; key: string; name: string; path?: string | undefined; 
}>();
  const [getCoin, setGetCoin]: any = useState<string>();
  const navigation: any = useNavigation();
  const focus: boolean = useIsFocused();
  const splitUrl = route?.params?.url.split('/').slice(3)
  const imageUrl = "http://img.youtube.com/vi/" + splitUrl?.slice(3) + "/0.jpg";
  const videoUrl = route?.params?.url

  useEffect(() => {
    get_coins().then((res) => {
      setGetCoin(res?._data.coin)
    })
  }, [focus, getCoin]);

  const TotalCost = () => {
    payCoin(getCoin).then(() => {
      navigation?.navigate(ROUTES?.HOME_LANDING, {
        imageId: imageUrl
      });
    });
  };

  const AddVideo = async () => {
    createCampaign({ videoUrl, splitUrl })
      .then(() => {
        TotalCost()
      }).catch(( ) => { })
  }
  return (
    <>
      <View style={styles.main}>
        <Header title={String?.headerTitle?.createCampaign} />
        <YoutubePlayer height={400} videoId={splitUrl} />
        <View style={styles.totalCoast}>
          <Text style={styles.totalCostText}>Expected views</Text>
          <Text style={styles.costStyle}>10</Text>
        </View>
        <View style={styles.totalCoast}>
          <Text style={styles.totalCostText}>time Required</Text>
          <Text style={styles.costStyle}>10</Text>
        </View>
        <View style={styles.totalCoast}>
          <Text style={styles.totalCostText}>{String?.homeTab?.totalCost}</Text>
          <Text style={styles.costStyle}>100</Text>
        </View>
        <TouchableOpacity
          style={styles.addButtonWrapper}
          onPress={() => {
            {
              getCoin !== null && AddVideo();
            }
          }}>
          <Text style={[styles.plusIcon]}>{String?.homeTab?.done}</Text>
        </TouchableOpacity>
      </View>
      {getCoin === null
        ? Alert.alert(
          'Alert Title',
          "'sorry! you currently have no coin please watch the video and Earn coins',",
          [
            {
              text: 'Cancel',
              onPress: () => {
                navigation.goBack();
              },
            },
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate(ROUTES?.HOME_LANDING);
              },
            },
          ],
        )
        : null}
    </>
  );
}
