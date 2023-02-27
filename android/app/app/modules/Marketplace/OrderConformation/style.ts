import { StyleSheet } from "react-native";
import { Fonts } from "../../../assets";
import { Colour } from "../../../theme";

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colour.white,
        height: '100%',
        width: '100%',
        paddingTop: 15,
    },
    backButton: {
        fontFamily: Fonts.Quicksand,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        alignItems: 'center',
        color: Colour.PrimaryBlue,
        paddingTop: 24,
        paddingBottom: 14,
    },
    cardWrapper: {
        borderRadius: 18,
        borderColor: Colour.gray200,
        borderWidth: 1,
    },
    OderDetailstitle: {
        fontFamily: Fonts.Quicksand,
        paddingTop: 16,
        paddingBottom: 14,
        color: Colour.PrimaryBlue,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
    },
    grayLine: {
        height: 1,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 12,
        backgroundColor: Colour.gray300,
    },
    syncIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 28,
    },
    titleText: {
        fontFamily: Fonts.Quicksand,
        fontWeight: '500',
        fontSize: 30,
        lineHeight: 38,
        textAlign: 'center',
        color: Colour.PrimaryBlue,
        paddingHorizontal: 30,
    },
    grayBorder: {
        borderWidth: 1,
        borderColor: Colour.gray200,
        borderRadius: 18,
        paddingVertical: 16,
        marginBottom: 18
    },
    backMarket: {
        backgroundColor: Colour.white,
        borderRadius: 50,
        borderWidth: 1,
        width: '100%',
        borderColor: Colour.gray300,
        marginBottom: 30,
        marginTop: 21,
        alignSelf: 'center'
    },
});
