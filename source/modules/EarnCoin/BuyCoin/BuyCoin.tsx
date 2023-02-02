import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, StatusBar, } from 'react-native';
import { String } from '../../../constants';
import { colorBackGround, Colors, F40014, lightBackGround, } from '../../../Theme';
import { EarnCoin } from '../../../services';
import { ButtonComponent, Header, Loader } from '../../../components';
import { InputContextProvide } from '../../../context/CommonContext';
import { getItems, getPurchaseData, initilizeIAPConnection, onGetCoinAmount, onGetProdutId, onPurchase } from '../../../services/InAppPurchaseServices';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { type as keys } from '../../../constants/types';
import * as RNIap from 'react-native-iap';
import { BuyCoinIcon } from '../../../assets/icons';

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

export const BuyCoin = () => {
    const [selectRB, setSelectRB] = useState(0)
    const [parseData, setParseData]: any = useState(undefined)
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
                    if (Platform.OS === 'ios') {
                        await RNIap?.finishTransaction({ purchase: purchase }).then(() => {
                            onRewardCoins(purchase?.productId)
                            RNIap.clearTransactionIOS()
                        }).catch(err => {
                            _onError(err.message)
                        });
                    }
                    if (Platform.OS === 'android') {
                        await RNIap.acknowledgePurchaseAndroid({ token: purchase?.purchaseToken }).then(() => {
                            onRewardCoins(purchase?.productId);
                            RNIap?.finishTransaction({ purchase: purchase, isConsumable: true }).then(() => {
                            }).catch(err => {
                                console.log("err", err);
                                _onError(err.message)
                            });
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

    const onRewardCoins = async (rewardId: any) => {
        let redeemCoin: any = await onGetCoinAmount(rewardId);
        if (redeemCoin) {
            await EarnCoin(getBalance, redeemCoin)?.then((res: any) => {
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
                <><SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} /><View style={[style.main, { backgroundColor: darkModeTheme ? Colors?.darkModeColor : Colors?.lightWhite }]}>
                    <Header title={String?.headerTitle?.buyCoin} showBacKIcon={true} titleStyle={{ marginRight: 30 }} />
                    <StatusBar barStyle={'light-content'} backgroundColor={Colors?.gradient1} />
                    {loading && <HandleLoader />}
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
                        <Text style={[style.subTextWrapper, colorBackGround(darkModeTheme)]}>{String?.commonString?.buyCoinSubText}</Text>
                        <ButtonComponent buttonTitle={"Buy" + " " + parseData?.[selectRB]?.name}
                            onPrees={() => onPressBuyCoins(parseData[selectRB])}

                            wrapperStyle={style.buttonWrapper} />

                    </ScrollView>
                </View></>
            }
        </>
    );
};

const style = StyleSheet.create({
    scroll: {
        backgroundColor: Colors.lightWhite,
        //flex: 1
    },
    scrollContain: {
        flexGrow: 1,
        backgroundColor: Colors?.lightWhite,

        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === "ios" ? 100 : 70
    },
    logoWrapper: {},

    main: { flex: 1, backgroundColor: Colors?.lightWhite, height: Height },
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
        //elevation: 8,
    },
    subTextWrapper: {
        marginVertical: 50, width: '100%', color: Colors.placeHolderTextBlack,
        fontSize: 14,
        fontWeight: "400",
    },
    rbWrapper: { flexDirection: 'row', alignItems: 'center' },
    isChecked: { height: 22, width: 22, borderRadius: 13, borderColor: Colors?.primaryRed, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    buttonWrapper: { width: '100%', },
    selectRB: { height: 10, width: 10, borderRadius: 8, backgroundColor: Colors.primaryRed, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
    loaderHead: {
        // alignItems:'center',
        // justifyContent:'center',
        // flex:1,
        // //position:'absolute',
        // marginTop:150,
        position: 'absolute',
        top: Height / 2.3,
        left: Width / 2.3,
        zIndex: 999
    }
})
