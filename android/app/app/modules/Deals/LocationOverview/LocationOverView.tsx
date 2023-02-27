import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {commonStyles} from '../../../constants/CommonStyles';
import {FoodImage} from '../../../constants/DummyJson.ts/JsonFile';
import {CommonButton} from '../../../components';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Colour} from '../../../theme';
import {Fonts, Images} from '../../../assets';
import {Back} from '../../../assets/icons/back';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker} from 'react-native-maps';
import {BookMark} from '../../../assets/icons/Bookmark';
import {GreenTag} from '../../../assets/icons/GreenTag';
import {Foot} from '../../../assets/icons/Foot';
import {Location} from '../../../assets/icons/Location';
import {Down} from '../../../assets/icons/Down';
import DealDiscount from '../../../components/DealDiscount/DealDiscount';
import {AlertCircle} from '../../../assets/icons/AlertCircle';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Cross} from '../../../assets/icons/Cross';
import {ROUTES} from '../../../constants';
import {Website} from '../../../assets/icons/Website';
import {Direction} from '../../../assets/icons/Direction';
import Phone from '../../../assets/icons/Phone';
import {Doller} from '../../../assets/icons/Doller';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SaveBookMarke} from '../../../assets/icons/SaveBookMarke';
import {useQuery} from '@apollo/client';
import {get_Merchant_ListByUser} from '../../../graphQL/Queries';


