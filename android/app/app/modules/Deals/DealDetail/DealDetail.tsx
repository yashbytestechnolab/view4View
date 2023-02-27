import { View, Text, ScrollView, StyleSheet, Share, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { CommonButton } from '../../../components';
import { ROUTES, String } from '../../../constants';
import { Colour } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { FoodImage, Pages } from '../../../constants/DummyJson.ts/JsonFile';
import { BackButton } from '../../../components/BackButton/BackButton';
import { Shared } from '../../../assets/icons/Shared';
import { Fonts } from '../../../assets';
import { Foot } from '../../../assets/icons/Foot';

export default function DealDetail() {
    const [select, setSelect]: any = useState(true);
  const [modalVisible, setModalVisible]: any = useState(false);
  const filterRef: any = useRef();
  const [value, setValue] = useState(null);
  const [item, setItem] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const navigation: any = useNavigation();


  // .....................share handling..............................,,,,,,,,,,,
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {}
  };
    return (
        <ScrollView style={style.main}>
          <View>
            {/* .............................top image-view.................... */}
            <SwiperFlatList
              showPagination={true}
              paginationDefaultColor={Colour.white}
              paginationStyle={{flex: 1}}
              scrollEnabled={true}
              style={style.imageWrapper}
              paginationActiveColor={Colour?.peachyOrange}
              paginationStyleItemActive={{height: 8, width: 8}}
              paginationStyleItemInactive={{height: 8, width: 8}}
              onEndReachedThreshold={3}>
              {FoodImage.map((item:any) => {
                return (
                  <View style={style.swipeImage}>
                    <Image source={item.image} style={style.imageWrapper} />
                   
                  </View>
                );
              })}
            </SwiperFlatList>
            <View style={style.iconWrapper}>
                      <View>
                        <BackButton
                          color={Colour.black}
                          //wrapperStyle={{paddingBottom: 40}}
                        />
                      </View>
                      <TouchableOpacity
                        style={style.share}
                        onPress={() => {
                          onShare();
                        }}
                        activeOpacity={0.5}>
                        <Shared />
                      </TouchableOpacity>
                    </View>
          </View>
          <View style={style.greenLine} />
          <View style={style.greenText}>
            <Text style={style.off}>{10 +`% off`}</Text>
          </View>
          {/* .............................middle descripation .................... */}
          <View style={style.middleWrapper}>
            <Text style={style.title}>La pinoz pizza</Text>
            <Text style={style.price}>{String.price}</Text>
            <View style={style.priceTextWrapper}>
              <Text style={style.priceText1}>$25.00</Text>
              <Text
                style={ style.priceText2}>
                $20.00
              </Text>
            </View>
            <Text numberOfLines={1} style={style.discountText}>$1.75 Available balance</Text>
           
            {/* ...................green Card details...........................    */}
            {select ? (
              <View style={style.greenCard}>
                <View style={style.footIconWrapper}>
                  <Foot color={Colour.primaryGreen} height={19} width={24} />
                </View>
    
                <View style={{paddingLeft: 8, paddingRight: 70}}>
                  <Text style={style.greenCardTitle}>{String.keepWalking}</Text>
                  <Text numberOfLines={2} style={style.greenCardSubText}>
                    {String.keepWalkingSubText}
                  </Text>
                </View>
              </View>
            ) : null}
    
            {/* //................................multipalText................................. */}
            <Text style={style.multiLine}>{String.productDetails}</Text>
            
            {/* ............................buttons handler...................................... */}
            
            <CommonButton
              buttonText={String.checkout}
              onPress={()=>{navigation.navigate(ROUTES.CartCheckout)}}
              buttonStyle={style.checkoutButton}
              buttonTextStyle={{color: Colour.primaryGreen}}
             
            />
          </View>
          {/* ....................open model................................ */}
          
         
        </ScrollView>
      );
}
const style=StyleSheet.create({
    main: {
        //flex: 1,
        backgroundColor: Colour.white,
        // height: '100%',
        // width: '100%',
    },
    swipeImage: {
        flex: 1,
        width: '100%',
    },
    imageWrapper: {
        width: Dimensions?.get('window')?.width - 0,
        height: 350,
    },

    iconWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        paddingTop:55,
        
        justifyContent:'space-between',
        
        
    },
    share: {
      marginBottom:18,
    marginLeft: Dimensions.get('screen').width - 70,
    },
    greenText: {
        //flexDirection: 'row',
        backgroundColor: Colour.primaryGreen,
        height: 34,
        maxWidth:85,
        textAlign:'center',
        borderRadius: 16,
        borderWidth: 3,
        marginTop:-18,
        marginLeft:16,justifyContent:'center',
        alignItems: 'center',
        borderColor: Colour.white,
    },
    greenLine: { backgroundColor: Colour.primaryGreen, height: 5 },
    off: {
        color: Colour.PrimaryBlue,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: Fonts.QuicksandRegular,
        
    },
    middleWrapper: { flex: 1, backgroundColor: Colour.white, marginHorizontal: 16, },
    title: {
        color: Colour.PrimaryBlue,
        fontSize: 20,
        fontWeight: '700',
        fontFamily: Fonts.QuicksandBold,
        marginTop:11
    },
    price: {
        marginTop:8,
        color: Colour.gray400,
        fontSize: 10,
        fontWeight: '500',
        fontFamily: Fonts.QuicksandMedium,
        lineHeight: 22,
    },
    priceTextWrapper: {
        flexDirection: 'row',
    },
    priceText1: {
        textDecorationLine:'line-through',
        color: Colour.gray400,
        fontSize: 16,

        fontWeight: '700',
        fontFamily: Fonts.QuicksandBold,
        //lineHeight: 11,
    },
    priceText2:{color: Colour.PrimaryBlue, paddingLeft: 8,textDecorationLine:'none',  fontSize: 16,

    fontWeight: '700',
    fontFamily: Fonts.QuicksandBold,},
    grayLine: {
        backgroundColor: Colour.gray400,
        height: 1,
        width: '14%',
        position: 'relative',
        bottom: 10,
    },
    orangeLine: {
        backgroundColor: Colour.peachyOrange,
        height: 1,
        width: 44,
        position: 'relative',
        bottom: 10.5,
    },
    discountText: {
        backgroundColor:Colour.lightOrangeShade,borderRadius:50,
        color: Colour.peachyOrange,
        fontSize: 14,
        fontWeight: '700',
        padding:8,
        flex:1,
        maxWidth:180,
        fontFamily: Fonts.QuicksandBold,
        lineHeight: 14,
        marginTop: 24,
        marginLeft: 26,
        
    },
    RBContainer: {
        backgroundColor: Colour.PrimaryBlue,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        alignSelf: 'center',
        paddingLeft:18,
        paddingRight:16

    },
    greenCard: {
        marginTop:24,
        height: 74,
        borderRadius: 50,
        padding: 12,
        backgroundColor: Colour.primaryGreen,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    footIconWrapper: {
        backgroundColor: Colour.PrimaryBlue,
        borderRadius: 50,
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greenCardTitle: {
        color: Colour.PrimaryBlue,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: Fonts.QuicksandSemiBold,
        lineHeight: 20,
    },
    greenCardSubText: {
        color: Colour.PrimaryBlue,
        fontSize: 12,
        fontWeight: '500',
        fontFamily: Fonts.QuicksandMedium,
        lineHeight: 15,
    },
    multiLine: {
        color: Colour.gray400,
        fontSize: 14,
        fontWeight: '500',
        fontFamily: Fonts.QuicksandMedium,
        lineHeight: 17,
        textAlign: 'left',
        marginTop: 32,
        paddingHorizontal:2,
        textAlignVertical: 'top',
        paddingBottom: 16
    },
    dropdown: {
        backgroundColor: Colour.white,
        height: 44,
        width:194,
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: 14,
        borderColor: Colour.dropdownGray,
    },
    dropdown2: {
        backgroundColor: Colour.white,
        height: 44,
        width:122,
       
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: 14,
        borderColor: Colour.dropdownGray,
    },
    checkoutButton: {
        backgroundColor: Colour.PrimaryBlue,
        
        marginTop:160,
        marginBottom: 29,
    },
    popupWrapper: {
        backgroundColor: Colour.PrimaryBlue,
        height: 180,
        width: 285,
        borderRadius: 18,
        padding: 40,
        //justifyContent: 'center',
        marginTop: 170,
        alignSelf: 'center',
        alignItems: 'center',
    },
    orangeAmountWrapper: {
        backgroundColor: Colour.peachyOrange,
        height: 20,
        width: 20,
        borderRadius: 50,
        position: 'relative',
        bottom: 10,
        right: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetWrapper: {
        backgroundColor: Colour.PrimaryBlue,
        height: 20,
        width: 20,
        borderRadius: 50,
        position: 'relative',
        right: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartWrapper: {
        flexDirection: 'row',
        paddingVertical: 20,
        justifyContent:'space-between',
        alignItems: 'center',
        
    },
    cartText: {
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 13,
        fontFamily: Fonts.NotoSansSemiBold,
        color: Colour.white,
    },
    cartText2: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Fonts.NotoSansMedium,
        color: Colour.peachyOrange,
    },
    modelText: {
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 32,
        fontFamily: Fonts.Quicksand,
        color: Colour.white,
        marginTop: 29,
    },
    checkwrapper: {
        //width: 136,
        height: 36,
    },
    dropdownText:{
        paddingBottom:6,
       fontFamily:Fonts.NotoSansMedium,
       fontSize:12,
       fontWeight:'500',
       colors:Colour.gray500
      

    }
})