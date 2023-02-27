import { StyleSheet } from 'react-native';
import { Fonts } from '../assets';
import { Colour } from '../theme';

export const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: Fonts.DMSansRegular,
    fontSize: 8,
    fontWeight: '500',
    color: Colour.PrimaryBlue,
    lineHeight: 10,
    textAlign: 'right',
  },
  tabText: {
    fontFamily: Fonts.DMSansRegular,
    fontSize: 8,
    fontWeight: '400',
    color: Colour.PrimaryBlue,
    lineHeight: 10,
    textAlign: 'right',
  }
});
