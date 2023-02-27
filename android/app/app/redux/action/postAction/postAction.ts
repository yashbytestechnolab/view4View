import { types } from '../types';
import { getAPIRequest } from '../../../services/userService';

export const postFetchLoading = () => {
    return {
        type: types.POST_FETCH_LOADING
    }
}

export const postFetchSuccess = (postData: any) => {
    return {
        type: types.POST_FETCH_SUCCESS,
        payload: postData
    }
}

export const postFetchError = (postError: String) => {
    return {
        type: types.POST_FETCH_ERROR,
        payload: postError
    }
}


/**
 * Post Data API CALL 
 */
export const getPosts = (postRequestURL: any) => {
    
    return async (dispatch: any) => {
        dispatch(postFetchLoading());
        getAPIRequest(postRequestURL)
            .then((res: any) => {
                console.log('=======>>>>>>>>res', res)
                if (res) {
                    dispatch(postFetchSuccess(res))
                } else {
                    dispatch(postFetchError(res))
                }
            })
    }
}