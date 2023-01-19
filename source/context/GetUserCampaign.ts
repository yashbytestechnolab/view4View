import { useReducer } from "react"
import { type } from "../constants/types"

export const getUserCampaign = () => {

    interface input {
        loding?: boolean,
        getCampaignData?: Array<object | undefined>,
        error?: string | any,
        stickeyIndex: Array<number>
    }

    interface action {
        types: string;
        payload: Array<object | undefined> | boolean | string | undefined | null | any
    }

    const intialState: input = {
        loding: false,
        getCampaignData: [],
        error: "",
        stickeyIndex: []
    }

    const reducer = (state: any, action: any) => {
        const { types, payload }: action = action;
        switch (types) {
            case type.CAMPAIGN_LOADING: return { ...state, loding: payload }
            case type.CAMPAIGN_DATA: return { ...intialState, getCampaignData: payload?.data, stickeyIndex: payload?.index }
            case type.CAMPAIGN_ERROR: return { ...intialState, error: payload }
            default: return state
        }
    }

    const [campaignData, dispatchcampaign] = useReducer(reducer, intialState)

    return { campaignData, dispatchcampaign }
}