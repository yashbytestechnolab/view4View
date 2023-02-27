import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import React from 'react';
import { Colour } from '../../theme';
import { Fonts, Icons, Images } from '../../assets';
import { CommonButton } from '../CommonButton';
import { String } from '../../constants';
import Modal from 'react-native-modal';
import { commonStyles } from '../../constants/CommonStyles';
import { style } from '../CommonButton/Style';
interface props {
  isVisibleModal?: boolean;
  toggleModal?: Function;
  handleUnmtachPress?: Function;
  loder?: boolean;
  title?: String;
  subtitle: String;
  buttonText?: String;
  iconBGColor: String;
  Svg: any;
  buttonPress?: any;
  canclePress?: any;
  wrapperStyle?: Object
  IconColor?: String,
  buttonBgColor?: String,
  buttonTextColor?: String,
  fitbitUnlink?: boolean,
  trackerName?: string
}
export default function LogOutModel(props: props) {
  const {
    isVisibleModal,
    toggleModal,
    loder,
    title,
    subtitle,
    buttonText,
    iconBGColor,
    Svg,
    buttonPress,
    canclePress,
    wrapperStyle,
    IconColor,
    buttonBgColor,
    buttonTextColor,
    fitbitUnlink,
    trackerName
  }: any = props;


  return (
    <Modal
      isVisible={isVisibleModal}
      onBackdropPress={toggleModal}
      coverScreen={true}
      backdropColor={'rgba(52, 64, 84, 0.6)'}>
      <View style={[commonStyles.withoutborderCard, wrapperStyle]}>
        <View
          style={[
            styles.iconBg,
            {
              backgroundColor: iconBGColor
                ? iconBGColor
                : Colour.peachyOrangeShade,
            },
          ]}>
          <Svg height={18} width={18} color={IconColor} />
        </View>
        {
          fitbitUnlink == true &&
          <View style={styles.fitbitMain}>
            <Image source={Images.smartBelt} style={styles.fitbitImage} />
            <Text style={styles?.fitbitText}>{trackerName.charAt(0).toUpperCase() + trackerName.slice(1)}</Text>
          </View>
        }
        <View>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalSubText}>{subtitle}</Text>
        </View>
        <CommonButton
          buttonText={buttonText}
          onPress={buttonPress}
          isLoading={loder}
          buttonStyle={[styles.logoutButton, {
            backgroundColor: buttonBgColor ? buttonBgColor : Colour.darkorange,
          }]}
          buttonTextStyle={[styles.logoutText, { color: buttonTextColor ? buttonTextColor : Colour.white, }]}
        />
        {canclePress && <CommonButton
          buttonText={String.cancel}
          onPress={canclePress}
          buttonTextStyle={styles.cancleText}
          buttonStyle={styles.cancle}
        />}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    color: Colour.gray900,
    fontSize: 18,
    marginTop: 5,
    lineHeight: 28
  },
  modalSubText: {
    fontFamily: Fonts.NotoSansLight,
    fontWeight: '300',
    color: Colour.gray500,
    fontSize: 14,
    marginTop: 8,
  },
  loder: {
    alignItems: 'center',
  },
  cancle: {
    backgroundColor: Colour.white,
    borderRadius: 50,
    borderWidth: 1,
    marginTop: 12,
    marginBottom: 5,
    borderColor: Colour.gray300,
  },
  cancleText: {
    fontSize: 16,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    color: Colour.gray700,
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: Colour.darkorange,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',

  },
  iconBg: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fitbitMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10
  },
  fitbitImage: {
    height: 50,
    width: 50,

  },
  fitbitText: {
    fontSize: 14,
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    color: Colour.PrimaryBlue,
    paddingLeft: 16
  }
})
