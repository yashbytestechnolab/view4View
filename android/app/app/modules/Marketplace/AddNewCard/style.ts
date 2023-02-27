import { StyleSheet } from "react-native";
import { Fonts } from "../../../assets";
import { Colour } from "../../../theme";


export const style = StyleSheet.create({

    arrow: {
        // marginBottom: 14,
        paddingVertical: 23,
    },
    wrapper: {
        flex: 1,
        // paddingHorizontal: 16
    },

    cardDetailTitle: {
        fontFamily: Fonts.Quicksand,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        marginLeft: 16,
        textAlign: 'left',
        color: Colour.PrimaryBlue,
    },
    title: {
        marginTop: 16,
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'left',
        color: Colour.PrimaryBlue,
        marginBottom: 6,
        marginHorizontal: 5,
    },
    billingContact: {
        marginTop: 29,
        fontFamily: Fonts.Quicksand,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'left',
        color: Colour.PrimaryBlue,
        marginHorizontal: 5,
    },
    radioTitle: {

        fontFamily: Fonts.Quicksand,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'left',
        color: Colour.gray700, marginLeft: 4


    },
    textInputTextStyle: {
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 24,
        //paddingHorizontal: 14,
        //textAlign: 'left',
        color: Colour.gray700,
    },
    defaultPayment: {
        fontFamily: Fonts.Manrope,
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        paddingHorizontal: 8,
        textAlign: 'left',
        color: Colour.gray700,
    },
    expiryTextInputWrapper: {
        height: 44,
        //width: 173,
        marginHorizontal: 5,
        elevation: 0,
        borderWidth: 1,
        borderColor: Colour.gray300,
        backgroundColor: Colour.white,
        borderRadius: 8,
    },
    defaultPaymentWrapper: { flexDirection: 'row', marginTop: 24, marginLeft: 5, alignItems: 'center', marginBottom: 8 },
    addPaymentButton: {
        marginTop: 29,
        marginBottom: 24,
    },

    cancleWrapper: { textAlign: 'center', fontSize: 16, marginBottom: 10 },
    radioLine: {
        borderRadius: 50,
        borderColor: Colour.gray200,
        height: 20,
        width: 20,
        padding: 10,
        borderWidth: 1,
        backgroundColor: Colour.gray100
    },
    radioFill: {
        backgroundColor: Colour.PrimaryBlueShade,
        height: 8,
        width: 8,
        top: 6,
        left: 6,
        borderRadius: 50,
        position: 'absolute',

    },
    radioButtonWrapper: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 17,
        marginRight: 40,
        marginBottom: 10

    },
    radioButtonTrue: {
        backgroundColor: Colour.PrimaryBlueShade,
        height: 20,
        width: 20,
        borderRadius: 50,
        position: 'absolute',
    },
    radioButtonTrue2: {
        height: 8,
        width: 8,
        position: 'absolute',
        top: 6,
        left: 6,
        borderRadius: 50,
        backgroundColor: Colour.PrimaryBlue800,
    },
    saveTextInput: {
        width: 363
    }
});