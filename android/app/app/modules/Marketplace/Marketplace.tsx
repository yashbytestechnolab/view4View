import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, FlatList, ImageBackground, SafeAreaView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Colour } from '../../theme';
import { Images } from '../../assets';
import { Search } from '../../assets/icons/Search';
import { ROUTES, String, AppConstants } from '../../constants';
import Logo from '../../assets/icons/logo';
import { Card } from '../../assets/icons/card';
import { Heading } from '../../components/Handing/Heading';
import { FeaturedProduct } from '../../components/FeaturedProduct';
import { ShopCategory } from '../../components/ShopCategory';
import { style } from './style';
import { Cross } from '../../assets/icons/Cross';
import { useQuery } from '@apollo/client';
import { GET_MRAKETPLACE_CATEGORY, GET_USER_INFORMATION, GET_VARIANT_MARKETPLACE } from '../../graphQL/Queries';

const Marketplace: FC = () => {
  const navigation: any = useNavigation();
  const filterRef: any = useRef();
  const [marketplaceCategory, setMarketplaceCategory] = useState<any>([])
  const [productVariant, setProductVariant] = useState<any>([])

  const { data: getUserInformation, error: userError, loading: userLoading }: any = useQuery(
    GET_USER_INFORMATION,
    { errorPolicy: 'all', fetchPolicy: 'network-only' },
  );

  const { data: getMarketplaceCategory, error, loading }: any = useQuery(
    GET_MRAKETPLACE_CATEGORY,
    { errorPolicy: 'all', fetchPolicy: 'network-only' },
  );

  const { data: variantData, error: variantError, loading: varientLoading } = useQuery(
    GET_VARIANT_MARKETPLACE,
    { variables: { limit: 5, isFeatured: true, } },
  );

  useEffect(() => {
    if (getMarketplaceCategory?.getMarketplaceCategory?.data.length > 0) {
      setMarketplaceCategory(getMarketplaceCategory?.getMarketplaceCategory?.data)
    }
  }, [getMarketplaceCategory])

  useEffect(() => {
    if (variantData?.getVariants?.data.length > 0) {
      setProductVariant(variantData?.getVariants?.data)
    }
  }, [variantData])

  const getWalletBalance = () => {
    return ((getUserInformation?.me?.user?.stepsEarnings + getUserInformation?.me?.user?.sleepsEarnings) - getUserInformation?.me?.user?.purchasedAmount) || 0;
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colour.PrimaryBlue, flex: 1 }}>
      <ScrollView bounces={false} style={style.main}>
        {/* ......................blue top searchbar hndle.......................... */}
        <View style={style.blueWrapper}>
          <ImageBackground source={Images.bg2} imageStyle={{ borderRadius: 14 }} style={[style.topBGImage]} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 11, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Logo height={27} width={55} />
                <Text style={style.title}>{String.Marketplace}</Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 5, width: 80, height: 30, backgroundColor: '#fff', borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Card height={14} width={14} />
                <Text numberOfLines={1} style={style.amount}> ${getWalletBalance()?.toFixed(2)} </Text>
              </View>
            </View>
          </ImageBackground>
          <View style={style.searchWrapper}>
            <Search color={Colour.gray300} />
            <Text onPress={() => { navigation.navigate(ROUTES.FindMarketPlace, { wallet: getWalletBalance()?.toFixed(2) }) }} style={style.searchText}>
              {String.searchText}
            </Text>
          </View>
        </View>

        {/* <View style={{ width: '100%' }}>
        <SwiperFlatList
          showPagination={true}
          paginationDefaultColor={Colour.white}
          paginationStyle={style.pagination}
          scrollEnabled={true}
          style={style.swipeFlatList}
          paginationActiveColor={Colour?.peachyOrange}
          paginationStyleItemActive={{ height: 8, width: 8 }}
          paginationStyleItemInactive={{ height: 8, width: 8 }}
          onEndReachedThreshold={3}>
          {PagesItem.map((item: any) => {
            return (
              <View key={item.id}>
                <Image source={item.image} style={style.swipeImage} />
                <LinearGradient style={[style.swipeImage, { position: 'absolute' }]} colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0) 100%)']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                  <View style={{ marginLeft: 16, marginTop: 16 }}>
                    <Text style={style.pageTitl}>{item.title}</Text>
                    <CommonButton
                      buttonText={item.subTitle}
                      onPress={undefined}
                      warperStyle={style.pageWrapper}
                      buttonStyle={style.pageButtonStyle}
                      buttonTextStyle={style.dealText}
                    />
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </SwiperFlatList>
      </View> */}
        {/* ...............................featureProduct................................... */}
        <Heading
          Wrapperstyle={{ marginTop: 16, marginBottom: 8 }}
          leftText={String.featureProduct}
          rightText={String.allCategory}
          onPress={() => filterRef.current.open()}
          leftStyle={style.handleHeading}
          rightStyle={{ marginRight: 15 }}
        />
        <View style={{ paddingLeft: 18, paddingBottom: 6 }}>
          <FeaturedProduct onPress={(productId: string, variantId: string) => navigation.navigate(ROUTES.ProductPage, { productId, variantId })} data={productVariant} loading={varientLoading} />
        </View>

        {/* ..................................shop Category.......................... */}
        <View style={style.bottomBlueWrapper}>
          <Heading
            leftText={String.shopByCategory}
            Wrapperstyle={{ paddingHorizontal: -16 }}
            rightText={String.allCategory}
            onPress={() => filterRef.current.open()}
            leftStyle={[style.handleHeading, { color: Colour.white }]}
          />
          <ScrollView
            scrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <View style={style.column}>
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CategoryProducts, { title: marketplaceCategory[0]?.primaryCat })}>
                {marketplaceCategory[0] &&
                  <ShopCategory image={marketplaceCategory[0]?.catImage} title={marketplaceCategory[0]?.primaryCat} />
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CategoryProducts, { title: marketplaceCategory[2]?.primaryCat })}>
                {marketplaceCategory[2] && <ShopCategory image={marketplaceCategory[2]?.catImage} title={marketplaceCategory[2]?.primaryCat} />}
              </TouchableOpacity>
            </View>
            <View style={style.column}>
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CategoryProducts, { title: marketplaceCategory[1]?.primaryCat })}>
                {marketplaceCategory[1] && <ShopCategory image={marketplaceCategory[1]?.catImage} title={marketplaceCategory[1]?.primaryCat} />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CategoryProducts, { title: marketplaceCategory[3]?.primaryCat })}>
                {marketplaceCategory[3] && <ShopCategory image={marketplaceCategory[3]?.catImage} title={marketplaceCategory[3]?.primaryCat} />}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {/* ........................................bottom sheet.......................................     */}
        <RBSheet
          height={Dimensions.get('screen').height / 1.3}
          //height={76}
          onOpen={() => { }}
          customStyles={{
            container: style.RBContainer,
          }}
          openDuration={250}
          ref={filterRef}
          onClose={() => { }}>
          <View style={style.bottomSheetWrapper}>
            <View style={style.iconWrapper}>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => filterRef.current.close()}>
                <Cross color={Colour.PrimaryBlue} />
              </TouchableOpacity>
              <Text style={style.bottomSheetTitle}>{String.AllCategory}</Text>
            </View>
            <FlatList
              data={marketplaceCategory}
              renderItem={({ item, key }: any) => (
                <View key={key} style={style.wrapper}>
                  <TouchableOpacity
                    style={style.cateWrapper}
                    onPress={() => {
                      filterRef.current.close();
                      navigation.navigate(ROUTES.CategoryProducts, { title: item?.primaryCat });
                    }}
                  >
                    {(item?.catImage?.length === 0 || !(item?.catImage)) ?
                      <Image source={Images.default} style={[style.cateImage]} />
                      :
                      <Image
                        source={{ uri: `${AppConstants.marketplaceImage}${item?.catImage}` }}
                        resizeMode={'cover'}
                        style={style.cateImage}
                        defaultSource={Images.default}
                      />}
                    <Text style={style.cateTitle}>{item?.primaryCat}</Text>
                  </TouchableOpacity>
                </View>
              )}
              numColumns={3}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </RBSheet>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Marketplace;
