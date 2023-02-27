import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Fonts} from '../../assets';
import {Colour} from '../../theme';
interface oderDetails {
  title?: String;
  values?: String;
  style?: Object;
  valueStyle?: Object;
  titleStyle?: Object;
}

export const OrderDetails = (props: oderDetails) => {
  const {title, values, style, valueStyle, titleStyle} = props;
  return (
    <View style={[styles.subtitleWrapper, style]}>
      <Text style={[styles.subTitleText, titleStyle]}>{title}</Text>
      <Text style={[styles.subTitleText, valueStyle]}>{values}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 19,
    //rginHorizontal: 35,
  },
  subTitleText: {
    fontFamily: Fonts.QuicksandMedium,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    color: Colour.PrimaryBlue,
  },
});
