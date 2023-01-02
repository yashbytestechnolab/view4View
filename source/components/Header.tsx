import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors, F50018, F60016 } from '../Theme';
import LinearGradient from 'react-native-linear-gradient';

interface IheaderProps {
  title?: string;
  // backIcon?: string;
  coinsAmt?: string | number
  EarnCoin?: any
}
export const Header = (props: IheaderProps) => {
  const { title, coinsAmt, EarnCoin } = props
  // const { title } = props;
  // const [getCoin, setGetCoin] = useState<number>(0);
  // const focus: boolean = useIsFocused();
  // /**
  //  * return total coins
  //  */
  // useEffect(() => {
  //   get_coins().then((res) => {
  //     setGetCoin(res?._data?.coin)
  //   })

  // }, [focus, getCoin]);

  return (
    <>
      <LinearGradient colors={[Colors?.gradient1, Colors?.gradient2, Colors?.gradient3]}
        style={style.header}>
        <View style={style.titleWrapper}>
          <Text numberOfLines={1} style={[F50018.main, style.titleText]}>{title}</Text>
        </View>
        <View style={style.coinWrapper}>
          <Text style={[F60016.textStyle, style.text]}>{coinsAmt}</Text>
          {EarnCoin}
        </View>
      </LinearGradient>
    </>
  );
};
const style = StyleSheet.create({
  titleWrapper: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
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
  coinWrapper: { right: 19, flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-end', position: 'absolute', paddingTop: 4 }

});
