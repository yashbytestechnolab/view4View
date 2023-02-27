import { types } from '../../action/types';

interface IPost {
    postLoading: Boolean,
    postData: any,
    postError: String
}

const initialState: IPost = {
    postLoading: false,
    postData: [],
    postError: ''
}

/**
 * Post Data Reducer
 * @param state 
 * @param action 
 */
export const PostReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.POST_FETCH_LOADING:
            return {
                ...state,
                postLoading: true
            }
        case types.POST_FETCH_SUCCESS:
            return {
                ...state,
                postLoading: false,
                postData: action.payload,
                postError: ""
            }
        case types.POST_FETCH_ERROR:
            return {
                ...state,
                postLoading: false,
                postData: [],
                postError: action.payload
            }
        default: return state
    }
}