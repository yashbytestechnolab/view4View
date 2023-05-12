import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Platform, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { colorBackGround, Colors, F40014, lightBackGround, } from '../../Theme';
import { purchaseCoin } from '../../services';
import { ButtonComponent, Loader } from '../../components';
import { InputContextProvide } from '../../context/CommonContext';
import { getInAppPurchaseAutoPlay, getItems, initilizeIAPConnection, onGetCoinAmount, } from '../../services/InAppPurchaseServices';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { type as keys } from '../../constants/types';
import * as RNIap from 'react-native-iap';
import { SecondsIcon } from '../../assets/icons';
import { style } from './style';
import { Anaylitics } from '../../constants/analytics';
import { String } from '../../constants';
import { ORtitle } from '../authentication/Authcomponents';
import { WatchAds } from '../../assets/icons/WatchAds';
import { useTranslation } from 'react-i18next';

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

export const AutoPlayScreen = ({ watchAdsHandler, onPressBuyAutoPlay }: any) => {
    const { t } = useTranslation()
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
                {/** set in remoteConfig */ }
                let IAPData = undefined // await getPurchaseData();
                {
                    IAPData == undefined ? setParseData(getInAppPurchaseAutoPlay) : setParseData(IAPData)
                }
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

            await purchaseCoin(getBalance + redeemCoin)?.then(() => {
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
                Anaylitics("Coin added @buyCoin", { getBalance })
            }).catch((err: any) => {
                setloading(false)
                showMessage({
                    message: t("errorMsg"),
                    type: 'danger',
                    duration: 2000
                })
            })
        }
    }

    const onReadioButtonPress = (idx: React.SetStateAction<number>) => {
        setSelectRB(idx);
    };

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

                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            {/* <BuyCoinIcon /> */}
                            <Text style={[style.titleText, colorBackGround(darkModeTheme)]}>Buy Auto Play Hours</Text>
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
                            detail: string | number | boolean;
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
                                            {/* <Text style={[F40014?.main, colorBackGround(darkModeTheme), {fontSize:10, color:'#E57E25'}]}>{res?.detail}</Text> */}
                                            <Text style={[F40014.main, { color: Colors?.primaryRed }]}>{res?.detail}</Text>
                                        </View>
                                    </View>
                                    <Text style={[F40014?.main, colorBackGround(darkModeTheme)]}>{res?.price}</Text>
                                </TouchableOpacity>);
                        })}

                        <ButtonComponent
                            isRewardIconShow
                            secondIcon={<SecondsIcon props={"white"} />}
                            buttonTitle={String?.commonString?.buy + " " + (parseData?.[selectRB]?.seconds / 60) + " Mins Autoplay"}
                            onPrees={() => onPressBuyAutoPlay(parseData[selectRB])}
                            wrapperStyle={style.buttonWrapper}
                        />
                        <ORtitle />
                        <ButtonComponent buttonTitle={t("AutoplayMins")}
                            onPrees={() => watchAdsHandler()}
                            isRewardIconShow
                            secondIcon={<WatchAds />}
                            wrapperStyle={style.buttonWrapperAdsWatch}
                        />
                    </View></>
            }
        </>
    );
};


