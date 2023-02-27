import { StyleSheet } from "react-native";
import { Fonts } from "../../../assets";
import { Colour } from "../../../theme";

export const style = StyleSheet.create({
    margin: {
        marginLeft: 16,
        marginRight: 17,

    },
    title: {
        color: Colour.PrimaryBlue,
        textAlign: 'left',
        fontFamily: Fonts.QuicksandBold,
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '600',
        marginHorizontal: 17,
        marginTop: 24,
        marginBottom: 8,
    },
    bottomMargin: {
        marginBottom: 22,
        backgroundColor: Colour.white,
    },
    padding: {
        paddingVertical: 8
    },

    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});
