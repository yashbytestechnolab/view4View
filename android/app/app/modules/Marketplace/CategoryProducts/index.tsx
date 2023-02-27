import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import { Colour } from '../../../theme';
import { Search } from '../../../assets/icons/Search';
import { ROUTES, String } from '../../../constants';
import { commonStyles } from '../../../constants/CommonStyles';
import { style } from './style';
import { BackButton } from '../../../components/BackButton/BackButton';
import { GET_VARIANT_MARKETPLACE } from '../../../graphQL/Queries';
import { Loder } from '../../../components/Loder';

function CategoryProducts({ route }: any) {
  const { title, search }: any = route.params;
  const navigation: any = useNavigation();

  const [products, setProducts] = useState<any>([])
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const [pageSearch, setPageSearch] = useState<string>(search)

  let variables: any = { limit, offset: 0, isFeatured: false }
  if (title)
    variables = { ...variables, category: title }
  if (search)
    variables = { ...variables, search: search }

  const [fetchProducts, { called, loading, data }] = useLazyQuery(GET_VARIANT_MARKETPLACE, { variables });

  useEffect(() => {
    fetchProducts()
  }, [])


  useEffect(() => {
    if (data?.getVariants?.data?.length > 0) {
      setProducts([...products, ...data?.getVariants?.data])
      setTotal(data?.getVariants?.total)
    }
  }, [data])

  const fetchMore = () => {
    if (products?.length < total && !loading) {
      variables.offset = page * limit;
      fetchProducts({ variables })
      setPage(page + 1);
    }
  }

  const onSearch = () => {
    if (pageSearch?.trim()?.length > 0) {
      setProducts([])
      variables.offset = 0
      variables.page = 1
      variables.search = pageSearch
      fetchProducts({ variables })
      setPage(1);
    }
  }

  const renderDesign = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={{ padding: 8, width: '50%' }}
        onPress={() => navigation.navigate(ROUTES.ProductPage, { productId: item?.product_id?._id, variantId: item?._id })}
      >
        <View style={commonStyles.boxshado}>
          <Image
            source={{ uri: item?.images[0] || item?.product_id?.images || '' }}
            resizeMode={'stretch'}
            style={style.imageWrapper}
          />
          {
            item?.category?.discount ?
              <View style={style.greenBG}>
                <Text style={style.percentText}>{item?.category?.discount}%</Text>
              </View>
              : null
          }
          <View style={style.textWrapper}>
            <View style={style.subTextWrapper}>
              <Text numberOfLines={1} style={style.productName}> {item?.title} </Text>
              <Text style={style.price}>${item?.price}</Text>
            </View>
            <Text style={style.category}>{item?.category?.primaryCat}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colour.PrimaryBlue, flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colour.white }}>
        <View style={[style.blueWrapper]}>
          <BackButton
            title={search || title}
            wrapperStyle={style.backIcon}
            textStyle={[commonStyles.backButtonText, { color: Colour.white }]}
          />
          <View style={style.searchWrapper}>
            <View style={style.searchBorder}>
              <Search />
              <TextInput
                autoCorrect={false}
                returnKeyType={'search'}
                placeholder={String.searchText}
                placeholderTextColor={Colour.gray300}
                style={style.searchText}
                value={pageSearch}
                onChangeText={setPageSearch}
                onSubmitEditing={() => onSearch()}
              />
            </View>
          </View>
        </View>
        <View style={style.products}>
          <FlatList
            data={products}
            numColumns={2}
            renderItem={renderDesign}
            onEndReachedThreshold={0.3}
            onEndReached={fetchMore}
            contentContainerStyle={{ flexGrow: 1 }}
            ListFooterComponent={() => {
              return (
                loading ?
                  <View style={{ marginVertical: 30 }}>
                    <Loder spinnerColor={Colour.primaryGreen} />
                  </View>
                  : null
              )
            }}
            ListEmptyComponent={() => {
              return (!loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No products found.</Text>
                </View>
                : null
              )
            }}
          />
        </View>
      </View>
      {/* {loading && <Loder spinnerColor={Colour.primaryGreen} />} */}
    </SafeAreaView>
  );
}

export default CategoryProducts;
