import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, F50018, F60016 } from '../Theme';
import { useIsFocused } from '@react-navigation/native';
import { get_coins } from '../services/FireStoreServices';
import LinearGradient from 'react-native-linear-gradient';
import { EarnCoin } from '../assets/icons';

interface IheaderProps {
  title?: string;
  backIcon?: string;
}
export const Header = (props: IheaderProps) => {
  const { title } = props;
  const [getCoin, setGetCoin] = useState<number>(0);
  const focus: boolean = useIsFocused();
  /**
   * return total coins
   */
  useEffect(() => {
    get_coins().then((res) => {
      setGetCoin(res?._data?.coin)
    })

  }, [focus, getCoin]);

  return (
    <>
      <LinearGradient colors={[Colors?.gradient1, Colors?.gradient2, Colors?.gradient3]}
        style={style.header}>
        <View style={style.titleWrapper}>
          <Text numberOfLines={1} style={[F50018.main, style.titleText]}>{title}</Text>

        </View>
        <View style={style.coinWrapper}>
          <Text style={[F60016.textStyle, style.text]}>{getCoin}</Text>
          <EarnCoin />
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
    alignItems: 'center'
  },
  titleText: { textAlign: 'center', },
  text: {
    textAlign: 'center',
    paddingRight: 8,
  },
  titleWrapper: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
  coinWrapper: { right: 19, flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-end', position: 'absolute', paddingTop: 4 }

});
