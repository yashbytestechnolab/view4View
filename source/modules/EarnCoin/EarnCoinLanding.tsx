import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { Header } from '../../components';
import { ROUTES, String } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Colors, F40012, F60016 } from '../../Theme';
import { NextIcon } from '../../assets/icons';
import { EarnCoinData } from '../../services/jsonfile';
import { style } from './style';

export const EarnCoinLanding = () => {
  const navigation = useNavigation()


  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
      <View style={style.main}>
        <Header title={String?.headerTitle?.earnCoin} showBacKIcon={true}  />
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
    </>
  );
};
