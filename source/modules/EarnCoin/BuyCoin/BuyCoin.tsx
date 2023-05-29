import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Platform, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, } from 'react-native';
import { String } from '../../../constants';
import { colorBackGround, Colors, F40014, lightBackGround, } from '../../../Theme';
import { buyMemberShip, purchaseCoin } from '../../../services';
import { ButtonComponent, Header, Loader } from '../../../components';
import { InputContextProvide } from '../../../context/CommonContext';
import { getInAppPurchasetaticData, getItems, getPurchaseData, initilizeIAPConnection, onGetCoinAmount, onGetPriceAmount, onGetProdutId, onPurchase } from '../../../services/InAppPurchaseServices';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { type as keys } from '../../../constants/types';
import * as RNIap from 'react-native-iap';
import { BuyCoinIcon } from '../../../assets/icons';
import { style } from './style';
import { Anaylitics } from '../../../constants/analytics';
import { useTranslation } from 'react-i18next';

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

export const BuyCoin = () => {
    const { t } = useTranslation()
    const [selectRB, setSelectRB] = useState(0)
    const [parseData, setParseData]: any = useState(undefined)
    const [products, setProducts]: any = useState();
    const navigation = useNavigation();
    const [loading, setloading]: any = useState(false)

    const { storeCreator: { coinBalance: { getBalance }, dispatchCoin, darkModeTheme } }: any = useContext(InputContextProvide)

    useEffect(() => {
        const isConnectedIAP: any = initilizeIAPConnection();
        console.log("isConnectedIAP",isConnectedIAP);
        
        if (isConnectedIAP) {
            console.log("isConnectedIAP after if");
            
            setloading(true)
            const getIAPData = async () => {
                let IAPData = await getPurchaseData();
                {
                    IAPData == undefined ? setParseData(getInAppPurchasetaticData) : setParseData(IAPData)
                }
                let storeProducts = getItems()
                setProducts(storeProducts)
                setloading(false)
            }
            getIAPData()
        }
    }, []);


    useEffect(() => {
        if (parseData === undefined) {
            setParseData(getInAppPurchasetaticData)
        }
    }, [])

    useEffect(() => {
        purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
            async (purchase: any) => {
                const receipt = Platform.OS === 'ios' ? purchase?.transactionReceipt : purchase?.purchaseToken;
                if (receipt) {
                    if (Platform.OS === 'ios') {
                        await RNIap?.finishTransaction({ purchase: purchase }).then(() => {
                            onRewardCoins(purchase?.productId, purchase?.transactionId)
                            RNIap.clearTransactionIOS()
                        }).catch(err => {
                            _onError(err.message)
                        });
                    }
                    if (Platform.OS === 'android') {
                        RNIap.acknowledgePurchaseAndroid({ token: purchase?.purchaseToken }).then(async (resTest) => {
                            RNIap?.finishTransaction({ purchase: purchase, isConsumable: true }).then(async (res) => {
                                await onRewardCoins(purchase?.productId, purchase?.transactionId);
                            }).catch(err => {
                                _onError(err.message)
                            });
                        })

                    }
                }
            },
        );

        purchaseErrorSubscription = RNIap.purchaseErrorListener(
            (error) => {

                console.log("error", error);

                if (error?.code !== 'E_USER_CANCELLED') {
                    showMessage({
                        message: error?.message,
                        type: 'danger',
                        duration: 6000
                    });

                }
                setloading(false)

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


    const _onError = async (message: any) => {
        if (Platform.OS === 'ios') {
            await RNIap.clearTransactionIOS();
            await RNIap.clearProductsIOS()
        }
        setloading(false)
        showMessage({
            message: message,
            type: 'danger',
            duration: 6000
        })
        navigation.goBack()
    }

    const onRewardCoins = async (rewardId: any, transactionId: string) => {
        let redeemCoin: any = onGetCoinAmount(rewardId);
        let price = onGetPriceAmount(rewardId)
        if (redeemCoin) {
            await buyMemberShip(price, redeemCoin, transactionId)
            await purchaseCoin(getBalance + redeemCoin)?.then((res: any) => {
                dispatchCoin({ types: keys.GET_CURRENT_COIN, payload: getBalance + redeemCoin, memberShipPurchase: true })
                showMessage({
                    message: `${redeemCoin} coins credited`,
                    type: 'success',
                    duration: 2000
                })
                setloading(false)
                navigation.goBack()
                Anaylitics("buy_coin", { getBalance })
            }).catch((err: any) => {
                setloading(false)
                // showMessage({
                //     message: t("errorMsg"),
                //     type: 'danger',
                //     duration: 2000
                // })
            })
        }
    }

    const onReadioButtonPress = (idx: React.SetStateAction<number>) => {
        setSelectRB(idx);
    };

    const onPressBuyCoins = async (productData: any) => {
        setloading(true)
        let sku = onGetProdutId(productData);
        sku && await onPurchase(sku)
    }

    const HandleLoader = () => {
        return (
            <View style={style?.loaderHead}>
                <ActivityIndicator size={'large'} color={Colors?.primaryRed} />
            </View>
        )
    }
    return (
        <>
            {parseData === undefined ? <Loader /> :
                <><SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
                    {loading && <HandleLoader />}

                    <View style={[style.main, { backgroundColor: darkModeTheme ? Colors?.darkModeColor : Colors?.lightWhite }]}>
                        <Header title={t("buyCoin")} showBacKIcon={true}

                        />
                        <StatusBar barStyle={'light-content'} backgroundColor={Colors?.gradient1} />
                        <ScrollView showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={String.commonString.handled}
                            style={[style.scroll, { backgroundColor: darkModeTheme ? Colors?.darkModeColor : Colors?.lightWhite }]}
                            scrollEnabled={true}
                            contentContainerStyle={[style.scrollContain, , { backgroundColor: darkModeTheme ? Colors?.darkModeColor : Colors?.lightWhite }]}>
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <BuyCoinIcon />

                            </View>
                            {parseData && parseData?.map((res: {
                                name: string | number | boolean |
                                React.ReactElement<any, string | React.JSXElementConstructor<any>> |
                                React.ReactFragment | React.ReactPortal | null |
                                undefined; subInfo: string | number | boolean |
                                React.ReactElement<any, string | React.JSXElementConstructor<any>> |
                                React.ReactFragment | React.ReactPortal |
                                null | undefined; price: string | number | boolean |
                                React.ReactElement<any, string | React.JSXElementConstructor<any>> |
                                React.ReactFragment | React.ReactPortal | null | undefined;
                            },
                                index: number): any => {
                                let isChecked = selectRB === index ? true : false;

                                return (
                                    <TouchableOpacity key={index?.toString()} activeOpacity={1} style={[style.card, lightBackGround(darkModeTheme),
                                    { shadowColor: darkModeTheme ? Colors.black : Colors.cardshadow, elevation: darkModeTheme ? 0 : 8 }, isChecked && {
                                        borderWidth: 1, borderColor: Colors?.primaryRed,
                                    }]} onPress={() => { onReadioButtonPress(index); }}
                                        disabled={loading}
                                    >
                                        <View style={style.rbWrapper}>
                                            <TouchableOpacity activeOpacity={1} style={style.isChecked}>
                                                {isChecked && <View
                                                    style={style.selectRB} />}
                                            </TouchableOpacity>
                                            <View style={{ paddingLeft: 12 }}>
                                                <Text style={[F40014?.main, colorBackGround(darkModeTheme)]}>{res?.name}</Text>
                                                <Text style={[F40014.main, { color: Colors?.primaryRed }]}>{res?.subInfo}</Text>
                                            </View>
                                        </View>

                                        <Text style={[F40014?.main, colorBackGround(darkModeTheme)]}>{res?.price}</Text>
                                    </TouchableOpacity>);

                            })}
                            <Text style={[style.subTextWrapper, colorBackGround(darkModeTheme)]}>{t("buyCoinSubText")}</Text>
                            <ButtonComponent buttonTitle={t("buy") + " " + parseData?.[selectRB]?.name}
                                onPrees={() => {
                                    console.log("parseData[selectRB]", parseData[selectRB]);
                                    onPressBuyCoins(parseData[selectRB])
                                }}
                                wrapperStyle={style.buttonWrapper} />
                        </ScrollView>
                    </View></>
            }
        </>
    );
};


