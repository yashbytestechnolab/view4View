import { types } from '../types';
import { getAPIRequest } from '../../../services/userService';


const fetchUserLoading = () => {
    return {
        type: types.USER_FETCH_LOADING
    }
}

const fetchUserSuccess = (userData: any) => {
    return {
        type: types.USER_FETCH_SUCCESS,
        payload: userData
    }
}

const fetchUserError = (userFetchError: String) => {
    return {
        type: types.USER_FETCH_ERROR,
        payload: userFetchError
    }
}

export const getUserData = (requestURL: any) => {
    return async (dispatch: any) => {
        dispatch(fetchUserLoading());
        getAPIRequest(requestURL)
            .then((response: any) => {
                if (response) {
                    dispatch(fetchUserSuccess(response))
                } else {
                    dispatch(fetchUserError(response))
                }
            })
    }
}