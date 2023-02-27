import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { style } from './Style';
import { Colour } from '../../theme';
import Next from '../../assets/icons/Next';
import { Link } from '../../assets/icons/Link';

interface CustomButton {
  warperStyle?: object;
  isDisabled?: boolean;
  buttonStyle?: object;
  buttonTextStyle?: object;
  buttonText: string;
  onPress: any;
  isLoading?: boolean;
  spinnerColor?: string;
  iconView?: any;
  icon?: any;
  LeftIcon?: any;
  RightIcon?: any;
}

export const CommonButton = (props: CustomButton) => {
  const {
    warperStyle,
    isDisabled,
    buttonStyle,
    buttonTextStyle,
    buttonText,
    onPress,
    isLoading,
    spinnerColor,
    icon,
    LeftIcon,
    RightIcon
  } = props;

  return (
    <TouchableOpacity
      style={[style.buttonWrapper, buttonStyle || warperStyle]}
      disabled={isDisabled}
      activeOpacity={0.7}
      onPress={!isLoading ? onPress : null}>
      {isLoading ? (
        <ActivityIndicator color={spinnerColor || Colour.black} />
      ) : (
        <>

          <View style={style.Button}>
            {LeftIcon && <View style={style.Icon} >
              <LeftIcon width={17} height={17} />
            </View>}
            <Text style={[style.titleWrapper, buttonTextStyle]}>
              {buttonText || 'Next'}
            </Text>
            {RightIcon && <View style={style.Icon} >
              <RightIcon width={16.57} height={16.57} color='#0F0742' />
            </View>}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
