import { View, Text, ScrollView, Image, TouchableOpacity, Platform, PermissionsAndroid, StatusBar, Alert, Linking, SafeAreaView } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import SamsungHealthAndroid from 'react-native-samsung-health-android'
import AppleHealthKit, { HealthValue, HealthKitPermissions, } from 'react-native-health'
import GoogleFit, { Scopes, BucketUnit, AuthorizeResponse } from 'react-native-google-fit';
import moment from 'moment';
import _ from 'lodash';
import qs from 'qs';
import { commonStyles } from '../../../constants/CommonStyles';
import { Images } from '../../../assets/images';
import { ROUTES, String } from '../../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { style } from './style';
import * as LocalStorage from '../../../services/LocalStorage';
import { LocalStorageKeys } from '../../../constants/LocalStorageKeys';
import { AppleHelth } from '../../../assets/icons/AppleHealth';
import { GoogleFit as GoogleFitIcon } from '../../../assets/icons/GoogleFit';
import { FitBit } from '../../../assets/icons/FitBit';
import { Samsung } from '../../../assets/icons/SamsungHelth';
import { Colour } from '../../../theme';
import { googleLogin } from '../SocailLogin';
import { UPDATE_TRACKER_TYPE, SET_USER_STEPS, SET_USER_SLEEP } from '../../../graphQL/Mutations';
import { Loder } from '../../../components/Loder';
import { appleLogin } from '../SocailLogin';

