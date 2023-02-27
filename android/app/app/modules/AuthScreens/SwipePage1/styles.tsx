import {Dimensions, Platform, StyleSheet, StatusBar} from 'react-native';
import {Fonts} from '../../../assets';
import {Colour} from '../../../theme';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
export const styles = StyleSheet.create({
  flex: {

    backgroundColor: Colour?.PrimaryBlue,
  },
  logo: {
    marginVertical: rh(4)
  },
  pagination: {
    alignSelf: 'center',
    alignItems: 'center',
    // margin: 20,
    flex: 1,
    height: '45%',
  },
  images: {
    width: width - 40,
    height: height / 2.5,
    borderRadius:18,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.Quicksand,
    marginTop: 48,
    alignItems: 'center',
    textAlign: 'center',
    color: Colour.white,
  },
  subTitle1: {
    marginHorizontal: 53,
    fontFamily: Fonts.NotoSans,
    fontSize: 14,
    color: Colour.white,
    lineHeight: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  subTitle2: {
    fontFamily: Fonts.NotoSans,
    textAlign: 'center',
    marginHorizontal: 16,
    color: Colour.white,
    lineHeight: 20,
    fontSize: 14,
    marginTop: 8,
  },
  subTitle3: {
    fontFamily: Fonts.NotoSans,
    textAlign: 'center',
    marginHorizontal: 32,
    color: Colour.white,
    lineHeight: 20,
    fontSize: 14,
    marginTop: 8,
  },
  heartIconsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  
    //marginBottom:rh(5)

    // backgroundColor:'#ddd'
  },
  icon1: {
    marginLeft: 21,
  },
  icon2: {
    height: 50,
    width: 50,
    borderRadius: 12,
    marginLeft: 21,
  },
  buttonWrapper: {
   
    marginTop: rh(2),
    height: rh(6.5)
  },
  subText: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight:'500',
    fontSize: rh(2),
    marginTop: rh(2.2),
    color: Colour.white,
  },
  subTextLogin: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight:'500',
    fontSize: rh(2),
    marginTop: rh(2.2),
    color: Colour.white,
    textDecorationLine: 'underline',
    marginLeft:2
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  skip: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight:'500',
    textAlign: 'center',
    fontSize: rh(2.2),
    marginVertical: rh(1.2),

    color: Colour.white,
  },
  line: {
    height: 1,
    width: '100%',
    marginLeft: 5,
    backgroundColor: Colour.white,
  },
  bottomWrapper: { position:'absolute', bottom:0, width:'100%', marginBottom:30},
  bottomWrapperIOS: { width:'100%', marginTop:0, height:'100%'},
  slideContainer:{ 
    width, 
    alignItems: 'center' 
  },
  sliderOndContainer: {
    justifyContent:'center',
    alignItems:'center', 
    marginBottom: Platform.OS === 'ios' ? rh(7) : rh(8), 
    width: width - 100
  },
  sliderOneText: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight:'500',
    color: Colour.white,
    fontSize: rh(1.7), 
    textAlign:'center', 
    paddingHorizontal:10
  },
  sliderTwoContainer:{
    marginTop: rh(3.5), 
    justifyContent:'center', 
    alignItems:'center', 
    marginBottom: Platform.OS === 'ios' ? rh(3) : rh(2.5), 
    width: width - 40
  },
  sliderTwoTitleText:{
    fontFamily: Fonts.QuicksandBold,
    // fontWeight:'700',
    color: Colour.white, 
    marginBottom: rh(2), 
    fontSize: rh(2.7)
  },
  sliderTwoDetail:{
    fontFamily: Fonts.NotoSansMedium,
    fontWeight:'500',
    color: Colour.white, 
    fontSize: Platform.OS == 'ios' ? rh(1.5) : rh(1.8), 
    textAlign:'center'
  },
  sliderThreeContainer:{
    marginTop: rh(4.5)
  },
  sliderThreeTitle:{
    fontFamily: Fonts.QuicksandBold,
    // fontWeight:'700',
    color: Colour.white, 
    textAlign:'center', 
    fontSize: rh(2.7)
  },
  sliderThreeDetail:{textAlign:'center',color: Colour.white, fontSize: Platform.OS == 'ios' ? rh(1.7) : rh(2), marginTop:8},
  sliderCommonContainer: { backgroundColor: Colour.PrimaryBlue, height: height, width: width },
  swiperFlatListStyle:{ paddingTop: 20 },
  swiperFlatListPagination:{ width: 8, height: 8 }

});
