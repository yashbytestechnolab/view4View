import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors, F50018, F60016 } from '../Theme';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { get_coins } from '../services/FireStoreServices';
import LinearGradient from 'react-native-linear-gradient';
import { Back, EarnCoin } from '../assets/icons';
import { InputContextProvide } from '../context/CommonContext';
import { ROUTES } from '../constants';

interface IheaderProps {
  title?: string;
  showBacKIcon?: boolean;
  showCoin?: boolean,
  coin?: number | string,
  onPrees?: () => void,
}
export const Header = (props: IheaderProps) => {
  const { storeCreator: { coinBalance: { getBalance } } }: any = useContext(InputContextProvide)
  const { title, showBacKIcon, showCoin = true, onPrees } = props;
  const navigation = useNavigation()
  return (
    <>
      <LinearGradient colors={[Colors?.gradient1, Colors?.gradient2, Colors?.gradient3]}
        style={style.header} >
        <View style={style.Wrapper}>
          {showBacKIcon &&
            <TouchableOpacity activeOpacity={1}
              onPress={() => { onPrees ? onPrees : navigation.goBack() }}

              style={style.backButtonWrapper}
            >
              <Back color={Colors?.white} />
            </TouchableOpacity>}
          <View style={style.titleWrapper}>
            <Text numberOfLines={1} style={[F50018.main, style.titleText]}>{title}</Text>
          </View>
          {
            showCoin && <TouchableOpacity style={style.coinWrapper} activeOpacity={1} onPress={() => { navigation?.navigate(ROUTES?.VIEWCOIN) }}>

              <Text style={[F60016.textStyle, style.padding]}>{getBalance}</Text>
              <EarnCoin />
            </TouchableOpacity>
          }
        </View>
      </LinearGradient>

    </>
  );
};
const style = StyleSheet.create({
  header: {
    backgroundColor: Colors?.pink,
    height: 60,
    justifyContent: 'center',
    //alignItems:'center'
  },
  titleText: {
    textAlign: 'center',
  },

  Wrapper: { flexDirection: 'row', alignItems: 'center', paddingRight: 15, marginLeft: 20 },
  coinWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end', alignSelf: 'flex-end', position: 'absolute', right: 15
  },

  titleWrapper: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  padding: {
    top:Platform.OS=="ios"?0: 1.5,
    paddingRight: 8
  }
});