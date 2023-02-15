import { View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, BackHandler, Alert, PermissionsAndroid, Platform, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Header, InputComponent } from '../../../../components'
import { Colors, darkBackGround, F50018 } from '../../../../Theme'
import { updateProfile } from '../../../../services/FireStoreServices'
import { InputContextProvide } from '../../../../context/CommonContext'
import { type } from '../../../../constants/types'
import { EditProfileIcon } from '../../../../assets/icons'
import { ROUTES, String } from '../../../../constants'
import { useNavigation } from '@react-navigation/native'
import ImagePicker from 'react-native-image-crop-picker';
import { style } from './style'
import { err } from 'react-native-svg/lib/typescript/xml'

export const EditProfile = () => {
    const navigation = useNavigation()
    const { storeCreator: { darkModeTheme, userDetail: { data, infoLoading }, userInput, dispatch, userInputError, dispatchError, dispatchuserDetail } }: any = useContext(InputContextProvide)
    const [profilePic, setProfilePic]: any = useState(null);
    const [onPhotoLoad, setPhotoLoad] = useState(false)
    const getUserData = () => {
        dispatch({ type: type.FULL_NAME, payload: data?.firstname + " " + data?.lastname });
        dispatch({ type: type.EMAIL, payload: data?.email });
    }

    useEffect(() => {
        getUserData()
    }, [])

    /**
     *  This Function dispatch error message
     * @param type  
     * @param payload 
     */
    function dispatchHandler(type: string, payload: string | number | any) {
        dispatchError({ type: type, payload: payload })
    }

    const handleCreateAccountFlow = () => {
        let isNotValidForm: boolean = false
        const { fullName } = userInput
        fullName?.length <= 0 && (isNotValidForm = true, dispatchHandler(type.FULLNAME_ERROR, String.commonString.fullnameErrorMsg));
        !isNotValidForm && updateProfileData()
    }

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'UView App Camera Permission',
                        message:
                            'UView App needs access to your camera ' +
                            'so you can take awesome pictures.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    OpenGallery();
                    // req === 'camera' ? openCamera() : openGallery();
                } else {
                    Alert.alert('Please grant camera permission');
                }
            } catch (err) {
                console.warn('wee', err);
                Alert.alert('Something went wrong..');
            }
        } else {
            OpenGallery();
        }
    };
    const OpenGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            setProfilePic(image);
        }).catch((error) => {
            console.log("error", error)
        })
    };
    const updateProfileData = () => {
        dispatchuserDetail({ type: type.USER_INFO_LOADING, payload: true })
        updateProfile(userInput?.fullName, (profilePic?.data || data?.image)).then((resp: any) => {
            let obj = {
                firstname: resp?.firstName, email: userInput?.email, image: (profilePic?.data || data?.image), lastname: resp?.lastname
            }
            dispatchuserDetail({ type: type.USER_INFO_DATA, payload: obj })
            navigation.navigate(ROUTES?.SETTING_LANDING)
        }).catch((err) => {
            dispatchuserDetail({ type: type.USER_INFO_DATA, payload: err.message })
            console.log("err", err);
        }).finally(() => dispatchuserDetail({ type: type.USER_INFO_LOADING, payload: false }))
    }
    const handleBackButtonClick = () => {
        navigation.goBack();
        dispatchError({ type: type.EMPTY_STATE })
        return true;
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    return (
        <>
            <SafeAreaView style={style.safeArea} />
            <View style={[style.mainWrapper, darkBackGround(darkModeTheme)]}>
                <Header title={String?.headerTitle?.editProfile} showCoin={false} showBacKIcon={true} />
                {infoLoading ? <ActivityIndicator color={Colors.white} size={'small'} style={style.saveTextWrapper} /> : <Text style={[F50018?.main, style.saveTextWrapper]} onPress={() => { handleCreateAccountFlow() }}>{String?.commonString?.save}</Text>}

                <View style={style.paddingTop}>
                    <View style={style.nameWrapper} >
                        {onPhotoLoad ? <ActivityIndicator size={"small"} color={Colors.lightPink} /> :
                            <>
                                {
                                    data?.image !== null || profilePic?.path?.length !== undefined ?
                                        <Image source={{ uri: profilePic != null ? profilePic?.path : `data:image/png;base64,${data?.image}` }}
                                            style={style.imageWrapper} /> :
                                        <View style={[style.imageWrapper]} />
                                }
                                <TouchableOpacity activeOpacity={1} disabled={onPhotoLoad} onPress={() => { requestCameraPermission() }}
                                    style={style.editIconWrapper}>
                                    <EditProfileIcon />
                                </TouchableOpacity>
                            </>
                        }
                    </View>

                    <View style={[style.scrollWrapper, darkBackGround(darkModeTheme)]}>
                        <InputComponent
                            inputTitle={String.commonString.Fullname}
                            value={userInput?.fullName}
                            onChangeText={(value) => {
                                dispatch({ type: type.FULL_NAME, payload: value });
                                dispatchError({ type: type.FULLNAME_ERROR, payload: "" })
                            }}
                            placeholder={String.commonString.Enterfullname}
                            errorMessage={userInputError?.fullNameError}
                            viewStyle={style.marginTop33}
                        />
                        <InputComponent
                            editable={false}
                            inputTitle={String.commonString.email}
                            placeholder={String.commonString.Enteryouremail}
                            value={userInput?.email} />
                    </View>

                </View>
            </View>

        </>
    )
}
