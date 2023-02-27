import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import {Colour} from '../../theme';
import {Fonts, Icons} from '../../assets';
import {CommonButton} from '../CommonButton';
import {String} from '../../constants';
import Modal from 'react-native-modal';
import {Location} from '../../assets/icons/Location';
import {Location2} from '../../assets/icons/Location2';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {commonStyles} from '../../constants/CommonStyles';
import BorderTextInput from '../BorderTextInput/BorderTextInput';
import {Search} from '../../assets/icons/Search';

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
}
export default function SuggestBusinessModel(props: props) {
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
  }: any = props;
  return (
    <Modal
      isVisible={isVisibleModal}
      onBackdropPress={toggleModal}
      coverScreen={true}
      backdropColor={'rgba(52, 64, 84, 0.6)'}>
      <View style={[styles.main]}>
        <View
          style={{
            height: 48,
            width: 48,
            borderRadius: 24,
            backgroundColor: Colour.PrimaryBlue,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Location2 />
        </View>
        <View >
          <Text style={styles.modalTitle}>Suggest a business</Text>
          <Text style={styles.modalSubText}>
            Think you know a business that will benefit from being on
            Centavizer? Let us know who.
          </Text>
        </View>
        <KeyboardAwareScrollView
          testID={'keyboard'}
          // style={{backgroundColor: Colour.primary}}
          resetScrollToCoords={{x: 0, y: 0}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          style={styles.flex}>
         <BorderTextInput
            Svg={Search}
              title={'Business name'}
              placeholder={'Search by name, address, zip code'}
              onChangeText={{}}
              value={''}
              onSubmitEditing={() => {}}
            />
            <Text style={{alignSelf:'center',paddingVertical:16}}>Or</Text>
          <BorderTextInput
            title={'Business name'}
            placeholder={'e.g. Bob’s Coffee Shop'}
            onChangeText={{}}
            value={''}
            onSubmitEditing={() => {}}
          />
           <BorderTextInput
            title={'Zipcode*'}
            placeholder={'Zipcode'}
            onChangeText={{}}
            value={''}
            onSubmitEditing={() => {}}
          />
           <BorderTextInput
            title={'Email Address'}
            placeholder={'e.g. owner@business.com'}
            onChangeText={{}}
            value={''}
            onSubmitEditing={() => {}}
          />
            <BorderTextInput
            title={'Phone Number'}
            placeholder={'000 000 0000'}
            onChangeText={{}}
            value={''}
            onSubmitEditing={() => {}}
          />
          <CommonButton buttonText={'Send suggestion'} onPress={undefined}/>
          <CommonButton buttonText={'Cancle'} onPress={undefined} buttonStyle={styles.cancleButton}/>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: Colour.white,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 5,
  },
  flex: {
    flex: 1,
    height: '100%',
    width: '100%',
    //backgroundColor: Colour?.PrimaryBlue
  },cancleButton:{
    borderWidth:1,
    borderColor:Colour.gray200,
    backgroundColor:Colour.white,
    marginTop:12
  },

  modalTitle: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    color: Colour.gray900,
    fontSize: 18,
    marginTop: 5,
  },
  modalSubText: {
    fontFamily: Fonts.NotoSansLight,
    fontWeight: '300',
    color: Colour.gray500,
    fontSize: 13,
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
    color: Colour.white,
  },
  iconBg: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
