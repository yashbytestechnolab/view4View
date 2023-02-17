import { View, Text, ScrollView, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ButtonComponent, Header } from '../../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer, { getYoutubeMeta, } from 'react-native-youtube-iframe';
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { styles } from './style';
import { colorBackGround, Colors, darkBackGround, F40014, F60012, F60016 } from '../../../Theme';
import { Expected, dropdownConfigValue } from '../../../services';
import { createCampaign, updateUserWallet } from '../../../services/FireStoreServices';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { campaign } from './interface';
import GiftModel from '../../../components/GiftModel';
import { Anaylitics } from '../../../constants/analytics';
import { CamptionConformationModel } from '../../../components/CamptionConformationModel';
import { DropDownModel } from '../../../components/DropDownModel';
import * as LocalStorage from '../../../services/LocalStorage';

export const CreateCampaign = () => {

  const navigation: any = useNavigation();
  const { storeCreator: { token, loading, setLoading, coinBalance: { getBalance }, dispatchCoin, darkModeTheme, setVideoUrl } }: any = useContext(InputContextProvide)
  const route = useRoute<{
    params: any; key: string; name: string; path?: string | undefined;
  }>();
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleModel, setIsVisibleModel] = useState(false)
  const [isVisibleDurationModal, setIsVisibleDurationModel] = useState(false)
  const [totalCost, setTotalCost] = useState(300)
  const { commonString, headerTitle } = String
  const [configValue, setConfigValue] = useState<campaign>({})
  const splitUrl = route?.params?.url.split('/').slice(3)
  const youTubeRef: any = useRef()
  const [showExpectedValue, setShowExpectedValue] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [timeSecond, setTimeSecond]: any = useState(30)
  const [views, setViews]: any = useState(10)

  /**
   * configValue for dropdown set
   */
  const defaultCampaignDropdownValue = {
    expectedView: 100,
    // timeRequire: 1000

    timeRequire: 150
  }
  const confingFnc = useCallback(async () => {
    let value: any = await dropdownConfigValue();
    {
      value == undefined ? setConfigValue(defaultCampaignDropdownValue) : setConfigValue(value)

    }
  }, [])
  useEffect(() => {
    confingFnc()
  }, [dropdownConfigValue])

  // config value

  const expectedView = useMemo(() => Expected(10, configValue?.expectedView, 10), [configValue])
  const expectedTime = useMemo(() => Expected(30, configValue?.timeRequire, 30), [configValue])

  /**
 * Costing value of dropdown final cost
 * @param item 
 */

  /**
   * After add Campaign decrement wallet amount
   * @param updateWallet 
   */
  const updateCoinBalance = async (updateWallet: number) => {
    let coinBalance = await updateUserWallet(updateWallet)
    setLoading(false)
    dispatchCoin({ types: type.GET_CURRENT_COIN, payload: coinBalance })

    await LocalStorage.getValue(LocalStorageKeys?.getRating)?.then((response) => {
      console.log("resresresres",response)
      let isRatingFlag: boolean
      const checkRatingFlag = response == null || false ? isRatingFlag = true : isRatingFlag = false
      navigation.replace(ROUTES.CAMPAIGNLANDING, {
        addCampaign: checkRatingFlag,

      })

    }).catch((err) => { console.log("get rating error", err) })

    setVideoUrl("")
  }
  const analyticsLog = (key: string, updateWallet: number | any, userAddUrl: string | any, videoTitle: string | any, error?: string | any | object) => {
    Anaylitics(key, {
      befor_upload_balance: getBalance,
      after_upload_balance: updateWallet,
      cost_of_video: totalCost,
      video_url: userAddUrl,
      video_id: splitUrl[0],
      title: videoTitle?.title,
      notification_token: token,
      expected_view: views,
      duration: timeSecond,
      ...error
    })
  }

  /**
   * Add Campaign list in campaign table  
   */
  const handleAddCampaign = async () => {
    const randomeId = Math.floor(Math.random() * 9999)
    splitUrl.push(randomeId.toString())
    getYoutubeMeta(splitUrl).then((videoTitle: any) => {

      if (getBalance >= totalCost && timeSecond != 0 && views != 0) {
        setLoading(true)
        const updateWallet = getBalance - totalCost
        Anaylitics("add_campaign", { getBalance, updateWallet, totalCost, views })
        const userAddUrl: string = route?.params?.url
        /**
         * Create Campaign api call & decrement wallet amount
         */
        createCampaign(userAddUrl, splitUrl, timeSecond, views, totalCost, videoTitle?.title, token, videoTitle?.thumbnail_url)
          .then((res: any) => {
            analyticsLog("create_campaign_sucess", updateWallet, userAddUrl, videoTitle), updateCoinBalance(updateWallet)
          }).catch((err: any) => {
            analyticsLog("create_campaign_error", updateWallet, userAddUrl, videoTitle, { error: err?.message }), setLoading(false)
          })
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
      }, time);
    }
  }

  const addCampaignDebounce = debounce(300)
  const HandleAddCampaignButton = async () => {
    let duration: any = await youTubeRef?.current?.getDuration()
    duration <= timeSecond ?
      setIsVisibleDurationModel(true)
      : !(getBalance >= totalCost) ? setIsVisible(true) : setIsVisibleModel(true)
  }

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
              <TouchableOpacity style={styles.expectedView} activeOpacity={1} onPress={() => { setShowExpectedValue(true) }}>

                <Text style={[F40014?.main, { textAlign: 'center', alignSelf: 'center' }]}>{views}</Text>

              </TouchableOpacity>
            </View>

            <View style={[styles.settingWrapper, styles.marginTop16]}>
              <Text style={[F40014.main, styles.alignSelef, colorBackGround(darkModeTheme)]}>
                {commonString.requiredTime}
              </Text>
              <TouchableOpacity style={styles.expectedView} activeOpacity={1} onPress={() => { setShowDropDown(true) }}>

                <Text style={[F40014?.main, { textAlign: 'center', alignSelf: 'center' }]}>{timeSecond}</Text>

              </TouchableOpacity>
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
              onPrees={() =>
                HandleAddCampaignButton()}

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
          saveButtonTitle={'Earn Coins Now'}
          cancleButtonTitle={'No'}
          subTitle={`Sorry, You don't have enough coins to create the campaign. Would you like to earn more coins?`}
          title2={'Out of coins'}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onPress={() => { navigation.navigate(ROUTES.EARNCOINS_LANDING, { outOfCoin: true }), setIsVisible(false) }}
        />
      }
      {
        isVisibleModel &&
        <CamptionConformationModel
          isVisible={isVisibleModel}
          actionTitle={"Create Campigan"}
          setIsVisible={setIsVisibleModel}
          onPress={() => {
            addCampaignDebounce(), setIsVisibleModel(false)
          }}
          titleText={'Create Campaign'}
          descriptionText={`This campaign will deduct your ${totalCost} coins from your account. Are you sure you want to create campaign?`}
        />
      }
      {
        showDropDown && <DropDownModel
          selectedValue={timeSecond}
          setSelectValue={setTimeSecond}
          data={expectedTime}
          getOtherCoast={views}
          setTotalCost={setTotalCost}
          isVisible={showDropDown}
          setIsVisible={setShowDropDown} title={'Time Required'} subTitle={'Select minimum time other have to watch your video.'} />
      }
      {
        showExpectedValue && <DropDownModel
          modelWrapper={{ height: '35%' }}
          selectedValue={views}
          setSelectValue={setViews}
          data={expectedView}
          getOtherCoast={timeSecond}
          setTotalCost={setTotalCost}
          isVisible={showExpectedValue}

          setIsVisible={setShowExpectedValue} title={'Expected Views'} subTitle={'Select number of views that you want to have.'} />
      }
      {isVisibleDurationModal &&
        <CamptionConformationModel
          titleText={'Warning!!'}
          descriptionText={`Selected duration is greater than video duration. Please select proper video duration.`}
          isVisible={isVisibleDurationModal}
          setIsVisible={setIsVisibleDurationModel}
          actionTitle={"Close"}
          onPress={() => {
            setIsVisibleDurationModel(false)
          }
          }
        />
      }
    </>
  )
}
