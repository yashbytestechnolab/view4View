import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
// import MapboxGL from '@react-native-mapbox-gl/maps';
import {Colour} from '../../theme';
import {Search} from '../../assets/icons/Search';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {Back} from '../../assets/icons/back';
import ReturnIcon, {category, } from '../../constants/DummyJson.ts/JsonFile';
import {useQuery} from '@apollo/client';
import {Images} from '../../assets';
import {CupanCard} from '../../components/CupanCard';
import {ROUTES} from '../../constants';
import {BusinessesCard} from '../../components/BusinessesCard/BusinessesCard';
import {Get_Deal_by_user, get_Merchant_ListByUser} from '../../graphQL/Queries';
import {styles} from './style';
import SelectCategory from '../../components/SelectCategory/SelectCategory';
import {Loder} from '../../components/Loder';
// MapboxGL.setAccessToken(
//   'sk.eyJ1IjoiY2VudGF2aXplciIsImEiOiJjbDZlb3ZjbTEwMWszM2twbWV0dTNuaTRvIn0.khHqf8vfS27qcoDFEm0j0w',
// );


const Deals = () => {
  const [searchResult, setSearchResult]: any = useState();
  const [selectDeal, setSelectDeal]: any = useState(false);
  const [loder, setLoder] = useState(false);
  const [selectMerchant, setSelectMerchant]: any = useState();
  const [totalDeal, setTotalDeal]: any = useState();
  const [currentLat, setCurrentLat]: any = useState();
  const [currentLong, setCurrentLong]: any = useState();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [selectCategoryIcon, setSelectCategoryIcon]: any = useState();
  const [selectItem, setSelectItem]: any = useState([]);
  const [selectFilterDeal, setSelectFilterDeal]: any = useState([]);
  const [title, setTitle] = useState();
  const [dealImage, setDealImage] = useState();
  const [address, setAddress] = useState();
  const filterRef: any = useRef();
  const navigation: any = useNavigation();
  const [selectDetails, setSelectDetails]: any = useState([]);
  const [isCategoryFilterApplied, setIsCategoryFilterApplied] = useState(false);
  const [filterDeal, setFilterDeal]: any = useState([]);
  const [isDealyFilterApplied, setIsDealFilterApplied]: any = useState(false);
  //.........................getMerchantListByUserData api integration...............................

  const {data: getMerchantListByUserData, error}: any = useQuery(
    get_Merchant_ListByUser,
    {errorPolicy: 'all'},
  );

  let DealObject =
    getMerchantListByUserData?.getMerchantListByUser.businessData;

  //.........................getDealList api-integration .......................................................
  const {data: getDealList, error: Dealerror} = useQuery(Get_Deal_by_user);
  let getDeal = getDealList?.getDealsByUser?.data;

  //.............user live location..............................
  const onUserLocationUpdate = async (location: any) => {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    setCoordinates([lat, long]);
  };
  //....................get find deal list....................
  const findDealList = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setSelectItem([])
          setIsCategoryFilterApplied(false)
          setSelectDeal(false)
          navigation.navigate(ROUTES.LocationOverView, {
            dealId: selectMerchant,
          });
        }}
        style={{
          paddingHorizontal: 16,
          bottom: 50,
          position: 'absolute',
          flex: 1,
          width: '100%',
        }}>
        <BusinessesCard
          image={Images.food}
          title={title}
          subTitle={address}
          dealText={totalDeal}
          selectCategoryIcon={selectCategoryIcon}
        />
      </TouchableOpacity>
    );
  };

  //..............................first-time reander map..................................
  const renderMap = () => {
    let updatedDealsObject: any = [];
    let p = 0.017453292519943295; // Math.PI / 180
    let c = Math.cos;currentLat
    if (isCategoryFilterApplied) {
      selectDetails &&
        selectDetails.map((data: any, index: number) => {
          if (
            data?.latitude > -90 &&
            data?.latitude < 90 &&
            data?.longitude > -180 &&
            data?.longitude < 180
          ) {
            let lat1: any = data?.latitude || 0;
            let long1: any = data?.longitude || 0;
            let a =
              0.5 -
              c((lat1 - currentLat) * p) / 2 +
              (c(currentLat * p) *
                c(lat1 * p) *
                (1 - c((long1 - currentLong) * p))) /
                2;
            const miles = 12742 * Math.asin(Math.sqrt(a)) * 0.621371;
            if (miles > 3.10686) {
              if (lat1 && long1) {
                updatedDealsObject.push(data);
              }
            }
          }
        });
    } else {
      DealObject &&
        DealObject.map((data: any, index: number) => {
          if (
            data?.latitude > -90 &&
            data?.latitude < 90 &&
            data?.longitude > -180 &&
            data?.longitude < 180
          ) {
            let lat1: any = data?.latitude || 0;
            let long1: any = data?.longitude || 0;
            let a =
              0.5 -
              c((lat1 - currentLat) * p) / 2 +
              (c(currentLat * p) *
                c(lat1 * p) *
                (1 - c((long1 - currentLong) * p))) /
                2;
            const miles = 12742 * Math.asin(Math.sqrt(a)) * 0.621371;
            if (miles > 3.10686) {
              if (lat1 && long1) {
                updatedDealsObject.push(data);
              }
            }
          }
        });
    }
    return (
      <>
        {/* <MapboxGL.MapView
          style={styles.map}
          zoomEnabled={true}
          styleURL={'mapbox://styles/mapbox/streets-v11'}>
          <MapboxGL.Camera
            defaultSettings={{
              centerCoordinate: coordinates,
              zoomLevel: 14,
            }}
            zoomLevel={4}
            followUserLocation={true}
            centerCoordinate={coordinates}
          />
          <MapboxGL.UserLocation
            visible={true}
            //onUpdate={() => onUserLocationUpdate(coordinates)}
          />
          {updatedDealsObject &&
            updatedDealsObject.map((item: any,index: number) => {
              if (item?.latitude && item?.longitude) {
                return (
                  <MapboxGL.MarkerView
                  key={index}
                    id={'marker'}
                    coordinate={[
                      parseFloat(item?.longitude),
                      parseFloat(item?.latitude),
                    ]}>
                    <TouchableOpacity
                      style={styles.markerContainer}
                      onPress={() => {
                        setAddress(item?.address);
                        setTitle(item?.businessName);
                        setSelectCategoryIcon(item?.category_id?.name);
                        setTotalDeal(item?.totalDeal);
                        setSelectMerchant(item?.merchantID);
                        setDealImage(item?.logoUrl);
                        setSelectDeal(
                          item.merchantID != selectDeal
                            ? item.merchantID
                            : null,
                        );
                      }}>
                      {item?.merchantID != selectDeal ? (
                        <SelectCategory
                          selectIcon={false}
                          Icon={ReturnIcon(item?.category_id?.name)}
                          IconName={item?.category_id?.name}
                        />
                      ) : (
                        <SelectCategory
                          selectIcon={true}
                          Icon={ReturnIcon(item?.category_id?.name)}
                          IconName={item?.category_id?.name}
                        />
                      )}
                    </TouchableOpacity>
                  </MapboxGL.MarkerView>
                );
              }
            })}
        </MapboxGL.MapView> */}
      </>
    );
  };
 const reanderDeals = () => {
  console.log("no update")
    let updatedDeals: any = [];
    
    {
      isDealyFilterApplied ===true?filterDeal &&
      filterDeal.map((item: any) => {
        console.log("filterData")
          updatedDeals.push(item);
         
        }):
        getDeal &&
        getDeal?.map((item: any) => {
          console.log("No   filterData")
          updatedDeals?.push(item);
          });
       }
       console.log("update")
   return(
    <>
     <ScrollView style={styles.scrollDeal}>
                 
                 {
                    updatedDeals &&
                    updatedDeals?.map((item: any,index:number) => {
                      return (
                        <View key={index} style={styles.dealListWrapper}>
                          {/* <CupanCard
                            onPress={() => {navigation.navigate(ROUTES.LocationOverView)}}
                            IconString={item?.discountType}
                            showLabel={true}
                            image={Images.pizz3}
                            locationText={'203'}
                            footText={'200'}
                            labelText={item?.merchant_id?.business_data?.businessName}
                            title={item.name}
                            subTitle={item.decription}
                            selectCategoryIcon={
                              item?.merchant_id?.business_data?.category_id?.name
                            }
                            startNavigationPress={() => {
                              navigation.navigate(ROUTES.LocationOverView);
                            }}
                          /> */}
                        </View>
                      );
                    })
                  
                 }
                 
                </ScrollView>
    </>
   )
    
  };
  const selectedDeal = (selectDaelId: string) => {
    let selectFilter: any = selectFilterDeal;

    if (!selectFilter.includes(selectDaelId)) {
      selectFilter.push(selectDaelId);
    } else {
      const DealIndex = selectFilter.indexOf(selectDaelId);
      selectFilter.splice(DealIndex, 1);
    }
    let selectedCategories: any = [];
    if (selectFilter.length != 0) {
      getDeal &&
        getDeal.map((item: any) => {
          if (
            selectFilter.includes(
              item?.merchant_id?.business_data?.category_id?.name,
            )
          ) {
            selectedCategories.push(item);
          }
        });
      setSelectFilterDeal(selectFilter.slice());
      setIsDealFilterApplied(true);
      setFilterDeal(selectedCategories);
    } else {
      setIsDealFilterApplied(false);
    }

  };

  //..............................select categories filter................................
  const selectedCategoryFilter = (selectedCategoryName: string) => {
    let allselectedCategoryName: any = selectItem;
    if (!allselectedCategoryName.includes(selectedCategoryName)) {
      allselectedCategoryName.push(selectedCategoryName);
    } else {
      const index = allselectedCategoryName.indexOf(selectedCategoryName);
      allselectedCategoryName.splice(index, 1);
    }
    let allFilteredCategory: any = [];
    if (allselectedCategoryName.length != 0) {
      DealObject.map((merchand: any) => {
        if (allselectedCategoryName.includes(merchand?.category_id?.name)) {
          allFilteredCategory.push(merchand);
         // setSelectMerchant(merchand?.merchantID);
        }
      });
      setSelectDeal(false);
      //setSelectMerchant(merchand?.merchantID);
      setSelectItem(allselectedCategoryName.slice());
      setIsCategoryFilterApplied(true);
      setSelectDetails(allFilteredCategory);
    } else {
      setIsCategoryFilterApplied(false);
    }
  };

  //............................................user search categories wise dels .....................................................
  const searchDeals = () => {
    return (
      <ScrollView
        scrollEnabled={true}
        horizontal={true}
        style={{marginLeft: 16}}
        showsHorizontalScrollIndicator={false}>
        {category.map((item: any,index: number) => {
          return (
            <TouchableOpacity
            key={index}
              onPress={() => selectedCategoryFilter(item?.name)}
              style={[
                styles.circle,
                selectItem?.includes(item?.name)
                  ? {backgroundColor: Colour.PrimaryBlue}
                  : {backgroundColor: Colour.white},
              ]}>
              <item.icon
                color={
                  selectItem.includes(item?.name) ? Colour.primaryGreen : ''
                }
              />
              <Text
                style={[
                  styles.glassText,
                  selectItem.includes(item?.name)
                    ? {color: Colour.primaryGreen}
                    : {color: Colour.PrimaryBlue},
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  //..................get current-location for 5-miles display categories
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        const currentLongitude: any = JSON.stringify(position.coords.longitude);

        const currentLatitude: any = JSON.stringify(position.coords.latitude);
        setCurrentLong(currentLongitude);
        setCurrentLat(currentLatitude);
      },
      (error:any)=> {
        console.log('position>>>', error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  //.........................render map & api integration.......................................
  useEffect(() => {
    getOneTimeLocation();
     renderMap();
  }, []);

  //...............................design..............................................
  return (
    <>
      {getMerchantListByUserData?.getMerchantListByUser?.status === false ? (
        <Loder spinnerColor={Colour.primaryGreen} />
      ) : (
        <View style={styles.page}>
          <StatusBar
            backgroundColor={Colour.transparent}
            barStyle={'dark-content'}
          />
          <View style={styles.container}>
            {renderMap()}
            <View style={styles.searchWrapper}>
              <View style={styles.card}>
                <Back />
                <TouchableOpacity
                  style={styles.textInputWrapper}
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate(ROUTES.SearchDeal);
                  }}>
                  <Search />
                  <Text style={{marginLeft: 10}}>search deal</Text>
                </TouchableOpacity>
              </View>
              {searchDeals()}
            </View>
            {selectItem.length >= 0 &&
            isCategoryFilterApplied === true &&
            selectDeal == null ? (
              <></>
            ) : (
              selectDeal && findDealList()
            )}
            <TouchableOpacity
              onPress={() => {
                filterRef?.current?.open();
              }}
              style={styles.dealText}>
              <Text> {DealObject?.length} Deals</Text>
            </TouchableOpacity>
            <RBSheet
              height={Dimensions.get('screen').height / 1}
              openDuration={250}
              ref={filterRef}
              onClose={() => {}}>
              <View style={styles.bottomSheetWrapper}>
                <View style={[styles.searchWrapper2]}>
                  <View style={[styles.card, {marginTop: 12}]}>
                    <TouchableOpacity
                      onPress={() => {
                        filterRef.current.close();
                      }}>
                      <Back />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        navigation.navigate(ROUTES.SearchDeal);
                      }}
                      style={styles.textInputWrapper}>
                      <Search />
                      <TextInput
                        style={{marginLeft: 10}}
                        placeholder="search deal"
                        placeholderTextColor={Colour.gray500}
                        value={searchResult}
                        onChangeText={(result: any) => {
                          setSearchResult(result);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    scrollEnabled={true}
                    horizontal={true}
                    style={{marginLeft: 16}}
                    showsHorizontalScrollIndicator={false}>
                    {category &&
                      category.map((item: any,index: number) => {
                        return (
                          <TouchableOpacity
                          key={index}
                            onPress={() => selectedDeal(item?.name)}
                            style={[
                              styles.circle,
                              selectFilterDeal.includes(item?.name)
                                ? {backgroundColor: Colour.PrimaryBlue}
                                : {backgroundColor: Colour.white},
                            ]}>
                            <item.icon
                              color={
                                selectFilterDeal.includes(item?.name)
                                  ? Colour.primaryGreen
                                  : ''
                              }
                            />
                            <Text
                              style={[
                                styles.glassText,
                                selectFilterDeal.includes(item?.name)
                                  ? {color: Colour.primaryGreen}
                                  : {color: Colour.PrimaryBlue},
                              ]}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </ScrollView>
                </View>
               {reanderDeals()}
              </View>
            </RBSheet>
          </View>
        </View>
      )}
    </>
  );
};

export default Deals;
