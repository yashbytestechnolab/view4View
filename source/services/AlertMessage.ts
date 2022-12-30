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
    validEmail:string
}

export const handleFirebaseError = (type: string) => {

    const { passError, tooManyRequest, danger, userNotFound, emailAlredyInUser, forgotPwdSuccessMsg, success,validEmail }: alertMessage = String.flashMessage
    switch (type) {
        case "auth/wrong-password": return AlertMessage(passError, danger)
        case "auth/too-many-requests": return AlertMessage(tooManyRequest, danger)
        case "auth/user-not-found": return AlertMessage(userNotFound, danger)
        case "auth/email-already-in-use": return AlertMessage(emailAlredyInUser, danger)
        case "ForgotSucess": return AlertMessage(forgotPwdSuccessMsg, success)
        case "WrongEmail": return AlertMessage(validEmail, danger)
        default: return type
    }
}

const AlertMessage = (...params: Array<string>) => {
    showMessage({
        message: params[0],
        type: params[1],
    });
}