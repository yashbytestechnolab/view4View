import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Back} from '../../assets/icons/back';
import {useNavigation} from '@react-navigation/native';
import {ROUTES, String} from '../../constants';

import {Colour} from '../../theme';
import {Fonts} from '../../assets';

const ForgotBack = (props: any) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={[style.mainWrapper, props.style]}
      onPress={() => {
        navigation.navigate(ROUTES.Login);
      }}>
      <Back color={Colour.gray500} />
      <Text style={style.text}>{String.backToLogin}</Text>
    </TouchableOpacity>
  );
};
export default ForgotBack;
const style = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    alignSelf: 'center',
  },
  text: {
    marginLeft: 12,
    textAlign: 'center',
    fontFamily: Fonts.NotoSansMedium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: Colour.gray500,
  },
});
