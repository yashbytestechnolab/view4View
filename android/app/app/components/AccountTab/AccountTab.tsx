import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Next from '../../assets/icons/Next';
import NextArrow from '../../assets/icons/NextArrow';
import {Fonts} from '../../assets';
import {Colour} from '../../theme';

interface accountTab {
  Svg?: any;
  title?: String;
  onPress?: any;
  textStyle?: Object;
  wrapperStyle?: Object;
  iconHeight?: any;
  iconWidth?: any;
  iconColor?: String;
  text?: String;
}
const AccountTab = (props: accountTab) => {
  const {
    Svg,
    title,
    onPress,
    textStyle,
    wrapperStyle,
    iconHeight,
    iconWidth,
    iconColor,
    text,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[style.main, wrapperStyle]}
      onPress={onPress}>
      <View style={style.TextWrapper}>
        <Svg height={iconHeight} width={iconWidth} color={iconColor} />
        <Text style={[style.title, textStyle]}>{title}</Text>
      </View>
      {text ? <Text style={style.subText}>{text}</Text> : <NextArrow />}
    </TouchableOpacity>
  );
};
export default AccountTab;
const style = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  title: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: Fonts.NotoSansRegular,
    color: Colour.gray500,
    marginLeft: 11,
  },
  subText: {
    // fontWeight: '700',
    fontSize: 14,
    fontFamily: Fonts.MontserratBold,
    color: Colour.gray500,
  },
});
