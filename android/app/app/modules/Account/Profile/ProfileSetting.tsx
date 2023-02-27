import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Alert,
  Platform,
  Pressable,
  Keyboard,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import moment from 'moment';
import BorderTextInput from '../../../components/BorderTextInput/BorderTextInput';
import Phone from '../../../assets/icons/Phone';
import Profile from '../../../assets/icons/Profile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from "react-native-flash-message";
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';
import { commonStyles } from '../../../constants/CommonStyles';
import { BackButton } from '../../../components/BackButton/BackButton';
import { Colour } from '../../../theme';
import { ROUTES, String } from '../../../constants';
import { Fonts, Images } from '../../../assets';
import { Email } from '../../../assets/icons/Email';
import { Date as Setting } from '../../../assets/icons/Date';
import { Lock } from '../../../assets/icons/Lock';
import { Unlink } from '../../../assets/icons/Unlink';
import { CommonButton } from '../../../components';
import { gender } from '../../../constants/DummyJson.ts/JsonFile';
import { CustomPhoneNumber } from '../../../components/DropDown/CustomPhoneNumber';
import { ShowPwd } from '../../../assets/icons/ShowPwd';
import { HidePwd } from '../../../assets/icons/HidePwd';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cloneDeep } from '@apollo/client/utilities';
import { launchImageLibrary } from 'react-native-image-picker';
import { Edit } from '../../../assets/icons/Edit';
import { useMutation } from '@apollo/client';
import { EDIT_USER_PROFILE, CHAGE_USER_PASSWORD, UNLINK_TRACKER } from '../../../graphQL/Mutations';
import { ProfileIconBack } from '../../../assets/icons';
import { ReactNativeFile } from 'apollo-upload-client';
import { config } from '../../../config';
import { CommonContext } from '../../../context/AppContext';
import LogOutModel from '../../../components/LogOutModel/LogOutModel';
import { styles } from '../../Deals/style';
import DatePicker from 'react-native-date-picker'


