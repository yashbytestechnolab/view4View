import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colour } from '../../../theme';
import { commonStyles } from '../../../constants/CommonStyles';
import { BackButton } from '../../../components/BackButton/BackButton';
import { Search } from '../../../assets/icons/Search';
import { Heading } from '../../../components/Handing/Heading';
import { Fonts, Images } from '../../../assets';
import { allCategories, GetIcon, serchDeal } from '../../../constants/DummyJson.ts/JsonFile';
import { OrderInfoModel } from '../../../components/OrderInfoModel';
import SuggestBusinessModel from '../../../components/SuggestBusinessModel/SuggestBusinessModel';
import { Get_Deal_by_user, GET_FEATURE_DEAL } from '../../../graphQL/Queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { CupanCard } from '../../../components/CupanCard';
import { ROUTES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { config } from '../../../config';
import { Coffee } from '../../../assets/icons/Coffee';
import { Glass } from '../../../assets/icons/Glass';
import { Gym } from '../../../assets/icons/Gym';
import { Union } from '../../../assets/icons/Union';
import { Art } from '../../../assets/icons/Art';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchDeal() {
  const [isVisibleModal, setModalVisible]: any = useState(false);
  const inputRef: any = useRef()
  const handleToggle = (data: any) => {
    setModalVisible(!isVisibleModal);
  };
  // const { data: getDealByUser, error }: any = useQuery(
  //   Get_Deal_by_user,
  //   { errorPolicy: 'all' },
  // );
  useEffect(() => {
    // getDealByUser
    inputRef.current.focus();
  }, [])
  const [serchEngine, _SerchEngine]: any = useState("")
  let updateData = (value: any) => {
    console.log("onCompl;e");
  }
  const [
    getSerchDeal,
    { data: getFeatureBydealData,
      error: getFeatureDealError,
      loading: getFeatureByLoading, }]: any = useLazyQuery(
        GET_FEATURE_DEAL, {
        errorPolicy: 'all', fetchPolicy: 'cache-and-network',
        onCompleted: updateData
      },
      );

  const [serchHistory, setSerchHistory] = useState([])

  useEffect(() => {
    AsyncStorage.getItem("history").then((res: any) => {
      return setSerchHistory(JSON.parse(res));
    }).catch(() => { })
  }, [])
  console.log("serchHistory", serchHistory);


  const [isLoading, _SetIsLoading] = useState(false)

  const serchDealFnc = (value: any) => {
    setTimeout(() => {
      getSerchDeal({
        variables: {
          search: value
        }
      }).then((res: any) => {
        _SetIsLoading(false)
      }).catch((err: any) => {
        _SetIsLoading(false)
        console.log("err");
      }).finally(() => _SetIsLoading(false))
    }, 3000);
  }
  const imageStorageUrl = config.preProdImgUrl;
  const businessbanner = 'businessbanner/'

  const navigation = useNavigation()

  const category = [
    { icon: Coffee, name: 'coffee', },
    { icon: Glass, name: 'bars', },
    { icon: Gym, name: 'fitness', },
    { icon: Union, name: 'restaurants', },
    { icon: Art, name: 'art & entertainment', },
  ];
  const saveHistory = () => {
    if (serchHistory?.length > 7) {
      let putValue = serchHistory
      putValue?.unshift(serchEngine)
      putValue?.pop()
      setSerchHistory(putValue)
      console.log("putValUnd", putValue);
      AsyncStorage.setItem("history", JSON.stringify(putValue))
    }
    else if (serchHistory !== null) {
      let putValue: any = [...serchHistory, serchEngine]
      setSerchHistory(putValue)
      AsyncStorage.setItem("history", JSON.stringify(putValue))
    }
    else {
      let putValue: any = [serchEngine]
      setSerchHistory(putValue)
      AsyncStorage.setItem("history", JSON.stringify(putValue))
    }
  }
  const clearHistory = async () => {
    console.log("OnPress");
    setSerchHistory([])
    AsyncStorage.setItem("history", "")
  }
  let serchTextCondition = serchEngine?.length

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={commonStyles.whiteBG}>
        <View style={style.iconWrapper}>
          <BackButton color={Colour.PrimaryBlue} />
          <TouchableOpacity activeOpacity={1} style={style.searchbarWrapper}>
            <Search color={Colour.white} />
            <TextInput
              ref={inputRef}
              style={{ marginLeft: 10, color: "white" }}
              placeholder="Search deal"
              placeholderTextColor={Colour.white}
              value={serchEngine}
              onChangeText={(value: any) => {
                _SerchEngine(value);
                _SetIsLoading(true);
                if (value?.length > 2) {
                  serchDealFnc(value)
                  updateData(value)
                }
                if (value?.length > 0) {
                  setTimeout(() => {
                    _SetIsLoading(false)
                  }, 4000);
                }
                else {
                  _SetIsLoading(false)
                }
              }}
              onSubmitEditing={() => {
                if (serchEngine !== "") {
                  saveHistory()
                }
              }}
            />
          </TouchableOpacity>
        </View>
        {
          serchTextCondition < 3 && !isLoading && serchHistory?.length > 0 &&
          <>
            < View style={[style.Wrapper,]}>
              <Heading rightText={'Clear'} leftText={'Recent searches'} leftStyle={style.searchText} onPress={clearHistory} />
              <ScrollView
                style={{}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}>
                {
                  serchHistory?.map((res: any) => {
                    return (
                      <View style={style.serchTextWrapper}>
                        <Search />
                        <Text style={style.searchTextes}>{res}</Text>
                      </View>
                    )
                  })}
              </ScrollView>
            </View>

          </>
        }
        {/* {
          serchTextCondition < 3 && !isLoading &&
          <View style={{ paddingHorizontal: 16, paddingBottom: 10, marginTop: -10 }}>
            <Text style={style.category}>Categories</Text>
            <FlatList
              data={serchDeal}
              horizontal={false}
              renderItem={({ item, key }: any) => (
                <View key={key} style={style.wrapper}>
                  <View style={style.cateWrapper}>
                    {item.image.length === 0 ? <Image source={Images.default} style={[style.cateImage]} /> :
                      <Image
                        source={item.image}
                        resizeMode={'center'}
                        style={style.cateImage}
                        defaultSource={Images.default}
                      />}
                    <Text style={style.cateTitle}>{item?.categoryName}</Text>
                  </View>
                </View>
              )}
              numColumns={3}
              showsVerticalScrollIndicator={false}
            />
          </View>
        } */}
        {
          isLoading ?
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <ActivityIndicator color={Colour.PrimaryBlue800} />
            </View>
            :
            <>
              {
                serchTextCondition > 2 && !isLoading &&
                getFeatureBydealData?.getDealsByUser?.data?.length > 0 &&
                <View style={{ height: 50 }}>
                  <ScrollView
                    scrollEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {category.map((item: any) => {
                      return (
                        <View style={style.circle}>
                          <item.icon />
                          <Text style={style.glassText}>{item.name}</Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              }
              {
                serchTextCondition > 2 && !isLoading && getFeatureBydealData?.getDealsByUser?.data?.length > 0 &&
                <Text style={{ color: "#98A2B3", marginHorizontal: 22, fontWeight: "500", fontSize: 14, marginTop: 12 }}>
                  {`${serchTextCondition > 2 ? getFeatureBydealData?.getDealsByUser?.data?.length : "No"} Deal`}
                </Text>
              }
              {
                serchTextCondition > 2 && getFeatureBydealData?.getDealsByUser?.data?.length > 0 &&
                <FlatList
                  style={{ marginTop: 12, }}
                  data={
                    serchTextCondition > 2 ?
                      getFeatureBydealData?.getDealsByUser?.data : []}
                  renderItem={(item: any) => {
                    return (
                      <CupanCard
                        isFaviourate={true}
                        isDisable={true}
                        showLabel={false}
                        isPadding={true}
                        image={`${imageStorageUrl + businessbanner}${item?.item?.merchant_id?.business_data?.bannerImages}`}
                        // locationText={"renderDistance"}
                        footText={'2000'}
                        labelText={item?.item?.merchant_id?.business_data?.category_id?.name}
                        title={item?.item?.merchant_id?.business_data?.businessName}
                        subTitle={item?.item?.merchant_id?.business_data?.businessDescription}
                        LabelIcon={GetIcon(item?.item?.merchant_id?.business_data?.category_id?.name)}
                        typeDiscount={item?.item?.discountType}
                        startNavigationPress={() => { navigation.navigate(ROUTES.LocationOverView); }} locationText={undefined} />
                    )
                  }}

                />
              }

              {
                getFeatureBydealData?.getDealsByUser?.data?.length <= 0 && !isLoading &&
                <View style={{ alignItems: "center", flex: 1, justifyContent:'center' }}>
                  <Text style={{ fontSize: 16 }}>
                    No search Results Found
                  </Text>
                </View>
              }
            </>
        }

        {isVisibleModal && (
          <SuggestBusinessModel
            isVisibleModal={isVisibleModal}
            toggleModal={handleToggle}

            handleUnmtachPress={() => { }}
            loder={false} subtitle={''} iconBGColor={''} Svg={undefined} />
        )}
      </View>
    </SafeAreaView >
  );
}
const style = StyleSheet.create({
  iconWrapper: {
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#101828',
    elevation: 5,
    paddingTop: 10,
    paddingBottom: 12,
  },
  blurLine: {
    backgroundColor: '#fff',
    shadowColor: '#101828',
    elevation: 5,
    paddingTop: 10,
  },
  searchbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 19,
    backgroundColor: Colour.PrimaryBlue,
    marginRight: 15,
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    borderColor: Colour.blueBarry,
    borderWidth: 1,
    paddingVertical: 14
  },
  Wrapper: {
    height: "25%",
    // flex: 1,
    paddingHorizontal: 16,
    // paddingTop: 26
  },
  titleWrapper: {
    flexDirection: 'row'
  },
  searchText: {
    color: Colour.PrimaryBlue
  },
  serchTextWrapper:
    { flexDirection: 'row', alignItems: 'center', borderBottomColor: Colour.gray300, borderBottomWidth: 1, paddingVertical: 16 },
  searchTextes: {

    //backgroundColor: 'red',
    fontSize: 16,
    paddingLeft: 10,
    color: Colour.gray900,
    paddingRight: 18,
    fontFamily: Fonts.NotoSansLight,
    lineHeight: 24,
    fontWeight: '300',
    marginLeft: 12
  },
  imageWrapper: {
    //paddingBottom:39
  },
  wrapper: {
    flex: 1 / 3,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginLeft: 8,
    elevation: 3,
    borderRadius: 16,
    marginBottom: 16

  },
  cateImage: {

    height: 64,
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  cateTitle: {
    textAlign: 'center',
    fontFamily: Fonts.NotoSansMedium,
    fontSize: 12,
    lineHeight: 14,
    padding: 8,
    color: Colour.gray400
  },
  bottomSheetWrapper: {
    paddingRight: 16,
    paddingLeft: 8,
    //paddingHorizontal: 18,
    marginTop: 24,
    flex: 1,
    backgroundColor: Colour.white,

  },
  cateWrapper: {
    backgroundColor: Colour.white,
    borderRadius: 18,
    height: 112,
    width: 108,
    flex: 1
  },
  category: {
    color: Colour.PrimaryBlue,
    marginTop: 39,
    fontWeight: '700',
    fontSize: 18,
    fontFamily: Fonts.QuicksandBold
  },
  bottomText: {
    color: Colour.blueBarry,
    fontWeight: '500',
    fontSize: 14,
    fontFamily: Fonts.InterRegular,
    paddingBottom: 71,
    paddingTop: 27,
    alignSelf: 'center'
  },
  circle: {
    height: 28,
    borderRadius: 50,
    backgroundColor: Colour.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,

    marginTop: 12,
    //paddingVertical: 4,
    paddingLeft: 6,
    paddingRight: 8,
    shadowOpacity: 0.23,
    // flex: 1,
    shadowColor: 'rgba(16, 24, 40, 1)',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
  },
  glassText: {
    fontSize: 14,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    color: Colour.PrimaryBlue,
    paddingLeft: 5,
    alignItems: 'center',
  },
});
