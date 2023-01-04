import { StyleSheet } from "react-native";
import { Colors } from "../../Theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
    },
    safearea:{backgroundColor:Colors?.gradient1},
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
    videoWrapper: {
        backgroundColor: Colors?.black, justifyContent: 'center', paddingTop: 60, borderRadius: 8
    },
    main: {
        paddingHorizontal: 12, paddingTop: 24,
    },
    iconRow: {
        marginTop: 40, marginHorizontal: 42, flexDirection: 'row', justifyContent: 'space-between',
    },
    iconWrapper: { flexDirection: 'row', alignItems: 'center' },
    marginLeft: {
        marginLeft: 16
    },
    marginTop: {
        marginTop: 32
    }
});
