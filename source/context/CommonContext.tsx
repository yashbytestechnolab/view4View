import React, { createContext, useReducer, useState } from 'react'
import { type } from '../constants/types'
import { ValidationFnc, getCurrentCoinBalance, getUserCampaign, userInfoFnc, videoLanding } from '.';

export const InputContextProvide: any = createContext({ data: "mehandi" })
interface reward {
    adsRewarAmt: number | string,
    referRewardAmt: number | string
}
interface input {
    fullName?: number | string | any,
    email?: number | string | any,
    password?: number | string | any,
    confirmPassword?: number | string | any,
    showPassword: boolean;
    confirmPasswordShow: boolean
    oldPassword?: number | string | any,
    newPassword?: number | string | any,
    referralCode?: number | string | any,
    oldPassword_show?: boolean,
    newPassword_show?: boolean,
}


const intialState: input = {
    fullName: "",
    email: "admin21@gmail.com",
    password: "Test@123",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    referralCode: "",
    showPassword: true,
    confirmPasswordShow: true,
    oldPassword_show: true,
    newPassword_show: true,
}

const reducer: Function | any = (state: any, action: any) => {
    switch (action.type) {
        case type.FULL_NAME: return { ...state, fullName: action?.payload }
        case type.EMAIL: return { ...state, email: action.payload }
        case type.PASSWORD: return { ...state, password: action.payload }
        case type.CONFIRM_PASSWORD: return { ...state, confirmPassword: action?.payload }
        case type.SHOW_PASSWORD: return { ...state, showPassword: action?.payload }
        case type.OLDPASSWORD: return { ...state, oldPassword: action.payload }
        case type.NEWPASSWORD: return { ...state, newPassword: action.payload }
        case type.REFERRALCODE: return { ...state, referralCode: action.payload }
        case type.OLD_PASSWORD_SHOW: return { ...state, oldPassword_show: action?.payload }
        case type.NEWPASSWORD_SHOW: return { ...state, newPassword_show: action?.payload }
        case type.CONFIRM_PASSWORD_SHOW: return { ...state, confirmPasswordShow: action?.payload }
        case type.EMPTY_STATE: return intialState
        default: return state
    }
}

const CommonContext = ({ children, reward, setReward, darkModeTheme, setDarkModeTheme, isInternetBack, setIsInternetBack }: any) => {
    const [userInput, dispatch] = useReducer(reducer, intialState)
    const { userInputError, dispatchError } = ValidationFnc();
    const { campaignData, dispatchcampaign } = getUserCampaign()
    const { coinBalance, dispatchCoin } = getCurrentCoinBalance()
    const { videoLandingData, dispatchVideoLandingData } = videoLanding()
    const { userDetail, dispatchuserDetail } = userInfoFnc()
    const [addVideoUrl, setVideoUrl] = useState()
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("")
    const [getReferralCode, setGetReferralCode] = useState("")
    const [adsCount, setAdsCount] = useState(0)
    const [isTooltipRemaining, setIsTooltipRemaining] = useState(false);
    const [isCreateCampaginRemaining, setIsCreateCampaginRemaining] = useState(false);
    const [adsWatchCount, setAdsWatchCount] = useState({
        adsCount: 0,
        dataTime: ""
    })

    const storeCreator = {
        userInput,
        dispatch,
        userInputError,
        dispatchError,
        loading,
        setLoading,
        campaignData,
        dispatchcampaign,
        videoLandingData,
        dispatchVideoLandingData,
        coinBalance,
        dispatchCoin,
        darkModeTheme,
        setDarkModeTheme,
        userDetail,
        dispatchuserDetail,
        addVideoUrl,
        setVideoUrl,
        reward,
        setReward,
        token,
        setToken,
        getReferralCode,
        setGetReferralCode,
        isInternetBack,
        setIsInternetBack,
        adsCount,
        setAdsCount,
        isTooltipRemaining,
        isCreateCampaginRemaining,
        setIsTooltipRemaining,
        setIsCreateCampaginRemaining,
        adsWatchCount,
        setAdsWatchCount
    }

    return (
        <InputContextProvide.Provider value={{
            storeCreator
        }}>
            {children}
        </InputContextProvide.Provider>
    )
}

export default CommonContext

