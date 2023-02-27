import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../../../assets";
import { Colour } from "../../../../theme";

export const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colour.white,


    },
    IconWrapper: {
        height: 56,
        width: 56,
        borderRadius: 50,
        backgroundColor: Colour.PrimaryBlue,
        marginTop: 48,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },

    textWrapper: {
        // marginTop: 32,
    },
    resendActionWrapper: {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center', 
        marginTop:32
    },
    link: {
        color: Colour.primaryBlueShade,
        fontWeight: '500',
        fontSize: 14,
        // lineHeight: 20,
        fontFamily: Fonts.NotoSansMedium,
    },
    emailText: {
        color: Colour.gray500,
        fontWeight: '500',
        fontSize: 16,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: Fonts.NotoSansMedium,
    },
});