const LocationOverView = () => {
  const bottomSheet: any = useRef();
  const navigation: any = useNavigation();
  const [bookMarke, setBookMarke]: any = useState(false);
  const route: any = useRoute();
  const merchantId = route?.params?.dealId;
  const {data: getMerchantListByUserData, error} = useQuery(
    get_Merchant_ListByUser,
    {
      variables: {getMerchantListByUserId: merchantId},
    },
  );
  const todayDeal: any =
    getMerchantListByUserData?.getMerchantListByUser?.deals;

  const dealDetails =
    getMerchantListByUserData?.getMerchantListByUser?.businessData;
  const coordinate: any = [23.0225, 72.5714];
  const startCoordinate: any = [23.0384, 72.5288];
  const endCoordinate: any = [23.1356, 72.5418];

  function distance(lat1: any, lon1: any, lat2: any, lon2: any) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    console.log(
      '12742 * Math.asin(Math.sqrt(a))======>',
      12742 * Math.asin(Math.sqrt(a)) * 0.621371,
    );

    const miles = 12742 * Math.asin(Math.sqrt(a)) * 0.621371;
    //const slice=miles.slice(1,3)

    //console.log('km  ', 12742 * Math.asin(Math.sqrt(a)));
    return 12742 * Math.asin(Math.sqrt(a)) * 0.621371;

    // 2 * R; R = 6371 km
  }

  const googleMapOpenUrl = ({latitude, longitude}: any) => {
    const latLng = `${latitude},${longitude}`;
    return `google.navigation:q=${latLng}`;
  };

  useEffect(() => {
    distance(72.5288, 23.0384, 72.5418, 23.1356);
  }, [getMerchantListByUserData]);
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const origin: any = {latitude: 23.0225, longitude: 72.5714};
  const destination: any = {latitude: 23.2156, longitude: 72.6369};
 
  const GOOGLE_MAPS_APIKEY: any = 'AIzaSyDwKXjdnSgtIiXHgmL3XKvsaeIOl33dElw';
  // const getDirections = async (startLoc: any, destinationLoc: any) => {
  //   try {
  //     let resp: any = await fetch(
  //       `https://maps.googleapis.com/maps/api/directions/json?origin=${23.2156}&destination=${72.6369}`,
  //     );
  //     let respJson: any = await resp.json();
  //     //let points:any = Polyline.decode(respJson.routes[0].overview_polyline.points);
  //   } catch (error) {
  //     return error;
  //   }
  // };
  var url =
    `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${destination}`;

  return (
    <>
      <ScrollView style={commonStyles.whiteBG}>
        <View style={{width: '100%'}}>
          <SwiperFlatList
            showPagination={true}
            paginationDefaultColor={Colour.white}
            paginationStyle={style.pagination}
            scrollEnabled={true}
            paginationActiveColor={Colour?.primaryGreen}
            paginationStyleItemActive={{height: 8, width: 8}}
            paginationStyleItemInactive={{height: 8, width: 8}}
            onEndReachedThreshold={3}>
            {FoodImage.map((item: any,index:number) => {
              return (
                <View  key={index}>
                  <Image source={item.image} style={style.swipeImage} />
                  <View style={style.green} />
                </View>
              );
            })}
          </SwiperFlatList>
        </View>

        <View style={style.iconWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={style.iconBg}>
            <Back />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setBookMarke(!bookMarke);
            }}
            style={[
              !bookMarke
                ? {backgroundColor: Colour.white}
                : {backgroundColor: Colour.PrimaryBlue},
              style.iconBg2,
            ]}>
            {!bookMarke ? <BookMark /> : <SaveBookMarke />}
          </TouchableOpacity>
        </View>
        {dealDetails &&
          dealDetails.map((details: any,index:number) => {
           
            return (
              <>
                <View key={index} style={style.imageWrapper}>
                  <Image source={Images.theBird} style={style.textIcon} />
                </View>
                <View style={style.textWrapper}>
                  <View style={style.titleWrapper}>
                    <View>
                      <Text style={style.theBird}>{details?.businessName}</Text>
                      <Text style={style.restaurant}>
                        {details?.category_id?.name}
                      </Text>
                    </View>
                    <View style={style.dealWrapper}>
                      <GreenTag />
                      <Text style={style.deals}>deals:</Text>
                      <Text style={style.dealText}>{details?.totalDeal}</Text>
                    </View>
                  </View>

                  <Text style={style.subTitle}>
                    {details?.businessDescription}
                  </Text>
                  <View style={style.locationWrapper}>
                    <View style={[style.blueRound]}>
                      <Foot color={Colour.primaryGreen} />
                    </View>
                    <Text style={style.step}>approx. 2000 steps</Text>
                    <View style={style.blueRound}>
                      <Location />
                    </View>
                    <Text style={[style.step, {marginRight: 28}]}>
                      2.3 miles
                    </Text>
                    <Down />
                  </View>
                  <Text style={style.todayDealText}>Todays deals</Text>
                  {todayDeal &&
                    todayDeal?.map((item: any,index:number) => {
                      return (
                        <View key={index}style={{paddingVertical: 8}}>
                          <DealDiscount
                            title={item.name}
                            subTitle={item.decription}
                            iconstring={item?.discountType}
                            onPress={() => {
                              navigation.navigate(ROUTES.DealDetail);
                            }}
                          />
                        </View>
                      );
                    })}
                </View>
                <RBSheet
                  height={Dimensions.get('screen').height / 1.3}
                  //height={76}
                  onOpen={() => {}}
                  customStyles={{
                    container: style.RBContainer,
                  }}
                  openDuration={250}
                  ref={bottomSheet}
                  onClose={() => {}}>
                  <ScrollView style={style.bottomSheetWrapper}>
                    <>
                      <View style={{flex: 1}}>
                        <MapView
                          style={{
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height - 691,
                          }}
                          initialRegion={{
                            latitude: 23.0300953,
                            longitude: 72.5304429,
                            latitudeDelta: 0.0622,
                            longitudeDelta: 0.0121,
                          }}>
                          <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
                            strokeWidth={4}
                            strokeColor="#111111"
                          />
                          <Marker coordinate={origin} />
                          <Marker coordinate={destination} />
                        </MapView>
                      </View>
                    </>
                    {/* <DistanceMap startCoordinate={startCoordinate} endCoordinate={endCoordinate}  iconName={details?.category_id?.name}/> */}

                    <View
                      style={{
                        backgroundColor: Colour.PrimaryBlue,
                        flex: 1,
                        width: '100%',
                      }}>
                      <View style={style.IconWrapper}>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            Linking.openURL(details?.website);
                          }}>
                          <View style={style.greenRound}>
                            <Website />
                          </View>
                          <Text style={style.iconText}>Website</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            Linking.canOpenURL(url)
                              .then(supported => {
                                if (!supported) {
                                  console.log("Can't handle url: " + url);
                                } else {
                                  return Linking.openURL(url);
                                }
                              })
                              .catch(err =>
                                console.error('An error occurred', err),
                              );
                          }}>
                          <View
                            style={[style.greenRound, {marginHorizontal: 25}]}>
                            <Direction />
                          </View>
                          <Text style={style.iconText}>Direction</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            Linking.openURL(`tel:${details.phoneno}`);
                          }}>
                          <View style={style.greenRound}>
                            <Phone />
                          </View>
                          <Text style={style.iconText}>Phone</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{paddingHorizontal: 24}}>
                        <Text style={style.address}>Address</Text>
                        <Text style={style.addressSubText}>
                          {details?.address}
                        </Text>
                        <Text style={[style.address, {paddingTop: 24}]}>
                          Opening Hours
                        </Text>
                        {details?.timings &&
                          details?.timings.map((item: any, index: number) => {
                            let closingTime = item?.closingTime;
                            let openingTime = item?.openingTime;
                            let convert1 = openingTime.slice(0, -3);
                            let convert2 = closingTime.slice(0, -3);
                            let am = convert1 >= 12 ? 'pm' : 'am';
                            let pm = convert2 >= 12 ? 'pm' : 'am';
                            return (
                              <View key={index} style={style.dayWrapper}>
                                <View style={{flex: 1}}>
                                  <Text style={style.day}>{days[index]}</Text>
                                </View>

                                <View style={{flex: 2}}>
                                  {item.status === false ? (
                                    <Text style={[style.day]}> Closed</Text>
                                  ) : (
                                    <Text style={[style.day]}>
                                      {' '}
                                      {convert1 + am} - {convert2 + pm}
                                    </Text>
                                  )}
                                </View>
                              </View>
                            );
                          })}
                        <View style={style.bottomRow}>
                          <View style={style.dollerWrapper}>
                            <Doller />
                          </View>

                          <View style={style.centzTextWrapper}>
                            <Text style={style.centzText}>est. Centz:</Text>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontFamily: Fonts.MontserratBold,
                                color: Colour.primaryGreen,
                                fontWeight: '700',
                                fontSize: 12,
                                paddingRight: 12,
                              }}>
                              $2.37
                            </Text>
                          </View>
                          <CommonButton
                            buttonText={'Start Navigation'}
                            onPress={() => {
                              Linking.openURL(
                                googleMapOpenUrl({
                                  latitude: 20.905886,
                                  longitude: 70.387505,
                                }),
                              );
                            }}
                            buttonStyle={{marginLeft: 5, flex: 1}}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            bottomSheet.current.close();
                          }}
                          style={style.closeIcon}>
                          <Cross color={Colour.white} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </RBSheet>
              </>
            );
          })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          bottomSheet.current.open();
        }}
        style={style.blueWrapper}>
        <AlertCircle color={Colour.white} height={17} width={17} />
      </TouchableOpacity>
    </>
  );
};
export default LocationOverView;

