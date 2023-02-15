
import crashlytics from "@react-native-firebase/crashlytics"

import { ENV, person } from "../modules/View/increment";

export const crashlyticslog = (params: string) => {
    person?.environment() == ENV.production ? crashlytics().log(params):console.log("params",params);
    
}