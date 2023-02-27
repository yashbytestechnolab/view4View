
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {Card} from '../assets/icons/card';
import {PiggyBank} from '../assets/icons/piggyBank';
import {Colour} from '../theme/colors';
import {Fonts} from '../assets/fonts';
import {String} from '../constants';

export const BalanceCard = (props: any) => {
  return (
    <View style={styles.BankTextWrapper}>
      <View style={styles.bankCard}>
        <View style={styles.cardDetailsWrapper}>
          <Card />
          <Text style={styles.balenceText}>{String.balence}</Text>
          <Text style={styles.amoutText}>${props.amount==undefined ? "0.00":Number(props.amount).toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.savingCard}>
        <View style={styles.cardDetailsWrapper}>
          <PiggyBank />
          <Text style={styles.balenceText}>{String.saving}</Text>
          <Text style={styles.amoutText}>${props.saving==undefined ? "0.00": Number(props.saving).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  BankTextWrapper: {
    flexDirection: 'row'},

  bankCard: {
    flex:1,
    marginTop: 10,
    height: 106,
    flexGrow:1,
    backgroundColor: Colour.white,
    borderRadius: 14,
  },
  savingCard: {
    flex:1,
    marginTop: 10,
    height: 106,
    flexGrow:1,
    backgroundColor: Colour.white,
    borderRadius: 14,
    marginLeft:20
  },
  cardDetailsWrapper: {
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
    flexDirection: 'column',
    flex:1,
  },
  balenceText: {
    marginVertical: 4,
    fontFamily: Fonts.NotoSansMedium,
    fontSize: 12,
    fontWeight: '500',
    color: Colour.gray400,
  },
  amoutText: {
    color: Colour.gray500,
    fontSize: 18,
    fontFamily: Fonts.MontserratBold,
    lineHeight: 21,
  },
  exploreWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 24,
    marginBottom: 8,
  },
});