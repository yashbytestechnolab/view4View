import { Dimensions, StyleSheet } from "react-native";
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
        backgroundColor: Colour.PrimaryBlue,
        marginTop: 48,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonWrapper: {
        marginTop: 24,

    },
    textWrapper: {

        marginBottom: 6,
    },
    textWrapper2: {

        marginBottom: 6,
        marginTop: 20,
    },
    subText: {

        marginBottom: 32
    },
    pwdWrapper: {
        position: 'absolute',
        right: 15,
        top: 40,
        padding:5,alignItems:'center',justifyContent:'center',
        paddingTop:3,
        // top: 40,
    }
});
