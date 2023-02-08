import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const style = StyleSheet.create({
    text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
    safeArea: {
        backgroundColor: Colors.gradient1
    },
    saveTextWrapper: { position: 'absolute', right: 12, top: 13, padding: 5, textAlign: 'center' },
    imageWrapper: { height: 60, width: 60, borderRadius: 30, backgroundColor: Colors?.shadowPink, },
    nameWrapper: { justifyContent: "center", alignItems: "center", marginHorizontal: 16, },
    mainWrapper: { backgroundColor: Colors.white, flex: 1 },
    scrollWrapper: { backgroundColor: Colors?.white },
    containWrapper: { backgroundColor: Colors?.white, flexGrow: 1, },
    marginTop33: { marginTop: 25 },
    editIconWrapper: {
        position: "relative", left: 20, bottom: 25,
        justifyContent: "center", alignItems: "center",
        height: 26, width: 26, backgroundColor: Colors?.white, borderRadius: 13
    },
    paddingTop: { paddingTop: 24 }
})