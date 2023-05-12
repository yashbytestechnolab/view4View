import { useReducer } from "react"
import { type } from "../constants/types"

export const videoLanding = () => {

    interface input {
        videoLoading?: boolean,
        videoData?: Array<object | undefined>,
        docData?: object | any,
        error?: string | any,
        videoId?: Array<string | object | any>
        bytesDocData?: object | any;
        isBytesVideoLoading?: boolean,
        nextVideo?: number | any;
        purchaseCampaignListFlag?: boolean | any;
        purchaseDocument?: object | any
    }

    interface action {
        types: string;
        payload: Array<object | undefined> | boolean | string | undefined | null | any
    }

    const intialState: input = {
        videoLoading: true,
        videoData: [],
        docData: {},
        videoId: [],
        isBytesVideoLoading: false,
        bytesDocData: {},
        nextVideo: 0,
        error: "",
        purchaseCampaignListFlag: false,
        purchaseDocument: {}
    }

    const reducer = (state: any, action: any) => {
        const { types, payload }: action = action;
        switch (types) {
            case type.VIDEO_LOADING: return { ...state, videoLoading: payload }
            case type.VIDEO_DATA: return { ...intialState, videoData: payload?._vid, docData: payload?._doc, videoId: payload?._vID, nextVideo: 0, videoLoading: false, purchaseDocument: payload?._docPurchase }
            case type.BYTES_VIDEO_DATA: return { ...intialState, videoData: payload?._vid, bytesDocData: payload?.bytes_doc, isBytesVideoLoading: true, videoLoading: false, nextVideo: 0 }
            case type.VIDEO_ERROR: return { ...intialState, error: payload }
            case type.BYTESVIDEO_LOAD: return { ...intialState, isBytesVideoLoading: payload }
            case type.NEXT_VIDEO: return { ...state, nextVideo: payload }
            case type.PURCHASE_CAMPAIGN: return { ...state, purchaseCampaignListFlag: payload, }
            default: return state
        }
    }

    const [videoLandingData, dispatchVideoLandingData] = useReducer(reducer, intialState)

    return { videoLandingData, dispatchVideoLandingData }
}