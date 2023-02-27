import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colour } from '../../theme';
import { Fonts } from '../../assets';
import { Note } from '../../assets/icons/Note';
import { Deal } from '../../assets/icons/Deal';
import { BookMark } from '../../assets/icons/Bookmark';
import { SaveBookMarke } from '../../assets/icons/SaveBookMarke';
import { baseFilePaths } from '../../config';
//@ts-ignore
import { ReactNativeFile } from 'apollo-upload-client';
import { category } from '../../constants/DummyJson.ts/JsonFile';
interface BusinessesCardItem {
  wrapperStyle?: Object;
  iconWrapper?: Object;
  title?: String;
  subTitle?: String;
  dealText?: any;
  image?: any;
  Svg?: any;
  onPress?: any;
  selectCategoryIcon?: String;
}
export const BusinessesCard = (props: BusinessesCardItem) => {
  const { wrapperStyle, iconWrapper, title, subTitle, dealText, image, Svg, selectCategoryIcon } = props;
  const [showBg, setShowBg]: any = useState(false);

  return (
    <View style={[style.cardWrapper, wrapperStyle]} >
      <View>
        <Image style={style.image} source={image}></Image>
        <View style={[style.iconWrapper, iconWrapper]}>
          {
            category && category.map((item: any, index: number) => {
              return (
                <View key={index}>
                  {selectCategoryIcon === item.name && <item.icon height={10} width={10} />}
                </View>
              )
            })
          }
        </View>
      </View>
      <View style={style.textWrapper}>
        <Text numberOfLines={1} style={style.title}> {title} </Text>
        <Text numberOfLines={2} style={style.subTitle}> {subTitle} </Text>
        <View style={style.bottomIconWrapper}>
          <View style={style.dealIconWrapper}>
            <Deal />
            <Text style={style.dealText}>deals: </Text>
            <Text style={style.liveText}> {dealText}</Text>
          </View>
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
                  : Colour.primaryGreen,
                marginLeft: 10,
              },
            ]}>
            {!showBg ? <BookMark height={14} width={18} /> : <SaveBookMarke color={Colour.PrimaryBlue} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colour.PrimaryBlue,
    borderRadius: 18,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 94,
    width: 102,
    borderRadius: 14,
    backgroundColor: 'red'
  },
  iconWrapper: {
    backgroundColor: Colour.white,
    height: 18,
    width: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 4,
    left: 4,
  },
  title: {
    fontFamily: Fonts.DMSansRegular,
    fontSize: 14,
    color: Colour.white,
    fontWeight: '500',
    lineHeight: 20,
  },
  subTitle: {
    marginTop: 4,
    paddingRight: 3,
    fontFamily: Fonts.DMSansRegular,
    fontSize: 12,
    color: Colour.gray400,
    fontWeight: '400',
    lineHeight: 14,
  },
  bottomIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  dealIconWrapper: {
    backgroundColor: Colour.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    flexDirection: 'row',
    borderRadius: 50,
    paddingLeft: 5,
    paddingRight: 8,
    marginRight: 8,
  },
  tag: {
    backgroundColor: Colour.primaryGreen,
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: 'center',

    alignItems: 'center',
  },
  dealText: {
    color: Colour.PrimaryBlue,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    paddingLeft: 3,
    fontFamily: Fonts.DMSansRegular,
  },
  liveText: {
    color: Colour.PrimaryBlue,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.DMSansRegular,
    fontWeight: '700',
  },
  textWrapper: {
    flexDirection: 'column',
    marginHorizontal: 12,
    flex: 1,
  },
  BookMark: {
    height: 25,
    width: 25,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
