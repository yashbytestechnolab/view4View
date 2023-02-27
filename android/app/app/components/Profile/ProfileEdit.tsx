import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Colour} from '../../theme';
import {Fonts} from '../../assets';
import {Edit} from '../../assets/icons/Edit';

interface CommonProfile {
  image: any;
  wraperStyle?: Object;
  imageStyle?: Object;
}
const ProfileEdit = (props: CommonProfile) => {
  const {image, wraperStyle, imageStyle} = props;
  return (
    <View style={styles.profileImageWrapper}>
      <TouchableOpacity activeOpacity={1}>
        <ImageBackground
          source={image}
          style={styles.profileImage}
          borderRadius={40}>
          <Edit />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileEdit;
const styles = StyleSheet.create({
  profileImageWrapper: {
    backgroundColor: Colour.peachyOrange,
    width: 121,
    height: 89,
    borderTopRightRadius: 50,
    borderBottomEndRadius: 50,
  },
  profileImage: {
    height: 80,
    width: 80,
    margin: 5,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
