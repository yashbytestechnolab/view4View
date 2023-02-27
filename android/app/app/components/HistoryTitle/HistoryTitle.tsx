import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Back} from '../../assets/icons/back';
import Next from '../../assets/icons/Next';
import {Colour} from '../../theme';
import {Fonts} from '../../assets';

interface commonHistory {
  title?: any;
  backPress?: any;
  nextPress?: any;
  textStyle?: Object;
  wrapperStyle?: Object;
}
export default function HistoryTitle(props: commonHistory) {
  const {title, backPress, nextPress, textStyle, wrapperStyle} = props;
  return (
    <View style={[style.dateWrapper, wrapperStyle]}>
      <TouchableOpacity
        onPress={backPress}>
        <Back height={12} width={20} color={Colour.gray400} />
      </TouchableOpacity>
      <Text style={[style.text, textStyle]}>{title}</Text>
      <TouchableOpacity
        onPress={nextPress}>
        <Next color={Colour.gray400} height={12} width={20} />
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 21,
    paddingBottom: 42,
  },
  text: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'left',
    color: Colour.gray400,
  },
});
