import {
  View, Text, StatusBar, ScrollView, TextInput, TouchableOpacity, ImageBackground, Platform, RefreshControl,
  Alert, Linking, SafeAreaView, Pressable
} from 'react-native';
import React, { FC, useEffect, useState, useRef, useMemo } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import { Colour } from '../../../theme';
import { Images } from '../../../assets';
import { Search } from '../../../assets/icons/Search';
import { ROUTES, String } from '../../../constants';
import { Glass } from '../../../assets/icons/Glass';
import { Union } from '../../../assets/icons/Union';
import { CupanCard } from '../../../components/CupanCard';
import { Doller } from '../../../assets/icons/Doller';
// import { BarChart } from 'react-native-svg-charts';
import { useNavigation } from '@react-navigation/native';
import { Foot } from '../../../assets/icons/Foot';
import Logo from '../../../assets/icons/logo';
import { Smiley } from '../../../assets/icons/Smiley';
import { BusinessesCard } from '../../../components/BusinessesCard/BusinessesCard';
import { Heading } from '../../../components/Handing/Heading';
import { BalanceCard } from '../../../components/BalanceCard';
import { styles } from './style';
import { cardItems, data6, GetIcon } from '../../../constants/DummyJson.ts/JsonFile';
import Profile from '../../../components/Profile/Profile';
import { AppleHelth } from '../../../assets/icons/AppleHealth';
import { SyncAppleHelth } from '../../../assets/icons/SyncAppleHelth';
import { GoogleFit as GoogleFitIcon } from '../../../assets/icons/GoogleFit';
import GoogleFit, { Scopes, BucketUnit } from 'react-native-google-fit';
import { FitBit } from '../../../assets/icons/FitBit';
import { Samsung } from '../../../assets/icons/SamsungHelth';
import { Link } from '../../../assets/icons/Link';
import { CommonButton } from '../../../components';
import { Loder } from '../../../components/Loder';
import { Get_Deal_by_user, GET_FEATURE_DEAL, GET_USER_INFORMATION } from '../../../graphQL/Queries';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { SET_USER_STEPS, SET_USER_SLEEP, UPDATE_TRACKER_TYPE } from '../../../graphQL/Mutations';
import { GoogleFitSvg } from '../../../assets/icons/GoogleFitSvg';
import { SansungHealth } from '../../../assets/icons/sansungHealth';
import { AlertCircle } from '../../../assets/icons/AlertCircle';
import * as LocalStorage from '../../../services/LocalStorage';
import { LocalStorageKeys } from '../../../constants/LocalStorageKeys';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LogOutModel from '../../../components/LogOutModel/LogOutModel';
import TrackerLink from '../../../assets/icons/trackerLink';
import { BlurView } from '@react-native-community/blur';
import { appleLogin, facebookLogin, googleLogin, } from '../../AuthScreens/SocailLogin';
import AppleHealthKit, { HealthValue, HealthKitPermissions, } from 'react-native-health'
import SamsungHealthAndroid from 'react-native-samsung-health-android'
import moment from 'moment';
import _ from "lodash"
import qs from 'qs';
import appleAuth from '@invertase/react-native-apple-authentication';
import { getParameterByName } from '../../../services/common';
import { config } from '../../../config';
import SelectCategory from '../../../components/SelectCategory/SelectCategory';

