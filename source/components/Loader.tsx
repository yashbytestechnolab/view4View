import {View,  ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../Theme';

interface loder {
  spinnerColor?: string;
  backGroundColor?: string;
}
export const Loader = (props: loder) => {
  const {spinnerColor, backGroundColor} = props;
  return (
    <View
      style={[
        style.main,
        {
          backgroundColor: backGroundColor ? backGroundColor : Colors.gray,
        },
      ]}>
      <ActivityIndicator color={spinnerColor || Colors.pink} size={'large'} />
    </View>
  );
};
const style = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    
  },
});
