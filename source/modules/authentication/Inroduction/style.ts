import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../../assets/fonts";
import { Colors } from "../../../Theme";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', },
    child: { width, paddingHorizontal: 16, paddingVertical: 30 },
    text: { fontSize: width * 0.5, textAlign: 'center' },
    paginationStyle: { height: 10, width: 10},
    skipText: { color: Colors?.black121212, textAlign: 'right', alignItems: 'center', fontSize: 14, fontFamily: Fonts?.InterRegular, fontWeight: '400' },
    svgWrapper:{height: height - 380, width: width - 343, paddingTop: 30},
    title:{ textAlign: 'center', marginTop: 40, fontFamily: Fonts?.InterSemiBold, fontSize: 24, fontWeight: '600', color: Colors?.black },
    subTitle:{ textAlign: 'center', marginTop: 16, marginBottom: 35, fontFamily: Fonts?.InterRegular, fontSize: 14, fontWeight: '400', color: Colors?.black121212 },
    alignItems:{ alignItems: 'center'},
    nextButtoun:{
        padding: 16,
        backgroundColor: "rgba(255, 83, 113, 1)",
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        marginHorizontal: 16,
        justifyContent: 'center',
        left: 0, right: 0,
    }
});
