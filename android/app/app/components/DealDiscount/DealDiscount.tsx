import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colour} from '../../theme';
import {Fonts, Images} from '../../assets';
import {Doller} from '../../assets/icons/Doller';
import Percentage from '../../assets/icons/Percentage';

interface dealdiscountProps {
  image?: any;
  title?: String;
  subTitle?: String;
  wrapper?: Object;
  onPress?: any;
  iconstring?: any;
}
export default function DealDiscount(props: dealdiscountProps) {
  const {
    image,
    title,
    subTitle,
    wrapper,
    onPress,
    iconstring,
  } = props;
  return (
    <TouchableOpacity
      style={[style.main, wrapper]}
      onPress={onPress}
      activeOpacity={1}>
      <Image source={Images.default} style={style.image}  />
      {iconstring === 'percent' ? (
        <>
          <View style={[style.lineWrapper, {backgroundColor: Colour.primaryGreen}]} />
          <View style={[style.iconWrapper, {backgroundColor: Colour.primaryGreen}]}>
            <Percentage />
          </View>
        </>
      ) : (
        <>
          <View style={[style.lineWrapper, {backgroundColor:Colour.peachyOrange}]} />
          <View style={[style.iconWrapper, {backgroundColor:Colour.peachyOrange}]}>
            <Doller />
          </View>
        </>
      )}
     
      <View style={style.textWrapper}>
        <Text numberOfLines={1} style={style.title}>{title}</Text>
        <Text   style={style.subTitle} numberOfLines={2}>
          {subTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderColor: Colour.gray200,
    borderRadius: 18,
    borderWidth: 1,
    height:104
  },
  image: {
    width: 100,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    height: '100%',
  },
  iconWrapper: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginLeft: -20,
    borderWidth: 3,
    borderColor: Colour.white,
  },
  textWrapper: {flexDirection: 'column', padding: 14, flex: 1},
  lineWrapper: {width: 5, height: '100%'},
  title: {
    fontSize: 18,
    fontFamily: Fonts.QuicksandBold,
    fontWeight: '700',
    color: Colour.PrimaryBlue,
    textAlign: 'left',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.NotoSansRegular,
    fontWeight: '400',
    color: Colour.gray500,
    textAlign: 'left',
  },
});
