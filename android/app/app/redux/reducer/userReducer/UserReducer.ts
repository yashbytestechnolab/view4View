import { types } from '../../action/types';

interface IUser {
    userLoading: Boolean,
    userData: any,
    userError: String
}

const initialState: IUser = {
    userLoading: false,
    userData: [],
    userError: ''
}

/**
 * User Reducer
 * @param state 
 * @param action 
 * @returns 
 */
export const UserReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case types.USER_FETCH_LOADING:
            return {
                ...state,
                userLoading: true
            }
        case types.USER_FETCH_SUCCESS:
            return {
                ...state,
                userLoading: false,
                userData: action.payload,
                userError: '',
            }
        case types.USER_FETCH_ERROR:
            return {
                ...state,
                userLoading: false,
                userData: [],
                userError: action.payload,
            }
        default: return state
    }
}