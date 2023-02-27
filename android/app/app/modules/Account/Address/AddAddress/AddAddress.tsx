import {
  View,
  Text,
  Alert,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { commonStyles } from '../../../../constants/CommonStyles';
import { BackButton } from '../../../../components/BackButton/BackButton';
import { Colour } from '../../../../theme';
import { ROUTES, String } from '../../../../constants';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { zipCodeRegex } from '../../../../constants/validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonButton, CommonTextInput } from '../../../../components';
import ValidationError from '../../../../components/ValidationError/ValidationError';
import { Dropdown } from 'react-native-element-dropdown';
import { style } from './style';
import LogOutModel from '../../../../components/LogOutModel/LogOutModel';
import DeleteAdd from '../../../../assets/icons/DeleteAdd';
import { GET_COUNTRY, GET_STATE, GET_USER_INFORMATION } from '../../../../graphQL/Queries';
import { ADD_ADDRESS, REMOVE_ADDRESS, UPDATE_ADDRESS } from '../../../../graphQL/Mutations';
import { Right } from '../../../../assets/icons/Right'
import { BlurView } from '@react-native-community/blur';
import { CommonContext } from '../../../../context/AppContext';
import { showMessage } from 'react-native-flash-message';

const AddAddress: FC = () => {
  const route: any = useRoute();
  const edit: any = route?.params?.editAdd;
  // set when editDetails in route
  const editDetails: any = route?.params?.Item;
  const isGoBack: any = route?.params?.goBack || false;

  const { data: getState, error: getStateError } = useQuery(GET_STATE);
  const { data: getContry, error: getCountryError } = useQuery(GET_COUNTRY);
  const { loading, setLoading } = useContext(CommonContext);

  const addLine1: any = useRef();
  const addLine2: any = useRef();
  const cityName: any = useRef();
  const state: any = useRef();
  const zip: any = useRef();
  const country: any = useRef();
  const radioButton: any = useRef();
  const [isVisibleModal, setModalVisible]: any = useState(false);

  const [defaultPayment, setDefaultPayment]: any = useState(editDetails?.isDefault || false);
  const navigation: any = useNavigation();
  const [checked, setChecked]: any = useState();
  // static array for radio button don write const value please array display this screen 
  const address: any = [{
    name: "Home",
    id: 1,
    isSelected: editDetails?.addressType === "home" || editDetails == undefined ? true : false,
  },
  {
    name: "Office",
    id: 2,
    isSelected: editDetails?.addressType === "office" ? true : false
  },
  {
    name: "Other",
    id: 3,
    isSelected: editDetails === undefined ? false : editDetails?.addressType !== "home" && editDetails?.addressType !== "office" ? true : false
  }
  ];

  const [saveAsAddress, OnsaveAsAddress] = useState(address)
  const [address1, setAddress1]: any = useState(editDetails?.addressLine1);
  const [address2, setAddress2]: any = useState(editDetails?.addressLine2);
  const [city, setCity]: any = useState(editDetails?.city);
  const [isState, setIsstate]: any = useState(editDetails?.state_id?.value);
  const [isCountry, setIsCountry]: any = useState(editDetails?.country_id?.name);
  const [zipCode, setZipCode]: any = useState(editDetails?.zipcode);
  const [isFocus, setIsFocus] = useState(false);

  const [addError, setAddError] = useState('');
  const [add2Error, setAdd2Error] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [otherAddressValue, ChangeOtherValue] = useState(editDetails?.addressType || "")
  // const [countryError, setCountryError] = useState('');
  const [zipError, setZipError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [countryId, setCountryId] = useState(editDetails?.country_id?._id);
  const [stateId, setStateId] = useState(editDetails?.state_id?._id);

  const [addAddress, error] = useMutation(ADD_ADDRESS);
  const [updateAddress, updateError] = useMutation(UPDATE_ADDRESS);
  const [removeAddress] = useMutation(REMOVE_ADDRESS)


  // display save input 
  const [onRenderInput, OnRenderInput] = useState(false)


  const [
    getUserData,
    {
      data: userData,
    },
  ]: any = useLazyQuery(GET_USER_INFORMATION, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });

  useEffect(() => {
    // set Data country name and id when params data not thier
    if (editDetails === undefined) {
      setIsCountry(getContry?.country?.data[0]?.name)
      setCountryId(getContry?.country?.data[0]?._id)
    }
  }, [getContry])

  useEffect(() => {
    // focus for other Input
    if (editDetails === undefined) {
      OnRenderInput(false)
    }
    else if (editDetails?.addressType !== "home" && editDetails?.addressType !== "office") {
      OnRenderInput(true)
    }
  }, [editDetails?.addressType])


  const handle_addressApi = async () => {
    let addressTypeValue = saveAsAddress?.find((filterItem: any) => {
      return filterItem?.isSelected && filterItem?.name
    })

    addressTypeValue = addressTypeValue?.name === "Other" ? otherAddressValue : addressTypeValue?.name;

    setLoading(true)
    addAddress({
      variables: {
        input: {
          addressLine1: address1,
          addressLine2: address2,
          city: city,
          state_id: stateId,
          country_id: countryId,
          addressType: addressTypeValue?.toLowerCase(),
          zipcode: zipCode,
          isDefault: defaultPayment,
        },
      },
    })
      .then((response: any) => {
        // updating previous screenrr
        getUserData().then((res: any) => {
          setLoading(false)
          if (isGoBack)
            navigation.goBack()
          else
            navigation.navigate(ROUTES?.Address, { isUpdatingAddress: true, address_id: res?.data?.me?.user?.defaultAddress?._id, isDefault: defaultPayment, userInfo: res?.data?.me?.user });
        })
      })
      .catch((error: any) => {
        setLoading(false)
        showMessage({
          message: error?.message,
          type: "danger",
        });
      }).finally(() => {
        setLoading(false)
      })
  };

  const handle_editAddressApi = () => {
    // on Click update radio button name and pass api value 
    let addressTypeValue = saveAsAddress?.find((filterItem: any) => {
      return filterItem?.isSelected && filterItem?.name
    })
    // when radio item other to pass textInput value other wise radio text value
    addressTypeValue = addressTypeValue?.name === "Other" ? otherAddressValue : addressTypeValue?.name
    setLoading(true)

    // note radio button name first letter small 
    updateAddress({
      variables: {
        input: {
          addressLine1: address1,
          addressLine2: address2,
          city: city,
          country_id: countryId,
          state_id: stateId,
          zipcode: zipCode,
          addressType: addressTypeValue?.toLowerCase(),
          isDefault: defaultPayment,
          address_id: editDetails?._id
        },
      },
    })
      .then((response: any) => {
        setLoading(false)
        getUserData().then((res: any) => {
          setLoading(false)
          if (isGoBack)
            navigation.goBack()
          else
            navigation.navigate(ROUTES?.Address, { isUpdatingAddress: true, address_id: res?.data?.me?.user?.defaultAddress?._id, isDefault: defaultPayment, userInfo: res?.data?.me?.user });
        })
      })
      .catch((error: any) => {
      }).finally(() => {
        setLoading(false)
      })
  };

  useEffect(() => {
    getState;
    getContry;
  }, [route, navigation, edit]);

  const handleDefaultPayment = () => {
    setDefaultPayment(!defaultPayment);
  };

  const handleValidation = () => {
    // remove check value not need 
    if (address1?.length === undefined) {
      setAddError('Address line 1 is required.');
    }
    if (city?.length === undefined) {
      setCityError('City is required');
    }
    if (isState?.length === undefined) {
      setStateError('State is required');
    }
    // if (isCountry?.length === undefined) {
    //   setCountryError('Country is required');
    // }
    if (zipCode === undefined) {
      setZipError('Zip is required');
    }
    if (zipCodeRegex.test(zipCode) === false) {
      setZipError('Zip is not valid');
    }
    // if (checked === undefined) {
    //   setLocationError('location addres is required');
    // }
    if (
      address1?.length !== undefined &&
      city?.length !== undefined &&
      isState?.length !== undefined &&
      countryId?.length !== undefined &&
      zipCode !== undefined &&
      zipCodeRegex.test(zipCode) === true
      // &&
      // checked !== undefined
    ) {
      edit === undefined
        ? handle_addressApi()
        : edit === true && handle_editAddressApi();
    }
  };

  const onSelected = (id: number) => {
    // on click change radion button array and update save input
    id === 3 ? OnRenderInput(true) : OnRenderInput(false)
    setLocationError('');
    let onChangeSave = saveAsAddress?.map((item: any) => {
      return item?.id === id ? { ...item, isSelected: true } : { ...item, isSelected: false }
    })
    OnsaveAsAddress(onChangeSave)
  }

  const _countryView = useCallback(() => {
    return (
      <Dropdown
        data={getContry?.country?.data}
        style={[
          style.expiryTextInputWrapper,
          { paddingLeft: 14, paddingRight: 17, marginTop: 6 },
        ]}
        selectedTextStyle={{ color: Colour?.gray500 }}
        inputSearchStyle={{ color: 'red', backgroundColor: 'pink' }}
        containerStyle={{ backgroundColor: Colour?.gray300 }}
        placeholderStyle={commonStyles?.dropdownPlaceHolder}
        maxHeight={194}
        ref={country}

        // disable
        dropdownPosition={'bottom'}
        labelField="name"
        valueField="value"
        placeholder={isCountry || 'Country'}
        // value={isCountry}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setIsCountry(item?.name);
          setCountryId(item?._id);
          setIsFocus(false);
          // setCountryError('');
        }}
      />
    )
  }, [getContry, isCountry, countryId, isFocus])

  const onHandleRemoveAddress = () => {
    setLoading(true)
    removeAddress({
      variables: {
        input: editDetails?._id
      }
    }).then((res: any) => {
      setLoading(false)
      setModalVisible(false)
      console.log("res", res);
      navigation.navigate(ROUTES?.Address, { isUpdatingAddress: true });
    }).catch((err: any) => {
      setLoading(false)
      setModalVisible(false)

      console.log("err", err);

    }).finally(() => setLoading(false)
    )
  }
  // Thank You
  return (
    <>
      <StatusBar barStyle={String.darkContent} backgroundColor={Colour.white} />
      <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colour.white }} >
        <BackButton
          color={Colour.black}
          title={edit === true ? String.addAdd?.editAdd : String.addnewADD}
          textStyle={commonStyles.backButtonText}
          wrapperStyle={style.arrow}
        />

        <ScrollView style={[commonStyles.whiteBG, {}]}>
          <StatusBar backgroundColor={Colour.white} barStyle={'dark-content'} />
          {/* .................................backArrow...................................................... */}

          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            keyboardShouldPersistTaps={String?.handled}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            contentContainerStyle={{
              width: '100%',
              flex: 1,
              paddingHorizontal: 16,
            }}
            style={style.wrapper}>
            {/* ............................................Billing Address................................................................       */}
            <Text style={style.title}>{String.addCard.addressLine1}</Text>
            <CommonTextInput
              wrapperStyle={[style.boxShedo]}
              placeholder={'Address Line 1'}
              ref={addLine1}
              value={address1}
              onChangeText={(value: any) => {
                setAddress1(value);
                setAddError('');
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
              placeholder={'Address Line 2'}
              ref={addLine2}
              value={address2}
              onChangeText={(value: any) => {
                setAddress2(value);
                setAdd2Error('');
              }}
              returnKeyType={String.keybordNext}
              autoCapitalize={String.keybordNone}
              style={style.textInputTextStyle}
              onSubmitEditing={() => cityName?.current?.focus()}></CommonTextInput>

            <View style={[{ flexDirection: 'row' }]}>
              <View style={[{ flex: 1, flexDirection: 'column' }]}>
                <Text style={[style.title]}>{String.addCard.cityName}</Text>
                <CommonTextInput
                  wrapperStyle={[style.boxShedo]}
                  placeholder={'City'}
                  // ref={city}
                  value={city}
                  onChangeText={(value: any) => {
                    setCity(value);
                    setIsFocus(false);
                    setCityError('');
                    ///zip.current.focus()
                  }}
                  returnKeyType={String.keybordNext}
                  autoCapitalize={String.keybordNone}
                  style={style.textInputTextStyle}
                  onSubmitEditing={() => cityName?.current?.focus()}></CommonTextInput>
                {cityError ? <ValidationError errorText={cityError} /> : null}
              </View>

              <View style={[{ marginLeft: 16, flexDirection: 'column', flex: 1 }]}>
                <Text style={style.title}>{String.addCard.state}</Text>
                <Dropdown
                  data={getState?.state?.data}
                  style={[
                    style.expiryTextInputWrapper,
                    { paddingLeft: 14, paddingRight: 17, marginTop: 6 },
                  ]}
                  selectedTextStyle={{ color: Colour?.gray500 }}
                  inputSearchStyle={{ color: 'red', backgroundColor: 'pink' }}
                  containerStyle={{ backgroundColor: Colour?.gray300 }}
                  placeholderStyle={commonStyles?.dropdownPlaceHolder}
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
                    setStateId(item?._id);
                    setIsFocus(false);
                    setStateError('');
                  }}
                />

                {stateError ? <ValidationError errorText={stateError} /> : null}
              </View>
            </View>
            <View style={commonStyles.row}>
              {
                //Note Please check default value in country not shown 
              }
              <View style={[commonStyles.column, { flex: 1 }]}>
                <Text style={style.title}>{String.addCard.country}</Text>

                {_countryView()}
                {/* {countryError ? (
                  <ValidationError errorText={countryError} />
                ) : null} */}
              </View>

              <View style={[commonStyles.column, { marginLeft: 16, flex: 1 }]}>
                <Text style={style.title}>{String.addCard.zip}</Text>
                <CommonTextInput
                  wrapperStyle={[style.expiryTextInputWrapper, { marginTop: 6 }]}
                  placeholder={'12345'}
                  ref={zip}
                  onChangeText={(value: any) => {
                    setZipCode(value);
                    setZipError('');
                  }}
                  maxLength={5}
                  value={zipCode}
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
            <View style={[style.radioButtonWrapper]}>
              {saveAsAddress?.map((address: any, key: any) => {
                // radio button home office and other                                
                return (
                  <>
                    <View style={{ flex: 1, }}>
                      <View key={address?.id.toString()} style={commonStyles.row}>
                        <TouchableOpacity
                          style={[style.radioLine, { backgroundColor: Colour.white }]}
                          onPress={() => {
                            onSelected(address?.id)
                            edit && ChangeOtherValue("")
                          }}>

                          {address?.isSelected ? (
                            <View style={[style.radioButtonTrue]}>
                              <View style={[style.radioButtonTrue2]} />
                            </View>
                          ) :
                            <View style={[style.radioButtonTrue, { backgroundColor: "white" }]}>
                              <View style={{ backgroundColor: "white" }} />
                            </View>
                          }
                        </TouchableOpacity>
                        <Text style={style.radioTitle}>{address?.name}</Text>
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
            {locationError ? <ValidationError errorText={locationError} /> : null}
            {// styling issue in radio button that's why display by state value input
              onRenderInput && <View style={{}}>
                <CommonTextInput
                  value={otherAddressValue}
                  onChangeText={(value: any) => {
                    ChangeOtherValue(value)
                  }}
                  wrapperStyle={[style.boxShedo]}
                  placeholder={'Save as..'}
                  returnKeyType={String.go}
                  autoCapitalize={String.keybordNone}
                  style={style.textInputTextStyle}
                />
              </View>
            }

            {/* .................................................Checkbox handler........................................................ */}


            <View style={style.defaultPaymentWrapper}>
              <TouchableOpacity
                disabled={editDetails?.isDefault}
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
              buttonText={
                edit === true ? String.addAdd?.editSaveAdd : String.addAddress
              }
              onPress={() => {
                handleValidation();
              }}
              warperStyle={[style.addPaymentButton, { marginTop: 50, marginBottom: 8 }]}
            />
            <Text
              style={[
                style.title,
                style.cancleWrapper,
                edit === true && { color: Colour.red },
              ]}
              onPress={() => {
                edit
                  ? setModalVisible(true)
                  : navigation.goBack()
              }}>
              {edit ? String.addAdd?.editCancle : String.addCard.cancle}
            </Text>
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>



      {isVisibleModal && (
        <BlurView
          style={style.absolute}
          blurType={'dark'}
          blurAmount={10}
          blurRadius={1}
          reducedTransparencyFallbackColor={Colour.cardBlur}>
          <LogOutModel
            loder={loading}
            wrapperStyle={{ bottom: 10 }}
            isVisibleModal={isVisibleModal}
            title={String.accountModelTexe.removeAddress}
            subtitle={String.accountModelTexe.removeAddSubText}
            buttonPress={() => {
              onHandleRemoveAddress()
              // setModalVisible(false);
            }}
            iconBGColor={Colour.peachyOrangeShade}
            Svg={DeleteAdd}
            buttonText={String.accountModelTexe.yesRemove}
            canclePress={() => {
              setModalVisible(false);
            }}
          />
        </BlurView>
      )}
    </>
  );
};

export default AddAddress;
