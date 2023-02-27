import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, StatusBar } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import _ from 'lodash';

import { BackButton } from '../../../components/BackButton/BackButton';
import { CommonButton } from '../../../components';
import { AppConstants, ROUTES, String } from '../../../constants';
import { cartItem, Quantity } from '../../../constants/DummyJson.ts/JsonFile';
import { OrderDetails } from '../../../components/OderDetails/OrderDetails';
import { CartItemDetails } from '../../../components/CartItemDetails/CartItemDetails';

import { Colour } from '../../../theme';
import { Foot } from '../../../assets/icons/Foot';
import { Plus } from '../../../assets/icons/Plus';
import { style } from './style';
import { commonStyles } from '../../../constants/CommonStyles';
import PaymentMethod from '../../../components/PaymentMethod/PaymentMethod';
import { Images } from '../../../assets';
import { GET_USER_INFORMATION } from '../../../graphQL/Queries';
import { UPDATE_CART } from '../../../graphQL/Mutations';
import { Loder } from '../../../components/Loder';

const CartCheckout: FC = () => {
  const navigation: any = useNavigation();
  const [paymentShow, setPaymentShow]: any = useState(false)
  const [loading, setLoading]: any = useState(false)
  const [cartData, setCartData] = useState<any>([]);
  const [defaultAdd, setDefaultAdd] = useState<any>(null);
  const [deliveryCharge, setDeliveryCharge] = useState<any>(0.00);
  const [subTotal, setSubTotal] = useState<any>(0.00);
  const [centzUsed, setCentzUsed] = useState<any>(0.00);
  const [total, setTotal] = useState<any>(0.00);
  const [totalDisc, setTotalDisc] = useState<any>(0.00);

  const [UserUpdateCart] = useMutation(UPDATE_CART);

  const [getUserData, { data: userData, error: userError, loading: userLoading }]: any = useLazyQuery(
    GET_USER_INFORMATION,
    { fetchPolicy: 'network-only' },
  );

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (!userError && !userLoading) {
      const data = userData?.me?.user;
      setDefaultAdd(data?.defaultAddress);

      let scost = 0, stotal = 0, totalDiscount = 0, eligibleDiscount: Array<any> = [];
      (data?.userCart || []).forEach((item: any) => {
        scost = scost + parseFloat(item?.variantId?.estimatedShippingCost || 0);
        stotal = stotal + (parseInt(item.quantity) * parseFloat(item?.variantId?.price));
        const itemDisc = ((parseFloat(item?.variantId?.price) * parseFloat(item?.categoryId?.discount || "0")) / 100);
        if ((parseInt(item.quantity) * itemDisc) <= getWalletBalance())
          eligibleDiscount.push(parseInt(item.quantity) * itemDisc)
        else if (itemDisc <= getWalletBalance())
          eligibleDiscount.push(itemDisc)
        totalDiscount = totalDiscount + (parseInt(item.quantity) * itemDisc);
      });

      setCartData(data?.userCart || []);
      setDeliveryCharge(scost);
      setSubTotal(stotal);
      setTotalDisc(totalDiscount);

      let cUsed = 0;
      if (totalDiscount <= getWalletBalance()) {
        cUsed = totalDiscount;
      } else if (eligibleDiscount?.length) {
        cUsed = _.max(eligibleDiscount)
      }

      setCentzUsed(cUsed);
      setTotal((stotal + scost) - cUsed);
    }
  }, [userData, userError, userLoading]);

  const updateCart = (cartId: string, quantity: number, isDelete: boolean) => {
    setLoading(true)
    UserUpdateCart({ variables: { input: { cartId, quantity, isDelete } } })
      .then((response: any) => {
        getUserData();
      }).catch((error: any) => {
        console.log('error', error)
      }).finally(() => {
        setLoading(false)
      })
  }

  const getWalletBalance = () => {
    return ((userData?.me?.user?.stepsEarnings + userData?.me?.user?.sleepsEarnings) - userData?.me?.user?.purchasedAmount) || 0;
  }

  const calculateKeepWalking = () => {
    const diff = totalDisc - getWalletBalance();
    const approxSteps = diff / AppConstants.stepValue;
    const miles = (approxSteps / AppConstants.mileValue).toFixed(2);
    const amount = diff < 1 ? `${(diff * 100).toFixed(2)}¢` : `$${diff.toFixed(2)}`;
    return { miles, amount }
  }

  return (
    <SafeAreaView style={style.main}>
      <StatusBar backgroundColor={Colour.white} barStyle={'dark-content'} />
      {/* ...................................backButton....................................... */}
      <BackButton
        color={Colour.black}
        title={String.checkout}
        textStyle={commonStyles.backButtonText}
        wrapperStyle={{ paddingTop: 15, marginBottom: 10 }}
      />
      <ScrollView nestedScrollEnabled={true}>
        {/* ........................................cart items........................................... */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={[style.backButton]}>item ({cartData?.length || 0})</Text>
          <View style={style.cardWrapper}>
            <CartItemDetails
              Data={cartData}
              Icon={Foot}
              offerTitle={String.keepWalking}
              offerSubTitle={`If you walk an extra ${calculateKeepWalking()?.miles} miles you could earn another ${calculateKeepWalking()?.amount} off`}
              orderConform={totalDisc > getWalletBalance()}
              deleteItem={(cartId: string) => updateCart(cartId, 0, true)}
              onQuantityChange={(cartId: string, quantity: number) => updateCart(cartId, quantity, false)}
            />
          </View>
          {/* ...........................................amount total.......................................... */}
          <OrderDetails title={String.subTotal} values={`$${subTotal.toFixed(2)}`} />
          <OrderDetails title={String.delivery} values={`$${deliveryCharge.toFixed(2)}`} />
          <OrderDetails
            title={String.centzUsed}
            values={`$${centzUsed.toFixed(2)}`}
            style={{ color: Colour.peachyOrange }}
            valueStyle={{ color: Colour.peachyOrange }}
          />
          <View style={style.grayLine} />
          <OrderDetails
            title={String.total}
            values={`$${total.toFixed(2)}`}
            style={{ color: Colour.peachyOrange }}
            valueStyle={{ fontWeight: '700' }}
            titleStyle={{ fontWeight: '700' }}
          />
          {/* .................................payment Method..................................................... */}
          <Text style={[style.subTitleText, { marginTop: 12 }]}>{String.paymentMethod}</Text>
          {
            paymentShow === false ?
              <TouchableOpacity
                style={style.paymentAdd}
                activeOpacity={0.7}
                onPress={() => {
                  setPaymentShow(true)
                  // navigation.navigate(ROUTES.AddNewCard);
                }}>
                <View style={style.border}>
                  <Plus height={11} width={11} />
                </View>
                <Text style={style.subTitleText}>{String.addNewPayment}</Text>
              </TouchableOpacity>
              :
              <View style={style.paymentMethodWrapper}>
                <PaymentMethod cardImage={Images.masterCard} cardNameText={'VISA'} cardExpiryText={'Expiry 06/2024'} editPress={() => navigation.navigate(ROUTES.AddNewCard)} rightPress={false} wrapperStyle={{}} textWrapper={{}} />
                <PaymentMethod cardImage={Images.masterCard} cardNameText={'VISA'} cardExpiryText={'Expiry 06/2024'} editPress={() => navigation.navigate(ROUTES.AddNewCard)} rightPress={false} wrapperStyle={{}} textWrapper={{}} />
                <Text style={style.addCardText}>{String.addCard.addBtn}</Text>
              </View>
          }

          {/* ................................Shipping Address..................................................... */}
          <Text style={[style.subTitleText, { marginTop: 16 }]}> {String.shippingAddress} </Text>
          {
            !defaultAdd ?
              <TouchableOpacity
                style={style.paymentAdd}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(ROUTES.AddAddress, { goBack: true })}>
                <View style={style.border}>
                  <Plus height={11} width={11} />
                </View>
                <Text style={style.subTitleText}>{String.addNewAdd}</Text>
              </TouchableOpacity>
              :
              <View style={style.paymentMethodWrapper}>
                <View style={commonStyles.row}>
                  <View style={{ flex: 0.9 }}>
                    <Text style={style.shiptitle}>{defaultAdd?.addressType}</Text>
                    <Text style={style.shipSubText}>{defaultAdd?.addressLine1}</Text>
                    <Text style={style.shipSubText}>{defaultAdd?.addressLine2}</Text>
                    <Text style={style.shipSubText}>{defaultAdd?.city},{defaultAdd?.state_id?.value},{defaultAdd?.zipcode}</Text>
                  </View>
                  <View style={{ flex: 0.1, alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(ROUTES.AddAddress, { editAdd: true, Item: defaultAdd, goBack: true })}
                    >
                      <Image source={Images.edit} style={{ height: 14, width: 14 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          }

          <CommonButton
            buttonText={String.completePurchase}
            onPress={() => { navigation.navigate(ROUTES.OrderConformation); }}
            buttonStyle={style.compeletePurches}
          />
        </View>
      </ScrollView>
      {loading && <Loder spinnerColor={Colour.primaryGreen} />}
    </SafeAreaView>
  );
};

export default CartCheckout;
