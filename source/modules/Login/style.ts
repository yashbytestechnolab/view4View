import { StyleSheet } from "react-native";
import { Colors } from "../../Theme";

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.linear_gradientFF7B76
    },
    text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
    header: { justifyContent: "center", alignItems: "center", flex: 0.35, },
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
    welcomeHeader: {
        alignItems: "center"
    },
    welcome: {
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    scroll: { backgroundColor: Colors.white },
    headerBack: { position: "absolute", zIndex: 999, top: 34, left: 16 },
    scrollContain: {
        flexGrow: 1,
        paddingBottom: 200
    },
    mainLogo: {
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.linear_gradientFF7B76
    },
    safeArea: {
        backgroundColor: "red"
    },
    wrapperView: {
        backgroundColor: Colors.linear_gradientFF7B76,
        flex: 0.6
    },
    container: {
        flex: 1,
        backgroundColor: "pink"
    },
    innerContainer: {
        marginTop: 30,
        bottom: 12
    },
    signUpHeader: { marginTop: 12, justifyContent: "center", flexDirection: "row" },
    forgotPassword: { marginTop: 16, alignSelf: "flex-end", marginHorizontal: 16 },
    signIn: { marginTop: 24 },
    bottomLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 29, marginHorizontal: 16,
    },
    line: {
        height: 1,
        width: 143,
        marginTop: 4,
        backgroundColor: Colors.greyD8D8D8,
    },
    socialMedia: { flexDirection: "row" }
});