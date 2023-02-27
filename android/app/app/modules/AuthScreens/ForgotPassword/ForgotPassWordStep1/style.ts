import { Dimensions, StyleSheet } from "react-native";
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
    buttonWrapper: {
        marginTop: 24,
        
    },
    textWrapper: {

        marginBottom: 6,

    },

});
