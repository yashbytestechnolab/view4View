import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Back } from '../../assets/icons/back';
import { useNavigation } from '@react-navigation/native';
import { Colour } from '../../theme';

interface back {
  wrapperStyle?: Object;
  iconStyle?: Object;
  color?: String;
  title?: String;
  textStyle?: Object;
  action?: any;
  onPress?: any;
  navigationParams?: Object;
}
export const BackButton = (props: back) => {
  const { wrapperStyle, iconStyle, color, title, textStyle, action, onPress, navigationParams } = props;
  const navigation = useNavigation();
  return (
    <View style={[wrapperStyle, style.main]}>
      <TouchableOpacity
        style={[iconStyle]}
        onPress={onPress ? onPress : () => {
          action ? navigation.navigate(action, navigationParams) : navigation.goBack();
        }}>
        <Back color={!color ? Colour.white : color} />
      </TouchableOpacity>
      {title ? (
        <Text style={[textStyle, { textAlign: 'center'}]}>{title}</Text>
      ) : null}
      <Text></Text>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    flexDirection: 'row',
    //marginTop: 23,
    marginLeft: 21,
    alignItems: 'center',
  },
});
