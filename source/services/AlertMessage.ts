import { showMessage } from "react-native-flash-message";
import { String } from "../constants";
interface alertMessage {
    forgotPwdSuccessMsg: string,
    success: string,
    passError: string,
    tooManyRequest: string,
    danger: string,
    userNotFound: string,
    emailAlredyInUser: string
}

export const handleFirebaseError = (type: string) => {
    console.log("handleFirebaseError", type);
    const { passError, tooManyRequest, danger, userNotFound,emailAlredyInUser }: alertMessage = String.flashMessage
    switch (type) {
        case "auth/wrong-password": return AlertMessage(passError, danger)
        case "auth/too-many-requests": return AlertMessage(tooManyRequest, danger)
        case "auth/user-not-found": return AlertMessage(userNotFound, danger)
        case "auth/email-already-in-use": return AlertMessage(emailAlredyInUser, danger)
        default: return type
    }
}

const AlertMessage = (...params: Array<string>) => {
    console.log("params", params);
    console.log(params);
    showMessage({
        message: params[0],
        type: params[1],
    });
}