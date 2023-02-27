import { StyleSheet } from "react-native";
import { Fonts } from "../../../assets";
import { Colour } from "../../../theme";

export const style = StyleSheet.create({
    backWrapper: {
        marginTop: 28,
        marginLeft: 28,
    },
    syncIcon: {
        alignItems: 'center',
        marginTop: 85,
        marginBottom: 28,
    },
    image: {
        alignSelf: 'center',
        marginTop: 37,
    },

    subTitle: {
        textAlign: 'center',
        fontFamily: Fonts.NotoSansMedium,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
        color: Colour.white,
        marginHorizontal: 30,
        marginTop: 8,
        marginBottom:19
    },
    buttonWrapper: {
        
        marginBottom: 97,
        
    },
});
