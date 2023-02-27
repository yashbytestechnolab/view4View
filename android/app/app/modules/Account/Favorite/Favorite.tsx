import React, { FC, useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions, SafeAreaView, } from 'react-native';
import { useQuery } from '@apollo/client';

import { commonStyles } from '../../../constants/CommonStyles';
import { BackButton } from '../../../components/BackButton/BackButton';
import { Colour } from '../../../theme';
import { String } from '../../../constants';
import { Fonts, Icons, Images } from '../../../assets';
import { Glass } from '../../../assets/icons/Glass';
import { Coffee } from '../../../assets/icons/Coffee';
import { Gym } from '../../../assets/icons/Gym';
import { Union } from '../../../assets/icons/Union';
import { Art } from '../../../assets/icons/Art';
import { BusinessesCard } from '../../../components/BusinessesCard/BusinessesCard';
import { cardItems } from '../../../constants/DummyJson.ts/JsonFile';
import { GET_USER_INFORMATION } from '../../../graphQL/Queries';

const category = [
  { icon: Coffee, name: 'coffee', },
  { icon: Glass, name: 'bars', },
  { icon: Gym, name: 'fitness', },
  { icon: Union, name: 'restaurants', },
  { icon: Art, name: 'art & entertainment', },
];

const Favorite: FC = () => {
  const [favorites, setFavorites] = useState<any>([])

  const { data: userData, error: userError, loading: userLoading }: any = useQuery(
    GET_USER_INFORMATION,
    { errorPolicy: 'all', fetchPolicy: 'network-only' },
  );

  useEffect(() => {
    if (userData?.me) {
      const data = userData?.me?.user?.savedMerchant?.map((m: any) => m?.business_data);
      // setFavorites(data)
      setFavorites([{
        merchantID: 1,
        isActive: true,
        businessName: 'The Bird',
        address: "New Galaxy",
        apartmentNo: "115",
        city: 'Surat',
        zipcode: "395002",
        businessLogo: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        bannerImages: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
        logoUrl: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
        totalDeal: 2
      },
      {
        merchantID: 1,
        isActive: true,
        businessName: 'The Bird',
        address: "New Galaxy",
        apartmentNo: "115",
        city: 'Surat',
        zipcode: "395002",
        businessLogo: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        bannerImages: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
        logoUrl: "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
        totalDeal: 2
      }])
    }
  }, [userData])

  console.log('userData', userData)
  console.log('favorites', favorites)
  return (
    <SafeAreaView style={commonStyles.whiteBG}>
      <BackButton
        color={Colour.PrimaryBlue}
        textStyle={commonStyles.backButtonText}
        title={String.account.favorites}
        wrapperStyle={{ marginVertical: 24 }}
      />
      <View style={{ marginLeft: 15, marginBottom: 15, height: 30, }}>
        <ScrollView
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {category.map((item: any) => {
            return (
              <View style={styles.circle}>
                <item.icon />
                <Text style={styles.glassText}>{item.name}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 15 }}>
        {favorites.map((item: any) => {
          return (
            <BusinessesCard
              image={{ uri: item?.businessLogo }}
              wrapperStyle={{ marginBottom: 8 }}
              Svg={item?.svg}
              title={item?.businessName}
              subTitle={`${item?.apartmentNo} ${item?.address} ${item?.city} ${item?.zipcode}`}
              dealText={item?.totalDeal || 0}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Favorite;

const styles = StyleSheet.create({
  labelWrapper: {
    height: 175,
    width: Dimensions.get('screen').width === 360 ? 143 : 163,
    marginHorizontal: 8,
    paddingVertical: 7,
  },
  circle: {
    height: 28,
    borderRadius: 50,
    backgroundColor: Colour.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    // marginTop: 24,
    //paddingVertical: 4,
    paddingLeft: 6,
    paddingRight: 8,
    shadowOpacity: 0.23,
    flex: 1,
    shadowColor: 'rgba(16, 24, 40, 1)',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
  },
  glassText: {
    fontSize: 14,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    color: Colour.PrimaryBlue,
    paddingLeft: 5,
    alignItems: 'center',
  },
});
