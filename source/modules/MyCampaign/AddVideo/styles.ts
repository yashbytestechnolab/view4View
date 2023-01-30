import { StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Colors.linear_gradient
    },
    mainWrapper: {
        flex: 1,
        backgroundColor: Colors.white
    },
    childWrapper: {
        marginTop: 25,
        marginHorizontal: 16,
        flex: 1
    },
    link: { marginTop: 0 },
    inputStyle: { marginTop: 0, marginHorizontal: 0 },
    button: { marginTop: 16 },
    buttonWrap: { marginHorizontal: 0 },
    discretion: { marginTop: 32, flex: 1 },
    disWrap: { marginTop: 16 },
    vertical: { marginVertical: 3}
})