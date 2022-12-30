import React, { createContext, useReducer, useState } from 'react'
import { type } from '../constants/types'
import { ValidationFnc } from './ValidationFnc'

export const InputContextProvide: any = createContext({})

interface input {
    fullName?: number | string | any,
    email?: number | string | any,
    password?: number | string | any,
    confirmPassword?: number | string | any,
    showPassword: boolean;
    confirmPasswordShow: boolean
}

const intialState: input = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: true,
    confirmPasswordShow: true
}

const reducer: Function | any = (state: any, action: any) => {
    switch (action.type) {
        case type.FULL_NAME: return { ...state, fullName: action?.payload }
        case type.EMAIL: return { ...state, email: action.payload }
        case type.PASSWORD: return { ...state, password: action.payload }
        case type.CONFIRM_PASSWORD: return { ...state, confirmPassword: action?.payload }
        case type.SHOW_PASSWORD: return { ...state, showPassword: action?.payload }
        case type.CONFIRM_PASSWORD_SHOW: return { ...state, confirmPasswordShow: action?.payload }
        case type.EMPTY_STATE: return intialState
        default: return state
    }
}

const CommonContext = ({ children }: any) => {
    const [userInput, dispatch] = useReducer(reducer, intialState)
    const { userInputError, dispatchError } = ValidationFnc()
    const [loading, setLoading] = useState(false)
    const storeCreator = {
        userInput,
        dispatch,
        userInputError,
        dispatchError,
        loading,
        setLoading
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

