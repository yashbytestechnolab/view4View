import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { commonStyles } from '../../constants/CommonStyles';
import { RightIcon } from '../../assets/icons/RightIcon';
import { Colour } from '../../theme';
import { Fonts } from '../../assets';

interface paymentProps {
  cardImage: any;
  cardNameText: String;
  cardExpiryText: String;
  editPress: any;
  rightPress: boolean;
  wrapperStyle: Object;
  textWrapper: Object;
}
export default function PaymentMethod(props: paymentProps) {
  const { cardImage, cardNameText, cardExpiryText, editPress, rightPress, wrapperStyle, textWrapper } = props;

  return (
    <View style={[style.mainWrapper]}>
      <View style={style.rowWrapper}>
        <View style={style.textWrapper}>
          <Image source={cardImage} />
          <View style={style.titleWrapper}>
            <Text numberOfLines={1} style={style.title}>{cardNameText}</Text>
            <Text numberOfLines={1} style={style.subTitle}>{cardExpiryText}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colour.PrimaryBlue, height: 16, width: 16, borderRadius: 16,
            alignItems: 'center', justifyContent: 'center',
          }}>
          <RightIcon />
        </View>
      </View>
      <View style={[{ flexDirection: 'row', paddingLeft: 60 }]}>
        <Text style={style.default} numberOfLines={1} >Set as default</Text>
        <TouchableOpacity onPress={() => { editPress }}>
          <Text style={style.edit} numberOfLines={1} >Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  mainWrapper: {
    borderRadius: 8,
    backgroundColor: Colour.white,
    borderWidth: 1,
    borderColor: Colour.gray200,
    padding: 16,
    marginBottom: 16
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iamgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
  },
  titleWrapper: {
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: Fonts.NotoSansMedium,
    color: Colour.PrimaryBlue
  },
  subTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300',
    fontFamily: Fonts.NotoSansLight,
    color: Colour.PrimaryBlue
  },
  default: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: Fonts.NotoSansMedium,
    color: Colour.primaryBlue500
  },
  edit: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: Fonts.NotoSansMedium,
    color: Colour.primaryBlue500, paddingLeft: 7,

  }
});