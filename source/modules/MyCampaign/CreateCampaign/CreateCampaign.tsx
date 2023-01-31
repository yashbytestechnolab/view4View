import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ButtonComponent, CommonDropDown, Header } from '../../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer, { getYoutubeMeta, } from 'react-native-youtube-iframe';
import { ROUTES, String } from '../../../constants';
import { styles } from './style';
import { colorBackGround, Colors, darkBackGround, F40014, F60012, F60016 } from '../../../Theme';
import { Expected, dropdownConfigValue } from '../../../services';
import { createCampaign, updateUserWallet } from '../../../services/FireStoreServices';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { YT, campaign } from './interface';
import GiftModel from '../../../components/GiftModel';
import { Anaylitics } from '../../../constants/analytics';
import { crashlyticslog } from '../../../services/crashlyticslog';

export const CreateCampaign = () => {

  const navigation: any = useNavigation();
  const { storeCreator: { token, loading, setLoading, coinBalance: { getBalance }, dispatchCoin, darkModeTheme, setVideoUrl } }: any = useContext(InputContextProvide)
  const route = useRoute<{
    params: any; key: string; name: string; path?: string | undefined;
  }>();
  const [isVisible, setIsVisible] = useState(false)
  const [expectedValue, setExpectedValue] = useState<YT>({ views: 10, timeSecond: 30 })
  const [totalCost, setTotalCost] = useState(300)
  const { views, timeSecond } = expectedValue
  const { commonString, headerTitle } = String
  const [configValue, setConfigValue] = useState<campaign>({})
  const splitUrl = route?.params?.url.split('/').slice(3)
  const youTubeRef = useRef()
  /**
   * configValue for dropdown set
   */
  const confingFnc = useCallback(async () => {
    let value: any = await dropdownConfigValue();
    setConfigValue(value)
  }, [])

  useEffect(() => {
    confingFnc()
    crashlyticslog(`get config value @ ${ROUTES.CREATE_CAMPAIGN}`)
  }, [dropdownConfigValue])

  // config value
  const expectedView = useMemo(() => Expected(10, configValue?.expectedView, 10), [configValue])
  const expectedTime = useMemo(() => Expected(30, configValue?.timeRequire, 30), [configValue])

  /**
 * Costing value of dropdown final cost
 * @param item 
 */
  const onUpdateCostValue = (key1: any, item: string) => {
    setExpectedValue({ ...expectedValue, [key1]: item });
    const costing: number | any = key1 === "timeSecond" ? views : timeSecond
    costing && setTotalCost(parseInt(item * (costing || 1) / 1))
  }

  /**
   * After add Campaign decrement wallet amount
   * @param updateWallet 
   */
  const updateCoinBalance = async (updateWallet: number) => {
    let coinBalance = await updateUserWallet(updateWallet)
    setLoading(false)
    dispatchCoin({ types: type.GET_CURRENT_COIN, payload: coinBalance })
    navigation.replace(ROUTES.HOME_LANDING)
    setVideoUrl("")
  }

  /**
   * Add Campaign list in campaign table  
   */
  const handleAddCampaign = async () => {
    const randomeId = Math.floor(Math.random() * 9999)
    splitUrl.push(randomeId.toString())
    let duration = await youTubeRef?.current?.getDuration()
    getYoutubeMeta(splitUrl).then((videoTitle: any) => {
      if (!(getBalance >= totalCost)) {
        setIsVisible(true)
      }
      else if (duration <= timeSecond) {
        Alert.alert("Selected duration is greater than video duration. Please Select proper video duration.")
      }
      else if (getBalance >= totalCost && timeSecond != 0 && views != 0) {
        setLoading(true)
        const updateWallet = getBalance - totalCost
        Anaylitics("add_campaign", { getBalance, updateWallet, totalCost, views })
        const userAddUrl: string = route?.params?.url
        /**
         * Create Campaign api call & decrement wallet amount
         */
        createCampaign(userAddUrl, splitUrl, timeSecond, views, totalCost, videoTitle?.title, token, videoTitle?.thumbnail_url)
          .then((res: any) => updateCoinBalance(updateWallet)).catch((err: any) => setLoading(false))
      }
    }).catch((err: any) => Alert.alert("Entered video url looks invalid. Please make sure you've entered correct video url"))
  }
  function debounce(time: number) {
    let getTimeId: any | number
    clearTimeout(getTimeId)
    return () => {
      if (getTimeId) clearTimeout(getTimeId)
      getTimeId = setTimeout(() => {
        handleAddCampaign()
      }, 400);
    }
  }

  const addCampaignDebounce = debounce(200)

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.linear_gradient }} />
      <View style={[styles.main, darkBackGround(darkModeTheme)]}>
        <Header
          showBacKIcon={true}
          title={headerTitle?.createCampaign} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          style={[styles.scrollView, darkBackGround(darkModeTheme)]}
          contentContainerStyle={[styles.contain, darkBackGround(darkModeTheme)]}>
          <YoutubePlayer ref={youTubeRef} height={203} videoId={splitUrl?.toString()} />
          <View style={styles.orderView}>
            <Text style={[F60016.textStyle, F60016.campaign, F60016.bold, colorBackGround(darkModeTheme)]}>
              {commonString.OrderSettings}
            </Text>
          </View>
          <View style={styles.requireFild} />
          <View style={styles.wrapperView}>
            <View style={styles.settingWrapper}>
              <Text style={[F40014.main, styles.alignSelef, colorBackGround(darkModeTheme)]}>
                {commonString.Expectedviews}
              </Text>
              <View style={styles.expectedView}>
                <View style={styles.dropDown}>
                  <CommonDropDown
                    data={expectedView}
                    value={views}
                    onChange={(item) => onUpdateCostValue("views", item?.value)}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.settingWrapper, styles.marginTop16]}>
              <Text style={[F40014.main, styles.alignSelef, colorBackGround(darkModeTheme)]}>
                {commonString.requiredTime}
              </Text>
              <View style={styles.expectedView}>
                <View style={styles.dropDown}>
                  <CommonDropDown
                    data={expectedTime}
                    value={timeSecond}
                    onChange={(item) => { onUpdateCostValue("timeSecond", item?.value) }}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.settingWrapper, styles.marginTop16,]}>
              <Text style={[F40014.main, styles.alignSelef, colorBackGround(darkModeTheme)]}>
                {commonString.Totalcost}
              </Text>
              <View style={[styles.expectedView, { backgroundColor: Colors.primaryRed }]}>
                <Text style={[F40014.main, F40014.whiteColor]}>
                  {totalCost}
                </Text>
              </View>
            </View>

            <ButtonComponent
              disable={loading}
              buttonTitle={commonString.AddCampaign}
              wrapperStyle={styles.buttonAddCamp}
              onPrees={() => addCampaignDebounce()}
            />

            <View style={styles.warnWrapper}>
              <Text style={[F60012.textStyle, colorBackGround(darkModeTheme)]}>
                {commonString?.Warning}
              </Text>
              <View style={styles.warningText}>
                <Text style={[styles.textAlign, F40014.main, colorBackGround(darkModeTheme)]}>
                  {commonString?.viewUpdateWarning}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {isVisible &&
        <GiftModel
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onPress={() => { navigation.navigate(ROUTES.EARNCOINS_LANDING), setIsVisible(false) }}
        />}
    </>
  );
}
