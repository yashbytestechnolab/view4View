import Config from "react-native-config";

export const environment: any = {
    BASEURL: __DEV__ ? Config.BASE_URL : Config.PRODUCTION_URL,
}

export const version = {
    V1: 'V1',
    V2: 'V2',
}

export const requestURL = {
    users: `${environment.BASEURL}/users`,
    posts: `${environment.BASEURL}/posts`
}
