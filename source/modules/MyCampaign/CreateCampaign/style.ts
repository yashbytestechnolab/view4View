import { StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

export const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    plusIcon: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '400',
    },
    totalCostText: {
        color: Colors.black,
        fontSize: 15,
        fontWeight: '200',
    },

    addButtonWrapper: {
        height: 35,
        width: '80%',
        backgroundColor: Colors?.pink,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 18,
        marginLeft: 8,
    },
    totalCoast: {
        flexDirection: 'row',
        paddingHorizontal: 18,
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    costStyle: {
        backgroundColor: Colors?.pink,
        height: 35,
        width: 55,
        textAlign: 'center',
        paddingTop: 10,
        color: Colors?.white,
    },
    expectedView: {
        height: 33,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        width: 82, backgroundColor: Colors.dropdownOffWhite
    },
    alignSelef: { alignSelf: "center" },
    marginTop16: { marginTop: 16 },
    settingWrapper: { flexDirection: "row", flex: 1, justifyContent: "space-between" },
    dropDown: { position: "absolute", right: 20 },
    dropContain: { width: 81, flex: 1, },
    icon: { right: 15, },
    dropDownContainer: { width: 81, left: 20, justifyContent: "center", alignItems: "center" },
    paddingLeft: { paddingLeft: 20 },
    orderView: { marginTop: 16, flex: 1 },
    scrollView: { backgroundColor: Colors.white, marginTop: 12, },
    contain: { paddingHorizontal: 16, flexGrow: 1, paddingBottom: 90 },
    requireFild: {height: 1, backgroundColor: Colors.greyD8D8D8 },
    wrapperView: { flex: 1, marginTop: 22 },
    buttonAddCamp: { marginHorizontal: 0, marginTop: 32 },
    warnWrapper: { marginTop: 32, flex: 1 },
    warningText: { marginTop: 12 },
    textAlign: { textAlign: "left" }
});