const ProfileSetting = () => {
  const [showPwd, setShowPwd]: any = useState(true);
  const [ShowCal, setShowCal]: any = useState(false);
  const [date, setDate]: any = useState(new Date());
  const [profilePic, setProfilePic]: any = useState(null);
  const [editProfile] = useMutation(EDIT_USER_PROFILE);
  const [changePassword] = useMutation(CHAGE_USER_PASSWORD);
  const [unlinkTracker] = useMutation(UNLINK_TRACKER);
  const passWordRegex: any = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/


  const imageStorageUrl = config.imageStorageUrl;
  const phoneInput = useRef<PhoneInput>(null);
  const route = useRoute();
  const { params }: any = route
  const navigation = useNavigation();

  const [currentPass, setCurrentPass]: any = useState(null);
  const [currentPassErr, setCurrentPassErr]: any = useState(null);

  const [newPass, setNewPass]: any = useState(null)
  const [newPassErr, setNewPassErr]: any = useState(false)
  const [showUnlinkTrackerModel, toggleUnlinkModel]: any = useState(false)
  const [trackerName, setTrackerName]: any = useState(params?.userInfo?.trackerType || null)

  const { loading, setLoading } = useContext(CommonContext);

  const [profileDetils, setProfileDetails]: any = useState({
    firstName: params?.userInfo?.firstname || '',
    lastName: params?.userInfo?.lastname || '',
    gender: params?.userInfo?.gender || '',
    phoneNumber: params?.userInfo?.phoneno || '',
    emailAdd: params?.userInfo?.email || '',
    dateOFBirth: params?.userInfo?.dob || null,
    currentPass: params?.userInfo?.defaultAddress || '',
    newPass: params?.userInfo?.firstname || '',
  });

  const onUpdateDetails = (key: any, value: any) => {
    let profileInfo = profileDetils
    if (key === 'phoneNumber') {
      profileInfo[key] = `${value}`
      setProfileDetails(cloneDeep(profileInfo))
    } else {
      profileInfo[key] = value
      setProfileDetails(cloneDeep(profileInfo))
    }
  }

  const onUpdateProfile = async () => {
    const profileImage = new ReactNativeFile({
      uri: profilePic?.uri,
      name: profilePic?.fileName,
      type: profilePic?.type,
    });

    let updatedUserData = {
      _id: params?.userInfo?._id,
      userData: {
        email: profileDetils?.emailAdd,
        firstname: profileDetils?.firstName,
        lastname: profileDetils?.lastName,
        gender: profileDetils?.gender,
        phoneno: profileDetils?.phoneNumber,
        dob: profileDetils?.dateOFBirth,
      }
    }
    let updateUserWithProfileImg = {
      _id: params?.userInfo?._id,
      userData: {
        email: profileDetils?.emailAdd,
        firstname: profileDetils?.firstName,
        lastname: profileDetils?.lastName,
        gender: profileDetils?.gender,
        phoneno: profileDetils?.phoneNumber,
        dob: profileDetils?.dateOFBirth,
      },
      profilepictureFile: profileImage
    }
    profilePic?.fileName?.length > 2 ? updateUserWithProfileImg : updatedUserData

    await editProfile({
      variables: {
        input: profilePic?.fileName?.length > 2 ? updateUserWithProfileImg : updatedUserData
      },
    })
      .then((response: any) => {
        setLoading(false)
        navigation.navigate(ROUTES.AccountLanding, { isUpdate: true })
      })
      .catch((catched: any) => {
        console.log("response", response);

        setLoading(false)
        setProfilePic([]);
        showMessage({
          message: catched?.message,
          type: "danger",
        });
      });
  }

  const onChangePassword = async () => {
    let passwordInput = {
      oldPassword: currentPass,
      newPassword: newPass
    }

    await changePassword({
      variables: {
        input: passwordInput
      },
    })
      .then((response: any) => {
        onUpdateProfile()
      })
      .catch((catched: any) => {
        setLoading(false)
        showMessage({
          message: catched?.message,
          type: "danger",
        });
        setProfilePic([])
      });
  }

  const onSave = async () => {

    let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    // if (currentPass?.length > 0) {
    //   let passWordErr = passRegex.test(currentPass);
    //   !passWordErr && setCurrentPassErr("Must contain 8 characters, one Uppercase, one Lowercase, one Number and One Special Case Character")
    // }
    // let checkDate = ""
    // if (date >= utc) {
    //   checkDate = "Not Valid"
    //   Alert.alert("Please Enter Valid Data")
    // }

    // if (currentPass?.length > 0 && newPass?.length === undefined) {
    //   let passWordErr = passRegex.test(newPass);
    //   !passWordErr && setNewPassErr("Please Enter Password")
    // }

    // if (currentPass?.length > 0 && newPass?.length > 0) {
    //   let passWordErr = passRegex.test(newPass);
    //   !passWordErr && setNewPassErr("Must contain 8 characters, one Uppercase, one Lowercase, one Number and One Special Case Character")
    // }
    let currentPassError = ""; let NewPassError = ""
    if (currentPass?.length > 0) {
      if (!passRegex.test(currentPass)) {
        setCurrentPassErr("Must contain 8 characters, one Uppercase, one Lowercase, one Number and One Special Case Character")
        currentPassError = "valid pass please"
      }
    }
    if (newPass?.length > 0) {
      if (!passRegex.test(newPass)) {
        setNewPassErr("Must contain 8 characters, one Uppercase, one Lowercase, one Number and One Special Case Character")
        NewPassError = "valid pass please"
      }
    }
    if (currentPassError === "" && NewPassError === "") {
      if (!currentPassErr && !newPassErr) {
        setLoading(true)
        if (currentPass?.length > 1) {
          await onChangePassword()
          return
        }
        await onUpdateProfile()
      }
      setLoading(true);
      if (currentPass?.length > 1) {
        await onChangePassword()
        return
      }
      await onUpdateProfile()
      console.log("new Passs", newPass);
    }

  }

  const onPressUnlink = async () => {
    setLoading(true);
    await unlinkTracker()
      .then((response: any) => {
        setLoading(false)
        toggleUnlinkModel(false);
        setTrackerName(null)
        // navigation.navigate(ROUTES.AccountLanding, { isUpdate: true })
      })
      .catch((catched: any) => {
        setLoading(false)
        showMessage({
          message: catched?.message,
          type: "danger",
        });
      });
  }

  const openGallery = async () => {
    let options: any = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };
    await launchImageLibrary(options, (response: any) => {
      if (response?.didCancel) {
        return
      }
      if (response?.assets?.[0]?.uri?.length > 1 && response?.assets[0]?.fileSize <= 5242880) {
        setProfilePic(cloneDeep(response?.assets[0]));
      }
      else {
        Alert.alert('Image size must be less than 5MB');
      }
    })
      .catch(err => {
        console.log("err", err);
      })
  };

  var utc: any = new Date()?.toJSON()?.slice(0, 10)?.replace(/-/g, '/');

  return (
    <>
      <StatusBar barStyle={String.darkContent} backgroundColor={Colour.white} />
      <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colour.white }} >
        <BackButton
          color={Colour.black}
          title={String.account.profileSetting}
          wrapperStyle={style.backWrapper}
          textStyle={style.title}
          action={ROUTES.AccountLanding}
          navigationParams={{ isUpdate: true }}
        />
        <ScrollView style={[style.whiteBG]}
          onMomentumScrollBegin={() => Keyboard.dismiss()}

        //  onResponderStart={}
        >
          <View style={style.profileImageWrapper}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                openGallery();
              }}>
              {params?.userInfo?.profilepicture == null && profilePic?.uri?.length === undefined ?
                (
                  <View style={style.profileBlackShade}>
                    <Profile />
                    <View style={{ position: 'absolute', bottom: 30 }}>
                      <Edit />
                    </View>
                  </View>
                ) : (
                  <ImageBackground
                    source={{ uri: profilePic?.uri || `${imageStorageUrl + params?.userInfo?.profilepicture}` }}
                    style={[style.profileImage, style.profileBlackShade]}
                    borderRadius={40}>
                    {(profilePic?.uri || `${imageStorageUrl + params?.userInfo?.profilepicture}`).toString().length < 0 && <ProfileIconBack />}
                    <View style={[{ position: 'absolute' }, (params?.userInfo?.profilepicture != null || profilePic?.uri?.length > 1) && { top: 48, right: 0 }]}>
                      <Edit />
                    </View>
                  </ImageBackground>
                )}
            </TouchableOpacity>
          </View>
          {/* {/ ................................firstName -surname...............................   /} */}
          <KeyboardAwareScrollView
            // onScroll={()=>Keyboard.dismiss()}
            resetScrollToCoords={{ x: 0, y: 0 }}
            keyboardShouldPersistTaps={String?.handled}
            showsVerticalScrollIndicator={false}
            extraHeight={1}
            scrollEnabled={true}>
            <Pressable style={style.textInputWrpper} onPress={() => Keyboard.dismiss()}>
              <Text style={commonStyles.accountTitle}>
                {String.profile.personalInfo}
              </Text>
              <View style={style.firstNameWrapper}>
                <View style={style.firstNameColuman}>
                  <BorderTextInput
                    title={String.profile.firstName}
                    placeholder={'First Name'}
                    value={profileDetils?.firstName}
                    onChangeText={(value: any) => onUpdateDetails('firstName', value)}
                  />
                </View>
                <View style={style.firstNameColuman}>
                  <BorderTextInput
                    title={String.profile.surname}
                    placeholder={'Surname'}
                    value={profileDetils?.lastName}
                    onChangeText={(value: any) => onUpdateDetails('lastName', value)}
                  />
                </View>
              </View>
              <Text style={commonStyles.forgotSubText}>
                {String.profile.gender}
              </Text>
              <Dropdown
                data={gender}
                style={[commonStyles.grayTextInputBorder]}
                maxHeight={194}
                placeholderStyle={{
                  color: Colour.gray900,
                  fontFamily: Fonts.NotoSansLight,
                }}
                dropdownPosition={'bottom'}
                labelField="label"
                valueField="value"
                placeholder={'Select your gender'}
                searchPlaceholder="Search..."
                value={params?.userInfo?.gender}
                onChange={item => {
                  onUpdateDetails('gender', item?.value)
                }}
                selectedTextStyle={{
                  color: Colour.gray900,
                  fontFamily: Fonts.NotoSansLight,
                }}
              />
              <Text style={commonStyles.forgotSubText}>
                {String.addCard.contactNumber}
              </Text>
              <BorderTextInput
                title={String.contactNumber}
                Svg={Phone}
                placeholder={'000 000 000'}
                isEmail
                value={profileDetils?.phoneNumber}
                keyboardType={String.keybordnum}
                wrapperStyle={{ marginTop: Platform.OS === 'android' ? -30 : -25, }}
                onChangeText={(value: any) => onUpdateDetails('phoneNumber', value)}
                maxLength={10}
              />
              {/* {/ </TouchableOpacity> /} */}
              <BorderTextInput
                title={String.emailAdd}
                Svg={Email}
                placeholder={'Email'}
                keyboardType={String.keyboardEmail}
                isEmail
                editable={false}
                value={profileDetils?.emailAdd}
              // onChangeText={(value: any) => onUpdateDetails('emailAdd', value)}
              />
              <Text style={commonStyles.forgotSubText}>
                {String.profile.dateofBirth}
              </Text>
              <TouchableOpacity
                style={[commonStyles.grayTextInputBorder, style.calendar]}
                onPress={() => {
                  setShowCal(!ShowCal);
                }}>
                <Setting />
                <Text style={[style.dateOfBirth]}>
                  {profileDetils?.dateOFBirth?.length > 0 ? moment(profileDetils?.dateOFBirth)?.format('MMMM DD YYYY') : 'Enter your date of birth'}
                </Text>
              </TouchableOpacity>
              {ShowCal === true && (
                <DatePicker
                  modal
                  open={ShowCal}
                  date={date}
                  mode={'date'}
                  maximumDate={new Date()}
                  onConfirm={(date: any) => {
                    setShowCal(!ShowCal)
                    const data = moment(date).format('YYYY/MM/DD');
                    setDate(date);
                    onUpdateDetails('dateOFBirth', data.toString())
                    setShowCal(!ShowCal)
                  }}
                  onCancel={() => {
                    setShowCal(!ShowCal)
                  }}
                />
              )}
              {!profileDetils?.isSocial &&
                <>
                  <View style={{ marginTop: 32 }}>
                    <Text style={commonStyles.accountTitle}>
                      {String.profile.password}
                    </Text>
                  </View>
                  <BorderTextInput
                    title={String.profile.currentPwd}
                    Svg={Lock}
                    placeholder={'*******'}
                    IssecureTextEntry={true}
                    isEmail
                    value={currentPass}
                    onChangeText={(value: any) => {
                      setCurrentPass(value);
                      setCurrentPassErr(false)
                    }
                    }
                  />
                  <Text style={commonStyles.errorText}>{currentPassErr}</Text>
                  <View style={commonStyles.column}>
                    <BorderTextInput
                      title={String.profile.newPwd}
                      Svg={Lock}
                      placeholder={String.newPassword}
                      IssecureTextEntry={showPwd}
                      isEmail
                      value={newPass}
                      onChangeText={(value: any) => { setNewPass(value); setNewPassErr(false) }}
                    />
                    <Text style={commonStyles.errorText}>{newPassErr}</Text>
                    <TouchableOpacity
                      style={style.pwdWrapper}
                      onPress={() => {
                        setShowPwd(!showPwd);
                      }}>
                      {!showPwd ? <ShowPwd /> : <HidePwd />}
                    </TouchableOpacity>
                  </View>
                </>}

              {/* {/ ......................................save & cancle Button................................................. /} */}
              <CommonButton
                buttonText={String.save}
                onPress={onSave}
                buttonTextStyle={styles.saveText}
                warperStyle={style.saveButton}
              />
              <TouchableOpacity style={{ marginBottom: 25, marginLeft: 15 }} onPress={() =>
                navigation.navigate(ROUTES.AccountLanding, { isUpdate: true })
              }>
                <Text style={[style.cancle, style.eyeWrapper]}>
                  {String.cancel}
                </Text>
              </TouchableOpacity>
              {
                showUnlinkTrackerModel && <LogOutModel
                  wrapperStyle={{ bottom: 10 }}
                  isVisibleModal={showUnlinkTrackerModel}
                  title={String.accountModelTexe.unlinkTracker}
                  subtitle={String.accountModelTexe.unlinkTrackerSub}
                  buttonPress={() => {
                    onPressUnlink()
                  }}
                  fitbitUnlink={true}
                  trackerName={trackerName}
                  loder={loading}
                  buttonTextColor={Colour?.PrimaryBlue}
                  IconColor={Colour.primaryGreen}
                  iconBGColor={Colour.lightGreen}
                  Svg={Unlink}
                  buttonText={String.accountModelTexe.yesUnlink}
                  buttonBgColor={Colour?.primaryGreen}
                  canclePress={() => {
                    toggleUnlinkModel(false);
                  }}
                />
              }

              {/* {/ //......................................linkNewTracker....................................................      /} */}
              {trackerName && <>
                <Text style={commonStyles.accountTitle}>
                  {String.profile.yourTrackerL}
                </Text>
                <View style={[commonStyles.bigCardBorder, style.firstNameWrapper]}>
                  <View style={style.iconWrapper}>
                    <Image source={Images.smartBelt} style={style.image} />
                    <Text style={style.fitbitText}>{trackerName.charAt(0).toUpperCase() + params?.userInfo?.trackerType.slice(1)}</Text>
                  </View>
                  <TouchableOpacity style={style.iconWrapper} onPress={() => toggleUnlinkModel(!showUnlinkTrackerModel)}>
                    <Text style={style.unlink}>{String.profile.unlink}</Text>
                    <Unlink />
                  </TouchableOpacity>
                </View>
              </>}
              {/* {/ .....................................link tracker button................................................        /} */}
              <CommonButton
                buttonText={String.profile.linkNewTracker}
                onPress={() => navigation.navigate(ROUTES.FitnessTracker, { fromProfileEdit: true, userInfo: params?.userInfo })}

                warperStyle={style.button}
              />
            </Pressable>
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileSetting;
const style = StyleSheet.create({
  backWrapper: {
    marginTop: 23,
    marginBottom: 7
  },
  title: {
    marginLeft: 21,
    fontFamily: Fonts.QuicksandSemiBold,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'left',
    color: Colour.PrimaryBlue,
  },
  editWrapper: {
    position: 'absolute',

    top: 105,
    // left: 65,
  },
  textInputWrpper: {
    flex: 1,
    marginTop: 31,
    paddingHorizontal: 17,

  },
  firstNameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstNameColuman: {
    flexDirection: 'column',
    width: '49%',
  },
  fitbitText: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    color: Colour.PrimaryBlue,
  },
  eyeWrapper: { alignSelf: 'center', marginRight: 15 },
  phoneNumUpdate: {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colour.white,
    borderColor: Colour.gray300,
    marginTop: 6,
  },
  unlink: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: Fonts.NotoSansLight,
    fontWeight: '300',
    color: Colour.gray400,
    marginRight: 9,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pwdWrapper: {
    position: 'absolute',
    right: 15,
    top: Platform.OS === 'android' ? 45 : 40,
  },
  image: {
    height: 50,
    width: 50,
  },
  button: {
    marginTop: 14,
    marginBottom: 59,
  },
  saveButton: {
    marginTop: 32,
    marginBottom: 34,
  },
  profileWrapper: {
    height: 89,
    width: 121,
    borderTopRightRadius: 50,
    borderBottomEndRadius: 50,
    //alignItems: 'center',
  },
  imageStyle: {
    height: 80,
    width: 80,
  },
  calendar: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdownText: {
    color: Colour.gray900,
    fontSize: 16,
    fontFamily: Fonts.NotoSansLight,
    //fontWeight: '300',
  },
  dateOfBirth: {
    color: Colour.gray900,
    fontFamily: Fonts.NotoSansLight,
    fontWeight: '300',
    fontSize: 16,
    marginLeft: 8,
  },
  profileImageWrapper: {
    backgroundColor: Colour.peachyOrange,
    width: 121,
    height: 89,
    borderTopRightRadius: 50,
    borderBottomEndRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profileImage: {
    height: 80,
    width: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBlackShade: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
    marginLeft: 30,
  },
  cancle: {
    lineHeight: 20,
    fontSize: 16,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    color: Colour.PrimaryBlue,
  },
  whiteBG: {
    backgroundColor: Colour.white,
    flex: 1,
    paddingTop: 30
  }
});