
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useContext, } from 'react';
import { Colors, F50018, F60016 } from '../Theme';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Back } from '../assets/icons';
import { InputContextProvide } from '../context/CommonContext';
import { ROUTES } from '../constants';
import Lottie from 'lottie-react-native';
import { kFormatter } from '../services/CoinValueFormat';

interface IheaderProps {
  title?: string;
  showBacKIcon?: boolean;
  showCoin?: boolean;
  coin?: number | string;
  onPrees?: () => void;

}
export const Header = (props: IheaderProps) => {
  const {
    storeCreator: {
      coinBalance: { getBalance },
    },

  }: any = useContext(InputContextProvide);

  const { title, showBacKIcon, showCoin = true, onPrees, } = props;
  const navigation = useNavigation();

  return (
    <>
      <LinearGradient
        colors={[Colors?.gradient1, Colors?.gradient2, Colors?.gradient3]}
        style={style.header}>
        <View style={style.Wrapper}>
          {showBacKIcon && (
            <TouchableOpacity
              activeOpacity={1}
              style={{padding:10}}
              onPress={() => {
                onPrees ? onPrees : navigation.goBack();
              }}>
              <Back color={Colors?.white} />
            </TouchableOpacity>
          )}
          <View style={style.titleWrapper}>
            <Text numberOfLines={1} style={[F50018.main, style.titleText]}>
              {title}
            </Text>
          </View>
          {showCoin && (
            <TouchableOpacity
              style={style.coinWrapper}
              activeOpacity={1}
              onPress={() => {
                navigation?.navigate(ROUTES?.VIEWCOIN);
              }}>
              <Text style={[F60016.textStyle, style.padding]} numberOfLines={1}>
                {kFormatter(getBalance)}
              </Text>

              <Lottie style={{
                height: 40,
                marginTop: 8,
                marginLeft: 10,
                marginBottom: Platform?.OS== 'ios'? 5:0
                
              }}
                source={require('../assets/flipCoin.json')}
                autoPlay loop
              />

            </TouchableOpacity>
          )}
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
  titleText: {
    textAlign: 'center',
  },
  
  Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 20,
   
  },
  coinWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 1,
    bottom:0,
    top:0  },

  titleWrapper: {
    flex: 1,
    paddingRight: 10,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  padding: {
    marginRight: Platform?.OS== 'ios'? -40 :-35
  }
});
