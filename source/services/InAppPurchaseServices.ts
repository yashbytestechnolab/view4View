import { Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
import remoteConfig from '@react-native-firebase/remote-config';

import * as RNIap from 'react-native-iap';

const itemSkus: any = Platform.select({
    ios: ["1KCoins", "3.3KCoins", "6KCoins"],
    android: ["1kcoins", "3.3kcoins", "6kcoins", "60mautoplay"]
});


export const getPurchaseData = async () => {
    let fetch = await remoteConfig()?.fetchAndActivate()
    if (fetch) {
        let data: any = remoteConfig().getValue("in_app_purchase_data");
        return JSON.parse(data?._value);

    }
    let data: any = remoteConfig().getValue("in_app_purchase_data");
    return JSON.parse(data?._value);
}
export const getInAppPurchasetaticData:any =
    [
        {
            name: "1000 Coins",
            subInfo: "MOST POPULAR",
            price: "89 ₹",
            androidId: "1kcoins",
            iosId: "1KCoins"
        },
        {
            name: "3300 Coins",
            subInfo: "SAVE 10%",
            price: "269 ₹",
            androidId: "3.3kcoins",
            "iosId": "3.3KCoins"
        },
        {
            name: "6000 Coins",
            subInfo: "SAVE 20%",
            price: " 450 ₹",
            androidId: "6kcoins",
            iosId: "6KCoins"
        }
    ]
export const getInAppPurchaseAutoPlay: any =
    [
        {
            name: "01:00 Hour (60 Min)",
            detail:"Can earn approx 3600 coins!!",
            seconds:3600,
            price: "89 ₹",
            androidId: "60mautoplay",
            iosId: "60mautoplay"
        },
        // {
        //     name: "1:30hrs (90 Min)",
        //     detail:"Can earn approx 5400 coins!!",
        //     subInfo: "SAVE 10%",
        //     price: "269 ₹",
        //     androidId: "3.3kcoins",
        //     "iosId": "3.3KCoins"
        // },
        // {
        //     name: "3:00hrs (180 Min)",
        //     detail:"Can earn approx 10800 coins!!",
        //     subInfo: "SAVE 20%",
        //     price: " 450 ₹",
        //     androidId: "6kcoins",
        //     iosId: "6KCoins"
        // }
    ]

export const initilizeIAPConnection = async () => {
    // try {
    //     const result = await RNIap.initConnection();
    //     await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
    //     if (result === false) {
    //       Alert.alert("couldn't get in-app-purchase information");
    //       return;
    //     }
    //     return result;
    //   } catch (err) {
    //       Alert.alert('fail to get in-app-purchase information');
    //       return;
    //   }
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
        case '3.3KCoins':
            return 3300
        case '3.3kcoins':
            return 3300
        case '6kcoins':
            return 6000
        case '6KCoins':
            return 6000
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

export const onGetProdutId = (productData: any) => {

    return Platform.OS === "android" ? productData?.androidId : productData?.iosId
}