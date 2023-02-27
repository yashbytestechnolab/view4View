import {StyleSheet} from 'react-native';
import {Fonts} from '../../../assets';
import {Colour} from '../../../theme';

export const style = StyleSheet.create({
  main: {
   
    flexGrow: 1,
    paddingBottom: 32,
  },
  backWrapper: {
    marginTop: 28,
    // marginLeft: 28,
  },
  heartWrapper:{
    height:'100%',
    flexDirection:'column',paddingHorizontal:12
  },
  image: {
    alignSelf: 'center',
    marginTop: 37,
    marginBottom: 44,
  },
  greenAmount: {
    color: Colour.primaryGreen,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight:'700',
    textAlign:'center'
  },
  subtext: {
    marginTop: 8,
    marginBottom: 32,
    paddingHorizontal:20
  },
  Row: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  dots: {
    borderRadius: 16,
    height: 71,
    width: 78,
  },
  heartIconsWrapper: {
    marginTop: 30,
   
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal:37
    height:100
  },
  icon1: {
    //marginLeft: 21,
    height: 60,
    width: 60,
    borderRadius: 12,
    //marginBottom:12
  },

 
  text: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: Colour.white,
    textAlign:'center',
    paddingTop:12,
    justifyContent:'center'
   
  },
  text2:{
    paddingBottom:8,paddingTop:8,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    fontSize: 13,
    //lineHeight: 20,
    color: Colour.white,
    textAlign:'center'
  },
  text3:{
    paddingBottom:8,paddingTop:8,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    fontSize: 13,
    //lineHeight: 20,
    color: Colour.white,
    textAlign:'center'
  },
  
  skipText: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: Colour.white,
    marginTop: 52,
    textAlign: 'center',
  },
  coloman: {
    flexDirection: 'column',
  },
  itemWrapperStyle: {
    justifyContent:'center', alignItems:'center',
    marginHorizontal:10
  }
});
