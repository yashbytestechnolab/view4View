import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Header } from '../../components';
import { String } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Colors, F40012, F60016 } from '../../Theme';
import { NextIcon } from '../../assets/icons';
import { EarnCoinData } from '../../services/jsonfile';

export const EarnCoinLanding = () => {
  const navigation = useNavigation()


  return (
    <View style={style.main}>
      <Header title={String?.headerTitle?.earnCoin} showBacKIcon={true} />
      <View style={{ paddingHorizontal: 16, paddingTop: 20, }}>
        {
          EarnCoinData && EarnCoinData?.map((item) => {
            console.log(item)
            return (
              <TouchableOpacity style={style.card} activeOpacity={1} onPress={() => { navigation.navigate(item?.onPress) }}>
                <View style={style.leftRow}>
                  <item.svg />
                  <View style={{ marginLeft: 16 }}>
                    <Text style={[F60016?.textStyle, { color: Colors?.primaryRed }]}>{item?.title}</Text>
                    <Text style={[F40012?.main, { color: Colors?.black, opacity: 0.6, }]}>{item?.subTitle}</Text>
                  </View>

                </View>
                <View>
                  <NextIcon />
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>


    </View>
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
    borderRadius: 8

  },
  main: { flex: 1, backgroundColor: Colors?.lightWhite },
  leftRow: { flexDirection: 'row', alignItems: 'center' },
  text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
})