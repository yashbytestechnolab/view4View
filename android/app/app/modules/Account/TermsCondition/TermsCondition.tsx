import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import React from 'react';

import { commonStyles } from '../../../constants/CommonStyles';
import { BackButton } from '../../../components/BackButton/BackButton';
import { String } from '../../../constants';
import { Colour } from '../../../theme';
import { Fonts } from '../../../assets';
import { ScrollView } from 'react-native-gesture-handler';
import { TermsAndCondition } from '../../../constants/DummyJson.ts/JsonFile';

export default function TermsCondition() {
  return (
    <>
      <StatusBar barStyle={String.darkContent} backgroundColor={Colour.white} />
      <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colour.white }} >

        <BackButton
          title={String.termConditions}
          color={Colour.PrimaryBlue}
          textStyle={commonStyles.backButtonText}
          wrapperStyle={{ marginTop: 20 }}
        />
        <View style={commonStyles.whiteBG}>

          <ScrollView style={style.wrapper}>
            <Text style={style.titleText}>Title</Text>
            <Text style={style.subText}>{TermsAndCondition.tc1}</Text>
            <Text style={[style.titleText, { paddingTop: 30 }]}>Title</Text>
            <View style={commonStyles.row}>
              <View style={style.dot} />
              <Text style={style.subText}>{TermsAndCondition.tc2}</Text>
            </View>
            <View style={commonStyles.row}>
              <View style={style.dot} />
              <Text style={style.subText}>{TermsAndCondition.tc3}</Text>
            </View>
            <View style={commonStyles.row}>
              <View style={style.dot} />
              <Text style={style.subText}>{TermsAndCondition.tc4}</Text>
            </View>
            <View style={commonStyles.row}>
              <View style={style.dot} />
              <Text style={style.subText}>{TermsAndCondition.tc5}</Text>
            </View>
            <View style={commonStyles.row}>
              <View style={style.dot} />
              <Text style={style.subText}>
                {TermsAndCondition.tc5}+{TermsAndCondition.tc5}
              </Text>
            </View>
            <View style={{ marginBottom: 50 }} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
const style = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 27,
  },
  titleText: {
    fontSize: 16,
    fontFamily: Fonts.QuicksandSemiBold,
    fontWeight: '600',
    color: Colour.PrimaryBlue,
    paddingBottom: 8,
  },
  subText: {
    fontSize: 14,
    fontFamily: Fonts.DMSansRegular,
    fontWeight: '400',
    color: Colour.gray700,
    paddingBottom: 8,
    lineHeight: 20,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  dot: {
    backgroundColor: Colour.gray900,
    height: 5,
    width: 5,
    flexWrap: 'wrap',
    borderRadius: 3,
    marginRight: 5,
    marginTop: 7,
  },
});
