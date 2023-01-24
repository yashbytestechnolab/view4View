import { StyleSheet } from "react-native";
import { Colors } from "../../Theme";
import { Fonts } from "../../assets/fonts";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCFBFF',
    paddingBottom: 55,
  },
  container: {
    flex: 1,
    height: 100,
    marginVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#E2E2E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 4,
    shadowRadius: 4,
    elevation: 8,
    borderRadius: 16,
    backgroundColor: '#1A1A1A'
  },
  thumbNilImage: { height: 71, width: 93, borderRadius: 4, alignSelf: "center" },
  discription: { flex: 1, marginLeft: 13, marginTop: 12 },
  fillContainer: { height: 4, marginTop: 8, backgroundColor: "#EAEAEA", borderRadius: 60 },
  fillView: {
    height: 4,
    borderRadius: 60,
    backgroundColor: "red"
  },
  countOfView: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  views: { left: 6, top: 1 },
  height: { height: 5, backgroundColor: Colors?.lightWhite },
  flatList: { backgroundColor: '#FCFBFF' },
  safeArea: { backgroundColor: Colors.linear_gradient },
  addIcon: {
    position: "absolute",
    height: 60,
    width: 60,
    bottom: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    right: 20,
    backgroundColor: Colors.primaryRed
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyList: { flexGrow: 1, backgroundColor: "#FCFBFF", justifyContent: "center", alignItems: "center", paddingHorizontal: 16 },
  flatlistContain: { flexGrow: 1, paddingBottom: 10 },
  textAlign: { textAlign: "center" },
  stickeyHeaderView: { height: 34, justifyContent: "center", paddingLeft: 12 },
  stickeyText: { color: "black", fontSize: 16, fontWeight: "500", fontFamily: Fonts.InterMedium },
});