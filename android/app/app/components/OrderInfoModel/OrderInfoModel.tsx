import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colour} from '../../theme';
import {Fonts} from '../../assets';

import Modal from 'react-native-modal';
import {Cross} from '../../assets/icons/Cross';
import {String} from '../../constants';

interface props {
  isVisibleModal?: boolean;
  toggleModal?: Function;
  handleUnmtachPress?: Function;
  loder?: boolean;
  itemName?: String;
  itemImages?: String;
  rrpText?: String;
  discountText?: String;
  pricePaidText?: String;
  orderNum?: String;
  orderDate?: String;
  trackuingNum?: String;
}

export const OrderInfoModel = (props: props) => {
  const {
    isVisibleModal,
    toggleModal,
    handleUnmtachPress,
    loder,
    itemName,
    itemImages,
    rrpText,
    discountText,
    pricePaidText,
    orderNum,
    orderDate,
    trackuingNum,
  }: any = props;
  return (
    <Modal
      isVisible={isVisibleModal}
      onBackdropPress={toggleModal}
      coverScreen={true}
      backdropColor={Colour.transparent}>
      <View style={styles.modalView}>
        <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.itemName}>{itemName}</Text>
          <TouchableOpacity style={styles.crossIcon} onPress={toggleModal}>
            <Cross color={Colour.black} />
          </TouchableOpacity>
        </View>
        <Image style={styles.imageWrapper} source={itemImages} />
        <View style={styles.rowWrapper}>
          <View style={styles.pricewrapper}>
            <Text numberOfLines={1} style={[styles.subTitle]}>
              {String.rrp}
            </Text>
            <Text numberOfLines={1} style={styles.rrpText}>
              {rrpText}
            </Text>
            <View style={styles.rrpLine}></View>
          </View>
          <View style={styles.discountPrice}>
            <Text numberOfLines={1} style={styles.subTitle}>
              {String.discText}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.rrpText, {color: Colour.peachyOrange}]}>
              {discountText}
            </Text>
          </View>
          <View style={styles.pricewrapper}>
            <Text numberOfLines={1} style={styles.subTitle}>
              {String.pricePaid}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.rrpText, {color: Colour.PrimaryBlue}]}>
              {pricePaidText}
            </Text>
          </View>
        </View>
        <Text style={styles.detailsText}>{String.orderDetails}</Text>
        
        <View style={styles.bottomCard}>
          <View style={styles.bottomWrapper}>
            <Text style={styles.cardText}>{String.orderNum}</Text>
            <Text style={styles.cardText}>{orderNum}</Text>
          </View>
          <View style={styles.bottomWrapper}>
            <Text style={styles.cardText}>{String.orderDate}</Text>
            <Text style={styles.cardText}>{orderDate}</Text>
          </View>
          <View style={styles.bottomWrapper}>
            <Text style={styles.cardText}>{String.trackuingNum}</Text>
            <Text style={styles.cardText}>{trackuingNum}</Text>
          </View>
        </View>
        </View>
        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    // paddingHorizontal: 12,
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingTop: 4,
    alignItems: 'center',
  },
  wrapper:{width:'100%', paddingVertical:20, alignItems:'center'},

  modalView: {
    backgroundColor: Colour.white,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colour.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal:16,
  },
  imageWrapper:{width:'100%', borderRadius:14, height:266},
  itemName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: Fonts.NotoSansMedium,
    color: Colour.PrimaryBlue,
  },
  crossIcon: {
    alignItems: 'flex-end',
  },
  discountPrice: {
    flexDirection: 'column',
    flex: 1,
    marginLeft:16
  },
  subTitle: {
    color: Colour.gray400,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.QuicksandMedium,
  },
  pricewrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rowWrapper: {
    flexDirection: 'row',

    paddingHorizontal: 4,
    paddingTop: 8,
  },
  rrpLine: {
    backgroundColor: Colour.gray400,
    height: 1,
    width: '100%',

    position: 'absolute',
    top: 28,
  },
  rrpText: {
    color: Colour.gray400,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: Fonts.QuicksandBold,
  },
  discPrice: {
    color: Colour.placeholderGray,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 11,
    fontFamily: Fonts.Quicksand,
  },
  detailsText: {
    width:'100%',
    color: Colour.PrimaryBlue,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.QuicksandSemiBold,
    // textAlign: 'left',
    paddingVertical: 8,
  },
  bottomCard: {
    backgroundColor: Colour.white,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: Colour.gray200,
    //height: 101,
    width: '100%',
    padding: 16,
  },
  cardText: {
    color: Colour.PrimaryBlue,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    fontFamily: Fonts.QuicksandMedium,
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
});
