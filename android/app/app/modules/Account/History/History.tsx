import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  ScrollView,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { BackButton } from '../../../components/BackButton/BackButton';
import { Colour } from '../../../theme';
import { String } from '../../../constants';
import { Fonts, Images } from '../../../assets';
import { commonStyles } from '../../../constants/CommonStyles';

import AccountTab from '../../../components/AccountTab/AccountTab';
import { Foot } from '../../../assets/icons/Foot';
import { Caloriesurnt } from '../../../assets/icons/Caloriesurnt';
import Mileswalked from '../../../assets/icons/Mileswalked';
import { CentzMade } from '../../../assets/icons/CentzMade';
import HistoryTitle from '../../../components/HistoryTitle/HistoryTitle';
import { Smiley } from '../../../assets/icons/Smiley';
import Info from '../../../assets/icons/Info';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import { panHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';
// import {BarChart, XAxis, YAxis} from 'react-native-svg-charts';
import { data, data2, data6 } from '../../../constants/DummyJson.ts/JsonFile';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Back } from '../../../assets/icons/back';
import Next from '../../../assets/icons/Next';
import { USER_STATE_HISTORY } from '../../../graphQL/Queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Loder } from '../../../components/Loder';
import * as LocalStorage from '../../../services/LocalStorage';
import { LocalStorageKeys } from '../../../constants/LocalStorageKeys';
import { BarChart } from "react-native-gifted-charts";
import { ToolTip } from '../../../assets/icons/ToolTip';

