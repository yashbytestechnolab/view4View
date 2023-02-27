import { StyleSheet } from "react-native";
import { Fonts } from "../../../assets";
import { Colour } from "../../../theme";

export const style = StyleSheet.create({

    logoText: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: 7,
        marginLeft: 15,
        alignItems: 'center',
        fontFamily: Fonts.QuicksandSemiBold,
        color: Colour.white,
    },
    titleText: {
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 16,
        alignItems: 'center',
        fontFamily: Fonts.QuicksandBold,
        color: Colour.white,
    },
    logoWrapper: {
        flexDirection: 'row',
        marginLeft: 23,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 17
    },
    halfBlueRound: {
        backgroundColor: Colour.blueBarry,
        height: 14,
        width: 40,
        alignSelf: 'flex-end',
        borderTopLeftRadius: 15,

        borderBottomLeftRadius: 15,
    },
    colorLine: {
        alignSelf: 'flex-end',
        marginTop: 19,
    },
    infographicsTitle2: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 25,
        marginTop: 15,

        textAlign: 'left',
        fontFamily: Fonts.QuicksandSemiBold,
        color: Colour.white,
    },
    infographicsTitle3: {
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 18,
        marginTop: 8,
        textAlign: 'left',
        fontFamily: Fonts.NotoSansMedium,
        color: Colour.white,
    },
    leftWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 17,
        paddingHorizontal: 16
    },
    rightWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 17,

        paddingHorizontal: 16
    },
    leftText: {
        marginLeft: 16,
        flex: 1,
    },
    greenLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 19,
    },
    blueLine: { marginTop: 19, marginLeft: 58, marginBottom: 41 },
    alignLeft: { alignSelf: 'flex-end' },
    margin: {
        marginTop: 45,
    },
    blueBottom: { alignSelf: 'flex-end', marginTop: 55, marginBottom: 32 },
    greenBottom: { alignSelf: 'flex-end', marginBottom: 32 },
    orangeBottom: { alignSelf: 'flex-end', marginBottom: 32, marginRight: 6 },
});