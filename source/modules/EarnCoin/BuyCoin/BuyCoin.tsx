import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert, AppState } from 'react-native';
import VersionInfo from 'react-native-version-info';
import React, { useContext, useEffect, useState } from 'react';
import { String } from '../../../constants';
import { Colors, F40014, F60016, F60024 } from '../../../Theme';
import { Star } from '../../../assets/icons';
import { Header } from '../../../components';
import * as RNIap from 'react-native-iap';
import { InputContextProvide } from '../../../context/CommonContext';
import { EarnCoin } from '../../../services';
import { type as keys } from '../../../constants/types';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { getItems, initilizeIAPConnection, onGetCoinAmount, onPurchase } from '../../../services/InAppPurchaseServices';

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

export const BuyCoin = () => {
    const getVersionNo = VersionInfo.appVersion;
    const multitext: any = "Play quiz by paying 30 coins\n Based on your score you will win coins\n use coins in sections of game like \nSee enjoy & win rewards coins"
    const [products, getProducts]: any = useState();
    const { storeCreator: { coinBalance: { getBalance }, dispatchCoin, darkModeTheme } }: any = useContext(InputContextProvide)
    const navigation = useNavigation();

    useEffect(() => {
        const isConnectedIAP: any = initilizeIAPConnection();
        if (isConnectedIAP) {
            let products = getItems()
            getProducts(products)
        }
    }, []);

    useEffect(() => {
        purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
            async (purchase: any) => {
                const receipt = Platform.OS === 'ios' ? purchase?.transactionReceipt : purchase?.purchaseToken;
                if (receipt) {
                    try {
                        if (Platform.OS === 'ios') {
                            await onRewardCoins(purchase?.productId)
                            await RNIap.finishTransaction({ purchase });
                            await RNIap.clearTransactionIOS()
                            await RNIap.clearProductsIOS();
                        }
                        else if (Platform.OS === 'android') {
                            await RNIap?.acknowledgePurchaseAndroid({ token: purchase?.purchaseToken });
                            await RNIap?.finishTransaction({ purchase });
                        }
                    } catch (ackErr: any) {
                        // console.log('ackErr INAPP>>>>', ackErr);
                        if (Platform.OS === 'ios') {
                            await RNIap.clearTransactionIOS();
                            await RNIap.clearProductsIOS()
                        }
                        showMessage({
                            message: "Oops, Something went wrong..",
                            type: 'danger'
                        })
                    }
                }
            },
        );

        purchaseErrorSubscription = RNIap.purchaseErrorListener(
            (error) => {
                if (error?.code !== 'E_USER_CANCELLED') {
                    showMessage({
                        message: error?.message,
                        type: 'danger',
                        duration: 6000
                    });
                }
                if (error?.code === 'E_USER_CANCELLED') {
                    return
                }
            },
        );
        return (() => {
            if (purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove();
                purchaseUpdateSubscription = null;
            }
            if (purchaseErrorSubscription) {
                purchaseErrorSubscription.remove();
                purchaseErrorSubscription = null;
            }
        });
    }, []);

    const onRewardCoins = async (rewardId: any) => {
        let redeemCoin: any = await onGetCoinAmount(rewardId);
        if (redeemCoin) {
            await EarnCoin(getBalance)?.then((res) => {
                dispatchCoin({ types: keys.GET_CURRENT_COIN, payload: getBalance + redeemCoin })
                showMessage({
                    message: `${redeemCoin} coins credited`,
                    type: 'success',
                    duration: 2000
                })
                setTimeout(() => {
                    navigation.goBack()
                }, 2000);

            }).catch((err) => {
                // navigation.goBack()

            })
        }

    }



    const reanderCard = (color: string) => {
        return (
            <View style={[style.cardWrapper, { backgroundColor: color }]}>
                <Star />
                <Text style={[F60024?.textStyle, style.cardTitle]}>5000 Coins</Text>
                <Text style={[F40014?.main, style.cardMultiText]}>
                    {multitext}
                </Text>
                <TouchableOpacity style={style.cardAmountWrapper} onPress={() => onPurchase("2.5KCoins")}>
                    <Text style={F60016?.textStyle, F60016?.semiBolt}>$8.34</Text>
                </TouchableOpacity>

            </View>
        )
    }
    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
            <View style={style.main}>
                <Header title={String?.headerTitle?.buyCoin} showBacKIcon={true} />
                <View style={{ flex: 0.8 }}>
                    <ScrollView style={style.scrollWrapper} horizontal={true}
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}>
                        {reanderCard(Colors?.gradient1)}
                        {reanderCard(Colors?.yellow)}
                        {reanderCard(Colors?.gradient3)}
                    </ScrollView>
                </View>

                <View style={style?.marginHorizontal}>
                    <Text style={F40014?.main}>Version{" " + getVersionNo}</Text>
                    <Text style={[F40014?.main, style?.marginTop]}>Lorem Ipsum is simply dummy text of the printing and  simply dum industry dummy text</Text>
                </View>
            </View>
        </>
    );
};
const style = StyleSheet.create({

    main: { flex: 1, backgroundColor: Colors?.white, height: '100%' },
    leftRow: { flexDirection: 'row', alignItems: 'center' },
    text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
    cardTitle: { color: Colors?.white, paddingTop: 28, paddingBottom: 19 },
    cardMultiText: { color: Colors?.white, lineHeight: 35, textAlign: 'center' },
    scrollWrapper: { marginTop: 32, flex: 1, paddingHorizontal: 12 },
    marginHorizontal: { marginHorizontal: 16 },
    marginTop: { marginTop: 12 },
    cardAmountWrapper: { marginTop: 20, backgroundColor: Colors?.white, height: 42, width: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
    cardWrapper: { height: 434, width: 315, borderRadius: 16, paddingTop: 52, paddingHorizontal: 24, alignItems: 'center', marginRight: 16 }
});

