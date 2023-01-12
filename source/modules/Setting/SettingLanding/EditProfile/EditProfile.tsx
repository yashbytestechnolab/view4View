import { View, Text, SafeAreaView, Image, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Header, InputComponent } from '../../../../components'
import { Colors, F50018 } from '../../../../Theme'
import { get_coins, updateProfile } from '../../../../services/FireStoreServices'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { InputContextProvide } from '../../../../context/CommonContext'
import { type } from '../../../../constants/types'
import { launchImageLibrary } from 'react-native-image-picker';
import { EditProfileIcon } from '../../../../assets/icons'
import { ROUTES, String } from '../../../../constants'
import { useNavigation } from '@react-navigation/native'
export const EditProfile = () => {
    const navigation = useNavigation()
    const [data, setData] = useState<string>()
    const [loader, setLoader] = useState<boolean>(false)
    const { storeCreator: { userInput, dispatch, userInputError, dispatchError } }: any = useContext(InputContextProvide)
    const [profilePic, setProfilePic]: any = useState(null);

    const getUserData = () => {
        get_coins()?.then((res: any) => {
            dispatch({ type: type.FULL_NAME, payload: res?._data?.firstname + res?._data?.lastname });
            setData(res?._data)
        }).catch((err) => { console.log(err) })
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
        let options: any = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 1,
        };
        await launchImageLibrary(options, (response: any) => {
            if (response?.didCancel) {
                return;
            }
            if (
                response?.assets?.[0]?.uri?.length > 1 &&
                response?.assets[0]?.fileSize <= 5242880
            ) {
                setProfilePic((response?.assets[0]));
            } else {
                Alert.alert('Image size must be less than 5MB');
            }
        }).catch(err => {
            console.log('err', err);
        });
    };
    const updateProfileData = () => {
        setLoader(true)
        updateProfile(userInput?.fullName, profilePic?.uri).then((resp: any) => {
            console.log("res", resp)
            setLoader(false)
            navigation.navigate(ROUTES?.SETTING_LANDING)
        }).catch((err) => {
            setLoader(false)
            console.log("err", err);
        })
    }

    return (
        <><SafeAreaView style={style.safeArea} /><View style={style.mainWrapper}>
            <Header title={String?.headerTitle?.editProfile} showCoin={false} showBacKIcon={true} />
            {loader ? <ActivityIndicator color={Colors.white} size={'small'} style={style.saveTextWrapper} /> : <Text style={[F50018?.main, style.saveTextWrapper]} onPress={() => { handleCreateAccountFlow() }}>Save</Text>
            }

            <View style={{ paddingTop: 24 }}>
                <View style={style.nameWrapper} >
                    {
                        <Image source={{ uri: data?.image ? data?.image : profilePic?.uri }} style={style.imageWrapper} />
                    }
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => { openGallery() }} style={{ height: 26, width: 26, backgroundColor: Colors?.white, borderRadius: 13, position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 150, top: 50 }}>
                    <EditProfileIcon />
                </TouchableOpacity>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={String.commonString.handled}
                    style={style.scrollWrapper}
                    scrollEnabled={true}
                    contentContainerStyle={style.containWrapper}>
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
                        value={data?.email}
                        onChangeText={(value) => {

                        }}
                    />
                </KeyboardAwareScrollView>
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
    saveTextWrapper: { position: 'absolute', right: 12, top: 13, padding: 5, textAlign: 'center' },
    imageWrapper: { height: 60, width: 60, borderRadius: 30, backgroundColor: Colors?.shadowPink, },
    nameWrapper: { justifyContent: "center", alignItems: "center", marginHorizontal: 16, },
    mainWrapper: { backgroundColor: Colors.white, flex: 1 },
    scrollWrapper: { backgroundColor: Colors?.white },
    containWrapper: { backgroundColor: Colors?.white, flexGrow: 1, paddingBottom: 130 },
    marginTop33: { marginTop: 25 }
})