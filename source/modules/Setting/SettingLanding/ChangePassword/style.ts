import { Platform, StyleSheet } from "react-native";
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
        //paddingBottom: 130,
    },
    scroll:{backgroundColor:Colors?.white,marginTop:24},
    scrollContain: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        paddingBottom: Platform.OS === "ios" ? 100 : 70
    },
    marginTop33: { marginTop: 25 },
});
