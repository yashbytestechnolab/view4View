import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Platform,
    Linking,
    StatusBar,
    TouchableOpacity,

} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Share from 'react-native-share';
import {
    colorBackGround,
    Colors,
    darkBackGround,
    F40014,
    F60024,
} from '../../../Theme';
import { String } from '../../../constants';
import { InviteFrdSvg } from '../../../assets/icons';
import { ButtonComponent, Header } from '../../../components';
import { style } from './style';
import { InputContextProvide } from '../../../context/CommonContext';
import Clipboard from '@react-native-clipboard/clipboard';
import { handleFirebaseError } from '../../../services/AlertMessage';
import { getBuildVersionData } from '../../../services/BuildVesrionCheck';
import { userDeatil } from '../../../services';
import SplashScreen from 'react-native-splash-screen';

export const InviteFriend = ({ notifyUpdate }: any) => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])
    const { storeCreator: { setGetReferralCode, darkModeTheme, getReferralCode } }: any = useContext(InputContextProvide)
    const [buildData, setBuildData] = useState();
    const getReferal = async () => {
        await userDeatil().then(async (res: any) => {
            setGetReferralCode(res?.referral_code)
        });
    }
    useEffect(() => {
        if (getReferralCode == "" || getReferralCode == undefined) {
            getReferal()
        }
    }, [])

    const confingDefaultValue: any = {
        build_version: "1.1",
        title: "Update the app",
        subTtile: "Please update to continue using the app",
        Upadte: {
            android: " https://play.google.com/store/apps/details?id=com.bytes.uview",
            ios: "https://apps.apple.com/us/app/uview-increase-youtube-views/id1658265805"
        }
    }
    const getUpdateBuildData = async () => {
        const IAPData = await getBuildVersionData();
        {
            IAPData == undefined ?
                setBuildData(confingDefaultValue) : setBuildData(IAPData)
        }
    }
    const ReferEarn = `${String?.inviteFrd?.linkText} \n\nDownload now:  \n\niOS App: ${buildData?.Upadte?.ios} \n\nAndroid App: ${buildData?.Upadte?.android}
    \n\nReferral code: ${getReferralCode}`;

    const option = {
        title: 'Title',
        message: ReferEarn,
        subject: 'Subject',
    };

    const handleButton = (notifyUpdate: boolean) => {
        notifyUpdate
            ? Platform?.OS == 'android'
                ? Linking.openURL(buildData?.Upadte?.android)
                : Linking.openURL(buildData?.Upadte?.ios)
            : Share.open(option)
                .then((res: any) => {
                    return res;
                })
                .catch((err: any) => {
                    return err;
                });
    };
    const copyToClipboard = () => {
        Clipboard.setString(getReferralCode?.toString());
    };
    useEffect(() => {
        getUpdateBuildData()
    }, [])
    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
            <StatusBar
                backgroundColor={Colors?.gradient1}
                barStyle={'light-content'}

            />
            {!notifyUpdate && (
                <Header
                    title={String?.inviteFrd?.headerTitle}
                    showCoin={false}
                    showBacKIcon={true}


                />
            )}
            <ScrollView
                style={[style.main, darkBackGround(darkModeTheme)]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={String.commonString.handled}
                scrollEnabled={true}
                contentContainerStyle={[
                    style.scrollContain,
                    darkBackGround(darkModeTheme),
                ]}>
                <Text style={[F60024?.textStyle, style.title]}>
                    {notifyUpdate ? buildData?.title : String?.inviteFrd?.title}
                </Text>
                <Text
                    style={[F40014?.main, style.subText, colorBackGround(darkModeTheme)]}>
                    {notifyUpdate ? buildData?.subTtile : String?.inviteFrd?.subTitle}
                </Text>
                <View>
                    <InviteFrdSvg />
                </View>

                {!notifyUpdate && (
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[style?.referralCodeWrapper, darkModeTheme && { backgroundColor: Colors?.blackOpcity }]}
                        onPress={() => {
                            copyToClipboard();
                            handleFirebaseError('refCode');
                        }}>
                        <Text style={[F60024?.textStyle, style?.refText]} numberOfLines={1}>
                            {getReferralCode}
                        </Text>
                    </TouchableOpacity>)}
                <ButtonComponent
                    wrapperStyle={style.button}
                    buttonTitle={notifyUpdate ? 'Update' : String?.inviteFrd?.button}
                    onPrees={() => {
                        handleButton(notifyUpdate);
                    }}
                />
            </ScrollView>
        </>
    );
};
