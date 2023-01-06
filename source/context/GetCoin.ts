import { useReducer } from "react"
import { type } from "../constants/types"

interface coin {
    getBalance: number | string | undefined
}

const initial: coin = {
    getBalance: 0
}

const reducer = (state: any, action: any) => {
    const { payload, types }: string | any = action
    switch (types) {
        case type.GET_CURRENT_COIN: return { ...state, getBalance: payload }
        default: return state
    }
}


export const getCurrentCoinBalance = () => {
    const [coinBalance, dispatchCoin] = useReducer(reducer, initial)
    return { coinBalance, dispatchCoin }
}