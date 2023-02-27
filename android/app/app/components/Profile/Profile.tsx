import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import React from 'react';
import {Colour} from '../../theme';
import {Fonts} from '../../assets';

interface CommonProfile {
  image: any;
  smallHeaderText?: String;
  TitleHeaderText?: String;
  smallTextStyle?: Object;
  titleTextStyle?: Object;
  wraperStyle?: Object;
  imageStyle?: Object;
}
const Profile = (props: CommonProfile) => {
  const {
    image,
    smallHeaderText,
    TitleHeaderText,
    smallTextStyle,
    titleTextStyle,
    wraperStyle,
    imageStyle,
  } = props;
  return (
    <View style={styles.header}>
      <View style={[styles.profileImageWrapper, wraperStyle]}>
        <Image style={[styles.profileImage, imageStyle]} source={image} />
      </View>
      <View style={styles.headerTextWrapper}>
        <Text
          numberOfLines={1}
          style={[styles.smallHeaderText, smallTextStyle]}>
          {smallHeaderText}
        </Text>
        <Text numberOfLines={1} style={[styles.HeaderText, titleTextStyle]}>
          {TitleHeaderText}
        </Text>
      </View>
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 20 : 33,
    alignItems: 'center',
  },
  profileImageWrapper: {
    backgroundColor: Colour.peachyOrange,
    width: 65,
    height: 48,
    //alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 25,
    borderBottomEndRadius: 25,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  headerTextWrapper: {
    flexDirection: 'column',
    marginLeft: 12,
    flex: 1,
  },
  smallHeaderText: {
    color: Colour.white,
    fontSize: 12,
    opacity: 0.7,
    fontWeight: '400',
    fontFamily: Fonts?.DMSansRegular,
  },
  HeaderText: {
    color: Colour.white,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Fonts?.QuicksandBold,
  },
});
