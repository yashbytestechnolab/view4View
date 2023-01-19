import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Platform,
    Linking,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
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
import { userDeatil } from '../../../services';

export const InviteFriend = ({ notifyUpdate }: any) => {
    const {
        storeCreator: { darkModeTheme },
    }: any = useContext(InputContextProvide);
    const [referralCode, setReferralCode] = useState('');
    const [loading, setloading] = useState(false);
    const getConfigValue: any = remoteConfig()
        .getValue('UpdateDescription')
        .asString();
    const data = JSON?.parse(getConfigValue);
    const GetReferralCode = () => {
        setloading(true);

        userDeatil()
            .then(res => {
                setloading(false);
                setReferralCode(res?.referral_code);
            })
            .catch(err => {
                setloading(false);
            })
            .finally(() => {
                setloading(false);
            });
    };
    useEffect(() => {
        GetReferralCode();
    }, []);
    const ReferEarn = `View4view is very usefull app and you increase your view and earn coins.\n\nDownload now:  \n\niOS App: ${data?.Upadte?.ios} \n\nAndroid App: ${data?.Upadte?.android}
    \n\nReferral code: ${referralCode}`;

    const option = {
        title: 'Title',
        message: ReferEarn,
        subject: 'Subject',
    };
    const handleButton = (notifyUpdate: boolean) => {
        notifyUpdate
            ? Platform?.OS == 'android'
                ? Linking.openURL(data?.Upadte?.android)
                : Linking.openURL(data?.Upadte?.ios)
            : Share.open(option)
                .then((res: any) => {
                    return res;
                })
                .catch((err: any) => {
                    return err;
                });
    };
    const copyToClipboard = () => {
        Clipboard.setString(referralCode?.toString());
    };

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
                    {notifyUpdate ? data?.title : String?.inviteFrd?.title}
                </Text>
                <Text
                    style={[F40014?.main, style.subText, colorBackGround(darkModeTheme)]}>
                    {notifyUpdate ? data?.subTtile : String?.inviteFrd?.subTitle}
                </Text>
                <View>
                    <InviteFrdSvg />
                </View>

                {!loading ?
                    !notifyUpdate && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[style?.referralCodeWrapper,darkModeTheme &&{backgroundColor:Colors?.blackOpcity}]}
                            onPress={() => {
                                copyToClipboard();
                                handleFirebaseError('refCode');
                            }}>
                            <Text style={[F60024?.textStyle, style?.refText]} numberOfLines={1}>
                                {referralCode}
                            </Text>
                        </TouchableOpacity>) : <ActivityIndicator size={'small'} color={Colors?.primaryRed} style={{marginTop:25}} />
                }
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
