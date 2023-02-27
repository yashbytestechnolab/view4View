import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import {Fonts, Images} from '../../assets';
import Next from '../../assets/icons/Next';
import {Colour} from '../../theme';

interface CustomButton {
  wraperStyle?: object;
  isDisabled?: boolean;
  buttonStyle?: object;
  buttonTextStyle?: object;
  buttonText: string;
  onPress: any;
  isLoading?: boolean;
  spinnerColor?: string;
  iconView?: any;
  png?:boolean
}

export const ButtonWithIcon = (props: CustomButton) => {
  const {
    isDisabled,
    wraperStyle,
    png,
    buttonText,
    onPress,
    isLoading,
    spinnerColor,
  } = props;

  return (
    <TouchableOpacity
      style={[style.buttonWrapper,wraperStyle]}
      activeOpacity={1}
      disabled={isDisabled}
      onPress={!isLoading ? onPress : null}>
      {isLoading ? (
        <ActivityIndicator color={spinnerColor || Colour.black} />
      ) : (
        <>
        <Next height={14} width={25}  />
          <Text style={[style.titlewrapper]}>{buttonText || 'Next'}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: Colour.primaryGreen,
    height: 48,
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // flex:1,
    //width:'100%'
   
  },

  titlewrapper: {
    fontSize: 16,
    fontFamily: Fonts.NotoSansMedium,
    color: Colour.PrimaryBlue,
    fontWeight: '500',
    textAlign:'center',
    //alignItems:'center',
    lineHeight:24,
    paddingLeft:12
  },
  
});
