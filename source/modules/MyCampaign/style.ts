import { StyleSheet } from "react-native";
import { Colors } from "../../Theme";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCFBFF',
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
    backgroundColor: Colors.white
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
  flatList: { marginBottom: 80, marginTop: "2%", backgroundColor: '#FCFBFF' },
  safeArea: { backgroundColor: Colors.linear_gradient },
  addIcon: {
    position: "absolute",
    height: 60,
    width: 60,
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    right: 20,
    backgroundColor: Colors.primaryRed
  }
});