import { StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const style = StyleSheet.create({
  text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
  safeArea: {
    backgroundColor: Colors.gradient1
  },
  pinkTabWrapper: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    height: 41,
    marginTop: 24,
    backgroundColor: Colors?.shadowPink
  },
  flex: { flex: 1 },
  marginTop: { marginTop: 35 },
  imageWrapper: {
    height: 60, width: 60, borderRadius: 30,
    marginBottom: 12,
    backgroundColor: Colors?.shadowPink
  },
  nameWrapper: { justifyContent: "center", alignItems: "center", marginHorizontal: 16, },
  tabWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 18 },
  mainWrapper: { backgroundColor: Colors.white, flex: 1 },
  scrollWrapper: { paddingTop: 24, backgroundColor: Colors?.white },
  containWrapper: { backgroundColor: Colors?.white, flexGrow: 1, paddingBottom: 130 },
  paddingLeft: { paddingLeft: 8, fontSize: 15 },
  profileNameWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60, width: 60, borderRadius: 30,
    backgroundColor: Colors?.dropdownOffWhite, marginBottom: 12
  }
})