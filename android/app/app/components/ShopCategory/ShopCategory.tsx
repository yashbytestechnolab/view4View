import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';
import { Colour } from '../../theme';
import { Fonts, Images } from '../../assets';
import { AppConstants } from '../../constants';
interface commonShpCategory {
  image?: any;
  title?: String;
}
const width = Dimensions.get('screen').width
export const ShopCategory = (props: commonShpCategory) => {
  const { image, title } = props;
  let imageSource = Images.default;
  if (image) {
    imageSource = { uri: `${AppConstants.marketplaceImage}${image}` };
  }
  return (
    <View style={style.cardBG}>
      <Image source={imageSource} style={style.imageWrapper} />
      <View style={style.wrapper} >
        <Text numberOfLines={2} style={style.text}>{title}</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  cardBG: {
    height: 58,
    width: width - 185,
    flex: 1,
    borderRadius: 14,
    backgroundColor: Colour.white,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },

  imageWrapper: {
    height: 58,
    width: 58,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  text: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    fontSize: 16,
    color: Colour.gray400
  },
  wrapper: { flex: 1, paddingHorizontal: 12, width: width - 185 }
});
