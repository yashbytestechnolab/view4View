import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Search } from '../../../assets/icons/Search'
import { ROUTES, String } from '../../../constants'
import { Card } from '../../../assets/icons/card'
import Logo from '../../../assets/icons/logo'
import { Fonts, Images } from '../../../assets'
import { Colour } from '../../../theme'
import { Heading } from '../../../components/Handing/Heading'
import * as LocalStorage from '../../../services/LocalStorage';
import { LocalStorageKeys } from '../../../constants/LocalStorageKeys'
import { BackButton } from '../../../components/BackButton/BackButton';
import { commonStyles } from '../../../constants/CommonStyles';

export default function FindMarketPlace() {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const wallet = route.params?.wallet;
  const [searches, setSearches] = useState<any>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    getSearches();
  }, [])

  const getSearches = async () => {
    const data = await LocalStorage.getValue(LocalStorageKeys.marketPlaceSearches);
    if (data)
      setSearches(JSON.parse(data))
  }

  const onSearch = async () => {
    if (search?.trim()?.length > 0) {
      const recentSearches = [search, ...searches];
      await LocalStorage.setValue(LocalStorageKeys.marketPlaceSearches, JSON.stringify(recentSearches));
      navigation.navigate(ROUTES.CategoryProducts, { search })
    }
  }

  const onClearSearch = async () => {
    await LocalStorage.setValue(LocalStorageKeys.marketPlaceSearches, JSON.stringify([]));
    getSearches();
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colour.PrimaryBlue, flex: 1 }}>
      <View style={style.main}>
        <View style={style.blueWrapper}>
          <ImageBackground source={Images.bg2} imageStyle={{ borderRadius: 14 }} style={[style.topBGImage]} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 11, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Logo height={27} width={55} />
                <Text style={style.title}>{String.Marketplace}</Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 5, width: 80, height: 30, backgroundColor: '#fff', borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Card height={14} width={14} />
                <Text numberOfLines={1} style={style.amount}> ${wallet} </Text>
              </View>
            </View>
          </ImageBackground>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <BackButton color={Colour.white} />
            <View style={style.searchWrapper}>
              <View style={style.searchBorder}>
                <Search />
                <TextInput
                  autoFocus
                  autoCorrect={false}
                  returnKeyType={'search'}
                  placeholder={String.searchText}
                  placeholderTextColor={Colour.gray300}
                  style={style.searchText}
                  onChangeText={setSearch}
                  onSubmitEditing={() => onSearch()}
                />
              </View>
            </View>
          </View>
        </View>
        {searches?.length > 0 ?
          <View style={style.findWrapper}>
            <Heading
              rightText={String.clere}
              leftText={String.recentSearches}
              leftStyle={{ color: Colour.PrimaryBlue, fontSize: 18, fontWeight: '700', fontFamily: Fonts.Quicksand, lineHeight: 32 }}
              rightStyle={{ textDecorationLine: 'none', fontSize: 14, fontWeight: '500', fontFamily: Fonts.Inter, lineHeight: 20 }}
              onPress={() => onClearSearch()}
              Wrapperstyle={{ paddingHorizontal: 0, }}
            />
            <View>
              {searches?.map((search: string) => {
                return (
                  <TouchableOpacity style={style.serchTextWrapper}
                    onPress={() => navigation.navigate(ROUTES.CategoryProducts, { search })}
                  >
                    <Search />
                    <Text style={style.recentsearchText}>{search}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          : null
        }
      </View>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  blueWrapper: {
    height: 220,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: Colour.PrimaryBlue,
    paddingBottom: 20
  },
  topBGImage: {
    height: 123,
    marginVertical: 10,
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  amountWrapper: { fflexDirection: 'row', alignItems: 'center', justifyContent: 'center', },
  searchWrapper: {
    backgroundColor: Colour.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 16,
    marginLeft: 5,
    justifyContent: 'center',
    height: 55,
    alignSelf: 'center',
  },
  searchBorder: {
    borderWidth: 1, borderRadius: 50, borderColor: Colour.addressBorderColor, height: 48,
    width: "98%", alignItems: 'center', flexDirection: 'row', paddingHorizontal: 16
  },
  searchText: {
    fontSize: 16,
    color: Colour.gray900,
    fontFamily: Fonts.NotoSansLight,
    lineHeight: 24,
    fontWeight: '300',
    marginLeft: 12,
    flex: 1,
    padding: 0
  },
  recentsearchText: {
    fontSize: 12,
    color: Colour.gray700,
    fontFamily: Fonts.NotoSansMedium,
    lineHeight: 18,
    fontWeight: '500',
    marginLeft: 10,
    flex: 1,
    padding: 0
  },
  blueLine: {
    backgroundColor: Colour.blueBarry,
    height: 8,
    width: 44,
    borderTopRightRadius: 50,
    borderBottomEndRadius: 50,
    position: 'absolute',

    top: 95,
    //left: width === 392.72727272727275 ? 20 : 8,
  },
  title: {
    fontSize: 20,
    lineHeight: 38,
    fontFamily: Fonts.QuicksandBold,
    fontWeight: '700',
    color: Colour.white,
    marginLeft: 5,
  },
  amount: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: Fonts.MontserratExtraBold,
    fontWeight: '800',
    color: Colour.gray500,
    paddingLeft: 4,
  },
  amountWrapper2: {
    //flex:1,
    marginLeft: 30,
    backgroundColor: Colour.white,
    height: 30,
    // alignSelf: 'flex-end',
    borderRadius: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colour.white

  },
  findWrapper: {
    paddingHorizontal: 16, marginTop: 32
  },
  amountText: {
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 30, alignItems: 'center',
  },
  serchTextWrapper:
    { flexDirection: 'row', alignItems: 'center', borderBottomColor: Colour.gray300, borderBottomWidth: 1, paddingVertical: 16 }

})