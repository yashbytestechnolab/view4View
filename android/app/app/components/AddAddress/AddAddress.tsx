import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets';
import { Colour } from '../../theme';
import { String } from '../../constants';

interface addAddress {
  title?: String;
  subTitle?: String;
  editPress?: any;
  defaultPress?: any;
  wrapperStyle?: Object;
  textStyle?: Object;
  data?: any,
  address1?: number | String;
  address2?: number | String;
  city?: string | object,
  state?: string | object,
  zipCode?: number | object,
  country?: string | number,
  setDefaultAdd?: any,
  defaultAdd?: any,
  item?: any
}
export default function AddAddress(props: addAddress) {
  const {
    title,
    city,
    item,
    editPress,
    wrapperStyle,
    address1,
    address2,
    state,
    zipCode,
    country,
    setDefaultAdd
  } = props;

  return (
    <View
      key={item?._id}
      style={[, style.main, wrapperStyle, item?.isDefault ? {
        backgroundColor: Colour.addressBackground,
        borderColor: Colour.addressBorderColor,
        marginTop: 12,
      } : {
        backgroundColor: Colour.white,
        borderColor: Colour.solidGray,
        marginTop: 12,
      }]}>
      <Text style={style.addTitle}>{title?.charAt(0).toUpperCase() + title?.slice(1)}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={style.address}>{`${address1},`}
        </Text>
        <Text style={[style.address, { paddingLeft: 3 }]}>{address2}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={[style.address, style.paddingTop]}>
          {city?.length > 0 ? `${city},` : ""}
        </Text>
        <Text style={[style.address, style.paddingTop]}>
          {state?.length > 0 ? `${state},` : ""}
        </Text>
        <Text style={[style.address, style.paddingTop]}>
          {zipCode?.length > 0 ? `${zipCode},` : ""}
        </Text>
        <Text style={[style.address, style.paddingTop]}>
          {country?.length > 0 ? `${country}` : ""}
        </Text>
      </View>
      <View style={style.editWrapper}>
        <TouchableOpacity onPress={() => setDefaultAdd(item?._id)}>
          <Text style={style.default}>{item?.isDefault ? "Default" : "Set As Default"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { editPress(item?.id) }}>
          <Text style={style.edit}>{String.addCard.edit}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  main: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginBottom: 18
  },

  edit: {
    fontFamily: Fonts.NotoSansMedium,
    color: Colour.primaryBlue700,
    fontWeight: '500',
    fontSize: 14,
    padding: 2,
  },
  default: {
    fontFamily: Fonts.NotoSansMedium,
    color: Colour.primaryBlue500,
    fontWeight: '500',
    fontSize: 14,
  },
  address: {
    fontFamily: Fonts.ManropeRegular,
    color: Colour.gray500,
    fontWeight: '400',
    fontSize: 14,
    paddingTop: 4,
  },
  addTitle: {
    fontFamily: Fonts.ManropeBold,
    color: Colour.solidBlue,
    fontWeight: '700',
    fontSize: 14,
  },
  editWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  paddingTop: { paddingTop: 0 }
});
