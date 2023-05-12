import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors?.white
    },
    safearea: { backgroundColor: Colors?.gradient1 },
    scrollWrapper: { paddingHorizontal: 15, paddingTop: 30, flex: 1 },
    coinTextWrapper: {
        flexDirection: 'row', justifyContent: 'center', marginTop: 19, marginBottom: 30
    },
    textAlign: {
        textAlign: 'center'
    },
    paddingLeft: { paddingLeft: 12 },
    subTextWrapper: {
        flexDirection: 'row', alignItems: 'center', marginLeft: 5
    },
    dot: {
        height: 5, width: 5, borderRadius: 4, backgroundColor: Colors?.black, marginRight: 8
    },
    subTextMargin: {
        marginTop: 16, marginBottom: 24
    },
    viewCoinWrapper: {
        alignItems: 'center', marginBottom: 32
    },
    viewCoinText: {
        textAlign: "center",
        color: Colors?.primaryRed, marginTop: 24
    },
    scrollContain: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        paddingBottom: Platform.OS === "ios" ? 200 : 170
    },
})