import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colour} from '../../theme';
import {Fonts} from '../../assets';

interface findCatList {
  Svg?: any;
  title?: String;
  selectItem?: boolean;
  onPress?: any;
  Data?: any;
  selectDeal?:boolean
  toggleModal?: Function;
  id?:number;
 
}
const FindCategoryList = (props: findCatList) => {
  const {Svg, title, Data,selectDeal,onPress,id} = props;
console.log(id)
  return (
    <View
      style={[
        styles.circle,
        !selectDeal
          ? {backgroundColor: Colour.PrimaryBlue}
          : {backgroundColor: Colour.white},
      ]}>
      <Svg color={!selectDeal ? Colour.primaryGreen : ''} />
      <Text
        style={[
          styles.glassText,
         !selectDeal
            ? {color: Colour.primaryGreen}
            : {color: Colour.PrimaryBlue},
        ]}>
        {title}
      </Text>
    </View>
  );
};
export default FindCategoryList;

const styles = StyleSheet.create({
  circle: {
    height: 28,
    borderRadius: 50,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginTop: 10,
    //paddingVertical: 4,
    paddingLeft: 6,
    paddingRight: 8,
    shadowOpacity: 0.23,
    flex: 1,
    shadowColor: 'rgba(16, 24, 40, 1)',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
  },
  searchWrapper: {
    backgroundColor: Colour.white,
    height: 104,
    width: 343,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 16,
    top: 11,
    padding: 10,
    justifyContent: 'center',
  },
  glassText: {
    fontSize: 14,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',

    paddingLeft: 5,
    alignItems: 'center',
  },
});
