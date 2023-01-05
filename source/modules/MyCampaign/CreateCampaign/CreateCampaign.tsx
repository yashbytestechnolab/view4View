import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { ButtonComponent, Header } from '../../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ROUTES, String } from '../../../constants';
import { styles } from './style';
import { Colors, F40014, F60012, F60016 } from '../../../Theme';
import { Dropdown } from 'react-native-element-dropdown';
import { Expected } from '../../../services';
import { createCampaign } from '../../../services/FireStoreServices';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { firebase } from '@react-native-firebase/firestore';
interface YT {
  views: string | number;
  timeSecond: string | number
}


export const CreateCampaign = () => {
  const navigation: any = useNavigation();
  const { storeCreator: { campaignData: { getCampaignData }, dispatchcampaign } }: any = useContext(InputContextProvide)

  const route = useRoute<{
    params: any; key: string; name: string; path?: string | undefined;
  }>();

  const [expectedValue, setExpectedValue] = useState<YT>({
    views: 0,
    timeSecond: 0
  })
  // return parseInt(playVideoList?.[nextVideo]?.requireDuration / 1.1)
  const [totalCost, setTotalCost] = useState(0)

  const expectedView = useMemo(() => Expected(10, 100, 10), [])
  const expectedTime = useMemo(() => Expected(45, 600, 30), [])
  const { views, timeSecond } = expectedValue
  const splitUrl = route?.params?.url.split('/').slice(3)
  const { commonString, headerTitle } = String

  const onUpdateCostValue = (item: string) => {
    setExpectedValue({ ...expectedValue, timeSecond: item });
    setTotalCost(parseInt(item / 1.1))
  }

  const handleAddCampaign = () => {
    const userAddUrl: string = route?.params?.url
    timeSecond == 0 || views == 0 ? Alert.alert("Select category") :
      (
        createCampaign(userAddUrl, splitUrl, timeSecond, views, totalCost)
          .then((res: any) => {
            let m = firebase.firestore.Timestamp.now()
            const updateCampaign = getCampaignData?.length > 0 ? [...getCampaignData, { ...res, created: m }] : [{ ...res, created: m }]
            dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: updateCampaign })
          }).catch((err: any) => { console.log("err", err) }),
        navigation.replace(ROUTES.HOME_LANDING)
      )
  }

  return (
    <>
      <View style={styles.main}>
        <Header title={headerTitle?.createCampaign} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          style={{ backgroundColor: Colors.white, marginTop: 12 }}
          contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, paddingBottom: 90 }}>
          <YoutubePlayer height={203} videoId={splitUrl} />
          <View style={{ marginTop: 16, flex: 1 }}>
            <Text style={[F60016.textStyle, F60016.campaign]}>
              {commonString.OrderSettings}
            </Text>
          </View>
          <View style={{ marginTop: 10, height: 1, backgroundColor: Colors.greyD8D8D8 }} />
          <View style={{ flex: 1, marginTop: 22 }}>
            <View style={styles.settingWrapper}>
              <Text style={[F40014.main, styles.alignSelef]}>
                {commonString.Expectedviews}
              </Text>
              <View style={styles.expectedView}>
                <View style={styles.dropDown}>
                  <Dropdown
                    selectedTextStyle={[F40014.main, styles.paddingLeft]}
                    containerStyle={styles.dropContain}
                    confirmSelectItem={false}
                    iconStyle={styles.icon}
                    style={styles.dropDownContainer}
                    labelField="label"
                    valueField="value"
                    placeholder='0'
                    placeholderStyle={{ paddingLeft: 22 }}
                    data={expectedView}
                    showsVerticalScrollIndicator={false}
                    value={views}
                    renderItem={(item) => {
                      return (
                        <View style={{ flex: 1, marginVertical: 3 }}>
                          <Text style={{ color: "black", textAlign: "center" }}>
                            {item?.value}
                          </Text>
                        </View>
                      )
                    }}
                    onChange={(item) => setExpectedValue({ ...expectedValue, views: item?.value })}
                    maxHeight={100}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.settingWrapper, styles.marginTop16]}>
              <Text style={[F40014.main, styles.alignSelef]}>
                {commonString.requiredTime}
              </Text>
              <View style={styles.expectedView}>
                <View style={styles.dropDown}>
                  <Dropdown
                    selectedTextStyle={[F40014.main, styles.paddingLeft]}
                    containerStyle={styles.dropContain}
                    confirmSelectItem={false}
                    iconStyle={styles.icon}
                    style={styles.dropDownContainer}
                    labelField="label"
                    valueField="value"
                    placeholder='0'
                    placeholderStyle={{ paddingLeft: 22 }}
                    data={expectedTime}
                    showsVerticalScrollIndicator={false}
                    value={timeSecond}
                    renderItem={(item) => {
                      return (
                        <View style={{ flex: 1, marginVertical: 3 }}>
                          <Text style={{ color: "black", textAlign: "center" }}>
                            {item?.value}
                          </Text>
                        </View>
                      )
                    }}
                    onChange={(item) => { onUpdateCostValue(item?.value) }}
                    maxHeight={100}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.settingWrapper, styles.marginTop16,]}>
              <Text style={[F40014.main, styles.alignSelef]}>
                {commonString.Totalcost}
              </Text>
              <View style={[styles.expectedView, { backgroundColor: Colors.primaryRed }]}>
                <Text style={[F40014.main, F40014.whiteColor]}>
                  {totalCost}
                </Text>
              </View>
            </View>

            <ButtonComponent
              buttonTitle={commonString.AddCampaign}
              wrapperStyle={{ marginHorizontal: 0, marginTop: 32 }}
              onPrees={() => handleAddCampaign()}
            />

            <View style={{ marginTop: 32, flex: 1 }}>
              <Text style={F60012.textStyle}>
                {commonString?.Warning}
              </Text>
              <View style={{ marginTop: 12 }}>
                <Text style={[{ textAlign: "left" }, F40014.main]}>
                  {commonString?.viewUpdateWarning}
                </Text>
              </View>
            </View>


          </View>
        </ScrollView>
      </View>
    </>
  );
}

/*














 // const focus: boolean = useIsFocused();
  // const imageUrl = "http://img.youtube.com/vi/" + splitUrl?.slice(3) + "/0.jpg";
  // const videoUrl = route?.params?.url

  // useEffect(() => {
      //   get_coins().then((res) => {
      //     setGetCoin(res?._data.coin)
      //   })
      // }, [focus, getCoin]);

      // const TotalCost = () => {
      //   payCoin(getCoin).then(() => {
      //     navigation?.navigate(ROUTES?.HOME_LANDING, {
      //       imageId: imageUrl
      //     });
      //   });
      // };

      // const AddVideo = async () => {
      //   createCampaign({ videoUrl, splitUrl })
      //     .then(() => {
      //       TotalCost()
      //     }).catch(() => { })
      // }

      /**
       * 
       *  {getCoin === null
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
       * 
       */



{/* <View style={styles.totalCoast}>
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
          </TouchableOpacity> */}