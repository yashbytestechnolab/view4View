import { StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const style = StyleSheet.create({
    text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
    safeArea: {
      backgroundColor: Colors.gradient1
    },
    pinkTabWrapper: {
      alignItems: "center", flexDirection: "row", paddingHorizontal: 20, height: 41, marginTop: 24, backgroundColor: Colors?.shadowPink
    },
    marginTop: { marginTop: 35 },
    imageWrapper: { height: 60, width: 60, borderRadius: 30, backgroundColor: Colors?.shadowPink, marginBottom: 12 },
    nameWrapper: { justifyContent: "center", alignItems: "center", marginHorizontal: 16, },
    tabWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 18 },
    mainWrapper: { backgroundColor: Colors.white, flex: 1 },
    scrollWrapper: { paddingTop: 24, backgroundColor: Colors?.white },
    containWrapper: { backgroundColor: Colors?.white, flexGrow: 1, paddingBottom: 130 },
    paddingLeft: { paddingLeft: 12 }
  })