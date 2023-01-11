import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Header } from '../../../components';
import { String } from '../../../constants';
import { Colors } from '../../../Theme';

export const BuyCoin = () => {
    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
            <View style={style.main}>
                <Header title={String?.headerTitle?.buyCoin} showBacKIcon={true} />
                <View style={{ marginHorizontal: 16, marginTop: 32 }}>
                    <ScrollView
                        horizontal={true}

                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            backgroundColor: Colors?.gradient1,
                            paddingHorizontal: 24,
                            paddingVertical: 40,
                            // justifyContent: 'center',
                            // alignItems: 'center',
                        }}>

                        <Text>Hello</Text>
                    </ScrollView>
                </View>
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