const Dashboard: FC = () => {
  const [loader, setLoader] = useState(false);
  const [setUserSteps] = useMutation(SET_USER_STEPS);
  const [setUserSleep] = useMutation(SET_USER_SLEEP);
  const [updateTrackerType] = useMutation(UPDATE_TRACKER_TYPE);
  const [refresh, setRefresh] = useState(false);
  const [userInfo, setUserInfo]: any = useState();
  const [isDeviceSynced, setIsDeviceSynced] = useState(true);
  const [isVisibleModal, setIsVisibleModal]: any = useState(false);
  const countHasChangedRef = useRef(false);
  const [updatedUserInfo, setUpdatedUserInfo]: any = useState();
  // const [isPulltoRefresh, setIsPulltoRefresh] = useState(false);
  let trackerType = ['appleHealth', 'googleFit', 'fitbit', 'samsungHealth'];
  const navigation: any = useNavigation();
  const imageStorageUrl = config.preProdImgUrl;
  const businessbanner = 'businessbanner/'
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      Scopes.FITNESS_NUTRITION_WRITE,
      Scopes.FITNESS_SLEEP_READ,

    ],
  };
  // const [getUserInformationCall, { loading:userLoading,  data:getUserInformation }] = useLazyQuery(GET_USER_INFORMATION, {errorPolicy: 'all', fetchPolicy:'network-only'});
  const { data: getUserInformation, error, loading: userLoading }: any = useQuery(
    GET_USER_INFORMATION,
    { errorPolicy: 'all', fetchPolicy: 'network-only' },
  );

  
  const {
    data: getUserBydealData,
    error: getUserDealError,
    loading: getUserByLoading }: any = useQuery(
      Get_Deal_by_user, {
      variables: {
        limit: 5
      }
    },
    );

  const exploreDeals: any = getUserBydealData?.getDealsByUser?.data;
  const {
    data: getFeatureBydealData,
    error: getFeatureDealError,
    loading: getFeatureByLoading }: any = useQuery(
      GET_FEATURE_DEAL, {
      variables: {
        limit: 1,
        search: null,
        isFeatured: true
      }
    },
    );

  const getSyncDate = (syncDate: any) => {
    const date = new Date(syncDate);
    let newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    return newDate;
  }

  const stepsCount = async (authUserId: string, trackerId: string) => {

    let dateStart: any = new Date(new Date(getUserInformation?.me?.user?.lastSyncSleep).setHours(0, 0, 0, 0))
    // dateStart.setHours(dateStart.getHours() - 5);    
    const opt = {
      startDate: dateStart.toISOString(), // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
      bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      // bucketInterval: 1, // optional - default 1. 
    };

    const promise = new Promise(async (resolve, reject) => {

      try {
        //do something and return result on success
        let userSteps: any = [];
        GoogleFit.getDailyStepCountSamples(opt)
          .then((res: any) => {
            let googleFitData: any = [];

            res && res.map((item: any) => {
              if (item.source === "com.google.android.gms:estimated_steps") {

                googleFitData.push(item);
              }
            })
            googleFitData && googleFitData[0]?.steps.map((step: any) => {
              userSteps.push({
                "value": step?.value?.toString(),
                "date": step?.date
              })
            })
            setUserSteps({
              variables: {
                input: {
                  "user_id": authUserId,
                  "steps": userSteps,
                  "trackerType": 'googleFit',
                  "trackerId": trackerId
                }
              }
            }).then((res) => {
              resolve(res);

            }).catch((e) => {
              reject(e);
            })
          })

      } catch (msg) { reject(msg); }

    });

    return promise;
  }

  const getSleepData = async (authUserId: string, trackerId: string) => {
    const opt = {
      startDate: new Date(new Date(getUserInformation?.me?.user?.lastSyncSleep).setHours(0, 0, 0, 0)).toISOString(), // required, timestamp or ISO8601 string
      endDate: new Date().toISOString(), // required, timestamp or ISO8601 string
    };
    const promise = new Promise(async (resolve, reject) => {

      try {
        //do something and return result on success
        let userSleep: any = [];
        const authorized = GoogleFit.isAuthorized;
        GoogleFit.getSleepSamples(opt).then((userStepsRes: any) => {
          userStepsRes && userStepsRes.map((sleep: any) => {
            userSleep.push({ 'startDate': sleep?.startDate, 'endDate': sleep?.endDate })
          })
        }).then(() => {
          setUserSleep({
            variables: {
              input: {
                "user_id": authUserId,
                "sleep": userSleep,
                "trackerType": 'googleFit',
                "trackerId": trackerId
              }
            }
          }).then((res) => {
            resolve(res);
          }).catch(e => {
            console.log("sleep error ", e)
            reject(e)
          })
        })
      } catch (msg) { reject(msg); }
    });
    return promise;
  }

  const syncGoogleFitTracker = async () => {
    GoogleFit.checkIsAuthorized().then(async () => {
      if (!userLoading) {
        const authorized = GoogleFit.isAuthorized;
        if (authorized) {
          //setLoader(true);
          GoogleFit.authorize(options)
            .then(async (authResult: any) => {
              if (authResult.success) {
                let sleepData: any = await getSleepData(getUserInformation?.me?.user?._id, getUserInformation?.me?.user?.trackerId);
                let stepsData: any = await stepsCount(getUserInformation?.me?.user?._id, getUserInformation?.me?.user?.trackerId)
                if (sleepData?.data?.setUserSleep?.message == "success" && stepsData?.data?.setUserSteps?.message == "success") {
                  setRefresh(false);
                  setLoader(false);
                  setIsDeviceSynced(true);
                }
              } else {
                setIsDeviceSynced(false);
                setRefresh(false);
                setLoader(false);
              }
            })
        } else {
          GoogleFit.authorize(options)
            .then(async (authResult: any) => {
              if (authResult.success) {
                let sleepData: any = await getSleepData(getUserInformation?.me?.user?._id, getUserInformation?.me?.user?.trackerId);
                let stepsData: any = await stepsCount(getUserInformation?.me?.user?._id, getUserInformation?.me?.user?.trackerId)
                if (sleepData?.data?.setUserSleep?.message == "success" && stepsData?.data?.setUserSteps?.message == "success") {
                  setRefresh(false);
                  setLoader(false);
                  setIsDeviceSynced(true);
                } else {
                  await GoogleSignin.signOut();
                  setIsVisibleModal(true);
                }
              } else {
                setRefresh(false);
                setLoader(false);
                setIsDeviceSynced(false);
              }
            })
        }
      }
    })
  }

  useEffect(()=>{
LocalStorage.getValue("userInfo").then((res:any)=>{
console.log("res",res);

})
  },[])
  const refreshHandler = async () => {
    setRefresh(true);
    if (getUserInformation?.me?.user?.trackerType == 'googleFit' && Platform.OS != "ios") {
      const authorized = GoogleFit.isAuthorized;
      if (authorized) {
        syncGoogleFitTracker();
      } else {
        setLoader(false);
      }
    } else if (getUserInformation?.me?.user?.trackerType == 'samsungHealth') {
      samsungSyncHandler()
    }
    else if (getUserInformation?.me?.user?.trackerType == 'appleHealth' && Platform.OS == "ios") {
      syncAppleHealthTracker()
    }
    else if (getUserInformation?.me?.user?.trackerType == 'fitbit') {
      fitbitSyncHandler()
    }
    else {
      setRefresh(false);
    }
  }

  const resyncYourDevice = async () => {
    if (!userLoading) {
      if (trackerType.includes(getUserInformation?.me?.user?.trackerType)) {
        if (Platform.OS == "ios") {
          if (getUserInformation?.me?.user?.trackerType == 'appleHealth') {
            const appleUserData = await appleLogin();
            await LocalStorage.setValue(LocalStorageKeys.appleTrackerId, appleUserData?.user?.id);
            setLoader(true);
            syncAppleHealthTracker()
          } else if (getUserInformation?.me?.user?.trackerType == 'fitbit') {
            const googleUserData = await googleLogin();
            let userTrackerId = googleUserData.user.id;
            if (userTrackerId === getUserInformation?.me?.user?.trackerId) {
              setLoader(true);
              fitbitSyncHandler()
            } else {
              setIsVisibleModal(true);
              setLoader(false);
              await GoogleSignin.signOut();
            }
          }
        } else {
          const googleUserData = await googleLogin();
          let userTrackerId = googleUserData.user.id;
          if (userTrackerId === getUserInformation?.me?.user?.trackerId) {
            setLoader(true);
            if (getUserInformation?.me?.user?.trackerType == 'googleFit') {
              syncGoogleFitTracker();
            } else if (getUserInformation?.me?.user?.trackerType == 'samsungHealth') {
              samsungSyncHandler()
            } else if (getUserInformation?.me?.user?.trackerType == 'fitbit') {
              fitbitSyncHandler()
            }
          } else {
            setIsVisibleModal(true);
            await GoogleSignin.signOut();
          }
        }
      }
    }
  }

  const getPastRangeDate = (range: number) => {
    let now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - range));
    startDate.setHours(0, 0, 0, 0);
    startDate.toISOString();
    // startDate.setHours(startDate.getHours() - 5);
    return startDate
  }

  const getSleepDataWithRange = async (authUserId: string, trackerId: string) => {
    const opt: any = {
      startDate: getPastRangeDate(28), // required, timestamp or ISO8601 string
      endDate: new Date().toISOString(), // required, timestamp or ISO8601 string
    };


    const promise = new Promise(async (resolve, reject) => {

      try {
        //do something and return result on success
        let userSleep: any = [];
        GoogleFit.getSleepSamples(opt).then((userStepsRes: any) => {
          userStepsRes.map((sleep: any) => {
            userSleep.push({ 'startDate': sleep?.startDate, 'endDate': sleep?.endDate })
          })
        }).then(() => {
          setUserSleep({
            variables: {
              input: {
                "user_id": authUserId,
                "sleep": userSleep,
                "trackerType": 'googleFit',
                "trackerId": trackerId
              }
            }
          }).then((res: any) => {
            resolve(res);
          }).catch((e: any) => {
            reject(e)
          })
        })
      } catch (msg) { reject(msg); }
    });
    return promise;
  }
  const stepsCountWithRange = async (authUserId: string, trackerId: string) => {
    const opt = {
      startDate: getPastRangeDate(28), // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
      bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1. 
    };

    const promise = new Promise(async (resolve, reject) => {
      try {
        //do something and return result on success
        let userSteps: any = [];
        GoogleFit.getDailyStepCountSamples(opt)
          .then((res: any) => {
            res[2].steps.map((step: any) => {
              userSteps.push({
                "value": step?.value.toString(),
                "date": step.date
              })
            })
            setUserSteps({
              variables: {
                input: {
                  "user_id": authUserId,
                  "steps": userSteps,
                  "trackerType": 'googleFit',
                  "trackerId": trackerId
                }
              }
            }).then((res: any) => {
              resolve(res);

            }).catch((e: any) => {
              reject(e);
            })
          })
      } catch (msg) { reject(msg); }
    });
    return promise;
  }
  {/** GOOGLE FIT */ }
  const googleFitAuthHandler = (userTrackerId: string, authUserId: string) => {
    GoogleFit.checkIsAuthorized().then(async () => {
      const authorized = GoogleFit.isAuthorized;
      if (authorized) {
        // if already authorized, fetch data
      } else {
        // Authentication if already not authorized for a particular device
        setLoader(true);
        GoogleFit.authorize(options)
          .then(async (authResult: any) => {
            if (authResult.success) {
              updateTrackerType({
                variables: {
                  input: {
                    trackerType: 'googleFit',
                    trackerId: userTrackerId
                  }
                }
              }).then(async (res: any) => {
                console.log('AUTH_SUCCESS');
                let sleepData: any = await getSleepDataWithRange(authUserId, userTrackerId);
                let stepsData: any = await stepsCountWithRange(authUserId, userTrackerId)
                if (sleepData?.data?.setUserSleep?.message == "success" && stepsData?.data?.setUserSteps?.message == "success") {
                  setLoader(false);
                  setIsDeviceSynced(true);
                  // navigation.navigate(ROUTES?.Synced);
                }

              })
            } else {
              setLoader(false);
              setIsDeviceSynced(false);
            }
          })
          .catch(() => {
            setLoader(false);
          });
      }
    }).catch(() => {
      setLoader(false);
    })
  }

  const googleFitSyncHandler = () => {
    navigation.navigate(ROUTES?.FitnessTracker);
    // LocalStorage.getValue(LocalStorageKeys.userInfo).then(async (userInfo) => {
    //   const googleUserData = await googleLogin();
    //   let userTrackerId = googleUserData.user.id;
    //   let authUserId = userInfo.user._id;
    //   googleFitAuthHandler(userTrackerId, authUserId);
    // })
  }

  {/** APPLE HEALTH START*/ }
  const syncAppleHealthTracker = async () => {
    const permissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.StepCount, AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.SleepAnalysis,
          AppleHealthKit.Constants.Permissions.DistanceWalkingRunning, AppleHealthKit.Constants.Permissions.ActiveEnergyBurned
        ],
        write: []
      },
    } as HealthKitPermissions

    const appleTrackerId = await LocalStorage.getValue(LocalStorageKeys.appleTrackerId);

    if (appleAuth.State.AUTHORIZED == 1 && appleTrackerId) {
      AppleHealthKit.isAvailable((err: Object, available: boolean) => {
        setRefresh(false);
        if (err) {
          console.log('error initializing Healthkit: ', err)
          setLoader(false);
          return
        }
        if (available) {
          setLoader(true);
          AppleHealthKit.initHealthKit(permissions, async (error: string) => {
            if (error) {
              setLoader(false);
              console.log('[ERROR] Cannot grant permissions!')
              return error
            }
            try {
              await getAppleSleepData(getUserInformation?.me?.user?._id, getUserInformation?.me?.user?.trackerId);
              await appleStepsCount(getUserInformation?.me?.user?._id, getUserInformation?.me?.user?.trackerId);
            } catch (e) {
              setLoader(false);
              console.log('e :>> ', e);
            }
            finally {
              setLoader(false);
              setIsDeviceSynced(true);
            }
          })
        } else {
          setLoader(false);
          setIsDeviceSynced(false)
        }
      })
    } else {
      setLoader(false);
      setRefresh(false);
      setIsDeviceSynced(false)
    }
  }

  const getAppleDistanceCount = async () => {
    const options: any = {
      startDate: new Date(new Date(getUserInformation?.me?.user?.lastSyncSteps).setHours(0, 0, 0, 0)).toISOString(), // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
      unit: 'mile'
    };
    return await new Promise(async (resolve, reject) => {
      await AppleHealthKit.getDailyDistanceWalkingRunningSamples(options, (err: Object, results: any) => {
        const getWantedData = results && results.map((a: any) => { return { value: a.value, date: moment(a.endDate).add(-1, 'm').format('YYYY-MM-DD') } })
        resolve(_(getWantedData).groupBy('date')?.map((getWantedData, date) => ({
          date: date,
          value: _.sumBy(getWantedData, 'value').toFixed(2),
        })).value() || []);
      })
    }) || [];
  }

  const getAppleEnergyCount = async () => {
    const options: any = {
      startDate: new Date(new Date(getUserInformation?.me?.user?.lastSyncSteps).setHours(0, 0, 0, 0)).toISOString(), // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
    };
    return await new Promise(async (resolve, reject) => {
      await AppleHealthKit.getActiveEnergyBurned(options, (err: Object, results: any) => {
        const getWantedData = results && results.map((a: any) => { return { value: a.value, date: moment(a.endDate).add(-1, 'm').format('YYYY-MM-DD') } })
        resolve(_(getWantedData).groupBy('date')?.map((getWantedData, date) => ({
          date: date,
          value: _.sumBy(getWantedData, 'value').toFixed(2),
        })).value() || []);
      })
    }) || [];
  }

  const getAppleSleepData = async (authUserId: string, trackerId: string) => {
    const opt = {
      startDate: new Date(new Date(getUserInformation?.me?.user?.lastSyncSleep).setHours(0, 0, 0, 0)).toISOString(),
      endDate: new Date().toISOString(),
      ascending: true,
    };

    return new Promise(async (resolve, reject) => {

      try {
        let userSleep: any = [];
        AppleHealthKit.getSleepSamples(opt, (err: Object, results: Array<HealthValue>) => {
          results && results.map((sleep: any) => {
            userSleep.push({ 'startDate': sleep?.startDate, 'endDate': sleep?.endDate })
          })
          setUserSleep({
            variables: {
              input: {
                "user_id": authUserId,
                "sleep": userSleep,
                "trackerType": 'appleHealth',
                "trackerId": trackerId
              }
            }
          }).then((res: any) => {
            resolve(res);
          }).catch((e: any) => {
            reject(e)
          })
        })
      } catch (msg) { reject(msg); }
    });
  }

  const appleStepsCount = async (authUserId: string, trackerId: string) => {
    const opt = {
      startDate: new Date(new Date(getUserInformation?.me?.user?.lastSyncSteps).setHours(0, 0, 0, 0)).toISOString(),
      endDate: new Date().toISOString(),
    };
    const userDistance: any = await getAppleDistanceCount();
    const userEnergy: any = await getAppleEnergyCount();

    return new Promise(async (resolve, reject) => {
      try {
        //do something and return result on success
        AppleHealthKit.getDailyStepCountSamples(opt, (err: Object, results: any) => {
          const getWantedData = results && results.map((a: any) => { return { value: a.value, date: moment(a.endDate).add(-1, 'm').format('YYYY-MM-DD') } })
          let userSteps: any = _(getWantedData).groupBy('date').map((getWantedData, date) => ({
            date: date,
            value: (_.sumBy(getWantedData, 'value')).toString(),
          })).value() || [];

          userSteps = userSteps.map((step: any) => {
            step['calories'] = (userEnergy?.find((energy: any) => energy?.date == step.date)?.value) || 0;
            step['miles'] = (userDistance?.find((dis: any) => dis?.date == step.date)?.value) || 0;
            return step;
          })

          setUserSteps({
            variables: {
              input: {
                "user_id": authUserId,
                "steps": userSteps,
                "trackerType": 'appleHealth',
                "trackerId": trackerId
              }
            }
          }).then((res: any) => {
            resolve(res);
          }).catch((e: any) => {
            reject(e);
          })
        })
      } catch (msg) { reject(msg); }

    });
  }
  {/** APPLE HEALTH END*/ }

  {/** SAMSUNG HEALTH START*/ }
  const authorize = async () => {
    const permissions = [SamsungHealthAndroid.Types.Sleep, SamsungHealthAndroid.Types.StepCount];
    const allowed = await SamsungHealthAndroid.getPermissionAsync(permissions);
    if (allowed[SamsungHealthAndroid.Types.StepCount] && allowed[SamsungHealthAndroid.Types.Sleep]) {
      return allowed;
    }
    return SamsungHealthAndroid.askPermissionAsync(permissions);
  };

  const getSamsungStepsCount = async (authUserId: string, trackerId: string) => {
    const startTime = new Date(new Date(getUserInformation?.me?.user?.lastSyncSteps));
    const endTime = new Date();

    startTime.setHours(0, 0, 0, 0);
    endTime.setHours(23, 59, 59, 999);
    const allowed = await authorize();
    const promise = new Promise(async (resolve, reject) => {
      try {
        if (allowed[SamsungHealthAndroid.Types.StepCount]) {
          const stepInfo = await SamsungHealthAndroid.readDataAsync(
            SamsungHealthAndroid.createMetric({
              type: SamsungHealthAndroid.Types.StepCount,
              start: startTime.getTime() / 1000,
              end: endTime.getTime() / 1000,
            })
          );
          const getWantedData = stepInfo && stepInfo.map(a => { return { value: a.count, distance: a.distance, calorie: a.calorie, date: moment(a.update_time).format('YYYY-MM-DD') } })
          const grouppedData = _(getWantedData).groupBy('date').map((getWantedData, date) => ({
            date: date,
            value: (_.sumBy(getWantedData, 'value')).toString(),
            calories: _.sumBy(getWantedData, 'calorie'),
            miles: (_.sumBy(getWantedData, 'distance') * 0.000621371) //convert meter into mile
          })).value()
          setUserSteps({
            variables: {
              input: {
                "user_id": authUserId,
                "steps": grouppedData,
                "trackerType": 'samsungHealth',
                "trackerId": trackerId
              }
            }
          }).then((res: any) => {
            resolve(res);
          }).catch((e: any) => {
            reject(e);
          })
        }
      } catch (msg) { reject(msg); }
    })

    return promise;
  }
  const getSamsumgSleepCount = async (authUserId: string, trackerId: string) => {
    const startTime = new Date(new Date(getUserInformation?.me?.user?.lastSyncSleep));
    const endTime = new Date();

    startTime.setHours(0, 0, 0, 0);
    endTime.setHours(23, 59, 59, 999);
    const allowed = await authorize();
    const promise = new Promise(async (resolve, reject) => {
      try {
        if (allowed[SamsungHealthAndroid.Types.Sleep]) {
          const sleepInfo = await SamsungHealthAndroid.readDataAsync(
            SamsungHealthAndroid.createMetric({
              type: SamsungHealthAndroid.Types.Sleep,
              start: startTime.getTime() / 1000,
              end: endTime.getTime() / 1000,
            })
          );
          const userSleep = sleepInfo && sleepInfo.map(a => { return { startDate: new Date(a.start_time).toISOString(), endDate: new Date(a.end_time).toISOString() } })
          console.log('userSleep', userSleep)
          setUserSleep({
            variables: {
              input: {
                "user_id": authUserId,
                "sleep": userSleep,
                "trackerType": 'samsungHealth',
                "trackerId": trackerId
              }
            }
          }).then((res: any) => {
            resolve(res);
          }).catch((e: any) => {
            reject(e);
          })
        }
      } catch (msg) { reject(msg); }
    })

    return promise;
  }

  const samsungSyncHandler = async () => {
    try {
      setLoader(true);
      const isSignedInCheck = await GoogleSignin.isSignedIn();
      if (isSignedInCheck) {
        const auth = await SamsungHealthAndroid.connect(__DEV__);
        if (auth) {
          const allowed = await authorize();

          if (allowed[SamsungHealthAndroid.Types.StepCount]) {
            try {
              let sleepData: any = await getSamsumgSleepCount(getUserInformation?.me?.user?._id, getUserInformation?.me?.user?.trackerId);
              let stepsData: any = await getSamsungStepsCount(getUserInformation?.me?.user?._id, getUserInformation?.me?.user?.trackerId)
              if (sleepData?.data?.setUserSleep?.message == "success" && stepsData?.data?.setUserSteps?.message == "success") {
                setRefresh(false);
                setLoader(false);
                setIsDeviceSynced(true)
              }
            } catch (error) {
              setRefresh(false);
              setLoader(false);
            }
          } else {
            setLoader(false);
            setRefresh(false);
            setIsDeviceSynced(false)
          }
        } else {
          setLoader(false);
          setRefresh(false);
          setIsDeviceSynced(false)
        }
      } else {
        setLoader(false);
        setRefresh(false);
        setIsDeviceSynced(false)
      }
    } catch (error: any) {
      setLoader(false);
      setRefresh(false);
      Alert.alert(error?.message)
    }
  }
  {/** SAMSUNG HEALTH END*/ }

  // FITBIT START

  function fitbitSyncAuthHandler(client_id: any) {
    Linking.addEventListener('url', handleUrl);

    function handleUrl(event: any) {
      Linking.removeEventListener('url', handleUrl);
      const [, query_string] = event.url.match(/\#(.*)/);
      const query = qs.parse(query_string);
      fitBitAuthHandler(query['access_token'], query?.user_id);
    }

    const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
      client_id,
      response_type: 'token',
      scope: 'activity sleep',
      expires_in: '31536000',
      redirect_uri: 'centavizer://fitbit',
    })}`;
    Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));
  }

  const fitbitSyncHandler = async () => {
    const fitbitAccessToken = await LocalStorage.getValue(LocalStorageKeys.fitbitAccessToken);
    const fitbitUserId = await LocalStorage.getValue(LocalStorageKeys.fitbitUserId);
    const body = {
      method: 'POST',
      headers: { authorization: `Bearer ${fitbitAccessToken}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${fitbitAccessToken}`
    }
    fetch('https://api.fitbit.com/1.1/oauth2/introspect', body)
      .then(response => response.json())
      .then(res => {
        if (res?.active)
          fitBitAuthHandler(fitbitAccessToken, fitbitUserId)
        else
          fitbitSyncAuthHandler('238WFR');
      }).catch((e) => {
        fitbitSyncAuthHandler('238WFR');
      })
  }

  const fitBitAuthHandler = async (access_token: any, userId: any) => {
    try {
      setLoader(true);
      const isSignedInCheck = await GoogleSignin.isSignedIn();
      if (isSignedInCheck) {
        try {
          await LocalStorage.setValue(LocalStorageKeys.fitbitAccessToken, access_token);
          await LocalStorage.setValue(LocalStorageKeys.fitbitUserId, userId);
          let stepsData: any = await getFitBitSteps(access_token, userId, getUserInformation?.me?.user?.trackerId, getUserInformation?.me?.user?._id)
          let sleepData: any = await getFitBitSleeps(access_token, userId, getUserInformation?.me?.user?.trackerId, getUserInformation?.me?.user?._id);
          if (sleepData?.data?.setUserSleep?.message == "success" && stepsData?.data?.setUserSteps?.message == "success") {
            setIsDeviceSynced(true)
          }
          setRefresh(false);
          setLoader(false);
        } catch (error) {
          setRefresh(false);
          setLoader(false);
        }
      } else {
        setLoader(false);
        setRefresh(false);
        setIsDeviceSynced(false)
      }
    } catch (error: any) {
      setLoader(false);
      setRefresh(false);
    }
  }

  async function getFitBitEnergyCount(startTime: any, access_token: string, userId: string) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        fetch(`https://api.fitbit.com/1/user/${userId}/activities/calories/date/${moment(startTime).format('YYYY-MM-DD')}/${moment().format('YYYY-MM-DD')}.json`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then(res => res.json())
          .then(res => {
            const userCalories = res?.["activities-calories"] && res?.["activities-calories"].map((a: any) => {
              return { value: a.value, date: moment(a.dateTime).format('YYYY-MM-DD') }
            }) || [];
            resolve(userCalories)
          })
          .catch(err => {
            setLoader(false);
            resolve([]);
          });
      } catch (msg) {
        setLoader(false);
        resolve([]);
      }
    });
    return promise;
  }

  async function getFitBitDistanceCount(startTime: any, access_token: string, userId: string) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        fetch(`https://api.fitbit.com/1/user/${userId}/activities/distance/date/${moment(startTime).format('YYYY-MM-DD')}/${moment().format('YYYY-MM-DD')}.json`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then(res => res.json())
          .then(res => {
            const userDistance = res?.["activities-distance"] && res?.["activities-distance"].map((a: any) => {
              return { value: (parseFloat(a.value) * 0.621371), date: moment(a.dateTime).format('YYYY-MM-DD') }
            }) || [];
            resolve(userDistance)
          })
          .catch(err => {
            setLoader(false);
            resolve([]);
          });
      } catch (msg) {
        setLoader(false);
        resolve([]);
      }
    });
    return promise;
  }

  async function getFitBitSteps(access_token: string, userId: string, userTrackerId: any, authUserId: any) {
    const startTime = new Date(new Date(getUserInformation?.me?.user?.lastSyncSteps));
    const userDistance: any = await getFitBitDistanceCount(startTime, access_token, userId);
    const userEnergy: any = await getFitBitEnergyCount(startTime, access_token, userId);
    const promise = new Promise(async (resolve, reject) => {
      try {
        fetch(`https://api.fitbit.com/1/user/${userId}/activities/steps/date/${moment(startTime).format('YYYY-MM-DD')}/${moment().format('YYYY-MM-DD')}.json`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then(res => res.json())
          .then((res: any) => {
            const userSteps = res?.["activities-steps"] && res?.["activities-steps"].map((a: any) => {
              const date = moment(a.dateTime).format('YYYY-MM-DD');
              return {
                value: a.value,
                calories: (userEnergy?.find((energy: any) => energy?.date == date)?.value) || 0,
                miles: (userDistance?.find((dis: any) => dis?.date == date)?.value) || 0,
                date
              }
            })
            setUserSteps({
              variables: {
                input: {
                  "user_id": authUserId,
                  "steps": userSteps,
                  "trackerType": 'fitbit',
                  "trackerId": userTrackerId
                }
              }
            }).then((res) => {
              resolve(res);
            }).catch((e) => {
              reject(e);
              setLoader(false);
            })
          })
          .catch(err => {
            setLoader(false);
            reject(err);
          });
      } catch (msg) {
        setLoader(false);
        reject(msg);
      }
    });
    return promise;
  }

  async function getFitBitSleeps(access_token: string, userId: string, userTrackerId: any, authUserId: any) {
    const startTime = new Date(new Date(getUserInformation?.me?.user?.lastSyncSleep));
    startTime.setHours(0, 0, 0, 0);

    const promise = new Promise(async (resolve, reject) => {
      try {
        fetch(`https://api.fitbit.com/1/user/${userId}/sleep/list.json?afterDate=${moment(startTime).format('YYYY-MM-DD')}&sort=asc&offset=0&limit=100`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then(res => res.json())
          .then(res => {
            const getData = res?.sleep && res?.sleep.map((sleep: any) => {
              return {
                'startDate': new Date(sleep?.startTime).toISOString(),
                'endDate': new Date(sleep?.endTime).toISOString()
              }
            })
            setUserSleep({
              variables: {
                input: {
                  "user_id": authUserId,
                  "sleep": getData,
                  "trackerType": 'fitbit',
                  "trackerId": userTrackerId
                }
              }
            }).then((res) => {
              resolve(res);
            }).catch(e => {
              setLoader(false);
              reject(e)
            })
          })
          .catch(err => {
            setLoader(false);
            reject(err);
          });
      } catch (error) {
        setLoader(false);
        reject(error);
      }
    });
    return promise;
  }

  // FITBIT END

  // if (!userLoading){
  //   console.log("this=====>", trackerType.includes(getUserInformation?.me?.user?.trackerType))
  //   if (trackerType.includes(getUserInformation?.me?.user?.trackerType) && Platform.OS != "ios"){
  //     syncGoogleFitTracker(); 
  //   } else {
  //     setLoader(false);
  //   }
  // }
  // const updateUserInformation = async () => {
  //   let getUserInfo = await getUserInformationCall();
  //   console.log("updated DATA => ", getUserInfo?.data?.me?.user);
  //   setUpdatedUserInfo(getUserInfo?.data?.me?.user);
  // }

  useEffect(() => {
    LocalStorage.getValue(LocalStorageKeys.userInfo).then(async (userInfo) => {
      setUserInfo(userInfo);
    })
    dynamicLinks().getInitialLink().then((link: any) => {
      const tab = getParameterByName('tab', link?.url)
      const variantId = getParameterByName('variantId', link?.url)
      const productId = getParameterByName('productId', link?.url)
      if (tab == 'marketplace' && variantId?.length && productId?.length) {
        navigation.navigate(ROUTES.ProductPage, { productId, variantId })
      }
    });
  }, [])

  const syncGoogleFitFirst = async () => {
    const googleUserData = await googleLogin();
    if (googleUserData.hasOwnProperty('user')) {
      let userTrackerId = googleUserData.user.id;
      if (userTrackerId === getUserInformation?.me?.user?.trackerId) {
        setLoader(true);
        syncGoogleFitTracker();
      } else {
        setIsVisibleModal(true);
        setIsDeviceSynced(false);
        setLoader(false);
        await GoogleSignin.signOut();
        // Alert.alert('You have selected wrong account/tracker Please select the correct tracker.');
      }
    } else {
      setIsDeviceSynced(false);
      setLoader(false);
    }
  }


  const syncSelectedTracker = () => {
    if (trackerType.includes(getUserInformation?.me?.user?.trackerType)) {
      switch (getUserInformation?.me?.user?.trackerType) {
        case 'appleHealth':
          syncAppleHealthTracker();
          break;
        case 'googleFit':
          if (Platform.OS != 'ios') {
            syncGoogleFitTracker();
          } else {
            setLoader(false);
          }
          break;
        case 'samsungHealth':
          if (Platform.OS != 'ios')
            samsungSyncHandler()
          break;
        case 'fitbit':
          fitbitSyncHandler()
          break;
        default:
          break;
      }
    } else {
      setLoader(false);
    }
  }

  // useEffect(() => {
  //   setLoader(true);
  //   if (!userLoading) {
  //     syncSelectedTracker();
  //   }
  // }, [getUserInformation])

  const getDeviceIcon = () => {
    if (trackerType.includes(getUserInformation?.me?.user?.trackerType)) {
      switch (getUserInformation?.me?.user?.trackerType) {
        case 'appleHealth':
          return <SyncAppleHelth />
        case 'googleFit':
          return <GoogleFitSvg />
        case 'samsungHealth':
          return <Samsung height={24} width={24} />
        case 'fitbit':
          return <FitBit height={24} width={24} />
        default:
          break;
      }
    }
  }

  const getmessage = () => {
    const getMinutes: any = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    if (getMinutes <= '11: 59') {
      return 'Good Morning';
    }
    if (getMinutes > '11:59' && getMinutes <= '15:59') {
      return 'Good Afternoon';
    } else if (getMinutes > '15:59' && getMinutes <= '23:59') {
      return 'Good Evening';
    } else {
      return 'Good Morning';
    }
  };

  const getAvailableBalance = () => {
    return ((getUserInformation?.me?.user?.stepsEarnings + getUserInformation?.me?.user?.sleepsEarnings) - getUserInformation?.me?.user?.purchasedAmount) || 0;
  }


  const distance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    console.log("lat1", lat1);

    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    console.log(
      '12742 * Math.asin(Math.sqrt(a))======>',
      12742 * Math.asin(Math.sqrt(a)) * 0.621371,
    );

    // const miles = 12742 * Math.asin(Math.sqrt(a)) * 0.621371;
    //const slice=miles.slice(1,3)

    //console.log('km  ', 12742 * Math.asin(Math.sqrt(a)));
    return 12742 * Math.asin(Math.sqrt(a)) * 0.621371;

    // 2 * R; R = 6371 km
  }

  let firstLet = getUserInformation?.me?.user?.savedMerchant[0]?.business_data?.latitude
  let secondLong = getUserInformation?.me?.user?.savedMerchant[0]?.business_data?.longitude
  let thirdLet = getFeatureBydealData?.getDealsByUser?.data[0]?.merchant_id?.business_data?.latitude
  let fourLong = getFeatureBydealData?.getDealsByUser?.data[0]?.merchant_id?.business_data?.longitude
  let renderDistance = distance(firstLet, secondLong, thirdLet, fourLong)
  const userprofile = 'userprofile/'
  return (
    <>
      <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colour.PrimaryBlue }} />
      <StatusBar barStyle={String.lightContent} backgroundColor={Colour.PrimaryBlue} />
      <ScrollView style={styles.mainWrapper}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // style={{backgroundColor: Colour.PrimaryBlue}}
        contentContainerStyle={{
        }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            style={{ backgroundColor: Colour.PrimaryBlue }}
            onRefresh={refreshHandler}
            tintColor="#fff"
            titleColor="#fff"
            title="Pull to refresh" />
        }>
        {/* ...................blue oval Part .............. */}
        <View style={[styles.oval]}>
          {/* ........................................profile pic.................................. */}

          <Profile
            image={getUserInformation?.me?.user?.profilepicture == null ? Images.heart : { uri: `${imageStorageUrl + userprofile + getUserInformation?.me?.user?.profilepicture}` }}
            smallHeaderText={getmessage()}
            TitleHeaderText={getUserInformation?.me?.user?.firstname?.length > 0 || getUserInformation?.me?.user?.lastname?.length > 0 ?
              `${getUserInformation?.me?.user?.firstname?.charAt(0)?.toUpperCase() + getUserInformation?.me?.user?.firstname?.slice(1)?.toLowerCase() + " " +
              getUserInformation?.me?.user?.lastname?.charAt(0).toUpperCase() + getUserInformation?.me?.user?.lastname?.slice(1)?.toLowerCase()}
              ` : "Let’s get moving"}
            smallTextStyle={{}}
            titleTextStyle={{}}
          />

          {!userLoading && !getUserInformation?.me?.user?.trackerType ?
            <CommonButton
              buttonText={String.syncDevice}
              onPress={googleFitSyncHandler}
              warperStyle={styles.syncDeviceButton}
              icon={true}
            />
            :
            (!isDeviceSynced ?
              <CommonButton
                buttonText={String.resync}
                onPress={resyncYourDevice}
                LeftIcon={AlertCircle}
                // RightIcon={GoogleFitSvg}
                RightIcon={getDeviceIcon}
                buttonTextStyle={{ color: Colour.marun }}
                warperStyle={styles.syncDeviceButton2}
                icon={true}
              />
              : null)
          }
          {/* <ScrollView style={styles.mainWrapper}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={handleRefresh}
            title="Pull to refresh" />}>
        <StatusBar
          backgroundColor={Colour?.PrimaryBlue}
          barStyle={String.lightContent}
        />
        <View style={styles.oval}>
          <Profile
            image={Images.heart}
            smallHeaderText={'Good morining'}
            TitleHeaderText={'Kristin Watson'}
            smallTextStyle={{}}
            titleTextStyle={{}}
          />

          <CommonButton
            buttonText={String.syncDevice}
            onPress={undefined}
            warperStyle={styles.syncDeviceButton}
            icon={true}
          /> */}
          <Pressable
            onPress={() => {
              navigation.navigate(ROUTES.SearchDeal);
            }}
            style={styles.serchWrapper}>
            <View style={[styles.searchIcon,{flexDirection:"row"}]}>
              <Search />
              <Text
              
              style={{paddingLeft:15,color:Colour.gray300}}>
                Search deals
              </Text>
            </View>
          </Pressable>

          <Heading
            leftText={String.centzBank}
            rightText={String.learnMore}
            onPress={() => {
              navigation.navigate(ROUTES.InfoGraphic);
            }}
            leftStyle={{}}
          />
          <View style={styles.balanceCardWrapper}>
            <BalanceCard amount={getAvailableBalance()} saving={0.00} />
          </View>
        </View>

        {/* <View style={{ backgroundColor: 'white'}}> */}
        {/* ...................Explore deals  Part .............. */}
        <Heading
          leftText={String.exploreDeals}
          rightText={String.allCategory}
          leftStyle={styles.bankText}
          Wrapperstyle={styles.marginExplore}
          onPress={() => {
            navigation.navigate(ROUTES.Survey);
          }}
        />
        {
          exploreDeals?.length > 0 &&
          < ScrollView
            scrollEnabled={true}
            horizontal={true}
            style={{ marginHorizontal: 8 }}
            showsHorizontalScrollIndicator={false}>
            {
              exploreDeals.map((item: any, key: number) => {
                const exploreDealsDetails: any = item?.merchant_id?.business_data
                  ?.category_id
                // const imagePath = `https://storage.googleapis.com/centavizer-pre-prod/category/`
                const category = 'category/'
                return (
                  <ImageBackground
                    key={key}
                    style={styles.labelWrapper}
                    borderRadius={14}
                    source={{ uri: `${imageStorageUrl + category + exploreDealsDetails?.catImage}` }}>
                    <View style={styles.circle}>
                      <View style={styles.glassIcon}>
                        <SelectCategory
                          selectIcon={true}
                          Icon={GetIcon(exploreDealsDetails?.name)}
                          IconName={exploreDealsDetails?.name}
                          iconColor={Colour?.PrimaryBlue}
                        />
                      </View>

                      <Text numberOfLines={1} style={styles.glassText}>
                        {exploreDealsDetails?.name}
                      </Text>
                    </View>
                  </ImageBackground>
                );
              })}
          </ScrollView>
        }

        {/* .............CupanCrad.................... */}
        <Heading
          leftText={String.featureDeal}
          rightText={String.allDeal}
          leftStyle={styles.bankText}
          Wrapperstyle={styles.marginDeal}
          onPress={undefined}
        />

        <CupanCard
          isDisable={true}
          showLabel={false}
          image={`${imageStorageUrl + businessbanner}${getFeatureBydealData?.getDealsByUser?.data[0]?.merchant_id?.business_data?.bannerImages}`}
          locationText={renderDistance}
          footText={'2000'}
          labelText={getFeatureBydealData?.getDealsByUser?.data[0]?.merchant_id?.business_data?.category_id?.name}
          title={getFeatureBydealData?.getDealsByUser?.data[0]?.merchant_id?.business_data?.businessName}
          subTitle={
            getFeatureBydealData?.getDealsByUser.data[0]?.merchant_id?.business_data?.businessDescription
          }
          // lineColor={Colour.peachyOrange}
          // roundColor={Colour.peachyOrange}
          LabelIcon={GetIcon(getFeatureBydealData?.getDealsByUser?.data[0]?.merchant_id?.business_data?.category_id?.name)}
          typeDiscount={getFeatureBydealData?.getDealsByUser?.data[0]?.discountType}
          startNavigationPress={() => { navigation.navigate(ROUTES.LocationOverView) }}
        />
        {/* .................greenBackground text................. */}
        {
          !userLoading && !getUserInformation?.me?.user?.trackerType ?
            <View style={styles.greenWrapper}>
              <Heading
                leftText={String.status}
                rightText={''}
                leftStyle={styles.bankText}
                lineStyle={styles.blue}
                Wrapperstyle={styles.marginGreenStats}
                onPress={undefined}
              />
              <Text style={styles.linkTracker}>{String.linkTracker}</Text>
              <View style={styles.syncWrapper}>
                <Text style={styles.syncDevice}>{String.syncDevice}</Text>
                <View style={styles.linkIcon}>
                  <Link width={13.26} height={13.26} color={'#00C2FF'} />
                </View>
              </View>
              <View style={styles.coloman}>
                <View style={[styles.heartIconsWrapper, { paddingLeft: 10 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      // appleHealthKitHandler()
                      navigation.navigate(ROUTES?.Synced);
                    }}
                    style={styles.iconWrapper}>
                    <AppleHelth width={60} height={60} />
                    <Text style={styles.text}>{String.appleHealth}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ROUTES?.Synced);
                    }}
                    style={[styles.iconWrapper, { paddingLeft: 15 }]}>
                    <GoogleFitIcon width={60} height={60} />
                    <Text style={[styles.text2]}>{String.googleFit}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ROUTES?.Synced);
                    }}
                    style={[styles.iconWrapper, { paddingLeft: 10 }]}>
                    <FitBit width={60} height={60} />
                    <Text style={[styles.text2]}>{String.fitbit}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES?.Synced)}
                    style={[styles.iconWrapper, { paddingLeft: 10 }]}>
                    <Samsung width={60} height={60} />
                    <Text style={[styles.text]}>{String.sumsungHelth}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            :
            <View style={styles.greenWrapper}>
              <Heading
                leftText={String.status}
                rightText={String.history}
                leftStyle={styles.bankText}
                rightStyle={styles.bankText}
                lineStyle={styles.blue}
                Wrapperstyle={styles.marginGreenStats}
                onPress={undefined}
              />

              <View style={styles.statsCard}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.cardWrapper}>
                    <View style={styles.footRow}>
                      <View style={styles.footWrapper}>
                        <Foot color={Colour.PrimaryBlue} />
                      </View>
                      <Text style={styles.footText}>Your Steps</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.greenText}>1000</Text>
                      <Text style={styles.blueText}>6432</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.todayText}>today</Text>
                      <Text style={styles.lastDayText}>Last 7 days</Text>
                    </View>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    {/* <BarChart
                      style={{ height: 100 }}
                      spacingInner={0.8}
                      spacingOuter={2}
                      gridMin={-10}
                      gridMax={120}
                      data={data6}
                      yAccessor={({ item }: any) => item.value}
                      xAccessor={({ item }: any) => item.label}
                      contentInset={{ top: 30, bottom: 10 }}> */}
                    {/* <XAxis
                  style={{marginTop: 10}}
                  data={data2}
                  scale={scale.scaleBand}
                  formatLabel={(value, index) => index}
                  //labelStyle={{color: 'black'}}
                /> */}
                    {/* </BarChart> */}
                  </View>
                </View>
                <View style={styles.logoWrapper}>
                  <View style={styles.logo}>
                    <Logo />
                  </View>

                  <Text style={styles.logoText}>
                    This week you’ve made $5.35 by walking.
                  </Text>
                </View>
              </View>

              <View style={styles.statsCard}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.cardWrapper}>
                    <View style={styles.footRow}>
                      <View
                        style={[
                          styles.footWrapper,
                          { backgroundColor: Colour.blueBarry },
                        ]}>
                        <Smiley />
                      </View>
                      <Text style={styles.footText}>Sleeping</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.greenText}>7</Text>
                      <Text style={styles.blueText}>43</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.todayText}>today</Text>
                      <Text style={styles.lastDayText}>Last 7 days</Text>
                    </View>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    {/* <BarChart
                      style={{ height: 100 }}
                      spacingInner={0.8}
                      spacingOuter={2}
                      gridMin={-10}
                      gridMax={120}
                      data={data6}
                      yAccessor={({ item }: any) => item.value}
                      xAccessor={({ item }: any) => item.label}
                      contentInset={{ top: 30, bottom: 10 }}>

                    </BarChart> */}
                  </View>
                </View>
                <View style={styles.logoWrapper}>
                  <View style={styles.logo}>
                    <Logo />
                  </View>

                  <Text style={styles.logoText}>
                    That’s $2.50, just for sleeping this week!
                  </Text>
                </View>
              </View>
            </View>
        }


        {/* ..............Favrite businesses........... */}
        <Heading
          leftText={String.businesses}
          rightText={String.seeAll}
          leftStyle={styles.bankText}
          Wrapperstyle={styles.marginBusinesses}
          onPress={undefined}
        />
        <ScrollView
          scrollEnabled={true}
          horizontal={true}
          style={styles.businessCard}
          showsHorizontalScrollIndicator={false}>
          {cardItems.map((item: any, index: number) => {
            return (
              <View key={index}>
                <BusinessesCard
                  image={item.image}
                  wrapperStyle={styles.businessCardWrapper}
                  Svg={item.svg}
                  title={item.title}
                  subTitle={item.subTitle}
                  dealText={item.dealText}
                />
              </View>

            );
          })}
        </ScrollView>
        {/* </View> */}

      </ScrollView >
      {loader && <Loder spinnerColor={Colour.primaryGreen} />}


      {
        isVisibleModal && (
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            blurType={'dark'}
            blurAmount={10}
            blurRadius={1}
            reducedTransparencyFallbackColor={Colour.cardBlur}>
            <LogOutModel
              isVisibleModal={isVisibleModal}
              title={String.resync}
              subtitle={String.selectCorrectTracker}
              buttonPress={() => setIsVisibleModal(!isVisibleModal)}
              iconBGColor={'rgba(82, 255, 154, 0.2)'}
              Svg={TrackerLink}
              buttonText={"Okay"}
            />
          </BlurView>
        )
      }
    </>

  );
};

export default Dashboard;
