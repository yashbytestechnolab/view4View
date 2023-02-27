import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Share, Dimensions, Modal, SafeAreaView, Alert, StatusBar, } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import _ from "lodash"

import { BackButton } from '../../../components/BackButton/BackButton';
import { Shared } from '../../../assets/icons/Shared';
import { Colour } from '../../../theme';
import { ROUTES, String, AppConstants } from '../../../constants';
import { Foot } from '../../../assets/icons/Foot';
import { Dropdown } from 'react-native-element-dropdown';
import { CommonButton } from '../../../components';
import { ShoppingCart } from '../../../assets/icons/ShoppingCart';
import { PlusItem } from '../../../assets/icons/PlusItem';
import { Quantity } from '../../../constants/DummyJson.ts/JsonFile';
import { commonStyles } from '../../../constants/CommonStyles';
import { style } from './style';
import { GET_USER_INFORMATION, GET_VARIANT_BY_PRODUCTID, GET_PRODUCT_SHARE_URL } from '../../../graphQL/Queries';
import { Loder } from '../../../components/Loder';
import { ADD_TO_CART } from '../../../graphQL/Mutations';

const ProductPage: FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute()
  const filterRef: any = useRef();
  const productId = route.params?.productId;
  const variantId = route.params?.variantId;

  const [loader, setLoader]: any = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState<any>(null);
  const [varientData, setVarientData] = useState<any>(null);
  const [cartData, setCartData] = useState<any>([]);
  const [varientOptions, setVarientOptions] = useState<any>(null);
  const [varientOptionsVal, setVarientOptionsVal] = useState<any>(null);
  const [modalVisible, setModalVisible]: any = useState(false);

  const [UserAddToCart] = useMutation(ADD_TO_CART);
  const { data: product, loading, error: variantError } = useQuery(
    GET_VARIANT_BY_PRODUCTID,
    { variables: { productId: productId } },
  );

  const [getUserData, { data: userData, error: userError, loading: userLoading }]: any = useLazyQuery(
    GET_USER_INFORMATION, { fetchPolicy: 'network-only' },
  );

  const [getProductShareUrl]: any = useLazyQuery(
    GET_PRODUCT_SHARE_URL, { fetchPolicy: 'network-only' },
  );

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData?.me) {
      setCartData(userData?.me?.user?.userCart || [])
    }
  }, [userData])

  useEffect(() => {
    if (product) {
      const data = product?.getVariantsByProductId?.data;
      const options = data?.options?.length > 0 ? data?.options?.split(",") : [];
      const varient = data?.variants?.find((p: any) => p?._id == variantId);
      setProductData(data);
      setVarientData(varient);

      if (options?.length > 0) {
        const opts: any = {};
        const optsVal: any = {};
        options?.forEach((option: string) => {
          opts[`${option}`] = _.uniqBy(data?.productOptions?.filter((item: any) => item?.name == option), 'value')
          optsVal[`${option}`] = data?.productOptions?.find((x: any) => x.variant_id == varient?._id && x.name == option)?.value
        });
        setVarientOptions(opts)
        setVarientOptionsVal(optsVal)
      }
    }
  }, [product])

  // .....................share handling..............................,,,,,,,,,,,
  const onShare = () => {
    setLoader(true);
    getProductShareUrl({ variables: { variantId: varientData?._id } }).then(async (res: any) => {
      setLoader(false);
      await Share.share({ message: res?.data?.getProductShareUrl?.data?.url });
    }).catch((err: any) => {
      console.log('err', err)
    })
  };

  const onOptionsChange = (key: string, item: any) => {
    let data = { ...varientOptionsVal };
    data[`${key}`] = item?.value;
    const varient = productData?.variants.find((varient: any) => {
      let res: any = []
      data && Object?.keys(data)?.forEach((key: string) => {
        res.push(!!varient?.options?.find((v: any) => v?.name == key && v?.value == data?.[key]))
      })
      return res?.filter((r: boolean) => r === true)?.length === Object?.keys(data)?.length;
    })
    setVarientOptionsVal(data);
    setVarientData(varient);
  }

  const OnAddToCart = () => {
    setModalVisible(true);
    UserAddToCart({
      variables: {
        input: {
          variantId: varientData?._id,
          productId: productData?._id,
          quantity: quantity,
          categoryId: productData?.categories?._id
        },
      },
    }).then(async (response: any) => {
      await getUserData();
      filterRef.current.open();
    }).catch((error: any) => {
      console.log('error', error)
    }).finally(() => {
      setModalVisible(false);
    })
  }

  const onCheckout = () => {
    setLoader(true)
    UserAddToCart({
      variables: {
        input: {
          variantId: varientData?._id,
          productId: productData?._id,
          quantity: quantity,
          categoryId: productData?.categories?._id
        },
      },
    }).then((response: any) => {
      setLoader(false)
      navigation.navigate(ROUTES.CartCheckout);
    }).catch((error: any) => {
      setLoader(false)
      console.log('error', error)
    })
  }

  const calculateCartPrice = () => {
    if (cartData?.length > 0) {
      let price = 0;
      cartData?.forEach((item: any) => {
        price = price + (item?.quantity * parseFloat(item?.variantId?.price))
      })
      return price;
    } else
      return 0
  }

  const calculateDiscountedCartPrice = () => {
    if (cartData?.length > 0) {
      let price = 0;
      cartData?.forEach((item: any) => {
        price = price + (item?.quantity * (parseFloat(item?.variantId?.price) - ((parseFloat(item?.variantId?.price) * parseFloat(item?.categoryId?.discount || "0")) / 100)))
      })
      return price;
    } else
      return 0
  }

  const getWalletBalance = () => {
    return ((userData?.me?.user?.stepsEarnings + userData?.me?.user?.sleepsEarnings) - userData?.me?.user?.purchasedAmount) || 0;
  }

  const getDiscountedPrice = () => {
    return (parseFloat(varientData?.price) - ((parseFloat(varientData?.price) * parseFloat(productData?.categories?.discount)) / 100));
  }

  const calculateKeepWalking = () => {
    const diff = ((parseFloat(varientData?.price) * parseFloat(productData?.categories?.discount)) / 100) - getWalletBalance();
    const approxSteps = diff / AppConstants.stepValue;
    const miles = (approxSteps / AppConstants.mileValue).toFixed(2);
    const amount = diff < 1 ? `${(diff * 100).toFixed(2)}¢` : `$${diff.toFixed(2)}`;
    return { miles, amount }
  }


  return (
    <SafeAreaView style={style.main}>
      <StatusBar backgroundColor={Colour.white} barStyle={'dark-content'} />
      <ScrollView>
        <View>
          {/* .............................top image-view.................... */}
          <SwiperFlatList
            showPagination={true}
            paginationDefaultColor={Colour.white}
            paginationStyle={{ flex: 1 }}
            scrollEnabled={true}
            style={style.imageWrapper}
            paginationActiveColor={Colour?.peachyOrange}
            paginationStyleItemActive={{ height: 8, width: 8 }}
            paginationStyleItemInactive={{ height: 8, width: 8 }}
            onEndReachedThreshold={3}>
            {varientData?.images?.map((item: string) => {
              return (
                <View style={style.swipeImage}>
                  <Image source={{ uri: item || '' }} style={style.imageWrapper} />
                </View>
              );
            })}
          </SwiperFlatList>
          <SafeAreaView style={style.iconWrapper}>
            <BackButton color={Colour.black} />
            <TouchableOpacity style={style.share} onPress={() => { onShare(); }} activeOpacity={0.5}>
              <Shared />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        <View style={style.greenLine} />
        {productData?.categories?.discount ?
          <View style={style.greenText}>
            <Text style={style.off}>{productData?.categories?.discount + `% off`}</Text>
          </View>
          : null
        }
        {/* .............................middle descripation .................... */}
        <View style={style.middleWrapper}>
          <Text style={style.title}>{varientData?.title}</Text>
          <Text style={style.price}>{String.price}</Text>
          {
            productData?.categories?.discount ?
              <View style={style.priceTextWrapper}>
                <Text style={style.priceText1}>${varientData?.price}</Text>
                <Text style={style.priceText2}> ${getDiscountedPrice()?.toFixed(2)} </Text>
              </View> :
              <View style={style.priceTextWrapper}>
                <Text style={[style.priceText2, { paddingLeft: 0 }]}>${varientData?.price}</Text>
              </View>
          }

          <View style={style.discountView}>
            <Text style={style.discountText}>${getWalletBalance()?.toFixed(2)} Available balance</Text>
          </View>

          {/* ...................green Card details...........................    */}
          {
            getWalletBalance() < getDiscountedPrice() ?
              (
                <View style={style.greenCard}>
                  <View style={style.footIconWrapper}>
                    <Foot color={Colour.primaryGreen} height={19} width={24} />
                  </View>

                  <View style={{ paddingLeft: 8, paddingRight: 70 }}>
                    <Text style={style.greenCardTitle}>{String.keepWalking}</Text>
                    <Text numberOfLines={2} style={style.greenCardSubText}>
                      {`If you walk an extra ${calculateKeepWalking()?.miles} miles you could earn another ${calculateKeepWalking()?.amount} off`}
                    </Text>
                  </View>
                </View>
              ) : null
          }

          {/* //................................multipalText................................. */}
          {/* <Text style={style.multiLine}>{productData?.description}</Text> */}
          <RenderHtml
            contentWidth={Dimensions.get('window').width}
            source={{
              html: `
          <p style='font-size:14px; color:#98A2B3; margin-top:22px;'>
            ${productData?.description}
          </p>
          `
            }}
          />
          {/* ............... ...................dropDown..................................................... */}
          <View style={commonStyles.row}>
            {
              varientOptions?.Size ?
                <View style={[commonStyles.column, { flex: 2, marginRight: 24, }]}>
                  <Text style={style.dropdownText}>Size</Text>
                  <Dropdown
                    data={varientOptions?.Size}
                    style={style.dropdown}
                    dropdownPosition={'bottom'}
                    labelField="value"
                    valueField="value"
                    placeholder={'Select size'}
                    searchPlaceholder="Search..."
                    value={varientOptionsVal?.Size}
                    onChange={item => onOptionsChange('Size', item)}
                  />
                </View>
                : null
            }
            <View style={[commonStyles.column]}>
              <Text style={style.dropdownText}>Quantity</Text>
              <Dropdown
                data={Quantity}
                dropdownPosition={'bottom'}
                style={style.dropdown2}
                labelField="label"
                valueField="value"
                placeholder={'Select'}
                searchPlaceholder="Search..."
                value={quantity}
                onChange={item => setQuantity(item?.value)}
              />
            </View>
          </View>

          {
            varientOptions && Object.keys(varientOptions)?.filter((k) => k != 'Size' && k != 'Color')?.length > 0 ?
              Object.keys(varientOptions)?.filter((k) => k != 'Size' && k != 'Color').map(key => {
                return (
                  <View style={{ marginTop: 16 }}>
                    <Text style={style.dropdownText}>{key}</Text>
                    <Dropdown
                      data={varientOptions?.[key] || []}
                      style={style.dropdown}
                      dropdownPosition={'bottom'}
                      labelField="value"
                      valueField="value"
                      placeholder={`Select ${key.toLowerCase()}`}
                      searchPlaceholder="Search..."
                      value={varientOptionsVal?.[key]}
                      onChange={item => onOptionsChange(key, item)}
                    />
                  </View>
                )
              })
              : null
          }
          {
            varientOptions?.Color ?
              <View style={{ marginTop: 16 }}>
                <Text style={style.dropdownText}>Color</Text>
                <ScrollView style={commonStyles.row} horizontal showsHorizontalScrollIndicator={false}>
                  {varientOptions?.Color?.map((c: any) => {
                    return (
                      <TouchableOpacity
                        style={[style.colourOption, { backgroundColor: c?.value?.toLowerCase(), borderWidth: varientOptionsVal?.Color == c?.value ? 4 : 0 }]}
                      />
                    )
                  })}
                </ScrollView>
              </View>
              : null
          }

          {/* ............................buttons handler...................................... */}
          <CommonButton
            buttonText={String.addToCart}
            onPress={() => OnAddToCart()}
            buttonStyle={{ backgroundColor: Colour.PrimaryBlue, marginTop: 24 }}
            buttonTextStyle={{ color: Colour.primaryGreen }}
            warperStyle={{ marginTop: 18 }}
          />
          <CommonButton
            buttonText={String.checkout}
            onPress={() => onCheckout()}
            buttonStyle={[style.checkoutButton, { marginTop: 8 }]}
            buttonTextStyle={{ color: Colour.gray700 }}
            warperStyle={{ marginTop: 18 }}
          />
        </View>
        {/* ....................open model................................ */}
        <Modal
          animationType="none"
          transparent={true}
          // onShow={modelHandling}
          visible={modalVisible}
        // onRequestClose={() => {
        //   modelHandling();
        // }}
        >
          <View style={style.cartModalWrap}>
            <View style={style.popupWrapper}>
              <View style={commonStyles.row}>
                <ShoppingCart />
                <View style={style.bottomSheetWrapper}>
                  <PlusItem />
                </View>
              </View>
              <Text style={style.modelText}>{String.cartAdd}</Text>
            </View>
          </View>
        </Modal>
        {/* .............................bottom sheet....................................... */}
        <RBSheet
          height={76}
          onOpen={() => { }}
          customStyles={{ container: style.RBContainer }}
          // openDuration={250}
          ref={filterRef}
          onClose={() => { }}>
          <View style={style.cartWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ShoppingCart color={Colour.white} height={25} width={26} />
              <View style={style.orangeAmountWrapper}>
                <Text style={style.cartText}>{cartData?.length || 0}</Text>
              </View>
              <View style={commonStyles.column}>
                <Text style={style.cartText2}>${calculateCartPrice().toFixed(2)}</Text>
                <View style={style.orangeLine} />
                <Text style={[style.cartText2, { color: Colour.white }]}>${calculateDiscountedCartPrice().toFixed(2)}</Text>
              </View>
            </View>

            <CommonButton
              buttonText={String.checkoutNow}
              onPress={() => {
                navigation.navigate(ROUTES.CartCheckout);
                filterRef.current.close();
              }}
              buttonTextStyle={[style.cartText2, { color: Colour.PrimaryBlue, paddingHorizontal: 14, }]}
              //warperStyle={{marginLeft: 125}}
              buttonStyle={style.checkwrapper}
            />
          </View>
        </RBSheet>
      </ScrollView>
      {(loading || loader) && <Loder spinnerColor={Colour.primaryGreen} />}
    </SafeAreaView>
  );
};
export default ProductPage;