const style = StyleSheet.create({
  swipeImage: {
    width: Dimensions?.get('window')?.width - 0,
    height: 195,
    //borderRadius: 18,
  },
  pageButtonStyle: {height: 36, width: 115},
  bottomWrapper: {
    flexDirection: 'column',
  },
  pagination: {
    alignSelf: 'center',
    //flex:1
    //position:'relative',
    //paddingBottom:-90
    //flex: 1,
    //position:'absolute',
    //marginBottom:180
    //paddingBottom: Dimensions?.get('window')?.width === 360 ? 25 : 35,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    position: 'absolute',
    marginTop: 16,
  },
  iconBg: {
    backgroundColor: Colour.white,
    height: 36,
    width: 36,
    borderRadius: 23,
    borderColor: Colour.gray200,
    alignItems: 'center',

    justifyContent: 'center',
  },
  iconBg2: {
    height: 36,
    width: 36,
    borderRadius: 23,
    borderColor: Colour.gray200,
    alignItems: 'center',
    marginLeft: Dimensions.get('screen').width - 100,
    justifyContent: 'center',
  },
  container: {
    height: '50%',
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '80%',
  },
  imageWrapper: {
    backgroundColor: Colour.white,
    height: 90,
    width: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colour.gray200,
    marginTop: -50,
    marginLeft: 17,
  },
  blueRound: {
    marginRight: 8,
    height: 24,
    width: 24,
    backgroundColor: Colour.PrimaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  green: {
    backgroundColor: Colour.primaryGreen,
    height: 10,
    width: '100%',
  },
  textIcon: {
    height: 40,
    width: 58,
  },
  todayDealText: {
    color: Colour.PrimaryBlue,
    paddingTop: 29,
    paddingBottom: 25,
    fontWeight: '700',
    fontSize: 18,
    fontFamily: Fonts.QuicksandBold,
  },
  locationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  textWrapper: {
    paddingHorizontal: 17,
    flex: 1,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignContent: 'space-between',
  },
  dealWrapper: {
    height: 35,
    backgroundColor: Colour.PrimaryBlue,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 11,
  },
  blueWrapper: {
    backgroundColor: Colour.blueBarry,
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  theBird: {
    fontFamily: Fonts.QuicksandBold,
    fontWeight: '700',
    fontSize: 24,
    color: Colour.PrimaryBlue,
  },
  restaurant: {
    fontFamily: Fonts.NotoSansRegular,
    fontWeight: '400',
    fontSize: 12,
    color: Colour.gray500,
  },
  deals: {
    color: Colour.white,
    fontWeight: '400',
    fontSize: 16,
    fontFamily: Fonts.DMSansRegular,
  },
  dealText: {
    color: Colour.white,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: Fonts.DMSansBold,
    paddingLeft: 6,
    paddingRight: 4,
  },
  subTitle: {
    color: Colour.gray500,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.NotoSansMedium,
  },
  step: {
    paddingRight: 24,
    fontFamily: Fonts.NotoSansMedium,
    fontSize: 12,
    color: Colour.gray500,
    fontWeight: '500',
  },
  RBContainer: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  bottomSheetTitle: {
    marginLeft: 22,
    fontFamily: Fonts.QuicksandSemiBold,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colour.PrimaryBlue,
  },
  cateWrapper: {
    backgroundColor: Colour.white,
    borderRadius: 18,
    height: 112,
    width: 108,
    flex: 1,
  },
  bottomSheetWrapper: {
    flex: 1,
  },
  iconText: {
    color: Colour.white,
    paddingTop: 4,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.NotoSansMedium,
  },
  greenRound: {
    backgroundColor: Colour.primaryGreen,
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
  },
  address: {
    color: Colour.white,
    fontWeight: '700',
    fontSize: 18,
    fontFamily: Fonts.QuicksandBold,
    paddingTop: 18,
  },
  addressSubText: {
    color: Colour.gray300,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.NotoSansMedium,
    paddingTop: 8,
  },
  dayWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  day: {
    color: Colour.gray300,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.NotoSansMedium,
  },
  closeIcon: {
    height: 56,
    width: 56,
    marginBottom: 12,
    backgroundColor: Colour.blueBarry,
    borderRadius: 28,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dollerWrapper: {
    height: 32,
    width: 32,
    backgroundColor: Colour.primaryGreen,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centzText: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    fontSize: 12,
    color: Colour.white,
  },
  centzTextWrapper: {
    marginLeft: 8,
    marginRight: 32,
    marginVertical: 31,
  },
});
