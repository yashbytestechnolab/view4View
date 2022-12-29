import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../Theme';
import { Images } from '../assets/image';
import { useIsFocused } from '@react-navigation/native';
import { get_coins } from '../services/FireStoreServices';

interface IheaderProps {
  title?: string;
  backIcon?: string;
}
export const Header = (props: IheaderProps) => {
  const { title } = props;
  const [getCoin, setGetCoin] = useState<number>(0);
  const focus:boolean = useIsFocused();
  useEffect(() => {
    get_coins().then((res) => {
      setGetCoin(res?._data?.coin)
    })

  }, [focus, getCoin]);

  return (
    <>
      <View style={style.header}>
        <View style={style.headerWrapper}>
          <Text style={style.text}>{title}</Text>
          <View style={style.imageWrapper}>
            <Image source={Images.rupee} style={style.image} />
            <Text style={style.text}>{getCoin}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
const style = StyleSheet.create({
  header: {
    backgroundColor: Colors?.pink,
    height: 50,
    width: '100%',
    paddingHorizontal: 16,
  },
  text: {
    fontWeight: '500',
    color: Colors?.white,
    fontSize: 20,
    marginLeft: 10,
  },
  image: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