const History = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const [date, setDate]: any = useState();
  // const startDate='2022-06-01';
  //const currentDate=new Date().toLocaleDateString()
  const dates = `startDate ` + `currentDate`
  const contentInset = { top: 20, bottom: 20 };
  const layout = useWindowDimensions();
  const [showTip, setTip] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [currentX, setCurrentX]: any = React.useState();
  const [currentY, setCurrentY]: any = React.useState();
  const [selectedData, setSelectedData]: any = React.useState();
  const [userInfo, setUserInfo]: any = useState();
  const [datesWithActivity, setDatesWithActivity]: any = useState([]);
  //Daily
  const [startDailyDate, setStartDailyDate]: any = useState();
  const [endDailyDate, setEndDailyDate]: any = useState();

  //Weekly
  const [startWeeklyDate, setStartWeeklyDate]: any = useState();
  const [endtWeeklyDate, setEndtWeeklyDate]: any = useState();

  //Monthly
  const [startMonthlyDate, setStartMonthlyDate]: any = useState();
  const [endtMonthlyDate, setEndtMonthlyDate]: any = useState();
  const [startCalenderDate, setStartCalenderDate]: any = useState();

  // const barData = [
  //   {value: 10000, frontColor: '#006DFF', gradientColor: '#009FFF', label:'Jan'},

  //   {value: 2000, frontColor: '#006DFF', gradientColor: '#009FFF', label:'Feb'},

  //   {value: 4500, frontColor: '#006DFF', gradientColor: '#009FFF', label:'Mar'},

  //   {value: 5200, frontColor: '#006DFF', gradientColor: '#009FFF', label:'Apr'},

  //   {value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', label:'May'},
  //   {value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', label:'May'},
  // ];
  let barData: any = [];
  // const barData = [
  //   { value: 2582, label: 'M' },
  //   { value: 3072, label: 'T', },
  //   { value: 950, label: 'W', },
  //   { value: 5139, label: 'T' },
  //   { value: 523, label: 'F' },
  //   { value: 0, label: 'S' },
  //   { value: 1000, label: 'S',  frontColor: Colour.primaryGreen},
  // ];

  const graphMaxVal = Math.max.apply(Math, barData.map(function (o: any) { return o.value; }))
  let divisableVal = graphMaxVal / 4;
  let graphY: any = [];
  for (let i: any = 0; i <= Number(graphMaxVal); i = i + Number(divisableVal)) {
    switch (true) {
      case (i >= 100000):
        let valL = i % 100000;
        if (valL == 0) {
          graphY.push(Math.floor(i / 100000) + "L")
        } else {
          graphY.push((i / 100000).toFixed(1) + "L")
        }
        break;
      case (i >= 1000):
        let val = i % 1000;
        if (val == 0) {
          graphY.push((i / 1000).toFixed(0) + "k")
        } else {
          graphY.push((i / 1000).toFixed(1) + "k")
        }
        break;
      default:
        graphY.push(Math.floor(i));
        break;
    }
  }
  console.log("graphY=>", divisableVal);


  console.log("graphMaxVal==>", graphMaxVal);
  const startOfMonth = moment(startMonthlyDate).startOf('month').format('YYYY-MM-DD');
  const endOfMonth = moment(endtMonthlyDate).endOf('month').format('YYYY-MM-DD');
  const currentDate = moment(new Date()).format("YYYY-MM-DD");

  //Daily
  const [fetchUserDailyHistory, { loading: ifFatchingDailyHistory, data: userDailyHistory }] = useLazyQuery(
    USER_STATE_HISTORY,
    {
      variables: {
        "startDate": startDailyDate, //  "2022-10-9T18:30:00.000Z",
        "endDate": endDailyDate,// "2022-10-15T18:30:00.000Z"
      },
    }
  );

  //Weekly
  const [fetchUserWeeklyHistory, { loading: ifFetchingWeeklyHistory, data: userWeeklyHistory }] = useLazyQuery(
    USER_STATE_HISTORY,
    {
      variables: {
        "startDate": startWeeklyDate, //  "2022-10-9T18:30:00.000Z",
        "endDate": endtWeeklyDate,// "2022-10-15T18:30:00.000Z"
      },
    }
  );

  //Monthly
  const [fetchUserMonthlyHistory, { loading: ifFetchingMonthlyHistory, data: userMonthlyHistory }] = useLazyQuery(
    USER_STATE_HISTORY,
    {
      variables: {
        "startDate": startMonthlyDate, //  "2022-10-9T18:30:00.000Z",
        "endDate": endtMonthlyDate,// "2022-10-15T18:30:00.000Z"
      },
    }
  );

  // const {loading: isUserStateHistoryLoading, data: userStateHistory, error} = useQuery(USER_STATE_HISTORY,
  //   {
  //     variables: {
  //       "startDate": "2022-10-11T18:30:00.000Z",
  //       "endDate": "2022-10-14T18:30:00.000Z"
  //     },
  //   },
  //   );


  useEffect(() => {
    LocalStorage.getValue(LocalStorageKeys.userInfo).then((userInfo) => {
      setUserInfo(userInfo);
      // console.log("userInfo===>", userInfo);
      setStartDailyDate(new Date().toISOString())
      setEndDailyDate(new Date().toISOString())
      fetchUserDailyHistory();
      // console.log("isUserStateHistoryLoading=>", isUserStateHistoryLoading);
      // if(!isUserStateHistoryLoading){
      //   console.log("userStateHistory==>", JSON.stringify(userStateHistory));
      // }
    })

    // if(!isUserStateHistoryLoading){
    //   console.log("DATA==>", userStateHistory);
    // }
  }, [])

  useEffect(() => {
    if (!ifFetchingMonthlyHistory) {
      console.log("UF userMonthlyHistory==>", userMonthlyHistory?.userStatsHistory?.data?.dateWiseStats);
      let selectedDates: any = [];
      userMonthlyHistory?.userStatsHistory?.data?.dateWiseStats.map((day: any) => {
        selectedDates.push(day.date);
      })
      setDatesWithActivity(selectedDates)
      // console.log("finale====>", selectedDates)
    }
  }, [userMonthlyHistory])

  const fetchDailyStepsOnDate = (dateType: string, dateRangeType: string) => {
    switch (dateRangeType) {
      case 'day':
        let userCreatedDate = userInfo?.user?.createdAt.split('T')[0]
        let prevDate: any = startDailyDate.split('T')[0];
        const prev = new Date(prevDate);
        let today: any = moment().format('YYYY-MM-DD');
        if ((dateType === "prev" && userCreatedDate <= data) || (dateType === "next" && moment(prev).format('YYYY-MM-DD') < today)) {
          if (dateType === "prev" && userCreatedDate <= data) {
            prev.setDate(prev.getDate() - 1);
          } else if (dateType === "next" && moment(prev).format('YYYY-MM-DD') < today) {
            prev.setDate(prev.getDate() + 1);
          }
          prev.toISOString();
          setStartDailyDate(prev.toISOString())
          setEndDailyDate(prev.toISOString())
          fetchUserDailyHistory();
        }
        break;
      case 'week':

        break;
      case 'month':
        const todaysDate = startMonthlyDate;
        let firstDay: any;
        let startDate = new Date(startMonthlyDate);
        let newMonthDateWithFormate = moment(startDate).format("YYYY-MM");
        let userCreateDateWithFormate = moment(userInfo?.user?.createdAt.split('T')[0]).format("YYYY-MM");
        let dateNow = moment(new Date()).format("YYYY-MM")
        let lastDay: any;
        // let lastDay:any = new Date(todaysDate.getFullYear(), todaysDate.getMonth());
        console.log("newMonthDateWithFormate < userCreateDateWithFormate=>", newMonthDateWithFormate < userCreateDateWithFormate);
        console.log("dateNow <=  newMonthDateWithFormate=>", dateNow > newMonthDateWithFormate);
        if ((dateType == "prev" && newMonthDateWithFormate <= userCreateDateWithFormate) || (dateType == "next" && dateNow > newMonthDateWithFormate)) {
          console.log("INSIDE >>>>?");
          if (dateType == "prev" && newMonthDateWithFormate <= userCreateDateWithFormate) {
            console.log("INSIDE >>>> IF");
            lastDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth());
            firstDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth() - 1);
            firstDay.setDate(firstDay.getDate());
            lastDay.setDate(lastDay.getDate() - 1);

          } else if (dateType == "next") {
            console.log("INSIDE >>>> ELSE IF");
            firstDay = new Date(endtMonthlyDate.getFullYear(), endtMonthlyDate.getMonth() + 1);
            firstDay.setDate(firstDay.getDate() + 1);
            lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1);
            lastDay.setDate(lastDay.getDate() + 1);
            console.log("inside firstDay==>", firstDay);
          }
          // console.log("firstDay month==>",firstDay); // 👉️ Sat Oct 01 2022 ...
          // console.log("lastDay month==>",lastDay);
          firstDay.setDate(firstDay.getDate());
          setStartCalenderDate(firstDay)
          setStartMonthlyDate(firstDay)
          setEndtMonthlyDate(lastDay)
          fetchUserMonthlyHistory();
        }
        break;

      default:
        break;
    }
  };
  // ............................account tab panHandlerName.....................................
  const accountTab = (accountData: any) => {
    let centzMade: any = accountData?.userStatsHistory?.data?.centzMade;
    console.log("centzMade===>", centzMade);
    if (centzMade) {
      centzMade = Number(centzMade).toFixed(2)
      centzMade.toString();
    }
    return (
      <View style={commonStyles.bigCardBorder}>
        <AccountTab
          Svg={Foot}
          iconHeight={10}
          textStyle={style.accountTabText}
          iconWidth={13}
          title={String.statusHistory.stepsTaken}
          text={accountData?.userStatsHistory?.data?.stepsTaken || "0"}
        />
        <View style={commonStyles.grayBorder} />
        <AccountTab
          Svg={Mileswalked}
          iconHeight={10}
          iconWidth={13}
          textStyle={style.accountTabText}
          title={String.statusHistory.milesWalked}
          text={accountData?.userStatsHistory?.data?.totalMiles || "0.0"}
        />
        <View style={commonStyles.grayBorder} />
        <AccountTab
          Svg={Caloriesurnt}
          iconHeight={10}
          iconWidth={13}
          textStyle={style.accountTabText}
          title={String.statusHistory.caloriesBurnt}
          text={accountData?.userStatsHistory?.data?.totalCalories || "0"}
        />
        <View style={commonStyles.grayBorder} />
        <AccountTab
          Svg={Smiley}
          iconHeight={20}
          iconWidth={13}
          iconColor={Colour.blueBarry}
          textStyle={style.accountTabText}
          title={String.statusHistory.hoursSleep}
          text={accountData?.userStatsHistory?.data?.sleepHours || "0"}
        />
        <View style={commonStyles.grayBorder} />
        <AccountTab
          Svg={CentzMade}
          iconHeight={10}
          iconWidth={13}
          textStyle={style.accountTabText}
          title={String.statusHistory.centzMade}
          text={centzMade ? "$" + centzMade : null || "$0.00"}
        />
      </View>
    );
  };

  //.........................................daily-tab manage............................................
  const DailyRoute = () => (
    <ScrollView style={style.dailyMainWrapper}>
      <HistoryTitle
        backPress={() => {
          fetchDailyStepsOnDate("prev", 'day');
        }}
        nextPress={() => {
          fetchDailyStepsOnDate("next", "day");
        }}
        title={startDailyDate?.split('T')[0]}
      />
      {accountTab(userDailyHistory)}
      <View>
        <Image
          source={Images.accountBG}
          style={style.image}
          resizeMode={'center'}
        />
        <View style={style.iconWrapper}>
          <Info />
          <Text style={style.dailyTextWrapper}>{String.dailyText}</Text>
        </View>
      </View>
    </ScrollView>
  );
  //.........................................weekly-tab manage............................................

  const WeeklyRoute = () => (
    <View style={style.dailyMainWrapper}>
      <HistoryTitle title={String.statusHistory.Apr1824} />
      <View style={{ height: 300, flexDirection: 'row', marginBottom: 0, width: '100%', backgroundColor: '#ddd' }}>

        <BarChart
          // onPress={() => {Alert.alert("this")}}
          xAxisLabelTextStyle={{ color: '#98A2B3', textAlign: 'center' }}
          yAxisTextStyle={{ color: '#98A2B3' }}
          style={{ xAxisIndicesColor: 'blue' }}
          barWidth={6}
          noOfSections={4}
          barBorderRadius={2}
          frontColor={Colour.weeklyChartFront}
          data={barData}
          hideRules
          stepValue={0}
          maxValue={graphMaxVal}
          yAxisLabelTexts={graphY}
          yAxisIndicesWidth={200}
          renderTooltip={() => (
            <View style={{ backgroundColor: Colour.peachyOrange, width: 100, flex: 1, marginLeft: -47, borderRadius: 8 }}>
              <View style={{}}>
                <Text style={{ paddingHorizontal: 12, paddingVertical: 8, fontSize: 12, textAlign: 'center', color: Colour.white }}>
                  Hello Heladfasdan danb ajhdja sd akdjhsj fgdsajadfg j
                </Text>
              </View>
              <View style={{ position: 'absolute', bottom: -5, alignSelf: 'center' }}>
                <ToolTip />
              </View>
            </View>
          )}
          spacing={30}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
      {accountTab(userWeeklyHistory)}
    </View>
  );
  //.........................................monthly-tab manage............................................

  const MonthlyRoute = () => (
    <ScrollView style={style.dailyMainWrapper}>
      <HistoryTitle
        backPress={() => {
          fetchDailyStepsOnDate("prev", 'month');
        }}
        nextPress={() => {
          fetchDailyStepsOnDate("next", 'month');
        }}
      />
      <View>
        <Calendar
          initialDate={startMonthlyDate}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            arrowColor: 'grey'
          }}
          onDayPress={(e: any) => {
            setTip(true)
          }}
          markingType={'custom'}
          markedDates={{
            startDate: {
              customStyles: {
                container: {
                  backgroundColor: 'green'
                },
                text: {
                  color: 'red',
                  fontWeight: 'bold'
                }
              }
            },
          }}
          // renderHeader={(month: any) => (
          //      <></>
          // )}
          // renderHeader={(month: any) => (
          //     <><Text style={{backgroundColor:'red'}}>{"endtMonthlyDate"}</Text></>
          // )}
          //   disableArrowLeft={true}
          //   renderArrow={(direction: any) => {
          //     if (direction === 'left') {
          //        return <TouchableOpacity onPress={() => fetchDailyStepsOnDate("prev", "month")}><Back width={20} height={20} color='grey' /></TouchableOpacity>
          //     } else {
          //       console.log("this?");
          //         return <TouchableOpacity><Next width={20} height={20} color='grey' /></TouchableOpacity>
          //     }
          // }}
          hideArrows={true}
          hideDayNames={true}
          dayComponent={({ date, state }: any) => {
            // console.log("userMonthlyHistory=========>", JSON.stringify(userMonthlyHistory))
            // console.log("date.dateString==>", date.dateString);
            return (
              <>
                {/* {console.log("datesWithActivity.includes(date.dateString)=> date.dateString ---- ", date.dateString , " ----- " , datesWithActivity.includes(date.dateString))} */}
                <Text style={[style.dateText,
                moment(date.dateString).isBefore(moment(startMonthlyDate).format("YYYY-MM-DD")) &&
                { color: 'lightgrey' },
                moment(date.dateString).isAfter(moment(endtMonthlyDate).format("YYYY-MM-DD")) &&
                { color: 'lightgrey' },
                date.dateString === currentDate && style.todaysDate,
                // instead of current date and startof month put the dates from date getting response
                datesWithActivity.includes(date.dateString) && date.dateString != (new Date().toISOString()).split("T")[0] && style.dataFound,
                ]}
                >
                  {date.day}
                </Text>
              </>
            )
          }}
        />
        {/* <Calendar
      
      onDayPress={(e:any) => {
        setTip(true)
     
       }}
     
  markingType={'custom'}
  markedDates={{
    startDate: {customStyles: {
      container: {
        backgroundColor: 'green'
      },
      text: {
        color: 'red',
        fontWeight: 'bold'
      }
    }},
    
  }}
/> */}
      </View>

      {accountTab(userMonthlyHistory)}
      {/* {showTip && ( */}
      <View onTouchStart={(p: any) => console.log("press....", p)} >
        <Tooltip
          tooltipStyle={{
            position: 'absolute',
            width: 101,
            height: 70,
          }}
          isVisible={showTip}
          content={<Text>Check this out!</Text>}
          placement="top"
          onClose={() => setTip(false)}
        >
          <TouchableHighlight>
            <Text></Text>
          </TouchableHighlight>
        </Tooltip>
      </View>


    </ScrollView>
  );

  const [routes] = React.useState([
    { key: 'daily', title: String.statusHistory.daily },
    { key: 'weekly', title: String.statusHistory.weekly },
    { key: 'monthly', title: String.statusHistory.monthly },
  ]);

  const renderScene = SceneMap({
    daily: DailyRoute,
    weekly: WeeklyRoute,
    monthly: MonthlyRoute,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={{ textTransform: 'capitalize' }}
      activeColor={Colour.peachyOrange}
      inactiveColor={Colour.gray900}
      indicatorStyle={style.indicator}
      style={style.tabWrapper}
      tabStyle={style.tab}
      pressColor={Colour.transparent}
    // contentContainerStyle={{
    //   borderWidth: 1,
    //   borderColor: Colour.transparent,
    //   backgroundColor: Colour.transparent,
    // }}
    // indicatorContainerStyle={{
    //   borderWidth: 1,
    //   borderColor: Colour.transparent,
    //   backgroundColor: Colour.transparent,
    // }}
    // tabStyle={{
    //   borderWidth: 1,
    //   borderColor: Colour.transparent,

    //   backgroundColor: Colour.transparent,
    // }}
    />
  );
  function getMonday(d: any) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }


  useEffect(() => {
    if (!ifFetchingWeeklyHistory) {
      console.log("userWeeklyHistory=>", JSON.stringify(userWeeklyHistory));

    }
  }, [userWeeklyHistory])
  const changeTabHandler = (selectedIndex: any) => {
    console.log("selectedIndex===>", selectedIndex);

    switch (selectedIndex) {
      case 0:
        //Daily
        setStartDailyDate(new Date().toISOString())
        setEndDailyDate(new Date().toISOString())
        fetchUserDailyHistory()
        break;
      case 1:
        //weekly
        const prevMonday = getMonday(new Date());
        console.log("mondayis==>", prevMonday);
        setStartWeeklyDate(prevMonday);
        setEndtWeeklyDate(new Date().toISOString());
        fetchUserWeeklyHistory();
        break;
      case 2:

        //Monthly 
        const todaysDate = new Date();
        const firstDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth());
        const calendarFirstDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth());
        calendarFirstDay.setDate(calendarFirstDay.getDate() - 1);
        console.log("calendarFirstDay now=>", calendarFirstDay);
        setStartCalenderDate(calendarFirstDay);
        firstDay.setDate(firstDay.getDate() + 1);
        const lastDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0);
        console.log("lastDay==>", lastDay);
        console.log("firstDay==>", firstDay); // 👉️ Sat Oct 01 2022 ...
        setStartMonthlyDate(firstDay)
        console.log("final end====================> ", new Date().toISOString());
        setEndtMonthlyDate(new Date().toISOString())
        fetchUserMonthlyHistory();
        break;

      default:
        break;
    }
    setIndex(selectedIndex);
  }

  const testData = () => {
    return (<View><Text style={{ color: Colour.white }}>{selectedData}</Text></View>)
  }
  return (

    <View style={commonStyles.whiteBG}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackButton
          color={Colour.black}
          title={String.statusHistory.statsHistory1}
          wrapperStyle={{
            marginTop: 23,
          }}
          textStyle={commonStyles.backButtonText}
        />

        <TabView
          //sceneContainerStyle={{overflow: 'visible', backgroundColor: 'pink'}}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          // onIndexChange={setIndex}
          onIndexChange={changeTabHandler}
          style={{ backgroundColor: Colour.white }}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#FF8F50' }}
          backgroundColor="transparent"
          tooltipStyle={{
            position: 'absolute',
            left: currentX - 50,
            top: currentY - 55,
            // backgroundColor:'red',

          }}
          isVisible={showTip}
          content={testData()}
          placement="top"
          onClose={() => setTip(false)}
        >
          <TouchableHighlight>
            <Text></Text>
          </TouchableHighlight>
        </Tooltip>
        {(ifFatchingDailyHistory || ifFetchingWeeklyHistory || ifFetchingMonthlyHistory) && <Loder spinnerColor={Colour.primaryGreen} />}
        {/* <View 
    style={{
      position: 'absolute',
      left: currentX - 50,
      top: currentY - 160,
      backgroundColor:'red',
      width:100,
      height:100,
      
    }}>
  </View> */}
      </SafeAreaView>
    </View>
  );
};
export default History;
const style = StyleSheet.create({
  dailyMainWrapper: {
    flex: 1,
    backgroundColor: Colour.white,
    paddingHorizontal: 19,
  },
  accountTabText: {
    fontFamily: Fonts.NotoSansMedium,
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'left',
    color: Colour.gray400,
    paddingVertical: 4,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 249,
    borderRadius: 18,
    marginTop: 16,
    marginBottom: 29,
  },
  dailyTextWrapper: {
    fontFamily: Fonts.QuicksandBold,
    color: Colour.white,
    fontSize: 21,
    fontWeight: '700',
    paddingRight: 26,
    lineHeight: 25,
    marginTop: 12,
  },
  iconWrapper: { position: 'absolute', left: 18, bottom: 40 },
  indicator: {
    borderColor: Colour.peachyOrange,
    borderWidth: 1,
    backgroundColor: Colour.peachyOrange,
  },
  tabWrapper: {
    marginTop: 25,
    backgroundColor: Colour.white,
    borderWidth: 1,
    borderColor: Colour.transparent,
  },
  tab: {
    flex: 1,

    borderTopWidth: 0,

    borderTopColor: 'rgba(0, 0, 0, .25)',
    backgroundColor: 'transparent',
    position: 'relative',
    top: 0,

    borderBottomColor: Colour.peachyOrange,
  },
  dailyMainWrappers: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 19,
  },
  todaysDate: {
    backgroundColor: 'lightgreen',
    color: 'darkblue',
    textAlignVertical: 'center'
  },
  dateText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'darkblue',
    width: 30,
    height: 30,
    justifyContent: 'center',
    borderRadius: 50,
  },
  dataFound: {
    color: 'lightgreen',
    backgroundColor: 'darkblue',
    textAlignVertical: 'center',
  }
});
