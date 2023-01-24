import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, } from 'react-native';
import { String } from '../../../constants';
import { Colors, darkBackGround, F40014, } from '../../../Theme';
import { EarnCoin } from '../../../services';
// import { EarnCoinIcon } from '../../../assets/icons';
import { ButtonComponent, Header } from '../../../components';
import { InputContextProvide } from '../../../context/CommonContext';
import { getItems, getPurchaseData, initilizeIAPConnection, onGetCoinAmount, onGetProdutId, onPurchase } from '../../../services/InAppPurchaseServices';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { type as keys } from '../../../constants/types';
import * as RNIap from 'react-native-iap';

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

export const BuyCoin = () => {
    const [selectRB, setSelectRB] = useState(0)
    const [parseData, setParseData]: any = useState()
    const [products, setProducts]: any = useState();
    const navigation = useNavigation();
    const [loading, setloading]: any = useState(false)

    const { storeCreator: { coinBalance: { getBalance }, dispatchCoin, darkModeTheme } }: any = useContext(InputContextProvide)


    useEffect(() => {
        const isConnectedIAP: any = initilizeIAPConnection();
        if (isConnectedIAP) {
            setloading(true)
            const getIAPData = async () => {
                let IAPData = await getPurchaseData();
                setParseData(IAPData)
                let storeProducts = getItems()
                setProducts(storeProducts)
                setloading(false)
            }
            getIAPData()
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
                        console.log('ackErr INAPP>>>>', ackErr);
                        if (Platform.OS === 'ios') {
                            await RNIap.clearTransactionIOS();
                            await RNIap.clearProductsIOS()
                        }
                        setloading(false)
                        showMessage({
                            message: "Oops, Something went wrong..",
                            type: 'danger'
                        })
                        navigation.goBack()
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



    const onRewardCoins = async (rewardId: any) => {
        let redeemCoin: any = await onGetCoinAmount(rewardId);
        if (redeemCoin) {
            await EarnCoin(getBalance)?.then((res: any) => {
                dispatchCoin({ types: keys.GET_CURRENT_COIN, payload: getBalance + redeemCoin })
                showMessage({
                    message: `${redeemCoin} coins credited`,
                    type: 'success',
                    duration: 2000
                })
                setloading(false)
                setTimeout(() => {
                    navigation.goBack()
                }, 2000);

            }).catch((err: any) => {
                setloading(false)
                showMessage({
                    message: "Something went wrong..",
                    type: 'danger',
                    duration: 2000
                })
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

    const Loader = () => {
        return (
            <View style={style.loaderHead}>
                <ActivityIndicator size="large" color={Colors.primaryRed} />
            </View>
        )
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
            <View style={style.main}>
                <Header title={String?.headerTitle?.buyCoin} showBacKIcon={true} />
                {loading && <Loader />}
                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={String.commonString.handled}
                    style={[style.scroll, darkBackGround(darkModeTheme)]}
                    scrollEnabled={true}
                    contentContainerStyle={[style.scrollContain,]}>
                    {/* <EarnCoinIcon /> */}
                    {
                        parseData && parseData?.map((res: {
                            name: string | number | boolean |
                            React.ReactElement<any, string | React.JSXElementConstructor<any>> |
                            React.ReactFragment | React.ReactPortal | null |
                            undefined; subInfo: string | number | boolean |
                            React.ReactElement<any, string | React.JSXElementConstructor<any>>
                            | React.ReactFragment | React.ReactPortal
                            | null | undefined; price: string | number | boolean
                            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                            | React.ReactFragment | React.ReactPortal | null | undefined;
                        },
                            index: number): any => {
                            let isChecked = selectRB === index ? true : false;

                            return (
                                <TouchableOpacity activeOpacity={1} style={[style.card, isChecked && {
                                    borderWidth: 1, borderColor: Colors?.primaryRed,
                                }]} onPress={() => { onReadioButtonPress(index) }}
                                    disabled={loading}
                                >
                                    <View style={style.rbWrapper}>
                                        <TouchableOpacity activeOpacity={1} style={style.isChecked} >
                                            {isChecked && <View
                                                style={style.selectRB} />}
                                        </TouchableOpacity>
                                        <View style={{ paddingLeft: 12 }}>
                                            <Text style={[F40014?.main,]}>{res?.name}</Text>
                                            <Text style={[F40014.main, { color: Colors?.primaryRed }]}>{res?.subInfo}</Text>
                                        </View>
                                    </View>

                                    <Text style={[F40014?.main,]}>{res?.price}</Text>
                                </TouchableOpacity>)

                        })
                    }
                    <Text style={[F40014.main, style.subTextWrapper]}>{String?.commonString?.buyCoinSubText}</Text>
                    <ButtonComponent buttonTitle={"Buy" + " " + parseData?.[selectRB]?.name}
                        onPrees={() => onPressBuyCoins(parseData[selectRB])}

                        wrapperStyle={style.buttonWrapper} />


                </ScrollView>
            </View>
        </>
    );
};

const style = StyleSheet.create({
    scroll: {
        backgroundColor: Colors.lightWhite,
        flex: 1
    },
    scrollContain: {
        flexGrow: 1,
        backgroundColor: Colors?.lightWhite,

        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 40,

        paddingBottom: Platform.OS === "ios" ? 100 : 70
    },
    logoWrapper: {},

    main: { flex: 1, backgroundColor: Colors?.lightWhite, height: '100%' },
    card: {
        shadowColor: Colors?.whiteShadow,
        width: '100%',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
        backgroundColor: Colors?.white,
        padding: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        borderRadius: 8,
        shadowRadius: 4,
        elevation: 8,

    },
    subTextWrapper: { width: '100%', position: 'absolute', bottom: 180 },
    rbWrapper: { flexDirection: 'row', alignItems: 'center' },
    isChecked: { height: 22, width: 22, borderRadius: 13, borderColor: Colors?.primaryRed, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    buttonWrapper: { width: '100%', position: 'absolute', bottom: 85 },
    selectRB: { height: 10, width: 10, borderRadius: 8, backgroundColor: Colors.primaryRed, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
    loaderHead: { position: 'absolute', top: Height / 2.3, left: Width / 2.3, zIndex: 1000 }
})
