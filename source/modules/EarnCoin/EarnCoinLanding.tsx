import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { Header } from '../../components';
import { String } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { colorBackGround, Colors, darkBackGround, F40012, F60016, lightBackGround } from '../../Theme';
import { NextIcon } from '../../assets/icons';
import { EarnCoinData } from '../../services/jsonfile';
import { style } from './style';
import { InputContextProvide } from '../../context/CommonContext';

export const EarnCoinLanding = () => {
  const navigation = useNavigation()
  const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
      <View style={[style.main,darkModeTheme&& darkBackGround(darkModeTheme)]}>
        <Header title={String?.headerTitle?.earnCoin} />
        <View style={[{ paddingHorizontal: 16, paddingTop: 20 },]}>
          {
            EarnCoinData.length > 0 && EarnCoinData?.map((item, index) => {
              return (
                <TouchableOpacity key={index.toString()} style={[style.card, lightBackGround(darkModeTheme), { shadowColor: darkModeTheme ? '#000' : Colors.cardshadow }]} activeOpacity={1} onPress={() => { navigation.navigate(item?.onPress) }}>
                  <View style={style.leftRow}>
                    <item.svg />
                    <View style={{ marginLeft: 16 }}>
                      <Text style={[F60016?.textStyle, { color: Colors?.primaryRed }, ]}>{item?.title}</Text>
                      <Text style={[F40012?.main, { color: Colors?.black, opacity: 0.6, }, colorBackGround(darkModeTheme)]}>{item?.subTitle}</Text>
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
