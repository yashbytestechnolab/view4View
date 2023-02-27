import { View, Text, StyleSheet, ScrollView, StatusBar, SafeAreaView, Platform, Linking } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { BlurView } from '@react-native-community/blur';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { commonStyles } from '../../../constants/CommonStyles';
import { Colour } from '../../../theme';
import { ROUTES, String } from '../../../constants';
import Profile from '../../../components/Profile/Profile';
import { Fonts, Images } from '../../../assets';
import AccountTab from '../../../components/AccountTab/AccountTab';
import StatusHistory from '../../../assets/icons/StatusHistory';
import ShippingAdd from '../../../assets/icons/ShippingAdd';
import PaymentInfo from '../../../assets/icons/PaymentInfo';
import Favorite from '../../../assets/icons/Favorite';
import TermsCondition from '../../../assets/icons/TermsCondition';
import Privacy from '../../../assets/icons/privacy';
import Delete from '../../../assets/icons/Delete';
import Logout from '../../../assets/icons/Logout';

import UserProfile from '../../../assets/icons/UserProfile';
import { AuthContext } from '../../../context/AuthContext';
import LogOutModel from '../../../components/LogOutModel/LogOutModel';
import { style } from './style';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import SamsungHealthAndroid from 'react-native-samsung-health-android'
import GoogleFit from 'react-native-google-fit';
import { useLazyQuery, useQuery } from '@apollo/client';
import appleAuth from '@invertase/react-native-apple-authentication';
import { DELETE_USER, GET_USER_INFORMATION } from '../../../graphQL/Queries';
import * as LocalStorage from '../../../services/LocalStorage';
import { LocalStorageKeys } from '../../../constants/LocalStorageKeys';
import { config } from '../../../config';
import DeleteAdd from '../../../assets/icons/DeleteAdd';
import { showMessage } from 'react-native-flash-message';
import { CommonContext } from '../../../context/AppContext';
import { client } from '../../../services/ApiHeader';

