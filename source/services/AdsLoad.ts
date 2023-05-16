import { TestIds, RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';
import { Platform } from 'react-native';
import { ENV, person } from '../modules/View/increment';

export class AdsClass {
    static rewardAd = RewardedAd.createForAdRequest(person?.environment() == ENV.dev ? TestIds.REWARDED : Platform.OS === 'android' ? 'ca-app-pub-4027493771242043/3200937894' : 'ca-app-pub-4027493771242043/4402338926');
    static isLoadead: boolean = false
    static callBack?: any

    static showAds(onErrorHandle?: any, onRewardSuccess?: any) {
        AdsClass.callBack = onRewardSuccess;
        if (AdsClass.rewardAd.loaded) {
            AdsClass.rewardAd.show()
        } else {
            onErrorHandle();
        }
    }

    static loadAds() {
        AdsClass.rewardAd.onAdEvent((type, error: any) => {
            if (type === RewardedAdEventType.LOADED) {
                AdsClass.isLoadead = true
            }
            else if (error?.name?.length > 0) {
                AdsClass.isLoadead = false
            }
            if (type === RewardedAdEventType.EARNED_REWARD) {
                AdsClass.loadAds()
                AdsClass.callBack();
            }

            if (type === "closed") {
                AdsClass.loadAds()
                AdsClass.isLoadead = false
            }
        });
        AdsClass.rewardAd.load();
    }
}