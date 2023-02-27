import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { commonStyles } from '../../constants/CommonStyles';
import { Colour } from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ShowPwd } from '../../assets/icons/ShowPwd';
import { HidePwd } from '../../assets/icons/HidePwd';
import { Fonts } from '../../assets';

interface borderInput {
  title?: String;
  Svg?: any;
  svgColor?: String;
  SvgHeight?: Number;
  SvgWidth?: Number;
  value?: any;
  onChangeText?: any;
  editable?: any;
  onSubmitEditing?: any;
  placeholder?: any;
  placeholderTextColor?: String;
  keyboardType?: any;
  keyboardAppearance?: any;

  returnKeyType?: any;
  autoCapitalize?: any;
  securePassword?: boolean;
  IssecureTextEntry?: boolean;
  wrapperStyle?: object
  isEmail?: boolean;
  maxLength?: any;
}
const BorderTextInput = React.forwardRef((props: borderInput, ref: any) => {
  const {
    title,
    Svg,
    value,
    onChangeText,
    editable,
    onSubmitEditing,
    placeholder,
    placeholderTextColor,
    keyboardType,
    keyboardAppearance,

    returnKeyType,
    autoCapitalize,
    IssecureTextEntry,
    wrapperStyle,
    isEmail,
    maxLength = 100
  } = props;
  return (
    <View style={wrapperStyle}>
      <Text style={commonStyles.forgotSubText}>{title}</Text>
      <View
        style={[
          commonStyles.grayTextInputBorder,
          { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
        ]}>
        <View>{Svg ? <Svg /> : null}</View>

        <TextInput
          value={value}
          style={[
            {
              width: '100%',
              paddingRight: 30,
              paddingTop: 2,
              paddingBottom: 0,
              //textAlign:'left',
              alignItems: 'center',
              justifyContent: 'center',
              color: Colour.gray900,
              fontFamily: Fonts.NotoSansLight,
              fontWeight: '300',
              fontSize: 16
            },
            isEmail && { paddingLeft: 10 }
          ]}
          editable={editable}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder || null}
          placeholderTextColor={Colour.placeholderGray || placeholderTextColor}
          keyboardType={keyboardType}
          keyboardAppearance={keyboardAppearance}
          ref={ref}
          secureTextEntry={IssecureTextEntry}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
}
)
export default BorderTextInput;
