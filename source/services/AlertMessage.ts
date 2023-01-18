import { showMessage } from "react-native-flash-message";
import { colors } from "react-native-swiper-flatlist/src/themes";
import { String } from "../constants";
import { Colors } from "../Theme";
interface alertMessage {
    forgotPwdSuccessMsg: string,
    success: string,
    passError: string,
    tooManyRequest: string,
    danger: string,
    userNotFound: string,
    emailAlredyInUser: string,
    validEmail: string,
    Something: string
    refCode: string
    Default: string
}

export const handleFirebaseError = (type: string) => {

    const { passError, tooManyRequest, danger, userNotFound, emailAlredyInUser, forgotPwdSuccessMsg, success, validEmail, Something, refCode, Default }: alertMessage = String.flashMessage
    switch (type) {
        case "auth/wrong-password": return AlertMessage(passError, danger)
        case "auth/too-many-requests": return AlertMessage(tooManyRequest, danger)
        case "auth/user-not-found": return AlertMessage(userNotFound, danger)
        case "auth/email-already-in-use": return AlertMessage(emailAlredyInUser, danger)
        case "ForgotSucess": return AlertMessage(forgotPwdSuccessMsg, success)
        case "WrongEmail": return AlertMessage(validEmail, danger)
        case "coin not update": return AlertMessage(Something, danger)
        case "refCode": return AlertMessage(refCode, Default)
        default: return type
    }
}

const AlertMessage = (...params: Array<string>) => {

    showMessage({
        // color:params[1] == "default" && Colors?.blackShadow,
        backgroundColor: params[1] == "default" ? "#FF1359" : params[1] == "danger" ? Colors?.black : Colors?.red,
        message: params[0],
        type: params[1],
    });
}