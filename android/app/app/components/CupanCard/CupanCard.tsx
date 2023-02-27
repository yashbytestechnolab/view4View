import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { Colour } from '../../theme';
import { Fonts, Images } from '../../assets';
import { Foot } from '../../assets/icons/Foot';
import { Location } from '../../assets/icons/Location';
import { Down } from '../../assets/icons/Down';

import { BookMark } from '../../assets/icons/Bookmark';
import { SaveBookMarke } from '../../assets/icons/SaveBookMarke';
import { Up } from '../../assets/icons/Up';
import { CommonButton } from '../CommonButton';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
// import MapboxGL from '@react-native-mapbox-gl/maps';
import { Location2 } from '../../assets/icons/Location2';
import Percentage from '../../assets/icons/Percentage';
import { Doller } from '../../assets/icons/Doller';
import Favorite from '../../assets/icons/Favorite';

const windowWidth = Dimensions.get('window').width;

interface CustomCard {
  wraperStyle?: object;
  labelWrapper?: object;
  textWrapperStyle?: any;
  lineColor?: any;
  Icon?: Function;
  LabelIcon?: any;
  labelText?: any;
  title?: any;
  subTitle?: any;
  footText?: any;
  locationText: any;
  image?: any;
  roundColor?: any;
  typeDiscount?: any;
  showLabel: boolean;
  startNavigationPress?: any;
  isDisable?: boolean,
  isPadding?: boolean,
  isFaviourate?: boolean,
}
export const CupanCard = (props: CustomCard) => {
  const {
    wraperStyle,
    labelWrapper,
    textWrapperStyle,
    lineColor,
    Icon,
    isPadding,
    LabelIcon,
    labelText,
    title,
    subTitle,
    footText,
    locationText,
    image,
    roundColor,
    isDisable,
    typeDiscount,
    showLabel,
    startNavigationPress,
    isFaviourate
  } = props;
  const [showMap, setShowMap]: any = useState(false);
  const [showBg, setShowBg]: any = useState(false);
  // const navigation: any = useNavigation();
  // const coordinate: any = [23.0225, 72.5714]
  // const startCoordinate: any = [23.0225, 72.5714]
  // const endCoordinate: any = [23.2156, 72.6369]
  return (
    <View>
      <View style={[style.cardWrapper, wraperStyle, isPadding && { marginVertical: 12 }]}>
        <View style={[style.flex, labelWrapper]}>
          {image?.length === 0 ? null : (
            <Image source={{ uri: image }} style={style.images} />
          )}
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              right: 15,
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={style.circle}>
                <View style={style.glassIcon}>
                  <LabelIcon style={style.Icon} />
                </View>

                <Text style={style.glassText}>{labelText}</Text>
              </View>
              {
                isFaviourate &&
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    // setShowBg(!showBg);
                  }}
                  style={[
                    style.BookMark,
                    {
                      backgroundColor: !showBg
                        ? Colour.white
                        : Colour.primaryGreen,
                      marginLeft: 10,
                    },
                  ]}>
                  {!showBg ? <BookMark height={14} width={18} /> : <SaveBookMarke color={Colour.PrimaryBlue} />}
                </TouchableOpacity>
              }
            </View>
            {showLabel === true && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setShowBg(!showBg);
                }}
                style={[
                  style.BookMark,
                  {
                    backgroundColor: !showBg
                      ? Colour.white
                      : Colour.PrimaryBlue,
                    marginLeft: 10,
                  },
                ]}>
                {!showBg ? <BookMark /> : <SaveBookMarke />}
              </TouchableOpacity>
            )}
          </View>

          <View
            style={[
              image?.length === 0
                ? null
                : { backgroundColor: typeDiscount === "percent" ? Colour.primaryGreen : Colour.peachyOrange, height: 5, width: '100%' },
            ]}>
            <View
              style={[
                image?.length === 0
                  ? { marginTop: 25, marginBottom: 13 }
                  : { marginTop: -13 },
                style.dollerWrapper,
                { backgroundColor: typeDiscount === "percent" ? Colour.primaryGreen : Colour.peachyOrange },
              ]}>
              {
                typeDiscount === "percent" ?
                  <Doller style={style.Icon} /> :
                  <Percentage style={style.Icon} />
              }
            </View>
          </View>
        </View>

        <View style={[style.textWrapper, textWrapperStyle]}>
          <Text numberOfLines={1} style={style.title}>
            {title}
          </Text>
          <Text style={style.subText} numberOfLines={2}>
            {subTitle}
          </Text>
          <View style={style.iconWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <View style={style.footWrapper}>
                <Foot color={Colour.primaryGreen} />
              </View>
              <Text style={style.footerText}>{footText}</Text> */}
              {locationText?.length > 0 &&
                <>
                  <View style={style.footWrapper}>
                    <Location />
                  </View>
                  <Text style={style.footerText}>{locationText}</Text>
                </>
              }
            </View>

            <TouchableOpacity
              style={style.paddingDown}
              disabled={isDisable}
              onPress={() => {
                setShowMap(!showMap);
              }}>
              {showMap ? <Up /> : <Down />}
            </TouchableOpacity>
          </View>
        </View>
        {showMap === true && (
          <View style={{
            height: 198,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            overflow: 'hidden',
          }}>
            {/* <MapboxGL.MapView
             style={style.map}
             zoomEnabled={true}
             styleURL={'mapbox://styles/mapbox/streets-v11'}>
             <MapboxGL.Camera
               defaultSettings={{
                centerCoordinate:coordinate,
                 zoomLevel: 14,
               }}
               zoomLevel={4}
               followUserLocation={true}
               centerCoordinate={[23.0225,72.5714]}
             />
             <MapboxGL.UserLocation
               visible={true}
               onPress={() => {
                 //setCatSelect(!cateSelect);
               }}
               //onUpdate={onUserLocationUpdate}
             />
               <MapboxGL.PointAnnotation
              selected={true}
              key="key1"
               id="id1"
              coordinate={startCoordinate}>
              <Location2/>
              <MapboxGL.Callout title="My" />
            </MapboxGL.PointAnnotation>
          
          <MapboxGL.PointAnnotation
              selected={true}
              key="key2"
              id="id2"

              coordinate={endCoordinate}>
              <Location/>
              <MapboxGL.Callout title="User" />
            </MapboxGL.PointAnnotation> 
             </MapboxGL.MapView> */}

            <LinearGradient style={{}} colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0) 100%)']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} />

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                paddingBottom: 10,
                position: 'absolute',
                bottom: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    height: 32,
                    width: 32,
                    backgroundColor: Colour.primaryGreen,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {typeDiscount === "percent" ? <Doller /> : <Percentage />}
                </View>

                <View style={{ marginLeft: 8, marginRight: 18 }}>
                  <Text
                    style={{
                      fontFamily: Fonts.NotoSansMedium,
                      fontWeight: '500',
                      fontSize: 12,
                      color: "red",
                    }}>
                    est. Centz:
                  </Text>
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
              </View>
              <CommonButton
                buttonText={'Start Navigation'}
                onPress={startNavigationPress}
                warperStyle={{ flex: 1, marginLeft: 5 }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const style: any = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    alignSelf: 'center',
    width: Dimensions.get('screen').width - 35,
    flexDirection: 'column',
    backgroundColor: Colour.white,
    borderRadius: 18,
    elevation: 18,
    shadowColor: Colour.gray500,
    borderWidth: 1,
    borderColor: Colour.gray200,
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
  },
  flex: {
    flex: 0.5,
  },
  paddingDown: {
    padding: 5,
    // alignSelf:'flex-end',
    // backgroundColor:'blue',
  },

  images: {
    height: 125,
    width: Dimensions.get('screen').width - 35,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  circle: {
    height: 28,
    borderRadius: 50,
    backgroundColor: Colour.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    // marginTop: 20,

    //paddingVertical: 4,
    paddingLeft: 6,
    paddingRight: 8,
    shadowOpacity: 0.23,

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

  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  BookMark: {
    height: 36,
    width: 36,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
  },
  footWrapper: {
    backgroundColor: Colour.PrimaryBlue,
    height: 32,
    width: 32,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orangeLine: {
    backgroundColor: Colour.peachyOrange,
    height: 5,
    width: '100%',
  },
  dollerWrapper: {
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    marginLeft: 16,

    height: 32,
    width: 32,
    borderColor: Colour.white,
  },
  textWrapper: {
    flex: 0.5,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  footerText: {
    color: Colour.gray500,
    fontSize: 12,
    lineHeight: 14,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 24,
  },
  title: {
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 16,
    fontFamily: Fonts.QuicksandBold,
    color: Colour.PrimaryBlue,
    fontWeight: '700',
  },
  subText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts.NotoSansRegular,
    color: Colour.gray500,
    paddingBottom: 16,
  },
  container: {
    height: '50%',
    width: '100%',
  },
  map: {
    flex: 1,
    width: "100%",
    height: '80%'
  },
});
