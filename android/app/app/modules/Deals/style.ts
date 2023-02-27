import { StyleSheet } from "react-native";
import { Fonts } from "../../assets";
import { Colour } from "../../theme";

export const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      width: '100%',
      //marginBottom:150
    },
    container: {
      height: '100%',
      width: '100%',
    },
    map: {
      flex: 1,
    },
    circle: {
      height: 28,
      borderRadius: 50,
      flexDirection: 'row',
      
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 4,
      marginTop: 10,
      paddingLeft: 6,
      paddingRight: 8,
      shadowOpacity: 0.23,
      flex: 1,
      shadowColor: 'rgba(16, 24, 40, 1)',
      elevation: 2,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 2,
    },
    searchWrapper: {
      backgroundColor: Colour.white,
      height: 104,
      width: 343,
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      borderRadius: 16,
      top: 11,
      padding: 10,
      justifyContent: 'center',
    },
    glassText: {
      fontSize: 14,
      fontFamily: Fonts.NotoSansMedium,
      fontWeight: '500',
      color: Colour.PrimaryBlue,
      paddingLeft: 5,
      textAlign:'center',
      alignItems: 'center',
      paddingBottom:3,
    },
    searchWrapper2: {
      backgroundColor: Colour.white,
      height: 108,
      paddingBottom: 12,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
  
      elevation: 5,
    },
  
    textInputWrapper: {
      borderRadius: 10,
      borderColor: Colour.gray100,
      borderWidth: 1,
      height: 44,
  
      paddingLeft: 16,
      paddingRight: 26,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 26,
      paddingRight: 15,
    },
    markerContainer: {
      alignItems: 'center',
      width: 60,
      backgroundColor: 'transparent',
      height: 70,
    },
    textContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      paddingHorizontal: 5,
      flex: 1,
    },
    RBContainer: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    bottomSheetTitle: {
      marginLeft: 22,
      fontFamily: Fonts.QuicksandSemiBold,
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 22,
      color: Colour.PrimaryBlue,
    },
    cateWrapper: {
      backgroundColor: Colour.white,
      borderRadius: 18,
      height: 112,
      width: 108,
      flex: 1,
    },
    bottomSheetWrapper: {flex: 1, backgroundColor: Colour.white, width: '100%'},
    iconWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    businessCardWrapper: {
      width: '100%',
      height: 110,
      //position: 'absolute',
      bottom: 55,
    },
    dealText:{
      backgroundColor: 'white',
      height: 38,
      borderTopStartRadius: 18,
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      borderTopEndRadius: 18,
      width: '100%',
      position: 'absolute',
      bottom: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollDeal:{flex: 1, height: '100%', marginBottom: 70},
    dealListWrapper:{marginVertical: 12, flex: 1, height: '100%'},
    saveText: {
      fontFamily: Fonts.NotoSansRegular,
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      color: Colour.PrimaryBlue
      // font-family: 'Noto Sans';
      // font-style: normal;
      // font-weight: 500;
      // font-size: 16px;
      // line-height: 24px;
    }
    // circle: {
    //   height: 28,
    //   borderRadius: 50,
  
    //   flexDirection: 'row',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   marginHorizontal: 4,
    //   marginTop: 10,
    //   //paddingVertical: 4,
    //   paddingLeft: 6,
    //   paddingRight: 8,
    //   shadowOpacity: 0.23,
    //   flex: 1,
    //   shadowColor: 'rgba(16, 24, 40, 1)',
    //   elevation: 2,
    //   shadowOffset: {
    //     width: 0,
    //     height: 1,
    //   },
    //   shadowRadius: 2,
    // },
    // searchWrapper: {
    //   backgroundColor: Colour.white,
    //   height: 104,
    //   width: 343,
    //   alignItems: 'center',
    //   alignSelf: 'center',
    //   position: 'absolute',
    //   borderRadius: 16,
    //   top: 11,
    //   padding: 10,
    //   justifyContent: 'center',
    // },
    // glassText: {
    //   fontSize: 14,
    //   fontFamily: Fonts.NotoSansMedium,
    //   fontWeight: '500',
  
    //   paddingLeft: 5,
    //   alignItems: 'center',
    // },
  
  });
  