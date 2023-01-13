import { StyleSheet } from "react-native";
import { Colors } from "../../../../Theme";

export const style = StyleSheet.create({
   
    safeArea: {
        backgroundColor: Colors.gradient1,
    },
    mainWrapper: { backgroundColor: Colors.white, flex: 1 },
    scrollWrapper: { backgroundColor: Colors?.white },
    containWrapper: {
        backgroundColor: Colors?.white,
        flexGrow: 1,
        paddingBottom: 130,
    },
    marginTop33: { marginTop: 25 },
});