const FitnessTracker: FC = () => {
  const navigation: any = useNavigation();
  const [loader, setLoader] = useState(false);
  const [dailySteps, setdailySteps] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [calories, setCalories] = useState(0);
  const [hydration, setHydration] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bloodPressure, setBloodPressure] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateTrackerType] = useMutation(UPDATE_TRACKER_TYPE);
  const [setUserSteps] = useMutation(SET_USER_STEPS);
  const [setUserSleep] = useMutation(SET_USER_SLEEP);
  const route = useRoute();
  const { params }: any = route


  const getLocationData = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
          if (granted) {
            // watchLocation()
          }
          // if (granted && this.mounted) this.watchLocation();
        });
    } else {
      // watchLocation();
    }
  }
  useEffect(() => {
    getLocationData();
  }, [])

  const clientID = 'https://developers.google.com/fit/android/AIzaSyBAB16ryF45wjQ-kK0UDaiDFFVHEKjmD38'
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

  {/** GOOGLE FIT */ }
  const googleFitAuthHandler = (userTrackerId: string, authUserId: string) => {
    GoogleFit.checkIsAuthorized().then(async () => {
      const authorized = await GoogleFit.isAuthorized;
      if (authorized) {
        // if already authorized, fetch data
      } else {
        // Authentication if already not authorized for a particular device
        setLoader(true);
        GoogleFit.checkIsAuthorized()
          .then(() => {
            if (!GoogleFit.isAuthorized) {
              return GoogleFit.authorize(); // at first do GoogleFit.authorize(options)
            }
          })
          .then(async () => {
            let sleepData: any = await getSleepData(authUserId, userTrackerId);
            let stepsData: any = await stepsCount(authUserId, userTrackerId)
            if (sleepData?.data?.setUserSleep?.message == "success" && stepsData?.data?.setUserSteps?.message == "success") {
              updateTrackerType({
                variables: {
                  input: {
                    trackerType: 'googleFit',
                    trackerId: userTrackerId
                  }
                }
              }).then(async (res: any) => {
                setLoader(false);
                navigation.navigate(ROUTES?.Synced);
              })
            }
          });
      }
    }).catch(() => {
      setLoader(false);
    })
  }
  const getPastRangeDate = (range: number) => {
    let now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - range));
    startDate.setHours(0, 0, 0, 0);
    // startDate.setHours(startDate.getHours() - 5);
    startDate.toISOString();
    console.log("startDate==>", startDate);
    return startDate;
  }
  //my
  const stepsCount = async (authUserId: string, trackerId: string) => {
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
          .then((res) => {
            res[2].steps.map((step) => {
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
      startDate: getPastRangeDate(28), // required, timestamp or ISO8601 string
      endDate: new Date().toISOString(), // required, timestamp or ISO8601 string
    };

    const promise = new Promise(async (resolve, reject) => {
      try {
        //do something and return result on success
        let userSleep: any = [];
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
            reject(e)
          })
        })
      } catch (msg) { reject(msg); }
    });
    return promise;
  }

  const googleFitSyncHandler = () => {
    LocalStorage.getValue(LocalStorageKeys.userInfo).then(async (userInfo) => {
      const googleUserData = await googleLogin();
      let userTrackerId = googleUserData?.user?.id;
      let authUserId = userInfo?.user._id;
      await googleFitAuthHandler(userTrackerId, authUserId);
    })
  }

  {/** SAMSUNG HEALTH START*/ }
  const authorize = async () => {
    const permissions = [SamsungHealthAndroid.Types.Sleep, SamsungHealthAndroid.Types.StepCount];
    const allowed = await SamsungHealthAndroid.getPermissionAsync(permissions);
    if (allowed[SamsungHealthAndroid.Types.StepCount] && allowed[SamsungHealthAndroid.Types.Sleep]) {
      return allowed;
    }
    return SamsungHealthAndroid.askPermissionAsync(permissions);
  };

  const samsungHealthAuthHandler = async (userTrackerId: string, authUserId: string) => {
    try {
      const auth = await SamsungHealthAndroid.connect(__DEV__);
      if (auth) {
        const allowed = await authorize();
        if (allowed[SamsungHealthAndroid.Types.StepCount] && allowed[SamsungHealthAndroid.Types.Sleep]) {
          updateTrackerType({
            variables: {
              input: { trackerType: 'samsungHealth', trackerId: userTrackerId }
            }
          }).then(async (res) => {
            let sleepData: any = await getSamsumgSleepCount(authUserId, userTrackerId);
            let stepsData: any = await getSamsungStepsCount(authUserId, userTrackerId);
            if (sleepData?.data?.setUserSleep?.message == "success" && stepsData?.data?.setUserSteps?.message == "success") {
              setLoader(false);
              navigation.navigate(ROUTES?.Synced);
            }
          }).catch((e) => {
            setLoader(false);
            console.log('e', e)
          })
        } else {
          setLoader(false);
        }
      }
    } catch (error: any) {
      setLoader(false);
      Alert.alert(error?.message || 'Please use samsung device...')
    }
  }

  const getSamsumgSleepCount = async (authUserId: string, trackerId: string) => {
    const startTime = new Date();
    const endTime = new Date();

    startTime.setHours(0, 0, 0, 0);
    startTime.setDate(startTime.getDate() - 28);
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
          setUserSleep({
            variables: {
              input: {
                "user_id": authUserId,
                "sleep": userSleep,
                "trackerType": 'samsungHealth',
                "trackerId": trackerId
              }
            }
          }).then((res) => {
            resolve(res);
          }).catch((e) => {
            reject(e);
          })
        }
      } catch (msg) { reject(msg); }
    })

    return promise;
  }

  const getSamsungStepsCount = async (authUserId: string, trackerId: string) => {
    const startTime = new Date();
    const endTime = new Date();

    startTime.setHours(0, 0, 0, 0);
    startTime.setDate(startTime.getDate() - 28);
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
          const grouppedData = _(getWantedData).groupBy('date')?.map((getWantedData, date) => ({
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
          }).then((res) => {
            resolve(res);
          }).catch((e) => {
            reject(e);
          })
        }
      } catch (msg) { reject(msg); }
    })

    return promise;
  }

  const samsungSyncHandler = () => {
    LocalStorage.getValue(LocalStorageKeys.userInfo).then(async (userInfo) => {
      try {
        setLoader(true);
        const googleUserData = await googleLogin();
        let userTrackerId = googleUserData.user.id;
        let authUserId = userInfo.user._id;
        samsungHealthAuthHandler(userTrackerId, authUserId);
      } catch (error) {
        setLoader(false);
      }
    })
  }
  {/** SAMSUNG HEALTH FINISH*/ }

  {/** APPLE HEALTH START*/ }
  const appleHealthAuthHandler = (userTrackerId: string, authUserId: string) => {

    const permissions = {
      permissions: {
        read: [AppleHealthKit.Constants.Permissions.StepCount, AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.SleepAnalysis, AppleHealthKit.Constants.Permissions.DistanceWalkingRunning, AppleHealthKit.Constants.Permissions.ActiveEnergyBurned],
        write: []
      },
    } as HealthKitPermissions

    AppleHealthKit.isAvailable((err: Object, available: boolean) => {
      if (err) {
        console.log('error initializing Healthkit: ', err)
        setLoader(false);
        return
      }
      if (available) {
        AppleHealthKit.initHealthKit(permissions, async (error: string) => {
          if (error) {
            console.log('[ERROR] Cannot grant permissions!')
            setLoader(false);
            return error
          }
          updateTrackerType({
            variables: {
              input: {
                trackerType: 'appleHealth',
                trackerId: userTrackerId
              }
            }
          }).then(async (res) => {
            console.log('AUTH_SUCCESS');
            try {
              LocalStorage.setValue(LocalStorageKeys.appleTrackerId, userTrackerId);
              let sleepData: any = await getAppleSleepCount(authUserId, userTrackerId);
              let stepsData: any = await getAppleStepsCount(authUserId, userTrackerId)
              if (sleepData?.data?.setUserSleep?.message == "success" && stepsData?.data?.setUserSteps?.message == "success") {
                setLoader(false);
                navigation.navigate(ROUTES?.Synced);
              }
            } catch (error) {
              setLoader(false);
            }
          }).catch(() => {
            setLoader(false);
          });
        })
      }
    })
  }

  const getAppleDistanceCount = async () => {
    let now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - 28));
    startDate.setHours(0, 0, 0, 0);

    const options: any = {
      startDate: startDate.toISOString(), // required ISO8601Timestamp
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
    let now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - 28));
    startDate.setHours(0, 0, 0, 0);

    const options: any = {
      startDate: startDate.toISOString(), // required ISO8601Timestamp
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

  const getAppleStepsCount = async (authUserId: string, trackerId: string) => {
    let now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - 28));
    startDate.setHours(0, 0, 0, 0);

    const options: any = {
      startDate: startDate.toISOString(), // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
    };

    const userDistance: any = await getAppleDistanceCount();
    const userEnergy: any = await getAppleEnergyCount();

    const promise = new Promise(async (resolve, reject) => {
      try {
        AppleHealthKit.getDailyStepCountSamples(options, (err: Object, results: any) => {
          const getWantedData = results && results.map((a: any) => { return { value: a.value, date: moment(a.endDate).add(-1, 'm').format('YYYY-MM-DD') } })
          let userSteps: any = _(getWantedData).groupBy('date')?.map((getWantedData, date) => ({
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

  const getAppleSleepCount = async (authUserId: string, trackerId: string) => {

    let now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - 28));
    startDate.setHours(0, 0, 0, 0);

    const sleepOptions: any = {
      startDate: startDate.toISOString(), // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
      ascending: true,
    };

    const promise = new Promise(async (resolve, reject) => {
      try {
        let userSleep: any = [];
        AppleHealthKit.getSleepSamples(sleepOptions, (err: Object, results: Array<HealthValue>) => {
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
          }).then((res) => {
            resolve(res);
          }).catch(e => {
            reject(e)
          })
        })
      } catch (msg) { reject(msg); }
    });
    return promise;
  }

  const appleHealthKitHandler = async () => {
    LocalStorage.getValue(LocalStorageKeys.userInfo).then(async (userInfo) => {
      try {
        setLoader(true);
        const appleUserData = await appleLogin();
        let userTrackerId = appleUserData.user.id;
        let authUserId = userInfo.user._id;
        appleHealthAuthHandler(userTrackerId, authUserId);
      } catch (error) {
        setLoader(false);
      }
    })
  }
  {/* APPLE HEALTH FINISH */ }

  {/** FITBIT  START*/ }

  function fitbitSyncHandler() {
    LocalStorage.getValue(LocalStorageKeys.userInfo).then(async (userInfo) => {
      try {
        setLoader(true);
        const googleUserData = await googleLogin();
        let userTrackerId = googleUserData.user.id;
        let authUserId = userInfo.user._id;
        OAuth('238WFR', userTrackerId, authUserId);
      } catch (error) {
        setLoader(false);
      }
    })
  }

  async function OAuth(client_id: any, userTrackerId: any, authUserId: any) {
    Linking.addEventListener('url', handleUrl);
    function handleUrl(event: any) {
      Linking.removeEventListener('url', handleUrl);
      const [, query_string] = event.url.match(/\#(.*)/);
      const query = qs.parse(query_string);
      fitBitAuthHandler(query['access_token'], query?.user_id, userTrackerId, authUserId);
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

  const fitBitAuthHandler = (access_token: any, userId: any, userTrackerId: string, authUserId: string) => {
    updateTrackerType({
      variables: {
        input: {
          trackerType: 'fitbit',
          trackerId: userTrackerId
        }
      }
    }).then(async (res) => {
      await LocalStorage.setValue(LocalStorageKeys.fitbitAccessToken, access_token);
      await LocalStorage.setValue(LocalStorageKeys.fitbitUserId, userId);
      let stepsData: any = await getFitBitSteps(access_token, userId, userTrackerId, authUserId)
      let sleepData: any = await getFitBitSleeps(access_token, userId, userTrackerId, authUserId);
      if (sleepData?.data?.setUserSleep?.message == "success" && stepsData?.data?.setUserSteps?.message == "success") {
        navigation.navigate(ROUTES?.Synced);
      }
      setLoader(false);
    }).catch(() => {
      setLoader(false);
    });
  }

  async function getFitBitEnergyCount(access_token: string, userId: string) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        fetch(`https://api.fitbit.com/1/user/${userId}/activities/calories/date/${moment().subtract(28, 'days').format('YYYY-MM-DD')}/${moment().format('YYYY-MM-DD')}.json`, {
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

  async function getFitBitDistanceCount(access_token: string, userId: string) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        fetch(`https://api.fitbit.com/1/user/${userId}/activities/distance/date/${moment().subtract(28, 'days').format('YYYY-MM-DD')}/${moment().format('YYYY-MM-DD')}.json`, {
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
    const userDistance: any = await getFitBitDistanceCount(access_token, userId);
    const userEnergy: any = await getFitBitEnergyCount(access_token, userId);

    const promise = new Promise(async (resolve, reject) => {
      try {
        fetch(`https://api.fitbit.com/1/user/${userId}/activities/steps/date/${moment().subtract(28, 'days').format('YYYY-MM-DD')}/${moment().format('YYYY-MM-DD')}.json`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then(res => res.json())
          .then(res => {
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
    const promise = new Promise(async (resolve, reject) => {
      try {
        fetch(`https://api.fitbit.com/1/user/${userId}/sleep/list.json?afterDate=${moment().subtract(28, 'days').format('YYYY-MM-DD')}&sort=asc&offset=0&limit=100`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }).then(res => res.json())
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
          }).catch(err => {
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

  {/** FITBIT FINISH*/ }

  return (
    <>
      <StatusBar barStyle={String.lightContent} backgroundColor={Colour?.PrimaryBlue} />
      <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colour.PrimaryBlue }} >
        <ScrollView
          style={commonStyles.blueBackGround}
          contentContainerStyle={style.main}>
          <View>
            <Image source={Images.sync} style={style.image} />
            <Text style={commonStyles.title}>{String.fitnessTracker}</Text>
            <View style={style.subtext}>
              <Text style={commonStyles.subText}>
                {String.tracker.t1}
                <Text style={style.greenAmount}>{`\n` + String.tracker.t2}</Text>
                <Text> {String.tracker.t3}</Text>
              </Text>
            </View>
            <Text style={commonStyles.subTitle}>{String.syncTracer}</Text>
            <View style={style.coloman}>
              <View style={[style.heartIconsWrapper]}>
                {Platform.OS == 'ios' && <TouchableOpacity
                  style={[style.itemWrapperStyle, { marginTop: 40 }]}
                  onPress={() => appleHealthKitHandler()}>
                  <AppleHelth width={60} height={60} />
                  <Text style={style.text}>{String.appleHealth}</Text>
                </TouchableOpacity>
                }

                {Platform.OS != 'ios' &&
                  <TouchableOpacity
                    onPress={googleFitSyncHandler}
                    style={style.itemWrapperStyle}>
                    <GoogleFitIcon width={60} height={60} />
                    <Text style={[style.text2]}>{String.googleFit}</Text>
                  </TouchableOpacity>
                }

                <TouchableOpacity
                  onPress={fitbitSyncHandler}
                  style={style.itemWrapperStyle}>
                  <FitBit width={60} height={60} />
                  <Text style={[style.text2]}>{String.fitbit}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => samsungSyncHandler()}
                  style={[style.itemWrapperStyle, { marginTop: 40 }]}>
                  <Samsung width={60} height={60} />
                  <Text style={[style.text]}>{String.sumsungHelth}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text
              onPress={() => {
                LocalStorage.setValue(LocalStorageKeys.syncWatchSkip, 'yes');
                params?.fromProfileEdit ? navigation.navigate(ROUTES.ProfileSetting, { userInfo: params?.userInfo }) :
                  navigation.navigate(ROUTES.TabNavigation);
              }}
              style={style.skipText}>
              {params?.fromProfileEdit ? String.back : String.skip}
            </Text>
          </View>
        </ScrollView>
        {loader && <Loder spinnerColor={Colour.primaryGreen} />}
      </SafeAreaView>
    </>
  );
};
export default FitnessTracker;
