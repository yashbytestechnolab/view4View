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
        paddingVertical:5
    },
    costStyle: {
        backgroundColor: Colors?.pink,
        height: 35,
        width: 55,
        textAlign: 'center',
        paddingTop: 10,
        color: Colors?.white,
    },
});
