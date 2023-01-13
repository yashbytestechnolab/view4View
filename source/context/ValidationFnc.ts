import { useReducer } from "react";
import { type } from "../constants/types";

export const ValidationFnc = () => {
    interface input {
        fullNameError?: string,
        emailError?: string,
        passwordError?: string,
        confirmPasswordError?: string,
        oldPasswoedError?: string,
        newPasswordError?: string
    }

    const intialState: input = {
        fullNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        oldPasswoedError: "",
        newPasswordError: ""
    }

    const reducer: Function | any = (state: any, action: any) => {
        switch (action.type) {
            case type.FULLNAME_ERROR: return { ...state, fullNameError: action?.payload }
            case type.EMAIL_ERROR: return { ...state, emailError: action.payload }
            case type.PASSWORD_ERROR: return { ...state, passwordError: action.payload }
            case type.CONFIRM_PASSWORD_ERROR: return { ...state, confirmPasswordError: action?.payload }
            case type.OLD_PASSWORD_ERROR: return { ...state, oldPasswoedError: action?.payload }
            case type.NEW_PASSWORD_ERROR: return { ...state, newPasswordError: action?.payload }
            case type.EMPTY_STATE: return intialState
            default: return state
        }
    }
    const [userInputError, dispatchError] = useReducer(reducer, intialState)
    return { userInputError, dispatchError }
}