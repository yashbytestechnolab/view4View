import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import AddAddress from '../../../../components/AddAddress/AddAddress';
import {commonStyles} from '../../../../constants/CommonStyles';
import {BackButton} from '../../../../components/BackButton/BackButton';
import {Colour} from '../../../../theme';
import {ROUTES, String} from '../../../../constants';
import {Fonts} from '../../../../assets';
import {Plus} from '../../../../assets/icons/Plus';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useLazyQuery, useMutation} from '@apollo/client';
import {Get_Address} from '../../../../graphQL/Queries';
import {SafeAreaView} from 'react-navigation';
import {CommonContext} from '../../../../context/AppContext';
import {UPDATE_ADDRESS} from '../../../../graphQL/Mutations';
import {showMessage} from 'react-native-flash-message';

const Address = () => {
  const navigation: any = useNavigation();
  const [defaultAdd, setDefaultAdd]: any = useState([]);
  const {setLoading} = useContext(CommonContext);
  const [AdreesData, {data, loading, error, refetch: getUpdatedAddress}] =
    useLazyQuery(Get_Address);
  const route: any = useRoute();
  const [updateAddress, updateError] = useMutation(UPDATE_ADDRESS);
  const [finalAddress, _setFInalAddress] = useState();
  const focus = useIsFocused();

  // updating useEffect value by route value
  let isUpdateingApi = route?.params?.isUpdatingAddress;
  let defaultAddressId = route?.params?.userInfo?.defaultAddress?._id;

  useEffect(() => {
    AdreesData();

    console.log('pa', route?.params?.defaultAddressId);
    const result = data?.getAddress?.data?.map((add: any) => {
      if (route?.params?.isDefault) {
        return {
          ...add,
          isDefault: add?._id === route?.params?.address_id ? true : false,
        };
      } else {
        return {
          ...add,
          isDefault: add?._id === defaultAddressId ? true : false,
        };
      }
    });
    setDefaultAdd(result);
    _setFInalAddress(result);
  }, [data, focus]);

  useEffect(() => {
    isUpdateingApi && getUpdatedAddress();
  }, [isUpdateingApi, focus]);

  const handleDefaultAddress = (id: any) => {
    let defaultData = {};
    let defaultAddress = data?.getAddress?.data?.map((add: any) => {
      if (add?._id === id) {
        return (defaultData = {...add, isDefault: true});
      } else {
        return {...add, isDefault: false};
      }
    });
    setLoading(true);
    setDefaultAdd(defaultAddress);
    onHandleDefaultAddress(defaultData, defaultAddress);
  };

  const onHandleDefaultAddress = (data: any, defaultAddress: any) => {
    // on Click update radio button name and pass api value
    updateAddress({
      variables: {
        input: {
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          country_id: data.country_id._id,
          state_id: data.state_id._id,
          zipcode: data.zipcode,
          addressType: data.addressType?.toLowerCase(),
          isDefault: true,
          address_id: data._id,
        },
      },
    })
      .then((response: any) => {
        setLoading(false);
        setDefaultAdd(defaultAddress);
      })
      .catch((error: any) => {
        showMessage({
          message: error?.message,
          type: 'danger',
        });
        setDefaultAdd(finalAddress);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(loading);
    // const backAction = () => {
    //   // Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //   //   {
    //   //     text: "Cancel",
    //   //     onPress: () => null,
    //   //     style: "cancel"
    //   //   },
    //   //   { text: "YES", onPress: () => BackHandler.exitApp() }
    //   // ]);
    //   setLoading(false);

    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );

    // return () => backHandler.remove();
  }, [loading]);

  return (
    <>
      <StatusBar barStyle={String.darkContent} backgroundColor={Colour.white} />
      <SafeAreaView
        style={{
          display: 'flex',
          flex: 1,
          backgroundColor: Colour.white,
          paddingTop: 40,
        }}>
        <BackButton
          color={Colour.PrimaryBlue}
          textStyle={commonStyles.backButtonText}
          title={String.addCard.shippingAdd}
          wrapperStyle={[
            {marginLeft: -3},
            Platform.OS === 'ios' && {marginTop: 28},
          ]}
          action={ROUTES.AccountLanding}
          navigationParams={{isUpdate: true}}
        />
        <TouchableOpacity
          style={style.addNewAddWrapper}
          onPress={() => {
            navigation.navigate(ROUTES.AddAddress);
          }}>
          <Plus />
          <Text style={style.newAddStyle}> {String.addCard.addNewAdd}</Text>
        </TouchableOpacity>
        <Text style={style.newAddStyle}> {String.addCard.saveAddress}</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingRight: 16,
            paddingLeft: 17,
            marginTop: 10,
            marginBottom: 20,
          }}>
          {defaultAdd?.length > 0 ? (
            defaultAdd?.map((item: any) => {
              return (
                <AddAddress
                  key={item?._id}
                  title={item?.addressType}
                  address1={item?.addressLine1}
                  address2={item?.addressLine1}
                  setDefaultAdd={handleDefaultAddress}
                  defaultAdd={defaultAdd}
                  city={item?.city}
                  state={item?.state_id?.name}
                  zipCode={item?.zipcode}
                  country={item?.country_id?.name}
                  item={item}
                  editPress={() => {
                    navigation.navigate(ROUTES?.AddAddress, {
                      editAdd: true,
                      // On Press Pass Item In Screen
                      Item: item,
                    });
                  }}
                />
              );
            })
          ) : (
            <View style={style.noAddressFound}>
              <Text style={style.text}>No Address Found</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView
        style={{display: 'flex', flex: 0, backgroundColor: Colour.white}}
      />
    </>
  );
};

export default Address;

const style = StyleSheet.create({
  newAddStyle: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    fontSize: 14,
    color: Colour.PrimaryBlue,
    paddingLeft: 17,
  },
  addNewAddWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingTop: 31,
    paddingBottom: 16,
    paddingRight: 16,
  },
  wrapperAdd: {
    backgroundColor: Colour.white,
    borderColor: Colour.solidGray,
    marginTop: 12,
  },
  noAddressFound: {
    flex: 1,
    height: Dimensions.get('screen').height / 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  text: {
    fontFamily: Fonts.ManropeRegular,
    color: Colour.primaryBlue700,
    fontWeight: '700',
    fontSize: 15,
    paddingTop: 4,
  },
});
