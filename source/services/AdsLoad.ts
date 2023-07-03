import { TestIds, RewardedAd, RewardedAdEventType, AdEventType } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';
import { ENV, person } from '../modules/View/increment';

export class AdsClass {
    static rewardAd = RewardedAd.createForAdRequest(person?.environment() == ENV.dev ? TestIds.REWARDED : Platform.OS === 'android' ? 'ca-app-pub-5980451248124709/8531164233' : 'ca-app-pub-4027493771242043/4402338926');
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
    static addObserver(){
        AdsClass.rewardAd.addAdEventsListener(({type, payload}) => {
            if (type === RewardedAdEventType.LOADED) {
                AdsClass.isLoadead = true
            }
            if (type === RewardedAdEventType.EARNED_REWARD) {
                AdsClass.isLoadead = false;
                AdsClass.callBack();
            }

            if (type === "closed") {
                AdsClass.isLoadead = false;
            }
        });
    }

    static loadAds() {
        // AdsClass.rewardAd.addAdEventsListener(({type, payload}) => {
        //     console.log("type==> ", type);
        //     if (type === RewardedAdEventType.LOADED) {
        //         console.log("RewardedAdEventType.LOADED call !");
        //         AdsClass.isLoadead = true
        //     }
        //     if (type === RewardedAdEventType.EARNED_REWARD) {
        //         console.log("RewardedAdEventType.EARNED_REWARD call !");
        //         AdsClass.isLoadead = false;
        //         AdsClass.callBack();
        //     }

        //     if (type === "closed") {
        //         AdsClass.loadAds();
        //         AdsClass.isLoadead = false;
        //         console.log("closed call !");
        //         AdsClass.rewardAd.removeAllListeners();
        //     }
        // });
        AdsClass.rewardAd.load();
    }
}