import {
  AdVideo,
  BuyCoin,
  EarnCoins,
  Invitefriends,
  SignInNow,
  YourCampaigns,
  YoutubeVideos,
} from '../assets/icons';
import { ROUTES } from '../constants';

export const IntroductionData = [
  {
    id: 1,
    svg: YoutubeVideos,
    title: "youtubeVideos",
    subTitle: "subTitle1",
  },
  {
    id: 2,
    svg: YourCampaigns,
    title: "yourCampaignsHere",
    subTitle: "subTitle2",
  },
  {
    id: 3,
    svg: EarnCoins,
    title: "EarnCoins",
    subTitle: "subTitle3",
  },
  {
    id: 4,
    svg: SignInNow,
    title: "signInnow",
    subTitle: "subTitle4",
  },
];

export enum CellType {
  invite = 'invite',
  ads = 'ads',
  buyCoin = 'buyCoin',
}

export const EarnCoinData = [
  {
    svg: BuyCoin,
    title: 'BuyCoins',
    subTitle: 'CountriesCoins',
    onPress: ROUTES?.BUYCOIN,
    type: CellType.buyCoin,
  },
  {
    svg: Invitefriends,
    title: 'InviteFriends',
    subTitle: 'Coin300',
    onPress: ROUTES?.INVITEFRIEND,
    type: CellType.invite,
  },
  {
    svg: AdVideo,
    title: 'WatchAdsVideo',
    subTitle: 'Adsvideo',
    onPress: 'SHOWADDS',
    type: CellType.ads,
  },
];
