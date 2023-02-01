import { View, Text, SafeAreaView, Image, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Platform, BackHandler, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Header, InputComponent } from '../../../../components'
import { Colors, darkBackGround, F50018 } from '../../../../Theme'
import { updateProfile } from '../../../../services/FireStoreServices'
import { InputContextProvide } from '../../../../context/CommonContext'
import { type } from '../../../../constants/types'
import { launchImageLibrary } from 'react-native-image-picker';
import { EditProfileIcon } from '../../../../assets/icons'
import { ROUTES, String } from '../../../../constants'
import { useNavigation } from '@react-navigation/native'
import { default as CreateCustomer } from 'react-native-compressor';

export const EditProfile = () => {
    const navigation = useNavigation()
    const { storeCreator: { darkModeTheme, userDetail: { data, infoLoading }, userInput, dispatch, userInputError, dispatchError, dispatchuserDetail } }: any = useContext(InputContextProvide)
    const [profilePic, setProfilePic]: any = useState(null);
    const [onPhotoLoad, setPhotoLoad] = useState(false)

    const iosBase64Compress = async (response: any) => {
        const result = await CreateCustomer.Image.compress(response?.assets[0]?.uri, {
            maxWidth: 1000,
            quality: 0.5,
            compressionMethod: "auto",
            returnableOutputType: "base64"
        });
        setProfilePic({ ...response?.assets[0], base64: result });
    }

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

    const openGallery = async () => {
        setPhotoLoad(true)
        let options: any = {
            mediaType: 'photo',
            quality: 0.2,
            selectionLimit: 1,
            includeBase64: true
        };
        await launchImageLibrary(options, async (response: any) => {
            if (response?.didCancel) {
                return;
            }
            if (
                response?.assets?.[0]?.uri?.length > 1 &&
                response?.assets[0]?.fileSize <= 5242880
            ) {
                Platform.OS == "ios" ? await iosBase64Compress(response) : setProfilePic(response?.assets[0])
            } else {
                Alert.alert(String?.commonString?.imageSize);
            }
            setPhotoLoad(false)
        }).catch(err => setPhotoLoad(false)).finally(() => setPhotoLoad(false))
    };

    const updateProfileData = () => {
        dispatchuserDetail({ type: type.USER_INFO_LOADING, payload: true })
        updateProfile(userInput?.fullName, (profilePic?.base64 || data?.image)).then((resp: any) => {
            let obj = {
                firstname: resp?.firstName, email: userInput?.email, image: (profilePic?.base64 || data?.image), lastname: resp?.lastname
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
            BackHandler.removeEventListener('hardwareBackPress',handleBackButtonClick);
        };
    }, []);

    return (
        <>
            <SafeAreaView style={style.safeArea} />
            <View style={[style.mainWrapper, darkBackGround(darkModeTheme)]}>
                <Header title={String?.headerTitle?.editProfile} showCoin={false} showBacKIcon={true} titleStyle={{paddingRight:25}} />
                {infoLoading ? <ActivityIndicator color={Colors.white} size={'small'} style={style.saveTextWrapper} /> : <Text style={[F50018?.main, style.saveTextWrapper]} onPress={() => { handleCreateAccountFlow() }}>{String?.commonString?.save}</Text>}

                <View style={style.paddingTop}>
                    <View style={style.nameWrapper} >
                        {onPhotoLoad ? <ActivityIndicator size={"small"} color={Colors.lightPink} /> :
                            <>
                                <Image source={{ uri: profilePic != null ? profilePic?.uri : `data:image/png;base64,${data?.image}` }} style={style.imageWrapper} />
                                <TouchableOpacity activeOpacity={1} disabled={onPhotoLoad} onPress={() => { openGallery() }}
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
const style = StyleSheet.create({
    text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
    safeArea: {
        backgroundColor: Colors.gradient1
    },
    saveTextWrapper: { position: 'absolute', right: 12, top: 10, padding: 5, textAlign: 'center' },
    imageWrapper: { height: 60, width: 60, borderRadius: 30, backgroundColor: Colors?.shadowPink, },
    nameWrapper: { justifyContent: "center", alignItems: "center", marginHorizontal: 16, },
    mainWrapper: { backgroundColor: Colors.white, flex: 1 },
    scrollWrapper: { backgroundColor: Colors?.white },
    containWrapper: { backgroundColor: Colors?.white, flexGrow: 1, },
    marginTop33: { marginTop: 25 },
    editIconWrapper: {
        position: "relative", left: 20, bottom: 25,
        justifyContent: "center", alignItems: "center",
        height: 26, width: 26, backgroundColor: Colors?.white, borderRadius: 13
    },
    paddingTop: { paddingTop: 24 }
})