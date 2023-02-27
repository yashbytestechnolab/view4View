import { StyleSheet } from "react-native";
import { Fonts } from "../../../../assets";
import { Colour } from "../../../../theme";



export const style = StyleSheet.create({

    arrow: {
        marginBottom: 7,
        paddingTop: 23,
    },
    wrapper: {
        flex: 1,
        // paddingHorizontal: 16
    },
    errorStyle: {
        textAlign: 'left'
    },
    boxShedo: {
        shadowColor: '#101828',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: '100%',
        shadowOpacity: 0.25,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: Colour.gray300,
        backgroundColor: Colour.white,
        borderRadius: 8,
        paddingVertical: 0,
        height: 44,
        paddingLeft: -14,
        paddingRight: -40,

        //flex:1,
        //width: '100%',
        //paddingHorizontal: 14,
        marginTop: 6,
        marginBottom: 3,
        elevation: 2,
    },
    cardDetailTitle: {
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        marginLeft: 16,
        textAlign: 'left',
        color: Colour.PrimaryBlue,
    },
    title: {
        marginTop: 26,
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'left',
        color: Colour.PrimaryBlue,
        //marginBottom: 6,
        //marginHorizontal: 5,
    },
    radioTitle: {

        fontFamily: Fonts.ManropeMedium,
        fontWeight: '500',
        fontSize: 16,
        alignItems: 'center',
        textAlign: 'left',
        color: Colour.gray700,
        marginLeft: 4


    },
    textInputTextStyle: {
        fontFamily: Fonts.ManropeMedium,
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 24,
        //paddingHorizontal: 14,
        //textAlign: 'left',
        color: Colour.darkGray,
    },
    defaultPayment: {
        fontFamily: Fonts.ManropeMedium,
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        paddingHorizontal: 8,
        textAlign: 'left',
        color: Colour.gray700,
    },
    expiryTextInputWrapper: {
        height: 44,
        width: '100%',
        shadowColor: '#101828',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingRight: -40,
        shadowOpacity: 0.25,
        shadowRadius: 2,
        paddingLeft: -15,


        elevation: 2,
        //marginHorizontal: 5,

        borderWidth: 1,
        borderColor: Colour.gray300,
        backgroundColor: Colour.white,
        borderRadius: 8,
    },
    defaultPaymentWrapper: { flexDirection: 'row', marginTop: 24, marginLeft: 2, alignItems: 'center' },
    addPaymentButton: {
        marginTop: 39,
        marginBottom: 24,
    },

    cancleWrapper: { textAlign: 'center', fontSize: 16, marginBottom: 32 },
    radioLine: {
        borderRadius: 50,
        borderColor: Colour.gray200,
        height: 20,
        width: 20,
        padding: 10,
        borderWidth: 1,
        backgroundColor: Colour.gray100,

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
        justifyContent: "space-around",
        marginTop:10,
        // backgroundColor:"red",
        // width: "100%",
        flexDirection: 'row',
        // alignItems: 'center',
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
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});