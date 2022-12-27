import { StyleSheet } from "react-native";
import { Colors } from "../../Theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
    },

    textStyle: {
        color: Colors?.green,
        fontSize: 30,
    },
    timeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
    redLine: {
        height: 50,
        width: 5,
        backgroundColor: Colors?.pink,
        borderRadius: 50,
    },
});
