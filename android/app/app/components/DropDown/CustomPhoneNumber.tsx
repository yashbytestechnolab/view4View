import React from 'react';
import { Platform } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Fonts } from '../../assets/fonts';
import { Colour } from '../../theme';

interface Iprosps {
  value: any;
  onChange: any;
  wapperClass?: object;
  inputRef: any;
  placeholder: any;
  //  displayError?: any,
  //  errorDisplay: any
}
export function CustomPhoneNumber(props: Iprosps) {
  const { value, onChange, wapperClass, placeholder, inputRef } = props;

  return (
    //<View style={[wapperClass, CommonComponentStyle.textInputViewMobile, displayError ? CommonComponentStyle.textInputError : CommonComponentStyle.textInputNoError]}>
    <PhoneInput
      placeholder={placeholder}
      textContainerStyle={{
        height: Platform.OS === "ios" ? 44 : 50,
        backgroundColor: Colour.white,
        // flex: 1,
        marginLeft: Platform.OS === "android" ? -65 : -60,
      }}
      textInputStyle={{
        fontFamily: Fonts.NotoSansLight,
        fontSize: 16,
        backgroundColor: Colour.white,
        color: Colour.gray900,
      }}
      textInputProps={{
        maxLength: 10,
        keyboardType: 'numeric',
        style: {
          height: 40,
          backgroundColor: Colour.white,
          fontFamily: Fonts.NotoSansLight,
          fontSize: 16,
          color: Colour.gray900,
          marginTop: 0,
          top: Platform.OS === "android" ? 3 : 0
          // top: 5
        },
      }}
      codeTextStyle={{
        fontFamily: Fonts.NotoSansLight,
        fontSize: 16,
        color: Colour.black,
        marginTop:Platform.OS === 'ios' ? 12 :  8,
        marginLeft: -35,
        padding: 0,
        flexWrap: 'nowrap'
      }}
      disableArrowIcon={true}
      ref={inputRef}
      defaultValue={value}
      defaultCode="US"
      onChangeText={onChange}
      countryPickerButtonStyle={{}}
      layout={'second'}
      value={'12121212121'}
    />
    // </View>
  );
}
