import { StyleSheet, Text, View } from 'react-native'
import React, { FC, createContext, useReducer } from 'react'
import { type } from '../constants/types'

export const InputContextProvide: any = createContext({})

interface input {
    fullName?: number | string | any,
    email?: number | string | any,
    password?: number | string | any,
    confirmPassword?: number | string | any
    showPassword: boolean
}

const intialState: input = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: true
}

const reducer: Function | any = (state: any, action: any) => {
    switch (action.type) {
        case type.FULL_NAME: return { ...state, fullName: action?. payload }
        case type.EMAIL: return { ...state, email: action. payload }
        case type.PASSWORD: return { ...state, password: action. payload }
        case type.CONFIRM_PASSWORD: return { ...state, confirmPassword: action?. payload }
        case type.SHOW_PASSWORD: return { ...state, showPassword: action?. payload }
        default: return state
    }
}

const CommonContext = ({ children }: any) => {
    const [userInput, dispatch] = useReducer(reducer, intialState)
    const storeCreator= {
        userInput,
        dispatch
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

const styles = StyleSheet.create({})