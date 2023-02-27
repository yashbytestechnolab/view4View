import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Fonts} from '../../assets';
import Next from '../../assets/icons/Next';
import {Colour} from '../../theme';

interface CustomsocialButton {
  wraperStyle?: object;
  isDisabled?: boolean;
  buttonStyle?: object;
  buttonTextStyle?: object;
  buttonText: string;
  onPress: any;
  isLoading?: boolean;
  spinnerColor?: string;
  iconView?: any;
  source?: any;
  imageStyle?: any;
  textStyle?: any;
  Icon?:any
}

export const SocialButton = (props: CustomsocialButton) => {
  const {
    isDisabled,
    wraperStyle,
    buttonText,
    onPress,
    isLoading,
    spinnerColor,
    source,
    imageStyle,
    textStyle,
    Icon
  } = props;

  return (
    <TouchableOpacity
      style={[style.buttonWrapper, wraperStyle]}
      activeOpacity={1}
      disabled={isDisabled}
      onPress={!isLoading ? onPress : null}>
      {isLoading ? (
        <ActivityIndicator color={spinnerColor || Colour.black} />
      ) : (
        <>
          <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'center',}}>
            <View style={[imageStyle, style.image]}>
            <Icon/>
            </View>
           
            {/* //<Image source={source} style={[imageStyle, style.image]} /> */}
            <Text style={[style.titlewrapper, textStyle]}>
              {buttonText || 'Next'}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: Colour.white,
    height: 48,
    flex:1,
    width:'100%',
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center',
     alignItems: 'center',
     
  },
  image: {
    height:20,width:20,
    alignItems: 'center',
    //alignSelf: 'center',
  },

  titlewrapper: {
    fontSize: 16,
    fontWeight: '500',
    color: Colour.white,
    fontFamily: Fonts.NotoSansMedium,
    lineHeight:24,
    textAlign: 'center',
    alignItems:'center'
  },
  icon: {
    height: 19,
    width: 20,
  },
});
