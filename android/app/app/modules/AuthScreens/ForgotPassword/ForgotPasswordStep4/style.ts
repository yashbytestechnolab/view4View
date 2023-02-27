import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../../../assets";
import { Colour } from "../../../../theme";

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colour.white,
        paddingHorizontal: 16

    },
    IconWrapper: {
        height: 56,
        width: 56,
        borderRadius: 50,
        backgroundColor: Colour.primaryGreen,
        marginTop: 48,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonWrapper: {
        marginTop: 32,

    },
    textWrapper: {
        textAlign: 'center',
        marginBottom: 32,
        fontWeight: '400',
        fontFamily: Fonts.InterRegular
    },
});
