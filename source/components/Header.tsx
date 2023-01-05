import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, F50018, F60016 } from '../Theme';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { get_coins } from '../services/FireStoreServices';
import LinearGradient from 'react-native-linear-gradient';
import { Back, EarnCoin } from '../assets/icons';

interface IheaderProps {
  title?: string;
  showBacKIcon?: boolean;
  coinAmt?: string | number
}
export const Header = (props: IheaderProps) => {
  const { title, showBacKIcon, coinAmt } = props;
  const [getCoin, setGetCoin] = useState<number>(0);
  const focus: boolean = useIsFocused();
  const navigation = useNavigation()
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
        style={style.header} >
        <View style={style.Wrapper}>
          {showBacKIcon && <TouchableOpacity activeOpacity={1} onPress={() => {
            navigation.goBack()
          }} style={style.backButtonWrapper}>
            <Back color={Colors?.white} />
          </TouchableOpacity>}
          <View style={style.titleWrapper}>
            <Text numberOfLines={1} style={[F50018.main, style.titleText]}>{title}</Text>

          </View>
          {
            coinAmt && <View style={style.coinWrapper}>
              <Text style={[F60016.textStyle, style.padding]}>{getCoin}</Text>
              <EarnCoin />
            </View>
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
    //alignItems: 'center'
  },
  titleText: {
    textAlign: 'center',
    //  paddingRight: 40, paddingLeft: 8 
  },

  Wrapper: { flexDirection: 'row', alignItems: 'center', paddingRight: 15, marginLeft: 20 },
  coinWrapper: {
    flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-end', position: 'absolute', right: 15
  },
  backButtonWrapper: {
    position: 'absolute',
  },
  titleWrapper: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  padding: {
    paddingRight: 8
  }

});