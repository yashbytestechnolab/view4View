import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../assets";
import { Colour } from "../../theme";
const width = Dimensions.get('screen').width
export const style = StyleSheet.create({
    main: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Colour.white
    },
    blueWrapper: {
        flex: 1,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colour.PrimaryBlue,
        paddingBottom: 20
    },
    topBGImage: {
        height: 123,
        marginVertical: 10,
        flex: 1,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
    },
    searchWrapper: {
        backgroundColor: Colour.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 14,
        height: 44,
        width: "100%",
        alignSelf: 'center',
    },
    searchText: {
        //backgroundColor: 'red',
        fontSize: 16,
        paddingLeft: 10,
        color: Colour.gray300,
        paddingRight: 18,
        fontFamily: Fonts.NotoSansLight,
        lineHeight: 24,
        fontWeight: '300',
    },
    blueLine: {
        backgroundColor: Colour.blueBarry,
        height: 8,
        width: 44,
        borderTopRightRadius: 50,
        borderBottomEndRadius: 50,
        position: 'absolute',
        top: 95,
        left: width === 392.72727272727275 ? 20 : 8,
    },
    greenLine: {
        backgroundColor: Colour.primaryGreen,
        height: 8,
        width: 80,
        borderTopRightRadius: 50,
        borderBottomEndRadius: 50,
        position: 'absolute',
        top: 52,
        left: width === 392.72727272727275 ? 20 : 8,
    },
    orangeLine: {
        backgroundColor: Colour.peachyOrange,
        height: 8,
        width: 100,
        borderTopRightRadius: 50,
        borderBottomEndRadius: 50,
        position: 'absolute',

        top: 72,
        left: width === 392.72727272727275 ? 20 : 8,
    },
    logoWrapper: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 23,
        bottom: 85,
        left: 40,
        flex: 1,
        paddingBottom: 11,
        paddingRight: 16,
        alignItems: 'center',
        // position: 'absolute',
    },
    swipeImage: {
        marginHorizontal: 8,
        marginVertical: 16,
        width: width - 16,
        height: 174,
        borderRadius: 18,
    },
    handleHeading: {
        fontFamily: Fonts.QuicksandSemiBold,
        fontWeight: '600',
        fontSize: 14,
        color: Colour.PrimaryBlue,
    },
    pageTitl: {
        // position: 'absolute',
        // marginLeft: 16,
        // marginTop: 16,
        fontFamily: Fonts.QuicksandSemiBold,
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 8,
        // lineHeight: 38,
        color: Colour.white,
    },
    pageWrapper: {
        // position: 'absolute',
        // marginLeft: 16,
        // marginTop: 55,
    },
    pageButtonStyle: { height: 36, width: 115 },
    bottomWrapper: {
        flexDirection: 'column',
    },
    pagination: {
        alignSelf: 'center',
        flex: 1,
        paddingBottom: Dimensions?.get('window')?.width === 360 ? 25 : 35,
    },
    dealText: {
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 20,
        color: Colour.PrimaryBlue,
    },
    bottomBlueWrapper: {
        backgroundColor: Colour.PrimaryBlue,
        paddingHorizontal: 16,
        paddingBottom: 12,
        paddingTop: 16
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 8,
        paddingTop: 16,
        minWidth: width - 185
    },
    grid: {
        flexDirection: 'row',
        paddingHorizontal: 15,
    },

    RBContainer: {
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18
    },
    bottomSheetTitle: {
        marginLeft: 12,
        fontFamily: Fonts.Quicksand,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        color: Colour.PrimaryBlue,
        marginBottom: 2
    },
    cateWrapper: {
        backgroundColor: Colour.white,
        borderRadius: 18,
        height: 112,
        width: 108,
        flex: 1
    },
    wrapper: {
        flex: 1 / 3,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12,
        marginLeft: 8,
        elevation: 5,
        borderRadius: 16,
        shadowOpacity: 0.3,
        shadowColor: Colour.gray500,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
    },
    cateImage: {
        height: 64,
        width: "100%",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    cateTitle: {
        textAlign: 'center',
        fontFamily: Fonts.NotoSansMedium,
        fontSize: 12,
        lineHeight: 14,
        padding: 8,
        color: Colour.gray400
    },
    bottomSheetWrapper: {
        paddingRight: 16,
        paddingLeft: 8,
        marginTop: 24,
        flex: 1,
        backgroundColor: Colour.white,
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },

    swipeFlatList: {
        // marginHorizontal: 16,
        // marginVertical: 16,
    },
    title: {
        fontSize: 20,
        lineHeight: 38,
        fontFamily: Fonts.QuicksandBold,
        fontWeight: '700',
        color: Colour.white,
        marginLeft: 5,
    },
    amount: {
        fontSize: 14,
        lineHeight: 17,
        fontFamily: Fonts.MontserratExtraBold,
        fontWeight: '800',
        color: Colour.gray500,
        marginLeft: 4,
    },
    amountWrapper: {
        //flex:1,
        marginLeft: 30,
        backgroundColor: Colour.white,
        height: 30,
        // alignSelf: 'flex-end',
        borderRadius: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});