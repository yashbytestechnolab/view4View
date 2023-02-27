
import { Colour } from "../../../theme";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Fonts } from "../../../assets";
const { width }: any = Dimensions.get('window').width;
const { height }: any = Dimensions.get('window').height;
export const styles = StyleSheet.create({

    flex: {
        flex: 1,
        height: '100%',
        width: '100%',
        //backgroundColor: Colour?.PrimaryBlue
    },
    wrapperBtn: {
        marginTop: 25,
        //width: "100%"
    },
    Toplogo: {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30
    },

    title: {
        fontFamily: Fonts.QuicksandBold,
        fontSize: 24,
        lineHeight: 32,
        marginTop: 25,
        color: Colour.white,
    },
    orText: {
        color: Colour.white,
        fontFamily: Fonts.NotoSansMedium,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 26


    },
    fb: {
        marginTop: 33,

        backgroundColor: Colour.fbBlue
    },
    fbIcon: {
        marginRight: 9
    },
    google: {
        marginTop: 12,
        backgroundColor: Colour.googleRed
    },
    apple: { marginTop: 12, backgroundColor: Colour.white },
    appleText: {
        color: Colour.black,
        paddingLeft: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: Fonts.NotoSansMedium
    },
    logo: {
        alignItems: 'center',
        marginTop: 34
    },
    wrapper: {

        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 50,


    },
    line: {
        height: 1,
        width: '100%',
        marginLeft: 5,
        backgroundColor: Colour.white,
    },
    subText: {
        fontFamily: Fonts.NotoSansMedium,
        fontSize: 16,
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginTop: 80,
        color: Colour.white,
    },
    pwdWrapper: {
        position: 'absolute',
        right: 15,
        top: 12,
    }
})