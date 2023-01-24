import { StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const style = StyleSheet.create({
    containerWrapper: {
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        flex: 1,
        backgroundColor: Colors?.white,
        paddingBottom: 50
    },
    wrapperView: {
        flex: 1,
        backgroundColor: Colors?.pink,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        marginTop: -35,
    },
googleWrapper:{ width: '92%', marginLeft:16},
    backToLoginTextWrapper: { flexDirection: 'row', justifyContent: 'center', paddingTop: 24 },
    welcomeHeader: {
        alignItems: "center", paddingTop: 30
    },
    backGroundColor: { backgroundColor: Colors?.gradient1 },
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
    socialMedia: { flexDirection: "row", justifyContent: "space-between" ,paddingLeft:16,paddingRight:10},
    wrapperStyle: {
        alignSelf: 'center',
        width: '80%'
    },
    marginTop: { marginTop: 33 },
    scroll: { backgroundColor: Colors.white },
    scrollContain: {
        flexGrow: 1,
        backgroundColor: Colors.white,
    },
    borderRadius: {
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        marginTop: 20
    },
})