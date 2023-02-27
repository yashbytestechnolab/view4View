import React, { FC, useRef, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { Colour } from '../../../theme';
import { BackButton } from '../../../components/BackButton/BackButton';
import { ROUTES, String } from '../../../constants';
import { commonStyles } from '../../../constants/CommonStyles';
import { CommonButton, CommonTextInput } from '../../../components';
import { Email } from '../../../assets/icons/Email';
import { Right } from '../../../assets/icons/Right';
import { AddPaymentMethod } from '../../../constants/validation';
import { style } from './style';
import MasterCard from '../../../assets/icons/MasterCard';
import creditCardType from 'credit-card-type';
import Phone from '../../../assets/icons/Phone';

const AddNewCard: FC = () => {
  // ....................................useRef...............................................
  const cardNum: any = useRef();
  const expiry: any = useRef();
  const cvv: any = useRef();
  const addLine1: any = useRef();
  const addLine2: any = useRef();
  const cityName: any = useRef();
  const state: any = useRef();
  const zip: any = useRef();
  const contactNo: any = useRef();
  const email: any = useRef();

  const [paymentDetails, setPaymentDetails]: any = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    addLine2: '',
    addline2: '',
    cityName: '',
    state: '',
    zip: '',
    number: '',
    email: '',
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [defaultPayment, setDefaultPayment]: any = useState(false);
  const [cardType, setCardType] = useState('');
  const navigation: any = useNavigation();
  const formik = useFormik({
    initialValues: {
      name: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      addLine2: '',
      addline2: '',
      cityName: '',
      state: '',
      zip: '',
      number: '',
      email: '',
    },
    validationSchema: AddPaymentMethod,
    onSubmit: values => {
      handleLogin(values);
    },
  });
  const handleLogin = async (data: any) => {
    setLoader(true);
    //navigation.navigate(ROUTES.FitnessTracker);

    const payload = {
      email: data.email?.toLowerCase(),
      password: data.password,
    };
  };
  const handleDefaultPayment = () => {
    setDefaultPayment(!defaultPayment);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colour.white, }}>
      <ScrollView >
        <StatusBar backgroundColor={Colour.white} barStyle={'dark-content'} />
        {/* .................................backArrow...................................................... */}
        <View>
          <BackButton
            color={Colour.black}
            title={String.addCard.title}
            textStyle={commonStyles.backButtonText}
            wrapperStyle={style.arrow}
            iconStyle={{}}
          />
        </View>
        <Text style={style.cardDetailTitle}>{String.addCard.cardDetails}</Text>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          keyboardShouldPersistTaps={String?.handled}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          style={style.wrapper}>
          {/* ......................................card Details.............................................................        */}

          <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            <Text style={style.title}>{String.addCard.NameOnCard}</Text>
            <CommonTextInput
              placeholder={'Olivia Rhye'}
              wrapperStyle={commonStyles.grayTextInputBorder}
              style={style.textInputTextStyle}
              // value={paymentDetails.name}
              // onChangeText={(value: any) => {
              //   formik.setFieldValue(String.email, value);
              //   setError('');
              // }}
              keyboardType={String.keyboardEmail}
              returnKeyType={String.keybordNext}
              autoCapitalize={String.keybordNone}
              onSubmitEditing={() => cardNum.current.focus()}
            />
            <Text style={style.title}>{String.addCard.cardNum}</Text>
            <CommonTextInput
              wrapperStyle={commonStyles.grayTextInputBorder}
              placeholder={'4444 4444 4444 5555'}
              keyboardType={String.keybordnum}
              ref={cardNum}
              returnKeyType={String.keybordNext}
              autoCapitalize={String.keybordNone}
              svg={MasterCard}
              style={style.textInputTextStyle}
              onSubmitEditing={() => expiry.current.focus()}
              onChangeText={(cardNum: any) => {
                const cardTypeResult = creditCardType(cardNum);
                console.log("cardTypeResult", cardTypeResult[0].niceType);
                if (cardTypeResult.length === 1)
                  setCardType(cardTypeResult[0].niceType);
                else setCardType("...");
              }}
            />
            <View style={commonStyles.row}>
              <View style={commonStyles.column}>
                <Text style={style.title}>{String.addCard.expiry}</Text>
                <CommonTextInput
                  wrapperStyle={style.expiryTextInputWrapper}
                  placeholder={'19/12/95'}
                  ref={expiry}
                  keyboardType={String.keybordnum}
                  returnKeyType={String.keybordNext}
                  autoCapitalize={String.keybordNone}
                  style={style.textInputTextStyle}
                  onSubmitEditing={() => cvv.current.focus()}
                />
              </View>
              <View style={commonStyles.column}>
                <Text style={style.title}>{String.addCard.cvv}</Text>
                <CommonTextInput
                  wrapperStyle={style.expiryTextInputWrapper}
                  placeholder={'222'}
                  ref={cvv}
                  keyboardType={String.keybordnum}
                  returnKeyType={String.keybordNext}
                  autoCapitalize={String.keybordNone}
                  style={style.textInputTextStyle}
                  onSubmitEditing={() => addLine1.current.focus()}
                />
              </View>
            </View>
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
                {String.addCard.defaultPayment}
              </Text>
            </View>
          </View>
          {/* ............................................Billing Address................................................................       */}
          <Text style={style.cardDetailTitle}>{String.addCard.billingAddress}</Text>

          <View style={{ paddingHorizontal: 16 }}>
            <Text style={style.title}>{String.addCard.addressLine1}</Text>
            <CommonTextInput
              wrapperStyle={commonStyles.grayTextInputBorder}
              placeholder={'addressLine1'}
              ref={addLine1}
              returnKeyType={String.keybordNext}
              autoCapitalize={String.keybordNone}
              style={style.textInputTextStyle}
              onSubmitEditing={() => addLine1.current.focus()}
            />
            <Text style={style.title}>{String.addCard.addressLine2}</Text>
            <CommonTextInput
              wrapperStyle={commonStyles.grayTextInputBorder}
              placeholder={'addressLine2'}
              ref={addLine2}
              returnKeyType={String.keybordNext}
              autoCapitalize={String.keybordNone}
              style={style.textInputTextStyle}
              onSubmitEditing={() => addLine2.current.focus()}
            />
            <View style={commonStyles.row}>
              <View style={commonStyles.column}>
                <Text style={style.title}>{String.addCard.cityName}</Text>
                <CommonTextInput
                  wrapperStyle={style.expiryTextInputWrapper}
                  placeholder={'City'}
                  ref={cityName}
                  returnKeyType={String.keybordNext}
                  autoCapitalize={String.keybordNone}
                  style={style.textInputTextStyle}
                  onSubmitEditing={() => state.current.focus()}
                />
              </View>
              <View style={commonStyles.column}>
                <Text style={style.title}>{String.addCard.state}</Text>
                <CommonTextInput
                  wrapperStyle={style.expiryTextInputWrapper}
                  placeholder={'gujarat'}
                  ref={state}
                  returnKeyType={String.keybordNext}
                  autoCapitalize={String.keybordNone}
                  style={style.textInputTextStyle}
                  onSubmitEditing={() => zip.current.focus()}
                />
              </View>
            </View>
            <View style={commonStyles.row}>
              <View style={commonStyles.column}>
                <Text style={style.title}>{String.addCard.state}</Text>
                <CommonTextInput
                  wrapperStyle={style.expiryTextInputWrapper}
                  placeholder={'gujarat'}
                  ref={state}
                  returnKeyType={String.keybordNext}
                  autoCapitalize={String.keybordNone}
                  style={style.textInputTextStyle}
                  onSubmitEditing={() => zip.current.focus()}
                />
              </View>
              <View style={commonStyles.column}>
                <Text style={style.title}>{String.addCard.zip}</Text>
                <CommonTextInput
                  wrapperStyle={style.expiryTextInputWrapper}
                  placeholder={'362265'}
                  ref={zip}
                  keyboardType={String.keybordnum}
                  returnKeyType={String.keybordNext}
                  autoCapitalize={String.keybordNone}
                  style={style.textInputTextStyle}
                  onSubmitEditing={() => contactNo.current.focus()}
                />
              </View>
            </View>
            {/* ..................................Biling Contact.......................................................    */}
            <Text style={style.billingContact}>{String.addCard.billingContact}</Text>
            <Text style={style.title}>{String.addCard.contactNumber}</Text>
            <CommonTextInput
              placeholder={'9904769976'}
              wrapperStyle={commonStyles.grayTextInputBorder}
              style={style.textInputTextStyle}
              svg={Phone}
              ref={contactNo}
              //value={email}
              // onChangeText={(value: any) => {
              //   formik.setFieldValue(String.email, value);
              //   setError('');
              // }}
              keyboardType={String.keybordnum}
              returnKeyType={String.keybordNext}
              autoCapitalize={String.keybordNone}
              onSubmitEditing={() => email.current.focus()}
            />
            <Text style={style.title}>{String.addCard.emailAddress}</Text>
            <CommonTextInput
              placeholder={'bytes@gmail.com'}
              wrapperStyle={commonStyles.grayTextInputBorder}
              style={style.textInputTextStyle}
              svg={Email}
              ref={email}
              //value={email}
              // onChangeText={(value: any) => {
              //   formik.setFieldValue(String.email, value);
              //   setError('');
              // }}
              keyboardType={String.keyboardEmail}
              returnKeyType={String.keybordNext}
              autoCapitalize={String.keybordNone}
              onSubmitEditing={() => cardNum.current.focus()}
            />
            <CommonButton
              buttonText={String.addCard.addPaymentMethod}
              onPress={undefined}
              warperStyle={style.addPaymentButton}
            />
            <Text
              style={[style.title, style.cancleWrapper]}
              onPress={() => {
                navigation.navigate(ROUTES.CartCheckout);
              }}>
              {String.addCard.cancel}
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AddNewCard;
