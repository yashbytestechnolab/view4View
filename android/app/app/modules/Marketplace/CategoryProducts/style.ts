import { Dimensions, StyleSheet } from 'react-native';
import { Fonts } from '../../../assets';
import { Colour } from '../../../theme';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const width = Dimensions.get('screen').width;

export const style = StyleSheet.create({
  blueWrapper: {
    height: 110,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: Colour.PrimaryBlue,
  },
  searchWrapper: {
    marginTop: 10,
    backgroundColor: Colour.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    height: 50,
    width: '95%',
    alignSelf: 'center',
  },
  searchBorder: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colour.PrimaryBlue,
    height: 40,
    width: '97%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  searchText: {
    fontSize: 16,
    color: Colour.gray900,
    fontFamily: Fonts.NotoSansLight,
    lineHeight: 24,
    fontWeight: '300',
    marginLeft: 12,
    flex: 1,
    padding:0
  },
  backIcon: {
    marginTop: 10,
  },
  products: {
    flex: 1,
    backgroundColor: Colour.white,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    ...ifIphoneX(
      {
        marginBottom: 10,
      },
      {
        marginBottom: 25,
      },
    ),
  },
  imageWrapper: {
    height: 170,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  greenBG: {
    position: 'absolute',
    backgroundColor: Colour.primaryGreen,
    borderRadius: 50,
    width: 34,
    height: 34,
    alignItems: 'center',
    right: 20,
    borderWidth: 3,
    borderColor: Colour.white,
    top: 15,
    //marginTop: 20,
    justifyContent: 'center',
  },
  textWrapper: {
    flexDirection: 'column',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 3,
    shadowColor: Colour.gray500,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    backgroundColor: Colour.white,
    paddingVertical: 11,
  },
  subTextWrapper: {
    flexDirection: 'row',
    //justifyContent: 'space-around',
    backgroundColor: Colour.white,
    height: 20,
    width: "95%",
    paddingHorizontal: 8,

  },
  productName: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    fontFamily: Fonts.QuicksandSemiBold,
    color: Colour.PrimaryBlue,
    textAlign: 'left',
    flex: 0.8,
  },
  price: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    fontFamily: Fonts.QuicksandSemiBold,
    color: Colour.PrimaryBlue,
    textAlign: 'right',
    flex: 0.4,
  },
  category: {
    marginLeft: 9,
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
    color: Colour.gray400,
    fontFamily: Fonts.QuicksandSemiBold,
  },
  percentText: {
    fontFamily: Fonts.Quicksand,
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 20,
    color: Colour.PrimaryBlue,
  },
});
