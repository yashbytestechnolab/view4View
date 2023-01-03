import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.linear_gradient
    },
    header: { justifyContent: "center", alignItems: "center", flex: 0.35, },
    borderRadius: {
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        marginTop: 20
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
    scroll: { backgroundColor: Colors.white },
    scrollContain: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        paddingBottom: Platform.OS === "ios" ? 100 : 70
    },
    headerBack: { position: "absolute", zIndex: 999, top: 34, left: 16 },
 
    mainLogo: {
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.linear_gradient
    },
    safeArea: {
        backgroundColor: Colors.linear_gradient
    },
    wrapperView: {
        flex: 1,
        backgroundColor: "pink",
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
    },
    container: {
        flex: 1,
        backgroundColor: "pink"
    },
    innerContainer: {
        marginTop: 30,
        // bottom: 12
    },
    forgotPassword: { marginTop: 16, alignSelf: "flex-end", marginHorizontal: 11, padding: 5 },
    signIn: { marginTop: 24 },
    top33: { marginTop: 33 },
    socialMedia: { flexDirection: "row", justifyContent: "space-between" }
});