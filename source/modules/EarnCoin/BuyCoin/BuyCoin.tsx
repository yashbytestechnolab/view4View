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


const itemSkus: any = Platform.select({
    ios: ["1KCoins", "2.5KCoins", "5KCoins"],
    android: ["1kcoins", "2.5kcoins", "5kcoins"]
});

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

export const BuyCoin = () => {
    const getVersionNo = VersionInfo.appVersion;
    const multitext: any = "Play quiz by paying 30 coins\n Based on your score you will win coins\n use coins in sections of game like \nSee enjoy & win rewards coins"
    const [products, getProducts]: any = useState();
    const { storeCreator: { coinBalance: { getBalance }, dispatchCoin, darkModeTheme } }: any = useContext(InputContextProvide)
    const navigation = useNavigation();

    useEffect(() => {
        initilizeIAPConnection();
    }, []);

    const initilizeIAPConnection = async () => {
        await RNIap.initConnection()
            .then(async (connection) => {
                // console.log('IAP result', connection);
                connection && getItems();
            })
            .catch((err) => {
                // console.warn(`IAP ERROR ${err.code}`, err.message);
                showMessage({
                    type: 'danger',
                    message: err?.message
                })
            });

        if (Platform.OS === 'android') {
            await RNIap.flushFailedPurchasesCachedAsPendingAndroid()
                .then(async (consumed) => {
                    console.log('consumed all items?', consumed);
                }).catch((err) => {
                    console.warn(`flushFailedPurchasesCachedAsPendingAndroid ERROR ${err.code}`, err.message);
                });
        }
    };

    const getItems = async () => {
        try {
            const Products = await RNIap.getProducts({ skus: itemSkus });
            // console.log(' IAP Su', Products);
            if (Products?.length !== 0) {
                getProducts(Products)
            }
        } catch (err: any) {
            console.warn("IAP error", err?.code, err?.message, err);
            showMessage({
                type: 'danger',
                message: err?.message
            })
        }
    };

    useEffect(() => {
        purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
            async (purchase: any) => {
                console.log("purchase", purchase);
                const receipt = Platform.OS === 'ios' ? purchase?.transactionReceipt : purchase?.purchaseToken;
                console.log("receipt", receipt);
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
                        console.log('ackErr INAPP>>>>', ackErr);
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

    const onPurchase = async (sku: string) => {
        try {
            RNIap.requestPurchase({
                sku,
                andDangerouslyFinishTransactionAutomaticallyIOS: false,
            })
        } catch (err: any) {
            console.warn(err.code, err.message);
        }
    };

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

    const onGetCoinAmount = async (rewardId: any) => {
        console.log("rewardId", rewardId);

        switch (rewardId) {
            case '1kcoins':
                return 1000
            case '1KCoins':
                return 1000
            case '2.5kcoins':
                return 2500
            case '2.5KCoins':
                return 2500
            case '5KCoins':
                return 5000
            case '5kcoins':
                return 5000
            default:
                return 0
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
                <TouchableOpacity style={style.cardAmountWrapper} onPress={() => onPurchase("5KCoins")}>
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

