import { Dimensions, Platform, StyleSheet } from "react-native";
import { Colors } from "../../../Theme";

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

export const style = StyleSheet.create({
    scroll: {
        backgroundColor: Colors.lightWhite,
        //flex: 1
    },
    scrollContain: {
        flexGrow: 1,
        backgroundColor: Colors?.lightWhite,

        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === "ios" ? 100 : 70
    },
    logoWrapper: {},

    main: { flex: 1, backgroundColor: Colors?.lightWhite, height: Height },
    card: {
        shadowColor: Colors?.whiteShadow,
        width: '100%',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
        backgroundColor: Colors?.white,
        padding: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        borderRadius: 8,
        shadowRadius: 4,
        //elevation: 8,
    },
    subTextWrapper: {
        marginVertical: 50, width: '100%', color: Colors.placeHolderTextBlack,
        fontSize: 14,
        fontWeight: "400",
    },
    rbWrapper: { flexDirection: 'row', alignItems: 'center' },
    isChecked: { height: 22, width: 22, borderRadius: 13, borderColor: Colors?.primaryRed, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    buttonWrapper: { width: '100%', },
    selectRB: { height: 10, width: 10, borderRadius: 8, backgroundColor: Colors.primaryRed, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
    loaderHead: {
        position: 'absolute',
        top: Height / 2.8,
        left: Width / 2.3,
        zIndex: 999
    }
})