const Account = () => {
  const navigation: any = useNavigation();
  const { signOut } = useContext(AuthContext);
  const [isVisibleModal, setModalVisible]: any = useState(false);
  const [deleteAcc, setDeleteAcc]: any = useState(false);
  const [userInfo, _userInfo]: any = useState(null);
  const route = useRoute();
  const { params } = route;
  const imageStorageUrl = config.imageStorageUrl;
  const { loading, setLoading } = useContext(CommonContext);

  const [
    getUserData,
    {
      data,
      loading: dataLoading,
      error
    },
  ]: any = useLazyQuery(GET_USER_INFORMATION, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });


  // const [
  //   deleteUser,
  //   {
  //     data: deleteData,
  //     loading: deleteLoading,
  //     error: deleteError
  //   },
  // ]: any = useLazyQuery(DELETE_USER, {
  //   fetchPolicy: 'no-cache',
  //   nextFetchPolicy: 'no-cache',
  //   errorPolicy: 'all'
  // });

  const [deleteUser, {
    loading: deleteLoading,
    data: deleteData,
    error: deleteError
  }] = useLazyQuery(
    DELETE_USER,
    {
      variables: {
        "deleteAppUserId": userInfo?._id
      },
    }
  );

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    if (params?.isUpdate) {
      getUserData()
    }
  }, [params])

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '815904643318-887s7sndb8j3k564ausb25q1lqesaf3t.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, [])

  useEffect(() => {
    if (!error && !dataLoading) {
      _userInfo(data?.me?.user)
    }
  }, [data, error, dataLoading])

  const logoutHandler = async () => {
    try {
      switch (userInfo?.trackerType) {
        case 'appleHealth':
          if (appleAuth.State.AUTHORIZED == 1) {
            await LocalStorage.setValue(LocalStorageKeys.appleTrackerId, null);
          }
          break;
        case 'googleFit':
          if (Platform.OS !== "ios") {
            const isSignedIn = await GoogleSignin.isSignedIn();
            if (isSignedIn) {
              await GoogleSignin.signOut();
            }
            await GoogleFit.disconnect();
          }
          break;
        case 'samsungHealth':
          const isSignedInCheck = await GoogleSignin.isSignedIn();
          console.log("isSignedIn==>", isSignedInCheck);
          if (isSignedInCheck) {
            await GoogleSignin.signOut();
          }
          await SamsungHealthAndroid.disconnect();
          break;
        case 'fitbit':
          const isGSignedIn = await GoogleSignin.isSignedIn();
          if (isGSignedIn) {
            await GoogleSignin.signOut();
          }
          await LocalStorage.setValue(LocalStorageKeys.fitbitAccessToken, null);
          await LocalStorage.setValue(LocalStorageKeys.fitbitUserId, null);
          break;
        default:
          break;
      }
      setModalVisible(false)
      client.resetStore();
      signOut('');




      // const isSignedIn = await GoogleSignin.isSignedIn();
      // if (isSignedIn) {
      //   console.log("inside isSignedIn==>", isSignedIn);
      //   await GoogleSignin.signOut();
      // } else if (appleAuth.State.AUTHORIZED == 1) {
      //   await appleAuth.performRequest({ requestedOperation: appleAuth.Operation.LOGOUT });
      // }

      // if (userInfo?.trackerType == "samsungHealth") {
      //   await SamsungHealthAndroid.disconnect();
      // } else if (userInfo?.trackerType == "googleFit") {
      //   await GoogleFit.disconnect();
      // } else if (userInfo?.trackerType == "fitbit") {
      //   // await GoogleFit.disconnect();
      // }

      // setModalVisible(false)
      // signOut('');
    } catch (error) {
      console.log("error===>", error);
    }
  }

  const onDeleteAccount = async () => {
    setLoading(true)
    deleteUser().then((res: any) => {
      setLoading(false)
      if (res?.data?.deleteAppUser?.errorCode == "1") {
        showMessage({
          message: res?.data?.deleteAppUser?.message,
          type: "danger",
        });
      } else {
        logoutHandler()
      }
    }).catch((catched: any) => {
      setLoading(false)
      showMessage({
        message: catched?.message,
        type: "danger",
      });
    });
  }
  return (
    <>
      <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colour.white }} >
      {/* <StatusBar barStyle={String.darkContent} backgroundColor={Colour.white} /> */}

        <ScrollView style={[commonStyles.whiteBG]}>
          {/* .............................profile...................................................    */}
          <Profile
            image={userInfo?.profilepicture == null ? Images.heart : { uri: `${imageStorageUrl + userInfo?.profilepicture}` }}
            smallHeaderText={'Account'}
            TitleHeaderText={userInfo?.firstname?.length > 0 || userInfo?.lastname?.length > 0 ?
              `${userInfo?.firstname?.charAt(0)?.toUpperCase() + userInfo?.firstname?.slice(1)?.toLowerCase() + " " +
              userInfo?.lastname?.charAt(0).toUpperCase() + userInfo?.lastname?.slice(1)?.toLowerCase()}
              ` : "Hello! there.."}
            smallTextStyle={{ color: Colour.gray500 }}
            titleTextStyle={{ color: Colour.PrimaryBlue }}
          />
          {/* .................................account...........................................................  */}

          <Text style={style.title}>{String.account.account}</Text>
          <View style={[commonStyles.bigCardBorder, style.margin]}>
            <AccountTab
              Svg={UserProfile}
              title={String.account.profileSetting}
              textStyle={style.padding}
              onPress={() => {
                navigation.navigate(ROUTES.ProfileSetting, { userInfo });
              }}
            />
            <View style={commonStyles.grayBorder} />
            <AccountTab
              Svg={StatusHistory}
              title={String.account.statsHistory}
              textStyle={style.padding}
              onPress={() => {
                navigation.navigate(ROUTES.History);
              }}
            />
            <View style={commonStyles.grayBorder} />
            <AccountTab
              Svg={ShippingAdd}
              title={String.account.shippingAddresses}
              textStyle={style.padding}
              onPress={() => {
                navigation.navigate(ROUTES.Address2, { userInfo });
              }}
            />
            <View style={commonStyles.grayBorder} />
            <AccountTab
              Svg={PaymentInfo}
              title={String.account.paymentInformation}
              textStyle={style.padding}
              onPress={() => {
                navigation.navigate(ROUTES.PaymentInformation);
              }}
            />
            <View style={commonStyles.grayBorder} />
            <AccountTab
              Svg={Favorite}
              title={String.account.favorites}
              textStyle={style.padding}
              onPress={() => {
                navigation.navigate(ROUTES.Favorite);
              }}
            />
          </View>
          {/* .................................legal...........................................................  */}

          <Text style={style.title}>{String.account.legal}</Text>
          <View
            style={[commonStyles.bigCardBorder, style.margin, style.bottomMargin]}>
            <AccountTab
              Svg={TermsCondition}
              title={String.account.termsConditions}
              textStyle={style.padding}
              onPress={() => {
                // navigation.navigate(ROUTES.TermsCondition);
                Linking.openURL('https://centavizer.com/terms/')
              }}
            />
            <View style={commonStyles.grayBorder} />
            <AccountTab
              Svg={Privacy}
              textStyle={style.padding}
              title={String.account.privacy}
              onPress={() => {
                // navigation.navigate(ROUTES.Privacy);
                Linking.openURL('https://centavizer.com/privacy/')
              }}
            />
            <View style={commonStyles.grayBorder} />
            <AccountTab
              Svg={Delete}
              textStyle={style.padding}
              title={String.account.deleteAccount}
              onPress={() => {
                setDeleteAcc(true);
                setModalVisible(!isVisibleModal);
              }}
            />
            <View style={commonStyles.grayBorder} />
            <AccountTab
              Svg={Logout}
              textStyle={style.padding}
              title={String.account.logout}
              onPress={() => {
                setDeleteAcc(false);
                setModalVisible(!isVisibleModal);
              }}
            />
          </View>
          {isVisibleModal && (
            <BlurView
              style={style.absolute}
              blurType={'dark'}
              blurAmount={10}
              blurRadius={1}
              reducedTransparencyFallbackColor={Colour.cardBlur}>
              {deleteAcc === true ? (
                <LogOutModel
                  loder={loading}
                  isVisibleModal={isVisibleModal}
                  title={String.accountModelTexe.deleteAccount}
                  subtitle={String.accountModelTexe.deleteAccSubText}
                  buttonPress={() =>
                    onDeleteAccount()
                  }
                  iconBGColor={Colour.peachyOrangeShade}
                  Svg={DeleteAdd}
                  buttonText={String.accountModelTexe.dltAccount}
                  canclePress={() => {
                    setModalVisible(false);
                  }}
                />
              ) : (
                <LogOutModel
                  isVisibleModal={isVisibleModal}
                  title={String.accountModelTexe.logout}
                  subtitle={String.accountModelTexe.logoutSubText}
                  buttonPress={logoutHandler}
                  iconBGColor={Colour.peachyOrangeShade}
                  Svg={Logout}
                  buttonText={String.accountModelTexe.yesLogout}
                  canclePress={() => {
                    setModalVisible(false);
                  }}
                />
              )}
            </BlurView>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Account;
