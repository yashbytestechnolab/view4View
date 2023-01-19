import { useReducer } from "react"
import { type } from "../constants/types"

interface coin {
    getBalance: number | string | undefined,
    watchVideoList: Array<string | object | undefined | any>
}

const initial: coin = {
    getBalance: 0,
    watchVideoList: []
}

const reducer = (state: any, action: any) => {
    const { payload, types }: string | any = action
    switch (types) {
        case type.GET_CURRENT_COIN: return { ...state, getBalance: payload }
        case type.USER_WATCH_VIDEO_LIST: return { ...state, watchVideoList: payload }
        default: return state
    }
}


export const getCurrentCoinBalance = () => {
    const [coinBalance, dispatchCoin] = useReducer(reducer, initial)
    return { coinBalance, dispatchCoin }
}