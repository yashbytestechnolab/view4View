import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Header } from '../../../components';
import { String } from '../../../constants';
import { Colors } from '../../../Theme';
import { Star } from '../../../assets/icons';

export const BuyCoin = () => {
    const reanderCard = () => {
        return (
            <View style={{ backgroundColor: Colors?.gradient1, height: 434, width: 315, borderRadius: 16, paddingTop: 52, paddingHorizontal: 24, alignItems: 'center' }}>
                <Star />
                <Text style={{ color: Colors?.white ,paddingTop:28,paddingBottom:19}}>5000 Coins</Text>
                <Text style={{ color: Colors?.white,lineHeight:35 }}>
                    Play quiz by paying 30 coins
                    Based on your score you will win coins
                    use coins in sections of game like
                    See enjoy & win rewards coins
                </Text>
                <View style={{marginTop:75,backgroundColor:Colors?.white,height:42,width:100,borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                <Text>$8.34</Text>
                </View>
               
            </View>
        )
    }
    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
            <View style={style.main}>
                <Header title={String?.headerTitle?.buyCoin} showBacKIcon={true} />
                <ScrollView style={{ marginHorizontal: 16, marginTop: 32, flex: 1, paddingHorizontal: 16 }} horizontal={true}

                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}>




                    {reanderCard()}

                </ScrollView>

            </View>
        </>
    );
};
const style = StyleSheet.create({
    card: {
        shadowColor: Colors?.cardshadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
        elevation: 5,
        backgroundColor: Colors?.white,
        padding: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 24,
        alignItems: 'center',
        borderRadius: 8,
    },
    main: { flex: 1, backgroundColor: Colors?.lightWhite },
    leftRow: { flexDirection: 'row', alignItems: 'center' },
    text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
});
