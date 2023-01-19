import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Colors, darkBackGround } from '../Theme';
import { InputContextProvide } from '../context/CommonContext';

interface loder {
  spinnerColor?: string;
  backGroundColor?: string;
}
export const Loader = (props: loder) => {
  const { spinnerColor, backGroundColor } = props;
  const { storeCreator: { campaignData: { loding, getCampaignData, stickeyIndex }, dispatchcampaign, darkModeTheme } }: any = useContext(InputContextProvide)

  return (
    <View
      style={[
        style.main,
        {
          backgroundColor: backGroundColor ? backGroundColor : Colors.white,
        },
        darkBackGround(darkModeTheme)
      ]}>
      <ActivityIndicator color={spinnerColor || Colors.primaryRed} size={'large'} />
    </View>
  );
};
const style = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '70%',
  },
});
