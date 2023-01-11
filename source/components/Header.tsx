
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useContext, } from 'react';
import { Colors, F50018, F60016 } from '../Theme';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Back, EarnCoin } from '../assets/icons';
import { InputContextProvide } from '../context/CommonContext';
import { ROUTES } from '../constants';

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
              //style={style.backWrapper}
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
              <Text style={[F60016.textStyle, style.padding]}>
                {getBalance}
              </Text>
              <View style={{paddingBottom:1.5}}>
              <EarnCoin />
              </View>
             
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
  },
  titleText: {
    textAlign: 'center',
  },
  //backWrapper: { padding: 5 },
  Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    marginLeft: 20,
    // backgroundColor:'red'
  },
  coinWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 15,
    
  },

  titleWrapper: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  padding: {
    //top: Platform.OS == "ios" ? 0 : 1.5,
    paddingRight: 8,

  }
});
