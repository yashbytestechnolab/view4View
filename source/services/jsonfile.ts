
import { EarnCoins, SignInNow, YourCampaigns, YoutubeVideos } from "../assets/icons";
import { String } from "../constants";

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