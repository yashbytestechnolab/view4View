import { StyleSheet } from "react-native";
import { Colors } from "../../Theme";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors?.white,
  },
  container: {
    flex: 1,
    marginTop: "9%",
    marginVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.white
  },
  thumbNilImage: { height: 75, width: 93, borderRadius: 4, alignSelf: "center" },
  discription: { flex: 1, marginLeft: 13 },
  fillContainer: { height: 4, marginTop: 8, backgroundColor: "#EAEAEA", borderRadius: 60 },
  fillView: {
    height: 4,
    borderRadius: 60,
    backgroundColor: "red"
  },
  countOfView: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  views: { left: 6, top: 1 },
  height: { height: 5 },
  flatList: { marginBottom: 80, },
  safeArea: { backgroundColor: Colors.linear_gradient }
});