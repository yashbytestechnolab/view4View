import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Colour} from '../../theme';
import {Fonts} from '../../assets';

interface CustomHeading {
  Wrapperstyle?: object;
  rightStyle?: object;
  lineStyle?: object;
  rightText: string;
  leftText: string;
  leftStyle: object;
  onPress: any;
  isLoading?: boolean;
  spinnerColor?: string;
  iconView?: any;
}
export const Heading = (props: CustomHeading) => {
  const {
    Wrapperstyle,
    rightStyle,
    leftStyle,
    lineStyle,
    rightText,
    leftText,
    onPress,
    isLoading,
    spinnerColor,
  } = props;
  return (
    <View style={[style.exploreWrapper, Wrapperstyle]}>
      <Text style={[style.bankText, leftStyle]}>{props.leftText}</Text>
      <TouchableOpacity onPress={!isLoading ? onPress : null}>
        {isLoading ? (
          <ActivityIndicator color={spinnerColor || Colour.black} />
        ) : (
          <>
            <Text style={[style.bankText2, rightStyle]}>{rightText}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  exploreWrapper: {
    flexDirection: 'row',
    paddingHorizontal:16,
    justifyContent: 'space-between',
    //marginRight: 28,
    marginBottom: 8,
    //ssmarginLeft: 24,
    alignItems: 'center',
  },
  bankText: {
    color: Colour.white,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: Fonts?.QuicksandSemiBold,
  },
  bankText2: {
    color: Colour.blueBarry,
    fontSize: 12,
    lineHeight: 17,
    fontFamily: Fonts?.QuicksandSemiBold,
    textDecorationLine: 'underline',
  },
});
