import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import VersionInfo from 'react-native-version-info';
import { Header } from '../../../components';
import { String } from '../../../constants';
import { Colors, F40014 } from '../../../Theme';
import { Star } from '../../../assets/icons';

export const BuyCoin = () => {
    const getVersionNo = VersionInfo.appVersion;

    const reanderCard = (color) => {
        return (
            <View style={{ backgroundColor:color, height: 434, width: 315, borderRadius: 16, paddingTop: 52, paddingHorizontal: 24, alignItems: 'center', marginRight: 16 }}>
                <Star />
                <Text style={{ color: Colors?.white, paddingTop: 28, paddingBottom: 19 }}>5000 Coins</Text>
                <Text style={{ color: Colors?.white, lineHeight: 35 }}>
                    Play quiz by paying 30 coins
                    Based on your score you will win coins
                    use coins in sections of game like
                    See enjoy & win rewards coins
                </Text>
                <View style={{ marginTop: 20, backgroundColor: Colors?.white, height: 42, width: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
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
                <View style={{ flex: 0.8 }}>
                    <ScrollView style={{
                        marginHorizontal: 16,
                        marginTop: 32,
                    }} horizontal={true}
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}

                        contentContainerStyle={{ flexGrow: 1 }}>

                        {reanderCard(Colors?.gradient1)}
                        {reanderCard(Colors?.yellow)}
                        {reanderCard(Colors?.yellow)}

                    </ScrollView>
                    <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                        <Text style={[F40014?.main,]}>Version{" " + getVersionNo}</Text>
                        <Text style={[F40014?.main,{marginTop:12}]}>Lorem Ipsum is simply dummy text of the printing and  simply dum industry dummy text</Text>
                    </View>

                </View>



            </View>
        </>
    );
};
const style = StyleSheet.create({

    main: { flex: 1, backgroundColor: Colors?.lightWhite, height: '100%' },
    leftRow: { flexDirection: 'row', alignItems: 'center' },
    text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
});
