import { StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const style = StyleSheet.create({
    containerWrapper: {
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        flex: 1, backgroundColor: Colors?.white,
        paddingBottom:50
    },

    backToLoginTextWrapper: { flexDirection: 'row', justifyContent: 'center', paddingTop: 24 },
    welcomeHeader: {
        alignItems: "center", paddingTop: 30
    },
    scrollContain: {
        backgroundColor:Colors?.gradient1 },
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
    socialMedia: { flexDirection: "row", justifyContent: 'center' },
    wrapperStyle: {
        alignSelf: 'center',
        width: '80%'
    }
})