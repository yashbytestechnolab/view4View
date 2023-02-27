import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../../assets';
import { Colour } from '../../theme';

export const style = StyleSheet.create({
    DefaultWrapperStyle: {
    
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colour.white,
        borderRadius: 8,
        //elevation: 5,
        shadowColor: Colour.black,
        borderWidth: 0,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingLeft:15,
       
        shadowRadius: 8,
        shadowOpacity: 0.23,
        paddingHorizontal: 15,
       
    },
    iconStyle: {
        paddingLeft: 15,
        marginLeft: 15,
        alignItems:'center',
        justifyContent:'center'
    },
    
 TextInputStyle: {
    width:'100%',
    paddingBottom:0,
    paddingTop:0,
    alignItems:'center',
    //textAlign:'center',
    justifyContent:'center',
    marginBottom:5,
   paddingLeft:10,
   paddingRight:40, 
    fontWeight:'300',
    color: Colour.black,
    fontFamily: Fonts?.NotoSansLight,
    fontSize: 16,
},
    Icon: {

    }

});
