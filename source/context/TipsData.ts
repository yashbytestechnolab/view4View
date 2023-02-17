import React, { useReducer } from "react"
import { type } from "../constants/types";

interface tips {
    tipsLoading: boolean;
    tipsData: [] | Array<object> | any;
    tipsError: string | any
}
export const TipsData = () => {
    const intialState: tips = {
        tipsLoading: false,
        tipsData: [],
        tipsError: ""
    }
    const reducer = (state: any, action: any) => {
        const { types, payload }: any = action
        switch (types) {
            case type.TIPSLOADING: return { ...state, tipsLoading: payload }
            case type.TIPSDATA: return { ...intialState, tipsData: payload, }
            case type.TIPSERROR: return { ...intialState, tipsError: payload }
        }
    }
    const [tips, dispatchTips] =useReducer(reducer,intialState)
    return { tips, dispatchTips }
}
