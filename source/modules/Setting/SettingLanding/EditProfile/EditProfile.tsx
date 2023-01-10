import { View, Text, SafeAreaView, Image, StyleSheet, Alert, TouchableOpacity, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Header, InputComponent } from '../../../../components'
import { Colors, F50018 } from '../../../../Theme'
import { emailPattern, String } from '../../../../constants'
import { get_coins } from '../../../../services/FireStoreServices'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { InputContextProvide } from '../../../../context/CommonContext'
import { type } from '../../../../constants/types'
import {launchImageLibrary} from 'react-native-image-picker';
import { EditProfileIcon } from '../../../../assets/icons'
export const EditProfile = () => {
    const [data, setData] = useState<string>()
    const { storeCreator: { userInput, dispatch, userInputError, dispatchError, loading, setLoading } }: any = useContext(InputContextProvide)
    const [profilePic, setProfilePic]: any = useState(null);

    const getUserData = () => {
        get_coins()?.then((res: any) => { console.log(res), setData(res?._data) }).catch((err) => { console.log(err) })
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
        const { fullName, email, password, confirmPassword } = userInput
        fullName?.length <= 0 && (isNotValidForm = true, dispatchHandler(type.FULLNAME_ERROR, String.commonString.fullnameErrorMsg));
        (email?.length <= 0 || !emailPattern.test(email)) && (isNotValidForm = true, dispatchHandler(type.EMAIL_ERROR, String.commonString.PleaseProvideValidEmailMsg));
        (password?.length <= 0 || password?.length < 8) && (isNotValidForm = true, dispatchHandler(type.PASSWORD_ERROR, String.commonString.PasswordErrorMsg));

        //!isNotValidForm && handleCreateUserRequest()
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
    return (
        <><SafeAreaView style={style.safeArea} /><View style={style.mainWrapper}>
            <Header title={String?.headerTitle?.setting} showCoin={false} showBacKIcon={true} />
            <Text style={[F50018?.main, style.saveTextWrapper]} onPress={() => { handleCreateAccountFlow() }}>Save</Text>
            <View style={{ paddingTop: 24 }}>
                <TouchableOpacity style={style.nameWrapper} activeOpacity={1} onPress={()=>{openGallery}}>
                   
                    <Image source={{ uri: data?.image }} style={style.imageWrapper} />
                   
                </TouchableOpacity>
                <View style={{height:26,width:26,backgroundColor:Colors?.white,borderRadius:13,position:'absolute',justifyContent:'center',alignItems:'center',right:150,top:50}}>
                        <EditProfileIcon/>
                    </View>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
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
                        inputTitle={String.commonString.email}
                        placeholder={String.commonString.Enteryouremail}
                        value={userInput?.email}
                        keyboardType={String?.keyboardType?.email}
                        onChangeText={(value) => {
                            dispatch({ type: type.EMAIL, payload: value });
                            if (value?.length > 0 && emailPattern.test(value)) {
                                dispatchError({ type: type.EMAIL_ERROR, payload: "" })
                            }
                        }}
                        errorMessage={userInputError?.emailError}
                    />
                    <InputComponent
                        inputTitle={String.commonString.Password}
                        placeholder={String.commonString.Enteryourpassword}
                        value={userInput?.password}
                        onChangeText={(value) => {
                            dispatch({ type: type.PASSWORD, payload: value });
                            if (value?.length > 7) {
                                dispatchError({ type: type.PASSWORD_ERROR, payload: "" })
                            }
                        }}
                        onPrees={() => dispatch({ type: type.SHOW_PASSWORD, payload: !userInput?.showPassword })}
                        isSecureIcon={true}
                        isSecureEntry={userInput?.showPassword}
                        errorMessage={userInputError?.passwordError}
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