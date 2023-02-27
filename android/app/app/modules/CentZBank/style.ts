import { Platform, StyleSheet } from "react-native";
import { Fonts } from "../../assets";
import { Colour } from "../../theme";

export const style = StyleSheet.create({
    
    margin: {
        marginLeft: 16,
        marginRight: 17,
        flex:1,
    },
    balanceCardWrapper:{flex:1, paddingHorizontal:16},
    main:{
        flex: 1, height: '100%', width: '100%'
    },
    blueWrapper: {
        height: 210,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colour.PrimaryBlue,

    },
    firstRowWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    backIcon: {
        marginTop: 28,
        marginBottom: 10,
    },

    card: {
        // elevation: 8,
        backgroundColor: Colour.white,
        //marginVertical: 17,
        //marginHorizontal: 20,
        //height: 230,
        position:'absolute',
        //flex:1,
        top: Platform.OS === 'ios'  ? "34%"  : '38%',
        
        alignSelf:'center',
        width:'92%',
        //width: 345,
        shadowColor: Colour.gray400,
        flexDirection: 'column',
      
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 18,
        // shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    },
    cardItem: {
        marginVertical: 16,
        paddingBottom: 16,
        //alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    grayLine: { backgroundColor: Colour.gray100, width: '100%', height: 1 },
    nextArrow: { marginLeft: 150, padding: 5 },
    iconWrapper: { flex: 0.1, paddingRight: 12 },
    textWrapper: {
        //flex: 1,
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        fontSize: 14,
        //lineHeight: 16,
        color: Colour.PrimaryBlue,
    },
    sleepIconWrapper: {
       backgroundColor:Colour?.PrimaryBlue,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    allTractionWrapper: {
        
        //marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 17,
    },
    allText: {
        color: Colour.gray400,
        fontFamily: Fonts.NotoSansRegular,
        fontSize: 10,

        fontWeight: '400',
        marginRight: 12,
    },
    dateWarpper: {
        flex: 1,
        backgroundColor: Colour.gray50,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingLeft:16,
        height:40,
    },
    dateText: {
        flex:1,
        fontFamily: Fonts.NotoSansSemiBold,
        fontWeight: '600',
        fontSize: 12,
        color: Colour.gray500,
         textAlign:'left',
        backgroundColor: Colour.gray50,
    },
    amountWrapper: {
        backgroundColor: Colour.gray100,
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal:16,
        height:'100%'
    },
    dailyTotal: {
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        fontSize: 8,
        textAlign: 'center',
        color:Colour?.gray400
        //paddingBottom: 5,
    },
    amountText: {
        fontSize: 12,
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        color: Colour.PrimaryBlue
        // maxWidth:250,
        // marginLeft:10,
        
    },
    sleepIcon: {
        flex: 1,
       flexDirection: 'row',
        backgroundColor: Colour.white,
      
        justifyContent: 'space-between',
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:16,
        
        
        
    },
    sleepIcon2: {
      
        flexDirection: 'row',
        backgroundColor: Colour.white,
        alignItems:'center',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        display: 'flex',
    },
    sleepTextWrapper: {
        flex:1,
        flexDirection: 'column',
        paddingLeft: 8,
        
    },
    sleepText: {
        flex:1,
        width:'100%',
        fontSize: 14,
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        color:Colour.PrimaryBlue,
       
    },
   
    sleepTextWrapper2: {
        flex:1,
        flexDirection: 'column',
        paddingLeft: 8,
        paddingRight: 230,
    },
    sleepSubText: {
        fontSize: 10,
        //textAlign: 'center',
        fontFamily: Fonts.NotoSansRegular,
        fontWeight: '400',
        lineHeight: 10,
        color: Colour.gray400,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    movementIconWrapper: {
        backgroundColor: Colour.primaryGreen,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    businessIconWrapper: {
        backgroundColor: Colour.gray50,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: Colour.borderGray,
        borderWidth: 0.5,
    },
    businessTextWrapper: {
        flexDirection: 'column',
        paddingLeft: 8,
        paddingRight: 200,
        alignItems: 'flex-start',
    },
    marketWrapper: {
        backgroundColor: Colour.peachyOrange,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: Colour.borderGray,
        borderWidth: 0.5,
    },
    marketTextWrapper: {
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 150,
        alignItems: 'flex-start',
    },
    title:{
        marginTop:23,
        fontSize: 14,
        marginLeft:16,
        textAlign: 'left',
        fontFamily: Fonts.QuicksandSemiBold,
        fontWeight: '600',
        color: Colour.white,
    },
    noRecordFound:{
        fontSize: 14,
        alignItems:'center',
        fontFamily: Fonts.QuicksandSemiBold,
        fontWeight: '600',
        color: Colour.PrimaryBlue,
    },
    noDataMain:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        // position:'absolute',
        // height:'100%',
        // width:'100%'
    }
});
