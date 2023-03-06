import { StyleSheet } from "react-native";
import { Colors } from "../../Theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
    },
    safearea: { backgroundColor: Colors?.gradient1 },
    textStyle: {
        color: Colors?.green,
        fontSize: 30,
    },
    timeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
    redLine: {
        height: 50,
        width: 5,
        backgroundColor: Colors?.pink,
        borderRadius: 50,
    },
    videoWrapper: {
        backgroundColor: Colors?.black, justifyContent: 'center', paddingTop: 60, borderRadius: 8
    },
    main: {
        paddingHorizontal: 12, paddingTop: 24,
    },
    iconRow: {
        marginTop: 40, marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between',
        
    },
    iconWrapper: {flex:1, flexDirection: 'row',justifyContent:'center', alignItems:'center', marginRight:5, backgroundColor:'rgba(255, 83, 113, 0.05)', padding:10, borderRadius:8, height:100 },
    marginLeft: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        // marginLeft: 10
    },
    marginTop: {
        marginTop: 32
    },
    animation: {
        position: 'absolute',
        top: 0,
        bottom: -230,
        left: 0, right: 0,
    },
    loader: { flex: 1, justifyContent: "center", alignItems: "center" },
    commonActionContainer: {flex:1, width:'100%', justifyContent: 'center', alignItems: 'center'},
    iconTextWrapper: {flexDirection:'row'},
    secondIcon: {flex:1, alignItems:'flex-end'}
});
