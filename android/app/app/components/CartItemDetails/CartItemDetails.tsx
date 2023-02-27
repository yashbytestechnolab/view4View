import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colour } from '../../theme';
import { Fonts } from '../../assets';
import { Cross } from '../../assets/icons/Cross';
import { String } from '../../constants';
import { commonStyles } from '../../constants/CommonStyles';
import { Dropdown } from 'react-native-element-dropdown';
import { Quantity } from '../../constants/DummyJson.ts/JsonFile';

interface customItem {
  Data?: any;
  onQuantityChange?: any;
  deleteItem?: any;
  Icon?: any;
  offerTitle?: String;
  offerSubTitle?: String;
  orderConform?: boolean;
}
export const CartItemDetails = (props: customItem) => {
  const { Data, onQuantityChange, deleteItem, Icon, offerTitle, offerSubTitle, orderConform } = props;

  const renderItem = (item: any) => {
    return (
      <View>
        <View style={style.itemWrapper}>
          <View style={commonStyles.boxshado}>
            <Image
              source={{ uri: item?.item?.variantId?.images?.[0] }}
              style={style.image}
              resizeMode={'center'}
            />
          </View>
          <View style={style.itemTexes}>
            <View style={style.discountText}>
              <Text numberOfLines={1} style={[style.title, { maxWidth: '85%' }]}>{item?.item?.variantId?.title}</Text>
              <TouchableOpacity style={{ padding: 4 }} onPress={() => deleteItem(item?.item?._id)} >
                <Cross height={8} width={8} color={Colour.black} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <Text numberOfLines={1} style={style.size}> {String.size} {item?.item?.size} </Text>
              <Text numberOfLines={1} style={style.size}> {String.color} {item?.item?.size} </Text>
            </View>

            <Text numberOfLines={1} style={style.price}>{String.price}</Text>
            <View style={commonStyles.row}>
              <Text numberOfLines={1} style={style.price1}>${item?.item?.variantId?.price}</Text>
              <Text numberOfLines={1} style={style.price2}>${(parseFloat(item?.item?.variantId?.price) - ((parseFloat(item?.item?.variantId?.price) * parseFloat(item?.item?.categoryId?.discount || "0")) / 100)).toFixed(2)}</Text>
            </View>
            <View style={[style.discountText, { marginTop: 8 }]}>
              <View style={style.discountPrice}>
                <Text numberOfLines={1} style={style.price3}>
                  -${(parseInt(item?.item?.quantity) * (((parseFloat(item?.item?.variantId?.price) * parseFloat(item?.item?.categoryId?.discount || "0")) / 100) || 0.00)).toFixed(2)} Centz discount
                </Text>
              </View>

              <View style={style.dropDownText}>
                <Text numberOfLines={1} style={style.price}>Qty: </Text>
                <Dropdown
                  data={Quantity}
                  style={style.dropdown}
                  maxHeight={194}
                  selectedTextStyle={style.quantity}
                  dropdownPosition={'bottom'}
                  labelField="label"
                  valueField="value"
                  value={item?.item?.quantity}
                  onChange={val => onQuantityChange(item?.item?._id, val?.value)}
                />
                {/* <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(true);
                  }}
                  activeOpacity={0.5}
                  style={style.dropdownWrapper}>
                  <Text>1</Text>
                  <Down />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
        <View style={style.grayLine} />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        style={{ padding: 12 }}
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item?.variantId?._id}
      />
      {orderConform === true ? (
        <View style={style.offerWrapper}>
          <View style={style.iconBG}>
            {Icon && <Icon color={Colour.primaryGreen} />}
          </View>

          <View style={style.offerText}>
            <Text style={style.offerTitle}>{offerTitle}</Text>
            <Text style={style.offerSubTitle}>{offerSubTitle}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  iconBG: {
    backgroundColor: Colour.PrimaryBlue,
    height: 24,
    width: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    //marginLeft: 8,
  },
  offerSubTitle: {
    color: Colour.PrimaryBlue,
    fontSize: 12,
    paddingRight: 16,
    fontWeight: '500',
    fontFamily: Fonts.QuicksandMedium,
    lineHeight: 15,
  },
  offerTitle: {
    color: Colour.PrimaryBlue,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.QuicksandSemiBold,
    lineHeight: 17,
  },
  image: {
    height: 92,
    width: 80,
    flex: 1,
    borderRadius: 12,
  },
  itemWrapper: {
    flexDirection: 'row',
    paddingBottom: 12,
    flex: 1,
  },
  itemTexes: { flexDirection: 'column', paddingLeft: 12, flex: 1 },
  discountText: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
  dropDownText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dropdownWrapper: {
    width: 51,
    height: 30,
    borderRadius: 6,
    borderColor: Colour.gray300,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 8,
  },
  grayLine: {
    height: 1,
    width: '120%',
    backgroundColor: Colour.gray200,
    marginBottom: 12,
  },
  offerWrapper: {
    flexDirection: 'row',
    backgroundColor: Colour.primaryGreen,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomStartRadius: 18,
    borderBottomEndRadius: 18,
  },
  offerText: {
    flexDirection: 'column',
    paddingLeft: 8,
    marginRight: 8,
  },
  dropdown: {
    backgroundColor: Colour.white,
    paddingLeft: 10,
    width: 50,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 0,
    borderColor: Colour.gray200,
  },
  title: {
    lineHeight: 15,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Fonts.QuicksandSemiBold,
    color: Colour.PrimaryBlue,
  },
  size: {
    lineHeight: 12,
    fontSize: 10,
    fontWeight: '500',
    fontFamily: Fonts.QuicksandMedium,
    color: Colour.gray400,
  },
  price: {
    lineHeight: 22,
    fontSize: 10,
    paddingTop: 4,
    fontWeight: '500',
    fontFamily: Fonts.QuicksandMedium,
    color: Colour.gray400,
  },
  price1: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Fonts.QuicksandBold,
    color: Colour.gray400,
    paddingRight: 8,
    textDecorationLine: 'line-through'
  },
  quantity: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.NotoSans,
    color: Colour.gray500,
    lineHeight: 16
  },
  price2: {
    paddingRight: 12,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Fonts.QuicksandBold,
    color: Colour.PrimaryBlue,
  },
  price3: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Fonts.Quicksand,
    color: Colour.orange,
  },
  discountPrice: {
    backgroundColor: '#FEF3F2',
    maxWidth: 170,
    // height: 19,
    borderRadius: 50,
    padding: 4
  },
});
