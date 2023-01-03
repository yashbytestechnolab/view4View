import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.linear_gradient
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        flex: 0.35,
    },
    borderRadius: {
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
    },
    welcomeTop: {
        flex: 0.7,
        backgroundColor: Colors.gray,
    },
    height: {
        height: 20
    },
    welcome: {
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    scroll: {
        backgroundColor: Colors.white
    },
    headerBack: {
        position: "absolute",
        zIndex: 999,
        top: 34,
        left: 16
    },
    scrollContain: {
        flexGrow: 1,
        paddingBottom: Platform.OS === "ios" ? 100 : 70
    },
    mainLogo: {
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.linear_gradient
    },
    safeArea: {
        backgroundColor: Colors.gradient1
    },
    wrapperView: {
        backgroundColor: "pink",
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.lightPink
    },
    innerContainer: {
        marginTop: 30,
        bottom: 12
    },
    forgotPassword: {
        marginTop: 16,
        alignSelf: "flex-end",
        marginHorizontal: 16
    },
    signIn: {
        marginTop: 24
    },
    marginTop33: {
        marginTop: 33
    },
    socialMedia: {
        flexDirection: "row",
        justifyContent: "center"
    }
})