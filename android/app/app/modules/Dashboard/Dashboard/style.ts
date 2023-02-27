import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../../assets";
import { Colour } from "../../../theme";

export const styles = StyleSheet.create({

    mainWrapper: {
        backgroundColor: Colour.white, paddingBottom: 33
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    chartWrapper: {
        flex: 0.5, marginRight: 8
    },
    oval: {
        //height: 400,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colour.PrimaryBlue,
        paddingBottom:16,
    },
    balanceCardWrapper: { flex: 1, paddingHorizontal: 16 },

    footWrapper: {
        marginVertical: 16,

        backgroundColor: Colour.primaryGreen,
        height: 32,
        width: 32,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    serchWrapper: {
        backgroundColor: Colour.white,
        borderRadius: 50,
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 24,
        flexDirection: 'row',
        paddingHorizontal: 14,
        height: 44,
        alignItems: 'center'
    },
    searchIcon: {
        alignItems: 'center',
        // marginTop: 15,
        marginHorizontal: 10,
    },
    textinput: {
        color: Colour.black,
        fontFamily: Fonts.NotoSansLight,
        fontSize: 16,
        fontWeight: '300',
        paddingRight: 12,
        marginRight: 32,
    },
    bankText: {

        color: Colour.PrimaryBlue,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 22,
        fontFamily: Fonts?.QuicksandSemiBold,
    },
    marginExplore: {
        marginTop: 24,
        marginBottom: 8,
    },
    marginDeal: {
        marginTop: 24,
        marginBottom: 11,
    },
    marginGreenStats: {
        marginTop: 24,
    },
    blue: { backgroundColor: Colour.PrimaryBlue },
    circle: {
        height: 28,
        borderRadius: 50,
        position: 'absolute',
        bottom: 7,
        backgroundColor: Colour.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        paddingHorizontal: 10
    },
    glassIcon: {
        // flex: 0.2,
        // marginLeft: 5,
        // alignItems: 'center',
        //marginBottom: 3,
    },
    glassText: {
        fontSize: 13,
        paddingHorizontal: 5,
        lineHeight: 20,
        color: Colour.PrimaryBlue,
    },
    labelWrapper: {
        height: 175,
        width: Dimensions.get('screen').width === 360 ? 143 : 163,
        marginHorizontal: 8,
        paddingVertical: 7,
    },
    greenWrapper: { backgroundColor: Colour.primaryGreen, marginTop: 30 },
    statsCard: {
        backgroundColor: Colour.white,
        borderRadius: 18,
        marginHorizontal: 16,
        marginVertical: 16,
    },
    cardWrapper: { flexDirection: 'column', marginLeft: 16, flex: 0.5 },
    footRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greenText: {
        flex: 0.6,
        fontSize: 17,
        textAlign: 'left',
        fontFamily: Fonts.MontserratExtraBold,
        lineHeight: 17,
        paddingLeft: 3,
        fontWeight: '800',
        color: Colour.primaryGreen,
    },
    blueText: {
        //marginLeft: 16,
        flex: 1,
        fontSize: 17,
        fontFamily: Fonts.MontserratExtraBold,
        lineHeight: 17,
        textAlign: 'left',
        fontWeight: '800',
        color: Colour.PrimaryBlue,
    },
    footText: {
        marginLeft: 8,
        fontSize: 14,
        fontFamily: Fonts.QuicksandSemiBold,
        lineHeight: 22,
        textAlign: 'left',
        fontWeight: '600',
        color: Colour.PrimaryBlue,
    },
    todayText: {
        marginLeft: 4,
        fontSize: 10,
        fontFamily: Fonts.NotoSansMedium,
        lineHeight: 20,
        textAlign: 'left',
        fontWeight: '500',
        color: Colour.gray400,
    },
    lastDayText: {
        marginLeft: 35,
        fontSize: 10,
        fontFamily: Fonts.NotoSansMedium,
        lineHeight: 20,
        textAlign: 'left',
        fontWeight: '500',
        color: Colour.gray400,
    },
    logoWrapper: {
        marginHorizontal: 16,
        backgroundColor: Colour.PrimaryBlue,
        height: 35,
        marginTop: 8,
        width: Dimensions.get('screen').width - 65,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

        flexDirection: 'row',
        marginBottom: 16,
    },
    logoText: {
        flex: 0.8,
        fontSize: 10,
        fontFamily: Fonts.NotoSansMedium,
        lineHeight: 20,
        //textAlign: 'center',
        fontWeight: '500',
        marginLeft: 14,
        color: Colour.white,
    },
    logo: { flex: 0.2 },
    marginBusinesses: {
        marginVertical: 11,
    },
    businessCard: {
        paddingBottom: 32, marginHorizontal: 18
    },
    businessCardWrapper: { marginRight: 8, width: 330 },
    coloman: {
        flexDirection: 'column',
        marginBottom: 24,
    },
    heartIconsWrapper: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
    text: {
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        color: Colour.black,
        textAlign: 'center',
        paddingTop: 12,
        justifyContent: 'center'
    },
    text2: {
        paddingBottom: 8, paddingTop: 8,
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        fontSize: 13,
        color: Colour.black,
        textAlign: 'center'
    },
    linkTracker: {
        color: Colour.PrimaryBlue,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        fontFamily: Fonts?.NotoSansMedium,
        marginLeft: 22,
    },
    syncDevice: {
        color: Colour.PrimaryBlue,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: Fonts?.QuicksandSemiBold,
        marginHorizontal: 12,
        textAlignVertical:'center',
        marginBottom:3
    },
    syncWrapper: {
        marginTop: 16,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colour.PrimaryBlue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    syncDeviceButton: {
        marginHorizontal: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    syncDeviceButton2: {
        marginHorizontal: 16,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor:Colour.transparent,
        borderColor:Colour.marun,
        borderWidth:2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    iconWrapper: {
        height: '100%',
        paddingHorizontal:20
    }
});