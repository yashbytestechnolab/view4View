import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ROUTES, String } from '../../../constants';
import { CommonButton } from '../../../components';
import { BackButton } from '../../../components/BackButton/BackButton';
import { CartItemDetails } from '../../../components/CartItemDetails/CartItemDetails';

import { cartItem } from '../../../constants/DummyJson.ts/JsonFile';
import { Colour } from '../../../theme';
import { Foot } from '../../../assets/icons/Foot';
import { SyncSuccess } from '../../../assets/icons/SyncSuccess';
import { OrderDetails } from '../../../components/OderDetails/OrderDetails';
import { style } from './style';
import { commonStyles } from '../../../constants/CommonStyles';
import { AlertCircle } from '../../../assets/icons/AlertCircle';

const OrderConformation = () => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={style.main}>
      <ScrollView style={{ paddingTop: 15 }} nestedScrollEnabled={true}>
        {/* ...................................backButton....................................... */}
        <View>
          <BackButton
            color={Colour.black}
            title={String.orderConform}
            textStyle={commonStyles.backButtonText}
          />
        </View>
        {/* ....................................Oder Title.................................................... */}
        <View>
          <View style={style.syncIcon}>
            <SyncSuccess height={26} width={26} color={Colour.peachyOrange} />
            {/* <AlertCircle/> */}
          </View>
          <Text numberOfLines={2} style={style.titleText}>
            {String.oderConformTitle} <Text>Bytes</Text>
            {/* {String.orderCancle}  */}
          </Text>
        </View>
        {/* ........................................cart items........................................... */}
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={[style.backButton, { paddingTop: 23 }]}>item (3)</Text>
          <View style={style.cardWrapper}>
            <CartItemDetails
              Data={cartItem}
              Icon={Foot}
              offerTitle={String.keepWalking}
              offerSubTitle={String.keepWalkingSubText}
              orderConform={false}
            />
          </View>
          {/* ...........................................amount total.......................................... */}
          <Text style={style.OderDetailstitle}>{String.ordeeDetails}</Text>
          <View style={style.grayBorder}>
            <OrderDetails title={String.oderNum} values={'123456'} />
            <OrderDetails title={String.oderDate} values={'24/8/22'} />
            <OrderDetails title={String.trackingNum} values={'123456'} />
          </View>
          <OrderDetails title={String.subTotal} values={'$40.00'} />
          <OrderDetails title={String.delivery} values={'$02.00'} />
          <OrderDetails title={String.centzUsed} values={'$02.00'} />
          <View style={style.grayLine} />
          <OrderDetails
            title={String.total}
            values={'$40.00'}
            style={{ color: Colour.peachyOrange }}
          />
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <CommonButton
            buttonText={String.backMarketPlace}
            onPress={() => {
              navigation.navigate(ROUTES.MarketPlace);
            }}
            buttonStyle={style.backMarket}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderConformation;
