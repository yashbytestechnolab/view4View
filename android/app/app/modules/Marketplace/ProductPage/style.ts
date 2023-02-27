import { Dimensions, StyleSheet } from "react-native";
import { colors } from "react-native-swiper-flatlist/src/themes";
import { Fonts } from "../../../assets";
import { Colour } from "../../../theme";

export const style = StyleSheet.create({
    main: {
        //flex: 1,
        backgroundColor: Colour.white,
        // height: '100%',
        // width: '100%',
    },
    swipeImage: {
        flex: 1,
        width: '100%',
    },
    imageWrapper: {
        width: Dimensions?.get('window')?.width,
        height: 350,
    },

    iconWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 15,
        alignItems: 'center',
    },
    share: {
        marginRight: 21
    },
    greenText: {
        //flexDirection: 'row',
        backgroundColor: Colour.primaryGreen,
        height: 34,
        maxWidth: 85,
        textAlign: 'center',
        borderRadius: 16,
        borderWidth: 3,
        marginTop: -18,
        marginLeft: 16, justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colour.white,
    },
    greenLine: { backgroundColor: Colour.primaryGreen, height: 5 },
    off: {
        color: Colour.PrimaryBlue,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: Fonts.QuicksandRegular,

    },
    middleWrapper: { flex: 1, backgroundColor: Colour.white, marginHorizontal: 16, },
    title: {
        color: Colour.PrimaryBlue,
        fontSize: 20,
        fontWeight: '700',
        fontFamily: Fonts.QuicksandBold,
        marginTop: 11
    },
    price: {
        marginTop: 8,
        color: Colour.gray400,
        fontSize: 10,
        fontWeight: '500',
        fontFamily: Fonts.QuicksandMedium,
        lineHeight: 22,
    },
    priceTextWrapper: {
        flexDirection: 'row',
    },
    priceText1: {
        textDecorationLine: 'line-through',
        color: Colour.gray400,
        fontSize: 16,

        fontWeight: '700',
        fontFamily: Fonts.QuicksandBold,
        //lineHeight: 11,
    },
    priceText2: {
        color: Colour.PrimaryBlue, paddingLeft: 8, textDecorationLine: 'none', fontSize: 16,

        fontWeight: '700',
        fontFamily: Fonts.QuicksandBold,
    },
    grayLine: {
        backgroundColor: Colour.gray400,
        height: 1,
        width: '14%',
        position: 'relative',
        bottom: 10,
    },
    orangeLine: {
        backgroundColor: Colour.peachyOrange,
        height: 1,
        width: 44,
        position: 'relative',
        bottom: 10.5,
    },
    discountView: {
        borderRadius: 100,
        // flex: 1,
        // height: 30,
        backgroundColor: Colour.lightOrangeShade,
        maxWidth: 180,
        padding: 8,
        marginTop: 24
    },
    discountText: {
        backgroundColor: Colour.lightOrangeShade,
        color: Colour.orange,
        fontSize: 14,
        fontWeight: '700',
        flex: 1,
        fontFamily: Fonts.QuicksandBold,
        lineHeight: 14,
    },
    RBContainer: {
        backgroundColor: Colour.PrimaryBlue,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        alignSelf: 'center',
        paddingLeft: 18,
        paddingRight: 16
    },
    greenCard: {
        marginTop: 24,
        height: 74,
        borderRadius: 50,
        padding: 12,
        backgroundColor: Colour.primaryGreen,
        flexDirection: 'row',
        alignItems: 'center',

    },
    footIconWrapper: {
        backgroundColor: Colour.PrimaryBlue,
        borderRadius: 50,
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greenCardTitle: {
        color: Colour.PrimaryBlue,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: Fonts.QuicksandSemiBold,
        lineHeight: 20,
    },
    greenCardSubText: {
        color: Colour.PrimaryBlue,
        fontSize: 12,
        fontWeight: '500',
        fontFamily: Fonts.QuicksandMedium,
        lineHeight: 15,
    },
    multiLine: {
        color: Colour.gray400,
        fontSize: 14,
        fontWeight: '500',
        fontFamily: Fonts.QuicksandMedium,
        lineHeight: 17,
        textAlign: 'left',
        marginTop: 32,
        paddingHorizontal: 2,
        textAlignVertical: 'top',
        paddingBottom: 16
    },
    dropdown: {
        backgroundColor: Colour.white,
        height: 44,
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: 14,
        borderColor: Colour.dropdownGray,
    },
    dropdown2: {
        backgroundColor: Colour.white,
        height: 44,
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: 14,
        borderColor: Colour.dropdownGray,
    },
    checkoutButton: {
        backgroundColor: Colour.white,
        borderWidth: 1,
        borderColor: Colour.gray300,
        marginBottom: 29,
    },
    cartModalWrap: {
        flex: 1,
        justifyContent: 'center',
    },
    popupWrapper: {
        backgroundColor: Colour.PrimaryBlue,
        height: 180,
        width: 285,
        borderRadius: 18,
        padding: 40,
        // justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    orangeAmountWrapper: {
        backgroundColor: Colour.peachyOrange,
        height: 20,
        width: 20,
        borderRadius: 50,
        position: 'relative',
        bottom: 10,
        right: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetWrapper: {
        backgroundColor: Colour.PrimaryBlue,
        height: 20,
        width: 20,
        borderRadius: 50,
        position: 'relative',
        right: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartWrapper: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingRight: 125,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartText: {
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 13,
        fontFamily: Fonts.NotoSansSemiBold,
        color: Colour.white,
    },
    cartText2: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Fonts.NotoSansMedium,
        color: Colour.peachyOrange,
    },
    modelText: {
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 32,
        fontFamily: Fonts.Quicksand,
        color: Colour.white,
        marginTop: 29,
    },
    checkwrapper: {
        //width: 136,
        height: 36,
    },
    dropdownText: {
        paddingBottom: 6,
        fontFamily: Fonts.NotoSansMedium,
        fontSize: 12,
        fontWeight: '500',
        colors: Colour.gray500
    },
    colourOption: { height: 40, width: 40, borderRadius: 40, marginRight: 8, borderColor: Colour.primaryGreen, }
});
