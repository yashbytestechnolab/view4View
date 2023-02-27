import { View, Text, StatusBar, Image, TouchableOpacity, Platform, SafeAreaView, Alert } from 'react-native';
import React, { FC, useRef, useState } from 'react';
import { Images } from '../../../assets';
import { ROUTES, String } from '../../../constants';
import { styles } from './styles';
import { Colour } from '../../../theme';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ButtonWithIcon } from '../../../components/ButtonWithIcon/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';
import * as LocalStorage from '../../../services/LocalStorage';
import {LocalStorageKeys} from '../../../constants/LocalStorageKeys';
import { AppleHelth } from '../../../assets/icons/AppleHealth';
import { GoogleFit } from '../../../assets/icons/GoogleFit';
import { FitBit } from '../../../assets/icons/FitBit';
import { Samsung,  } from '../../../assets/icons/SamsungHelth';
import { CentaLogo } from '../../../assets/icons/CentaLogo';

const SwipePage1: FC = () => {
  const ref: any = useRef();
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const navigation: any = useNavigation();
  const Pages = [
    {
      id: 1,
      image: Images.page1,
      image2: Images.logoCentavizer,
      subTitle: String.page1,
    },
    {
      id: 2,
      image: Images.page2,
      title: String.pageTitle2,
      subTitle: String.page2,
    },
    {
      id: 3,
      image: Images.page3,
      title: String.pageTitle3,
      subTitle: String.page3,
    },
  ];
  
  const buttonHandler = () => {
    let index: any = ref.current?.getCurrentIndex();
    if (index === Pages.length - 1) {
      LocalStorage.setValue(LocalStorageKeys.isFirstTimeUser, 'no');
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.SignUp }]
      })
    } else {
      ref?.current?.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    }
  };
  const slideOne = () => {
    return (
      <View style={styles.slideContainer}>
        <Image source={Images.page1} style={styles.images} />
        <View style={styles.sliderOndContainer}>
          <View style={styles.logo}>
            <CentaLogo/>
          </View>
          {/* <Image source={Images.logoCentavizer} style={styles.logo} /> */}
          <Text numberOfLines={3} style={styles.sliderOneText}>
            {String.page1}
          </Text>
        </View>
      </View>
    )
  }
  const slideTwo = () => {
    return (
      <View style={styles.slideContainer}>
        <Image source={Images.page2} style={styles.images} />
        <View style={styles.sliderTwoContainer}>
          <Text style={styles.sliderTwoTitleText}>{String.pageTitle2}</Text>
          <Text numberOfLines={3} style={styles.sliderTwoDetail}>
            {String.page2}
          </Text>
        </View>
        <View style={styles.heartIconsWrapper}>
          <View>
          <AppleHelth width={50} height={50} />
          </View>
          <View style={{paddingLeft:16}}>
          <GoogleFit width={50} height={50} />
          </View>
          <View style={{paddingLeft:16}}>
          <FitBit width={50} height={50} />
          </View >
          <View style={{paddingLeft:16}}>
          <Samsung width={50} height={50} />
          </View>
        </View>
      </View>
    )
  }

  const slideThree = () => {
    return (
      <View style={styles.slideContainer}>
        <Image source={Images.page3} style={styles.images} />
        <View style={styles.sliderThreeContainer}>
          <Text style={styles.sliderThreeTitle}>
            {String.pageTitle3}
          </Text>
          <Text style={styles.sliderThreeDetail}>
            {String.page3}
          </Text>
        </View>
      </View>
    )
  }
  const skipHandler = () => {
    LocalStorage.setValue(LocalStorageKeys.isFirstTimeUser, 'no');
    LocalStorage.setValue(LocalStorageKeys.syncWatchSkip, 'yes');
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.SignUp }]
      })
      // navigation.navigate(ROUTES.SignUp);
    }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:Colour?.PrimaryBlue}}>
    <View style={styles.sliderCommonContainer}>
      <StatusBar
         barStyle="light-content"
        backgroundColor={Colour?.PrimaryBlue}
      />
      <View>
        <SwiperFlatList style={styles.swiperFlatListStyle} ref={ref} onChangeIndex={() => {
          setCurrentSliderIndex(ref.current?.getCurrentIndex())
        }} index={0} showPagination paginationActiveColor={Colour.blueBarry} paginationStyleItem={styles.swiperFlatListPagination} paginationDefaultColor={Colour.gray50}>
          {slideOne()}
          {slideTwo()}
          {slideThree()}
        </SwiperFlatList>

      </View>
      <View style={Platform.OS === 'ios' ? styles.bottomWrapperIOS : styles.bottomWrapper}>
      <ButtonWithIcon
          buttonText={ref.current?.getCurrentIndex() == 2 ? String.signUp : String.Next}
          onPress={() => {
            buttonHandler();
          }}
          wraperStyle={styles.buttonWrapper}
        />


        <View style={styles.wrapper}>
          <Text style={styles.subText}>{String.alreadyMember}</Text>
          <TouchableOpacity
            onPress={() => {
              LocalStorage.setValue(LocalStorageKeys.isFirstTimeUser, 'no');
              LocalStorage.setValue(LocalStorageKeys.syncWatchSkip, 'yes');
              navigation.reset({
                index: 0,
                routes: [{ name: ROUTES.Login}]
              })
            }}>
            <Text style={styles.subTextLogin}> {String?.login}</Text>
          </TouchableOpacity>
        </View>
  
    
         <Text
          onPress={() => ref.current?.getCurrentIndex() != 2 ? skipHandler() : null}
          style={[styles.skip, ref.current?.getCurrentIndex() == 2 && {height:29}]}>
            {ref.current?.getCurrentIndex() != 2 && String.skip}
        </Text> 
     
        
        
      
        
      </View>
    </View>
    </SafeAreaView>
  );
};
export default SwipePage1;