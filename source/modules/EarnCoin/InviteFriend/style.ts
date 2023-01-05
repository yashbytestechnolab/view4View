import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const style = StyleSheet?.create({
    main: {
        backgroundColor: Colors?.white,
        flex: 1,
        paddingVertical: 70,
        paddingHorizontal: 16

    },
    button: { width: '100%', marginTop: 40, },
    scrollContain: {
        alignItems: 'center',
        flexGrow: 1,
        backgroundColor: Colors.white,
        paddingBottom: Platform.OS === "ios" ? 200 : 170
    },
    subText: {
        textAlign: 'center', paddingBottom: 40
    },
    title: { color: Colors?.primaryRed, paddingBottom: 16 }


})