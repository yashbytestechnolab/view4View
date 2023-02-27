import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { commonStyles } from '../../../constants/CommonStyles';
import { Colour } from '../../../theme';
import { BackButton } from '../../../components/BackButton/BackButton';
import { ROUTES, String } from '../../../constants';

import { CommonButton, CommonTextInput } from '../../../components';

import { Right } from '../../../assets/icons/Right';
import { style } from './style';
import { Dropdown } from 'react-native-element-dropdown';
import { useQuery } from '@apollo/client';
import { Get_Country, Get_state } from '../../../graphQL/Queries';
import ValidationError from '../../../components/ValidationError/ValidationError';
import { zipCodeRegex } from '../../../constants/validation';

const AddNewAddress: FC = () => {
  // ....................................useRef...............................................

  const { data: getState } = useQuery(Get_state);
  const { data: getContry } = useQuery(Get_Country);
  const addLine1: any = useRef();
  const addLine2: any = useRef();
  const cityName: any = useRef();
  const state: any = useRef();
  const zip: any = useRef();
  const country: any = useRef();
  const radioButton: any = useRef();

  const [defaultPayment, setDefaultPayment]: any = useState(false);
  const navigation: any = useNavigation();
  const [checked, setChecked]: any = useState();
  const address: any = ['office', 'other'];
  const [address1, setAddress1]: any = useState();
  const [address2, setAddress2]: any = useState();
  const [city, setCity]: any = useState();
  const [isState, setIsstate]: any = useState();
  const [isCountry, setIsCountry]: any = useState();
  const [zipCode, setZipCode]: any = useState();
  const [isFocus, setIsFocus] = useState(false);

  const [addError, setAddError] = useState('')
  const [add2Error, setAdd2Error] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')
  const [countryError, setCountryError] = useState('')
  const [zipError, setZipError] = useState('')
  const [locationError, setLocationError] = useState('')
  const [otherAddError, setOtherAddError] = useState('')

  useEffect(() => {
    getState;
    getContry;
    //handleValidation()
  }, [getState, getContry]);

  const handleDefaultPayment = () => {
    setDefaultPayment(!defaultPayment);

  };
  const handleValidation = () => {
    if (address1?.length === undefined) {
      setAddError('Address line 1 is required.')
    }
    if (city?.length === undefined) {
      setCityError('City is required')
    }
    if (isState?.length === undefined) {
      setStateError('State is required')
    }
    if (isCountry?.length === undefined) {
      setCountryError('Country is required')
    }
    if (zipCode === undefined) {
      setZipError('Zip is required')
    } if (zipCodeRegex.test(zipCode) === false) {
      setZipError('Zip is not valid')
    }
    if (checked === undefined) {
      setLocationError('location addres is required')

    }
    if (address1?.length !== undefined && city?.length !== undefined && isState?.length !== undefined && isCountry?.length !== undefined && zipCode !== undefined && zipCodeRegex.test(zipCode) === true && checked !== undefined) {
      Alert.alert("successfully data save");
      //navigation.navigate(ROUTES?.Account)
    }

    console.log("fealValue", address?.length, address1?.length, address2, city?.length, isState?.length, isCountry?.length, zipCode?.length, checked?.length, defaultPayment?.length)

  }
  console.log("display error ", locationError, checked?.length, checked)

  return (
    <ScrollView style={[commonStyles.whiteBG, {}]}>
      <StatusBar backgroundColor={Colour.white} barStyle={'dark-content'} />
      {/* .................................backArrow...................................................... */}
      <BackButton
        color={Colour.black}
        title={String.addnewADD}
        textStyle={commonStyles.backButtonText}
        wrapperStyle={style.arrow}
      />

      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps={String?.handled}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={{ width: '100%', flex: 1, paddingHorizontal: 16 }}
        style={style.wrapper}>
        {/* ............................................Billing Address................................................................       */}
        <Text style={style.title}>{String.addCard.addressLine1}</Text>
        <CommonTextInput
          wrapperStyle={[style.boxShedo]}
          placeholder={'addressLine1'}
          ref={addLine1}
          onChangeText={(value: any) => {
            setAddress1(value);
            setAddError('')
          }}
          returnKeyType={String.keybordNext}
          autoCapitalize={String.keybordNone}
          style={style.textInputTextStyle}
          onSubmitEditing={() => addLine2.current.focus()}
        />

        {addError ? <ValidationError errorText={addError} /> : null}
        <Text style={style.title}>{String.addCard.addressLine2}</Text>
        <CommonTextInput
          wrapperStyle={[style.boxShedo]}
          placeholder={'addressLine2'}
          ref={addLine2}
          onChangeText={(value: any) => {
            setAddress2(value);
            setAdd2Error('')
          }}
          returnKeyType={String.keybordNext}
          autoCapitalize={String.keybordNone}
          style={style.textInputTextStyle}
          onSubmitEditing={() => cityName.current.focus()}></CommonTextInput>


        <View style={commonStyles.row}>
          <View style={commonStyles.column}>
            <Text style={[style.title]}>{String.addCard.cityName}</Text>
            <Dropdown
              data={getState?.state?.data}
              style={[
                style.expiryTextInputWrapper,
                { paddingLeft: 14, paddingRight: 17, marginTop: 6 },
              ]}
              maxHeight={194}
              ref={country}
              dropdownPosition={'bottom'}
              labelField="name"
              valueField="value"
              placeholder={'City'}
              searchPlaceholder="Search..."
              value={city}
              onFocus={() => {
                setIsFocus(true);
              }}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCity(item.value);
                setIsFocus(false);
                setCityError('')
                ///zip.current.focus()
              }}
            />
            {cityError ? <ValidationError errorText={cityError} /> : null}
          </View>


          <View style={[commonStyles.column, { marginLeft: 16 }]}>
            <Text style={style.title}>{String.addCard.state}</Text>
            <Dropdown
              data={getState?.state?.data}
              style={[
                style.expiryTextInputWrapper,
                { paddingLeft: 14, paddingRight: 17, marginTop: 6 },
              ]}

              maxHeight={194}
              ref={state}
              dropdownPosition={'bottom'}
              labelField="name"
              valueField="value"
              placeholder={'State'}
              value={isState}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setIsstate(item?.value);
                setIsFocus(false);
                setStateError('')

              }}
            />
            {stateError ? <ValidationError errorText={stateError} /> : null}

          </View>

        </View>
        <View style={commonStyles.row}>
          <View style={commonStyles.column}>
            <Text style={style.title}>{String.addCard.country}</Text>
            <Dropdown
              data={getState?.state?.data}
              style={[
                style.expiryTextInputWrapper,
                { paddingLeft: 14, paddingRight: 17, marginTop: 6 },
              ]}

              maxHeight={194}
              ref={country}
              dropdownPosition={'bottom'}
              labelField="name"
              valueField="value"
              placeholder={'Country'}
              value={isCountry}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setIsCountry(item?.value);
                setIsFocus(false);
                setCountryError('')
              }}
            />
            {countryError ? <ValidationError errorText={countryError} /> : null}

          </View>


          <View style={[commonStyles.column, { marginLeft: 16 }]}>
            <Text style={style.title}>{String.addCard.zip}</Text>
            <CommonTextInput
              wrapperStyle={[style.expiryTextInputWrapper, { marginTop: 6 }]}
              placeholder={'362265'}
              ref={zip}
              onChangeText={(value: any) => {
                setZipCode(value);
                setZipError('')
              }}
              keyboardType={String.keybordnum}
              returnKeyType={String.next}
              autoCapitalize={String.keybordNone}
              style={style.textInputTextStyle}
            //onSubmitEditing={() => contactNo.current.focus()}
            />
            {zipError ? <ValidationError errorText={zipError} /> : null}
          </View>


        </View>
        {/* ..................................Radio button handle.......................................................    */}
        <Text style={style.title}>{String.addCard.saveAs}</Text>
        <View style={style.radioButtonWrapper}>
          <View
            style={[
              commonStyles.row,
              { alignItems: 'center', justifyContent: 'center' },
            ]}>
            <View style={[style.radioLine]}>
              <View style={style.radioFill}></View>
            </View>
            <Text style={[style.radioTitle, { color: Colour.gray300 }]}>
              {String.addCard.home}
            </Text>

          </View>

          {address.map((address: any, key: any) => {
            return (
              <>
                <View key={address} style={commonStyles.row}>
                  <TouchableOpacity
                    style={[style.radioLine, { backgroundColor: Colour.white }]}
                    onPress={() => {
                      setChecked(key);
                      setLocationError('')
                    }}>
                    {checked == key ? (
                      <View style={style.radioButtonTrue}>
                        <View style={style.radioButtonTrue2} />
                      </View>
                    ) : null}
                  </TouchableOpacity>

                  <Text style={style.radioTitle}>{address}</Text>
                </View>
              </>
            );
          })}
        </View>
        {locationError ? <ValidationError errorText={locationError} /> : null}

        {checked === 1 && (
          <View>
            <CommonTextInput
              wrapperStyle={[style.boxShedo]}
              placeholder={'save as.. '}
              returnKeyType={String.go}
              autoCapitalize={String.keybordNone}
              style={style.textInputTextStyle}
            />
          </View>
        )}

        {/* .................................................Checkbox handler........................................................ */}
        <View style={style.defaultPaymentWrapper}>
          <TouchableOpacity
            style={[
              commonStyles.rightIconBorder,
              defaultPayment === true && {
                backgroundColor: Colour.PrimaryBlueShade,
              },
            ]}
            onPress={() => {
              handleDefaultPayment();
            }}>
            {defaultPayment === true && <Right />}
          </TouchableOpacity>
          <Text style={style.defaultPayment}>
            {String.addCard.setAsdefaultAddress}
          </Text>
        </View>
        <CommonButton
          buttonText={String.addAddress}
          onPress={() => {
            handleValidation()
          }}
          warperStyle={[style.addPaymentButton, { marginTop: 148 }]}
        />
        <Text
          style={[style.title, style.cancleWrapper]}
          onPress={() => {
            navigation.navigate(ROUTES.CartCheckout);
          }}>
          {String.addCard.cancle}
        </Text>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};
export default AddNewAddress;
