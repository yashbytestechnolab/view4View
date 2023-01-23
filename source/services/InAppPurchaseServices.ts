import { Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
import * as RNIap from 'react-native-iap';

const itemSkus: any = Platform.select({
    ios: ["1KCoins", "2.5KCoins", "5KCoins"],
    android: ["1kcoins", "2.5kcoins", "5kcoins"]
});

export const initilizeIAPConnection = async () => {
    await RNIap.initConnection()
        .then(async (connection) => {
            return connection
        })
        .catch((err) => {
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

export const getItems = async () => {
    try {
        const Products = await RNIap.getProducts({ skus: itemSkus });
        if (Products?.length !== 0) {
            return Products
        }
    } catch (err: any) {
        showMessage({
            type: 'danger',
            message: err?.message
        })
    }
};


export const onGetCoinAmount = async (rewardId: any) => {
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

export const onPurchase = async (sku: string) => {
    try {
        RNIap.requestPurchase({
            sku,
            andDangerouslyFinishTransactionAutomaticallyIOS: false,
        })
    } catch (err: any) {
        console.warn(err.code, err.message);
    }
};