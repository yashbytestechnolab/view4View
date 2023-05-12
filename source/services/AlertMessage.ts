import { showMessage } from "react-native-flash-message";
import { String } from "../constants";
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
    Default: string,
    ChangePasswordSuccess: string
}

export const handleFirebaseError = (type: string, t: void | any) => {
    const { danger, success, Default }: alertMessage = String.flashMessage
    switch (type) {
        case "auth/wrong-password": return AlertMessage(t("passError"), danger)
        case "auth/too-many-requests": return AlertMessage(t("tooManyRequest"), danger)
        case "auth/user-not-found": return AlertMessage(t("userNotFound"), danger)
        case "auth/email-already-in-use": return AlertMessage(t("emailAlredyInUser"), danger)
        case "ForgotSucess": return AlertMessage(t("forgotPwdSuccessMsg"), success)
        case "WrongEmail": return AlertMessage(t("validEmail"), danger)
        case "coin not update": return AlertMessage(t("Something"), danger)
        case "refCode": return AlertMessage(t("refCode"), Default)
        case "ChangePasswordSuccess": return AlertMessage(t("ChangePasswordSuccess"), success)
        default: return type
    }
}

const AlertMessage = (...params: Array<string | any>) => {
    if (params[1] == "default") {
        showMessage({
            backgroundColor: "#FF1359",
            message: params[0],
            type: params[1],
        })
    }
    else {
        showMessage({
            message: params[0],
            type: params[1],
        })
    }
}