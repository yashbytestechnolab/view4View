import { StyleSheet } from "react-native";
import { Fonts } from "../../../assets";
import { Colour } from "../../../theme";

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colour.white,
        height: '100%',
        width: '100%',
        //paddingRight: 15,
        //paddingTop: 15,
    },
    backButton: {
        fontFamily: Fonts.QuicksandSemiBold,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        color: Colour.PrimaryBlue,
        marginBottom: 14,
        marginTop: 12,
    },
    cardWrapper: {
        borderRadius: 18,
        borderColor: Colour.gray200,
        //padding: 12,

        borderWidth: 1,
        marginBottom: 18,
    },
    subtitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        marginHorizontal: 35,
    },
    subTitleText: {
        fontFamily: Fonts.QuicksandSemiBold,
        fontSize: 12,
        lineHeight: 15,
        color: Colour.PrimaryBlue,
        fontWeight: '700',
        //marginTop: 16,
    },
    addCardText: {
        textAlign: 'center',
        fontFamily: Fonts.NotoSans,
        fontSize: 14,
        lineHeight: 20,
        color: Colour.placeholderGray,
        fontWeight: '500'
    },
    grayLine: {
        height: 1,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 12,
        backgroundColor: Colour.gray300,
    },
    amountWrapper: {
        flexDirection: 'column',
        //marginHorizontal: 35,
        marginTop: 18,
        justifyContent: 'space-between',
    },
    border: {
        width: 16,
        height: 16,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colour.PrimaryBlue,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 9,
    },
    paymentAdd: {
        backgroundColor: Colour.addressBackground,
        height: 52,
        width: '100%',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    compeletePurches: { marginVertical: 33 },
    paymentMethodWrapper: { marginVertical: 16, padding: 16, borderWidth: 1, borderColor: Colour.gray200, borderRadius: 18 },
    shiptitle: { fontFamily: Fonts.Quicksand, fontWeight: '500', fontSize: 14, lineHeight: 18, marginBottom: 10, color: '#090428' },
    shipSubText: { fontFamily: Fonts.Quicksand, fontWeight: '500', fontSize: 14, lineHeight: 18, color: Colour.gray500 }
});
