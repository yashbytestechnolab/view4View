import { Dimensions, Platform, StyleSheet } from "react-native";
import { Fonts } from "../../../assets/fonts";
import { Colors } from "../../../Theme";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors?.white, },
    child: { width, paddingHorizontal: 16, paddingVertical: 30 },
    text: { fontSize: width * 0.5, textAlign: 'center' },
    paginationStyle: { height: 10, width: 10 },
    skipText: { marginVertical: 30, color: Colors?.placeHolderTextBlack, textAlign: 'right', alignItems: 'center', fontSize: 14, fontFamily: Fonts?.InterRegular, fontWeight: '400' },
    svgWrapper: { height: Platform.OS ? height - 480 : height - 380, width: width - 343, paddingTop: 30 },
    title: { textAlign: 'center', marginTop: 40, fontFamily: Fonts?.InterSemiBold, fontSize: 24, fontWeight: '600', color: Colors?.black },
    subTitle: { textAlign: 'center', marginTop: 16, marginBottom: 35, fontFamily: Fonts?.InterRegular, fontSize: 14, fontWeight: '400', color: Colors?.placeHolderTextBlack },
    alignItems: { alignItems: 'center' },
    nextButtoun: {
        position: 'absolute',
        bottom: Platform.OS ? 50 : 20,
        marginHorizontal: 16,
        justifyContent: 'center',
        left: 0, right: 0,
    }
});
// container: { flex: 1, backgroundColor: Colors?.white, },
// child: { width, paddingHorizontal: 16, paddingVertical: 30 },
// text: { fontSize: width * 0.5, textAlign: 'center' },
// paginationStyle: { height: 10, width: 10 },
// skipText: { color: Colors?.placeHolderTextBlack, textAlign: 'right', alignItems: 'center', fontSize: 14, fontFamily: Fonts?.InterRegular, fontWeight: '400' },
// svgWrapper: { height: Platform.OS ? height-480 :height - 380, width: width - 343, paddingTop: 30 },
// title: { textAlign: 'center', marginTop: 40, fontFamily: Fonts?.InterSemiBold, fontSize: 24, fontWeight: '600', color: Colors?.black },
// subTitle: { textAlign: 'center', marginTop: 16, marginBottom: 35, fontFamily: Fonts?.InterRegular, fontSize: 14, fontWeight: '400', color: Colors?.placeHolderTextBlack },
// alignItems: { alignItems: 'center' },
// nextButtoun: {
//     position: 'absolute',
//     bottom: Platform.OS ?50: 20,
//     marginHorizontal: 16,
//     justifyContent: 'center',
//     left: 0, right: 0,
//}