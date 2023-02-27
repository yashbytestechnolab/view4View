import { View, Text, ScrollView, StatusBar, Image, SafeAreaView } from 'react-native';
import React, { FC } from 'react';
import { Colour } from '../../../theme';
import { commonStyles } from '../../../constants/CommonStyles';
import Logo from '../../../assets/icons/logo';

import { Images } from '../../../assets';
import { String } from '../../../constants';
import { OrangeFoot } from '../../../assets/icons/OrangeFoot';
import { BlueSmaily } from '../../../assets/icons/BlueSmaily';
import { GreenLocation } from '../../../assets/icons/GreenLocation';
import { OrangeBag } from '../../../assets/icons/OrangeBag';
import { BackButton } from '../../../components/BackButton/BackButton';
import { style } from './styles';

const InfoGraphic: FC = () => {
  const LeftRow = ({ Svg, title, subTitle }: any) => {
    return (
      <View style={style.leftWrapper}>
        <Svg />
        <View style={style.leftText}>
          <Text numberOfLines={2} style={style.infographicsTitle2}>
            {title}
          </Text>
          <Text numberOfLines={2} style={style.infographicsTitle3}>
            {subTitle}
          </Text>
        </View>
      </View>
    );
  };
  const RightRow = ({ Svg, title, subTitle, show }: any) => {
    return (
      <View style={style.rightWrapper}>
        <View style={style.leftText}>
          <Text style={style.infographicsTitle2}>{title}</Text>
          {show && (
            <Text numberOfLines={2} style={style.infographicsTitle2}>
              {String.MarketPlace}
            </Text>
          )}

          <Text numberOfLines={2} style={style.infographicsTitle3}>
            {subTitle}
          </Text>
        </View>
        <Svg />
      </View>
    );
  };
  return (
    <>
      <StatusBar barStyle={String.lightContent} backgroundColor={Colour.white} />
      <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colour.PrimaryBlue }} >
        <BackButton
          wrapperStyle={{
            marginTop: 23,
            marginBottom: 5
          }}
          iconStyle={{}}
          color={''}
          title={''}
          textStyle={{}}
        />
        <ScrollView
          style={commonStyles.blueBackGround}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>


          <View style={style.logoWrapper}>
            <Logo height={38} width={76} />
            <Text style={style.logoText}>{String.infoTitle}</Text>
          </View>

          <Image style={style.alignLeft} source={Images.rightBlueHalf} />
          <Image source={Images.rightOrangeHalf} style={style.colorLine} />
          <View style={style.greenLine}>
            <Text style={style.titleText}>{String.infographicsTitle}</Text>
            <Image source={Images.rightGreenHalf} />
          </View>

          <Image source={Images.rightMinHalfBlue} style={style.alignLeft} />

          <LeftRow
            Svg={OrangeFoot}
            title={String.infographicsTitle2}
            subTitle={String.infographicsSubTitle1}
          />
          <RightRow
            Svg={BlueSmaily}
            title={String.infographicsTitle3}
            subTitle={String.infographicsSubTitle1}
          />
          <Image source={Images.leftOrangeHalf} style={style.margin} />
          <Image source={Images.leftBlueHalf} style={style.blueLine} />
          <Text style={style.titleText}>{String.infoTitle1}</Text>
          <LeftRow
            Svg={GreenLocation}
            title={String.infographicsTitle4}
            subTitle={String.infographicsSubTitle1}
          />
          <RightRow
            Svg={OrangeBag}
            title={String.infographicsTitle5}
            subTitle={String.infographicsSubTitle1}
          //show={true}
          />
          <Image source={Images.bottomBlueround} style={style.blueBottom} />
          <Image source={Images.bottomOrangeround} style={style.orangeBottom} />
          <Image source={Images.bottomGreen} style={style.greenBottom} />
          <Image source={Images.bottomBlueRoundThik} style={style.greenBottom} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default InfoGraphic;
