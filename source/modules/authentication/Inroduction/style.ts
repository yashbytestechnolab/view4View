import { Dimensions, Platform, StyleSheet } from "react-native";
import { Fonts } from "../../../assets/fonts";
import { Colors } from "../../../Theme";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors?.white, },
    child: { width, paddingHorizontal: 16, paddingTop: 80, paddingBottom: 30 },
    text: { fontSize: width * 0.5, textAlign: 'center' },
    paginationStyle: { height: 10, width: 10, },
    skipText: { marginBottom: 30, color: Colors?.placeHolderTextBlack, textAlign: 'right', alignItems: 'center', fontSize: 14, fontFamily: Fonts?.InterRegular, fontWeight: '400' },
    title: { textAlign: 'center', marginTop: 40, fontFamily: Fonts?.InterSemiBold, fontSize: 24, fontWeight: '600', color: Colors?.black },
    subTitle: { opacity: 0.6, textAlign: 'center', marginTop: 16, fontFamily: Fonts?.InterRegular, fontSize: 14, fontWeight: '400', color: Colors?.placeHolderTextBlack },
    alignItems: { alignItems: 'center' },
    nextButtoun: {
        position: 'absolute',
        bottom: Platform.OS ? 50 : 20,
        marginHorizontal: 16,
        justifyContent: 'center',
        left: 0, right: 0,
    },
    skipWrapper: {
        position: 'absolute', top: 30, right: 18
    },
    pagenationStyle: { position: 'absolute', bottom: 180 }


});
