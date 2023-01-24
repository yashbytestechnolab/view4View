import crashlytics from "@react-native-firebase/crashlytics"

export const crashlyticslog = (params: string) => {
    crashlytics().log(params)
}