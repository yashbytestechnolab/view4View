import { useReducer } from "react";
import { type } from "../constants/types";

export const userInfoFnc = () => {
    interface input {
        infoLoading: boolean;
        data: object | any,
        error: string
    }

    const intialState: input = {
        infoLoading: false,
        data: {},
        error: ""
    }

    const reducer: Function | any = (state: any, action: any) => {
        switch (action.type) {
            case type.USER_INFO_LOADING: return { ...state, infoLoading: action?.payload }
            case type.USER_INFO_DATA: return { ...intialState, data: action?.payload }
            case type.USER_INFO_DATA: return { ...intialState, error: action?.payload }
            case type.USER_INFO_DELETE: return intialState
            default: return state
        }
    }
    const [userDetail, dispatchuserDetail] = useReducer(reducer, intialState)
    return { userDetail, dispatchuserDetail }
}