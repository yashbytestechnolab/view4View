import { getValue } from './LocalStorage';
const myHeaders = new Headers();

const requestOptionsGet = {
    method: 'GET',
};

const requestOptionsPost: any = {
    method: 'POST',
    headers: myHeaders,
    body: {},
    redirect: 'follow'
};

const requestOptionsPut:any= {
    method: 'PUT',
    headers: myHeaders,
    body: {},
    redirect: 'follow'
};

/**
 * GET API REQUEST
 * @param requestURL 
 * @returns 
 */
export const getAPIRequest = async (requestURL: string) => {
    const result = await fetch(requestURL, requestOptionsGet);
    const response = await result.json();
    return response
}

/**
 * POST API REQUEST 
 * @param requestURL 
 * @param payload 
 * @returns 
 */
export const postAPIRequest = async (requestURL: string, payload: object|string|number) => {
    requestOptionsPost.body = payload
    const token = await getValue('accessToken')
    myHeaders.append("Authorization", `Bearer ${token}`);
    const result = await fetch(`${requestURL}`, requestOptionsPost)
    const response = await result.json()
    return response
}

/**
 * PATCH API REQUEST
 * @param requestURL 
 * @param payload 
 * @returns 
 */
export const put = async (requestURL: string, payload: any) => {
    requestOptionsPut.body = payload
    const token = await getValue('accessToken')
    myHeaders.append("Authorization", `Bearer ${token}`);
    const result = await fetch(`${requestURL}`, requestOptionsPut)
    const response = await result.json()
    return response
}