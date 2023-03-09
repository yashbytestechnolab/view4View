import { View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Header, InputComponent } from '../../../../components'
import { Colors, darkBackGround, F50018, F50030 } from '../../../../Theme'
import { updateProfile } from '../../../../services/FireStoreServices'
import { InputContextProvide } from '../../../../context/CommonContext'
import { type } from '../../../../constants/types'
import { EditProfileIcon } from '../../../../assets/icons'
import { ROUTES, String } from '../../../../constants'
import { useNavigation } from '@react-navigation/native'
import ImagePicker from 'react-native-image-crop-picker';
import { style } from './style'

export const EditProfile = () => {
    const navigation = useNavigation()
    const { storeCreator: { darkModeTheme, userDetail: { data, infoLoading }, userInput, dispatch, userInputError, dispatchError, dispatchuserDetail } }: any = useContext(InputContextProvide)
    const [profilePic, setProfilePic]: any = useState(null);
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');

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
        let editProfileUpdate: editProfile = { fullName: userInput?.fullName, image: (profilePic?.data || data?.image) }
        updateProfile(editProfileUpdate).then((resp: any) => {
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
                        <>
                            {
                                data?.image?.length !== 0 || profilePic?.path?.length !== undefined ?
                                    <Image source={{ uri: profilePic != null ? profilePic?.path : regex.test(data?.image) == true ? data?.image : `data:image/png;base64,${data?.image}` }}
                                        style={style.imageWrapper} /> :
                                    <View style={[style.profileNameWrapper]}>
                                        <Text style={[F50030?.textStyle, { textAlign: 'center', textTransform: 'uppercase', }]} >{data?.firstname?.charAt(0) + data?.lastname?.charAt(0)}</Text>
                                    </View>}
                            <TouchableOpacity activeOpacity={1} onPress={() => { OpenGallery() }}
                                style={style.editIconWrapper}>
                                <EditProfileIcon />
                            </TouchableOpacity>
                        </>

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
