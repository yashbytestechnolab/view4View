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
import { createCampaign, get_coins, updateUserWallet } from '../../../services/FireStoreServices';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { firebase } from '@react-native-firebase/firestore';
import { getYoutubeMeta, } from 'react-native-youtube-iframe';

interface YT {
  views: string | number;
  timeSecond: string | number
}


export const CreateCampaign = () => {
  const navigation: any = useNavigation();
  const { storeCreator: { coinBalance: { getBalance }, dispatchCoin, campaignData: { getCampaignData }, dispatchcampaign } }: any = useContext(InputContextProvide)
  const route = useRoute<{
    params: any; key: string; name: string; path?: string | undefined;
  }>();

  const [expectedValue, setExpectedValue] = useState<YT>({ views: 0, timeSecond: 0 })
  const [totalCost, setTotalCost] = useState(0)
  const expectedView = useMemo(() => Expected(10, 100, 10), [])
  const expectedTime = useMemo(() => Expected(45, 600, 30), [])
  const { views, timeSecond } = expectedValue
  const { commonString, headerTitle } = String
  const splitUrl = route?.params?.url.split('/').slice(3)

  const onUpdateCostValue = (item: string) => {
    setExpectedValue({ ...expectedValue, timeSecond: item });
    setTotalCost(parseInt(item / 1.1))
  }

  const updateCoinBalance = async (updateWallet: number) => {
    let coinBalance = await updateUserWallet(updateWallet)
    dispatchCoin({ types: type.GET_CURRENT_COIN, payload: coinBalance })
    navigation.replace(ROUTES.HOME_LANDING)
  }

  const handleAddCampaign = async () => {
    if (getBalance >= totalCost && timeSecond != 0 && views != 0) {
      const updateWallet = getBalance - totalCost
      const userAddUrl: string = route?.params?.url
      let videoTitle: { title: string } = await getYoutubeMeta(splitUrl)
      /**
       * Create Campaign api call & cut wallet amount
       */
      createCampaign(userAddUrl, splitUrl, timeSecond, views, totalCost, videoTitle?.title)
        .then(async (res: any) => {
          // let m = firebase.firestore.Timestamp.now()
          // const updateCampaign = getCampaignData?.length > 0 ? [{ ...res, created: m }, ...getCampaignData] : [{ ...res, created: m }]
          // dispatchcampaign({ types: type.CAMPAIGN_DATA, payload: updateCampaign })
          updateCoinBalance(updateWallet)
        }).catch((err: any) => { console.log("err", err) })
    }
    else {
      // Alert.alert("Not Enough Coin")
    }
  }

  return (
    <>
      <View style={styles.main}>
        <Header
          showBacKIcon={true}
          title={headerTitle?.createCampaign} />
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
              disable={getBalance <= totalCost || timeSecond == 0 || views == 0}
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
