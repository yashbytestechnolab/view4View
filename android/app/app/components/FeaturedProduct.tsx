import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colour } from '../theme';
import { Fonts } from '../assets';
import { commonStyles } from '../constants/CommonStyles';
import { Loder } from './Loder';

interface CustomButton {
  warperStyle?: object;
  image?: any;
  number?: any;
  productName?: String;
  price?: string;
  onPress?: any;
  data?: any;
  loading?: boolean;
}
export const FeaturedProduct = (props: CustomButton) => {
  const { warperStyle, image, onPress, number, productName, price, data, loading } = props;

  const renderDesign = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={{ paddingRight: 16, paddingBottom: 16, width: index == -1 ? '100%' : '50%' }}
        onPress={() => onPress(item?.product_id?._id, item?._id)}
      >
        <View style={commonStyles.boxshado}>
          <Image
            source={{ uri: item?.images[0] || item?.product_id?.images || '' }}
            resizeMode={'cover'}
            style={style.imageWrapper}
          />
          {
            item?.category?.discount ?
              <View style={style.greenBG}>
                <Text style={style.percentText}>{item?.category?.discount}%</Text>
              </View>
              : null
          }
          <View style={style.textWrapper}>
            <View style={style.subTextWrapper}>
              <Text numberOfLines={1} style={style.productName}>
                {item?.title}
              </Text>
              <Text style={style.price}>${item?.price}</Text>
            </View>
            <Text style={style.category}>{item?.category?.primaryCat}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading)
    return (
      <View style={{ height: 250, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loder spinnerColor={Colour.primaryGreen} />
      </View>
    )

  if (!data || data?.length == 0) {
    return (
      <View style={{ height: 250, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found.</Text>
      </View>
    )
  }
  const firstData = data?.[0];
  const otherData = data?.slice(1);
  return (
    <>
      {renderDesign({ item: firstData, index: -1 })}
      <FlatList data={otherData || []} numColumns={2} renderItem={renderDesign} />
    </>
  );
};
const style = StyleSheet.create({
  imageWrapper: {
    height: 170,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  greenBG: {
    position: 'absolute',
    backgroundColor: Colour.primaryGreen,
    borderRadius: 50,
    width: 34,
    height: 34,
    alignItems: 'center',
    right: 20,
    borderWidth: 3,
    borderColor: Colour.white,
    top: 15,
    //marginTop: 20,
    justifyContent: 'center',
  },
  textWrapper: {
    flexDirection: 'column',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 3,
    shadowColor: Colour.gray500,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    backgroundColor: Colour.white,
    paddingVertical: 11,
  },
  subTextWrapper: {
    flexDirection: 'row',
    //justifyContent: 'space-around',
    backgroundColor: Colour.white,
    height: 20,
    width: "95%",
    paddingHorizontal: 8,

  },
  productName: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    fontFamily: Fonts.QuicksandSemiBold,
    color: Colour.PrimaryBlue,
    textAlign: 'left',
    flex: 0.8,
  },
  price: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    fontFamily: Fonts.QuicksandSemiBold,
    color: Colour.PrimaryBlue,
    textAlign: 'right',
    flex: 0.4,
  },
  category: {
    marginLeft: 9,
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
    color: Colour.gray400,
    fontFamily: Fonts.QuicksandSemiBold,
  },
  percentText: {
    fontFamily: Fonts.Quicksand,
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 20,
    color: Colour.PrimaryBlue,
  },
});
