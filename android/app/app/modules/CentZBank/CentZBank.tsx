import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Pressable } from 'react-native';
import { Colour } from '../../theme';
import { BackButton } from '../../components/BackButton/BackButton';
import { BalanceCard } from '../../components/BalanceCard';
import { Images } from '../../assets';
import { String } from '../../constants';
import moment from 'moment';
import { OrderInfoModel } from '../../components/OrderInfoModel';
import { style } from './style';
import { commonStyles } from '../../constants/CommonStyles';
// import {
//   Coffee ,
//   DownArrow,
//   Foot,
//   MarketPlace2,
//   Smiley,
// } from '../../assets/icons';
import AccountTab from '../../components/AccountTab/AccountTab';
import { centzBankDropDownData } from '../../constants/DummyJson.ts/JsonFile';
import { useQuery } from '@apollo/client';
import { CENTZ_SUMMARY } from '../../graphQL/Queries';
import { Loder } from '../../components/Loder';
import { DownArrow } from '../../assets/icons/DownArrow';
import { MarketPlace2 } from '../../assets/icons/MarketPlace2';
import { Coffee } from '../../assets/icons/Coffee';
import { Foot } from '../../assets/icons/Foot';
import { Smiley } from '../../assets/icons/Smiley';
import { SafeAreaView } from 'react-navigation';
import { useIsFocused } from '@react-navigation/native';
import { CommonContext } from '../../context/AppContext';

