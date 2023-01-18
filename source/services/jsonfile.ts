
import { AdVideo, BuyCoin, EarnCoins, Invitefriends, SignInNow, YourCampaigns, YoutubeVideos } from "../assets/icons";
import { ROUTES, String } from "../constants";

export const IntroductionData = [{
    id: 1,
    svg: YoutubeVideos,
    title: String?.introduction_swipeList?.youtubeVideos,
    subTitle: String?.introduction_swipeList?.subTitle1
}, {
    id: 2,
    svg: YourCampaigns,
    title: String?.introduction_swipeList?.yourCampaignsHere,
    subTitle: String?.introduction_swipeList?.subTitle2
}, {
    id: 3,
    svg: EarnCoins,
    title: String?.introduction_swipeList?.EarnCoins,
    subTitle: String?.introduction_swipeList?.subTitle3
}, {
    id: 4,
    svg: SignInNow,
    title: String?.introduction_swipeList?.signInnow,
    subTitle: String?.introduction_swipeList?.subTitle4
}]
export const EarnCoinData = [
    // {
    //     svg: BuyCoin,
    //     title: 'Buy Coins',
    //     subTitle: 'Buy world coins of countries',
    //     onPress: ROUTES?.BUYCOIN
    // },
    {
        svg: Invitefriends,
        title: 'Invite friends',
        subTitle: 'Earn 300 coin for a referral',
        onPress: ROUTES?.INVITEFRIEND
    }, {
        svg: AdVideo,
        title: 'Watch Ads video',
        subTitle: 'Watch ads video and earn coins',
        onPress: "SHOWADDS"
    }

]