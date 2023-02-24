import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.linear_gradient
    },
    header: { justifyContent: "center", alignItems: "center", flex: 0.35, },


    scroll: { backgroundColor: Colors.white },
    scrollContain: {
        flexGrow: 1,
        backgroundColor: Colors.white,

    },
    signIn: { marginTop: 24 },

});