const CentZBank = () => {
  const [dropdownTitle, setDropDownTitle]: any = useState(String.allTrancation);
  const [isVisibleModal, setModalVisible]: any = useState(false);
  const [selectFilterCentz, setSelectFilterCentz]: any = useState([]);
  const [dropDown, setDropDown]: any = useState(false);
  const focus = useIsFocused()
  const { loading, setLoading } = useContext(CommonContext);


  const {
    data: getCentzData,
    error: error,
    loading: isLoading,
  } = useQuery(CENTZ_SUMMARY);
  const centzData: any = getCentzData?.centzBankSummary?.data;

  useEffect(() => {
    if (!isLoading) {
      console.log("here?");
      console.log("centzData==>", error);
      setSelectFilterCentz(centzData?.currentMonthSummary);
      setDropDown(false);
    }
  }, [centzData, focus]);
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  //....................getDates & dateFormate ...............

  const HandleSleep = (totalSleep: any, totalEarnings: any) => {
    const setAmount: any = totalEarnings?.toString()?.substring(0, 4)
    let value: any = parseFloat(setAmount).toFixed(2);

    return (
      <>
        <View style={style.sleepIcon}>
          <View style={style.firstRowWrapper}>
            <View style={style.sleepIconWrapper}>
              <Smiley color={Colour.blueBarry} height={13} width={13} />
            </View>

            <View style={style.sleepTextWrapper}>
              <Text numberOfLines={1} style={[style.sleepText]}>
                {String.sleep}
              </Text>
              <Text numberOfLines={1} style={[style.sleepSubText]}>
                {totalSleep + ' ' + 'hours'}
              </Text>
            </View>
          </View>

          <Text numberOfLines={1} style={style.amountText}>
            {'$' + value}
          </Text>
        </View>
        <View style={[style.grayLine]} />
      </>
    );
  };
  //............handle movement tab.............
  const HandleMovement = (totalStep: any, totalEarnings: any) => {
    const setAmount: any = totalEarnings?.toString()?.substring(0, 4);
    let value: any = parseFloat(setAmount).toFixed(2);
    return (
      <>
        <View style={style.sleepIcon}>
          <View style={style.firstRowWrapper}>
            <View style={style.movementIconWrapper}>
              <Foot color={Colour.PrimaryBlue} />
            </View>

            <View style={style.sleepTextWrapper}>
              <Text numberOfLines={1} style={[style.sleepText]}>
                {String.movement}
              </Text>
              <Text numberOfLines={1} style={[style.sleepSubText]}>
                {totalStep + ' ' + 'steps'}
              </Text>
            </View>
          </View>

          <Text numberOfLines={1} style={style.amountText}>
            {'$' + value}
          </Text>
        </View>
        <View style={[style.grayLine]} />
      </>
    );
  };
  //............handle business tab.............
  const handleBusiness = () => {
    return (
      <>
        <View style={style.sleepIcon}>
          <View style={style.firstRowWrapper}>
            <View style={style.businessIconWrapper}>
              <Coffee />
            </View>

            <View style={style.sleepTextWrapper}>
              <Text numberOfLines={1} style={[style.sleepText]}>
                Business Name
              </Text>
              <Text numberOfLines={1} style={[style.sleepSubText]}>
                San Fancisco, CA
              </Text>
            </View>
          </View>

          <Text numberOfLines={1} style={style.amountText}>
            $2.00
          </Text>
        </View>
        <View style={[style.grayLine]} />
      </>
    );
  };
  //....................handle market tab.............
  const handleMarketplace = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalVisible(true);
          }}
          style={style.sleepIcon}>
          <View style={style.firstRowWrapper}>
            <View style={style.marketWrapper}>
              <MarketPlace2 />
            </View>
            <View style={style.sleepTextWrapper}>
              <Text numberOfLines={1} style={[style.sleepText]}>
                B705 Sports Water Bottle
              </Text>
              <Text numberOfLines={1} style={[style.sleepSubText]}>
                Marketplace
              </Text>
            </View>
          </View>

          <Text numberOfLines={1} style={style.amountText}>
            $2.00
          </Text>
        </TouchableOpacity>
        <View style={[style.grayLine]} />
      </>
    );
  };
  const handleToggle = (data: any) => {
    setModalVisible(!isVisibleModal);
  };

  const handleFilter = (data: any) => {
    setDropDown(false);
    setDropDownTitle(data?.title);
    let selectedVlaue: any = [];
    centzData?.currentMonthSummary &&
      centzData?.currentMonthSummary.map((item: any) => {
        switch (data?.title) {
          case 'Sleep':
            return (
              item?.totalSleepHours !== null &&
              selectedVlaue.push({
                date: item?.date,
                totalSleepHours: item?.totalSleepHours,
                totalSleepHoursEarnings: item?.totalSleepHoursEarnings,
                totalSteps: null,
              })
            );
          case 'Movement':
            return (
              item?.totalSteps !== null &&
              selectedVlaue.push({
                date: item?.date,
                totalSteps: item?.totalSteps,
                totalStepsEarnings: item?.totalStepsEarnings,
                totalSleepHours: null,
              })
            );
          case 'purches':
            return selectedVlaue.push({
              date: item?.date,
              totalSteps: item?.totalSteps,
              totalStepsEarnings: item?.totalStepsEarnings,
              totalSleepHours: null,
            });
          case 'All Transaction':
            return selectedVlaue.push(item);

          default:
            return selectedVlaue.push(item);
        }
      });

    setSelectFilterCentz(selectedVlaue);
  };
  const handleDropDown = () => {
    return (
      <View style={style.card}>
        {centzBankDropDownData &&
          centzBankDropDownData?.map((item: any) => {
            return (
              <TouchableOpacity activeOpacity={1}>
                <AccountTab
                  Svg={item?.icon}
                  iconColor={Colour.blueBarry}
                  title={item.title}
                  textStyle={style.textWrapper}
                  onPress={() => {
                    handleFilter(item);
                  }}
                />
                <View style={commonStyles.grayBorder} />
              </TouchableOpacity>
            );
          })}
      </View>
    );
  };

  const handleDate = (date: any) => {
    const today = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    let date2 = moment(date).format('DD MMMM');

    if (date === today) {
      date2 = 'Today';
    } else if (date === yesterday) {
      date2 = 'Yesterday';
    }
    return date2;
  };
  const handleDailyAmount = (sleepEarn: any, movementEarn: any) => {
    let getsleepEarn: any = sleepEarn == undefined ? 0 : sleepEarn
    let getmovementEarn: any = movementEarn == undefined ? 0 : movementEarn
    // let total = (getsleepEarn + getmovementEarn).toString()?.substring(0, 4);
    let total = (getsleepEarn + getmovementEarn).toString();
    let positiveTotal = Math.abs(total)
    return positiveTotal.toFixed(2);
  };
  return (
    <>
      <StatusBar
        backgroundColor={Colour?.PrimaryBlue}
        barStyle={String.lightContent}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colour?.PrimaryBlue }}>

        <Pressable onPress={() => setDropDown(false)} style={[commonStyles.whiteBG]}>

          {/* {/ ...........blue top view ............... /} */}
          <View style={[style.blueWrapper]}>
            <View style={{ }}>

              <Text style={[style.title]}>{String.centzBanks} </Text>

              <View style={style.balanceCardWrapper}>
                <BalanceCard
                  amount={centzData?.availableBalance?.totalEarnings}
                  saving={centzData?.totalSavingsPerMonth} />
              </View>
            </View>
          </View>
          {/* {/ ......................sortDropDown.................. /} */}
          {
            !isLoading && !error ?
              <><View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={style.allTractionWrapper}
                  onPress={() => {
                    setDropDown(!dropDown);
                  }}>
                  <Text style={style.allText}>{dropdownTitle}</Text>
                  <DownArrow />
                </TouchableOpacity>
              </View>
              <ScrollView>
                  {selectFilterCentz &&
                    selectFilterCentz?.map((item: any) => {
                      let dailyTotal = (item?.totalSleepHoursEarnings) + (item?.totalStepsEarnings);

                      return (
                        <TouchableOpacity activeOpacity={1}>
                          <View style={style.dateWarpper}>
                            <Text style={style.dateText}>
                              {handleDate(item?.date)}
                            </Text>
                            <View style={style.amountWrapper}>
                              <Text style={style.dailyTotal}>
                                {String.dailyTotal}
                              </Text>
                              <Text
                                style={[
                                  style.amountText,
                                  dailyTotal < 0
                                    ? { color: Colour.peachyOrange }
                                    : { color: Colour.PrimaryBlue },
                                ]}>{dailyTotal < 0 ? '-' : '+'}{' '}
                                {'$' + handleDailyAmount(item?.totalSleepHoursEarnings, 0)}

                              </Text>
                            </View>
                          </View>

                          {item?.totalSleepHours !== null &&
                            HandleSleep(
                              item?.totalSleepHours,
                              item?.totalSleepHoursEarnings
                            )}

                          {item?.totalSteps !== null &&
                            HandleMovement(
                              item?.totalSteps,
                              item?.totalStepsEarnings
                            )}
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
                </> 
                :
              <View style={style.noDataMain}>
                <Text style={style.noRecordFound}>No Transactions Found</Text>
              </View>
          }
          {dropDown == true && handleDropDown()}
        </Pressable>


        {isVisibleModal && (
          <OrderInfoModel
            isVisibleModal={isVisibleModal}
            toggleModal={handleToggle}
            rrpText={'$25.00'}
            discountText={'-$1.25 (5%)'}
            pricePaidText={'$23.75'}
            itemName={'head phone'}
            itemImages={Images.headPhone}
            orderNum={'1234569'}
            orderDate={'4/07/22'}
            trackuingNum={'7412589'}
            handleUnmtachPress={() => { }}
            loder={false}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default CentZBank;