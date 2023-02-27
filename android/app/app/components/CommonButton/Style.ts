import { Dimensions, StyleSheet } from 'react-native';
import { Fonts } from '../../assets';
import { Colour } from '../../theme';



export const style = StyleSheet.create({
    buttonWrapper: {
        backgroundColor: Colour.primaryGreen,
        height: 48,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleWrapper: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight:24,
        alignItems:'center',
        fontFamily: Fonts.NotoSansMedium,
        color: Colour.PrimaryBlue,
        //paddingHorizontal: 22,
    },
    Icon:{
        marginHorizontal:9.7,
        alignItems:'center'
    }
   
});
