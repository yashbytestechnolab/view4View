
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { referral_coupon_genrator } from './refeeral_coupon_genrate';
import { notificationSend } from './notificationSend';
import { person } from '../modules/View/increment';

export function getUserID() {
  const userId = auth()?.currentUser?.uid;
  return userId
}

function getUniqID() {
  const newID = Math.random() * Date.now()
  const randomIdGenrate = newID?.toString()?.split(".")?.join("")
  return randomIdGenrate
}

export const userTable = firestore()?.collection('users')
export const userLogout = firestore()?.collection('users')
export const userTableLogin = firestore()?.collection('users')
export const WatchVideoList = firestore()?.collection("campaign")
export const bytesVideoList = firestore()?.collection("bytes_video_list")
export const historyCampaign = firestore()?.collection("campaign_history")

export const userLogin = async (...payload: Array<object | string | undefined | any>) => {
  let referralCode = referral_coupon_genrator("ASECFD14275GIZX")
  const getCurrentUserID = getUserID()
  console.log("payload", payload);

  return await userTableLogin.doc(getCurrentUserID).set({
    coin: 0,
    email: payload[0]?.email,
    userId: payload[0]?.uid,
    firstname: payload[0]?.firstname,
    lastname: payload[0]?.lastname,
    videoUrl: payload[0]?.videoUrl,
    image: payload[0]?.image,
    watch_videos: payload[0]?.watch_videos,
    referral_code: referralCode,
    device_token: payload[0]?.device_token,
    device_type: payload[0]?.device_type
  })
}

export const get_coins = async () => {
  const userId = getUserID()?.toString()
  return await userLogout?.doc(userId)?.get()
};

export const userDeatil = async () => {
  const userId = await getUserID()?.toString()
  return await (await userTableLogin.doc(userId).get()).data()
}

export const updateProfile = async (...payload: Array<object | string | undefined | any>) => {

  const space = payload[0].indexOf(" ");
  const firstName = payload[0].substring(0, space);
  const lastname = payload[0].substring(space + 1);
  const userId = await getUserID()?.toString()

  await userTable?.doc(userId).update({
    firstname: firstName,
    lastname: lastname,
    image: payload[1] != undefined && payload[1]
  })
  return { firstName, lastname }
}
export const createCampaign = async (...payload: Array<object | undefined | string | number>) => {
  let uniqID = getUniqID();
  let userID = getUserID()

  let updateObj = {
    coin: payload[4],
    consumed_view: 0,
    device_token: payload[6],
    created: firestore.FieldValue.serverTimestamp(),
    expected_view: payload[3],
    id: uniqID,
    remaining_view: payload[3],
    require_duration: payload[2],
    upload_by: userID,
    video_Id: payload[1],
    video_url: payload[0],
    video_title: payload[5]
  }
  await WatchVideoList.doc(uniqID).set(updateObj)
  return updateObj
}

export const payCoin = async (payload: string) => {
  const userId = await getUserID()?.toString()

  return await userTable?.doc(userId)?.update({
    coin: parseInt(payload) - 10,
  })
};
export const EarnCoin = async (...payload: Array<number | any>) => {
  // payload[0]=coin payload[1]=rewardAmt 
  const userId = await getUserID()?.toString()
  return await userTable?.doc(userId)?.update({
    coin: parseInt(payload[0]) + payload[1],
  })
};

export const deleteRemainingVideo = async (payload: any) => {
  (payload?.device_token?.length > 0 && person?.devicesPermission) && (await notificationSend(payload?.device_token, `Your campaign ${`"${payload?.video_title}"`} has been completed.`, "Campaign Completed"))
  return await historyCampaign?.add(payload)
}


export const bytesVideoListData = async (...params: Array<any>) => {
  if (Object.keys(params[0]).length > 0) {
    return await bytesVideoList.orderBy("created", "desc").startAfter(params[0]).limit(2).get().then((res: any) => res?._docs).catch((err: any) => err)
  }
  else {
    return await bytesVideoList.orderBy("created", "desc").limit(2).get().then((res: any) => res?._docs).catch((err: any) => err)
  }
}

export const GetVideoCampaign = async () => {
  return await WatchVideoList?.orderBy("created", "desc")?.where("upload_by", "==", getUserID()?.toString())?.get()
}

export const deleteRemaining = async (payload: string | number | any) => {
  await WatchVideoList.doc(payload).delete()
}

export const campaignHistory = async () => {
  return await historyCampaign?.orderBy("created", "desc")?.where('upload_by', "==", getUserID()?.toString()).get().then((res: any) => res?._docs?.map((item: any) => item?._data))
}

export const addWatchUrl = async (...payload: Array<any | object>) => {
  const userId = await getUserID()?.toString()
  if (payload[3]) {
    return await userTable?.doc(userId)?.update({
      coin: payload[2],
    })
  }
  else {
    return await userTable?.doc(userId)?.update({
      coin: payload[2],
      watch_videos: payload[0]?.length > 0 ? [...payload[0], payload[1]] : [payload[1]]
    })
  }
}
export const getPlayVideoList = async (docId: any) => {

  if (Object.keys(docId)?.length > 0) {
    return await WatchVideoList?.orderBy("created", "asc").startAfter(docId).limit(5)?.get()
  }
  else {
    return await WatchVideoList?.orderBy("created", "asc")?.limit(5).get()
  }
}


export const getNewUpdatedViewCount = async (...params: Array<string | [] | undefined | object | number | any>) => {
  // prams[0]:id,prams[1] :remaining_view ,prams[2]:consumed_view,prams[3] :expected_view ,prams[4]:videoData:prams[5] :isBytesVideoLoading ,params[6]:token
  let updateTable = params[5] ? bytesVideoList : WatchVideoList;
  if (params[1] != 1) {
    return await updateTable
      .doc(params[0]).update({
        remaining_view: params[1] - 1,
        consumed_view: parseInt(params[2]) + 1
      })
  }
  else {
    const history = { ...params[4], consumed_view: params[3], remaining_view: 0 }
    await WatchVideoList.doc(params[0]).delete()
    await deleteRemainingVideo(history)
  }
}


export const updateUserWallet = async (payload: number) => {
  let userID = getUserID()?.toString()
  userTableLogin.doc(userID).update({
    coin: payload
  })
  return payload
}

export const referralEarning = async (params: string, referReward: number) => {
  await userTableLogin.where("referral_code", "==", params).get().
    then(async (foo: any) => {
      if (foo?._docs?.length > 0) {
        let { coin, userId, device_token } = foo?._docs[0]?._data
        await userTableLogin.doc(userId).update({ coin: coin + referReward || 300 })
        // This function Will Push notification for user he recvied 300 coin end other
        person?.devicesPermission && (await notificationSend(device_token, `congratulation you recives ${referReward || 300} coins`, "Reward"))
      }
    }).catch((err: any) => console.log("error", err))
}

// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import { referral_coupon_genrator } from './refeeral_coupon_genrate';
// import { Platform } from 'react-native';

// export function getUserID() {
//   const userId = auth()?.currentUser?.uid;
//   return userId
// }

// function getUniqID() {
//   const newID = Math.random() * Date.now()
//   const randomIdGenrate = newID?.toString()?.split(".")?.join("")
//   return randomIdGenrate
// }

// export const UserListTable = firestore()?.collection('UserList')?.doc(getUserID()?.toString())
// export const userTable = firestore()?.collection('users')?.doc(getUserID()?.toString())
// export const userLogout = firestore()?.collection('users')
// export const userTableLogin = firestore()?.collection('users')
// export const WatchVideoList = firestore()?.collection("campaign")
// export const bytesVideoList = firestore()?.collection("bytes_video_list")
// export const historyCampaign = firestore()?.collection("campaign_history")

// export const userLogin = async (...payload: Array<object | string | undefined | any>) => {
//   let referralCode = referral_coupon_genrator("ASECFD14275GIZX")
//   let fullname = payload[0]?.displayName == null ? payload[1] : payload[0]?.displayName;
//   const space = fullname.indexOf(" ");
//   const firstName = fullname.substring(0, space);
//   const lastname = fullname.substring(space + 1);
//   const getCurrentUserID = getUserID()
//   const email = payload[0]?.email
//   const iosFirstName = email.split("@");
//   return await userTableLogin.doc(getCurrentUserID).set({
//     coin: 0,
//     email: payload[0]?.email,
//     userId: payload[0]?.uid,
//     firstname: Platform?.OS == 'ios' ? iosFirstName[0] : firstName?.length == 0 ? lastname : firstName,
//     lastname: firstName?.length == 0 ? "" : lastname,
//     videoUrl: '',
//     image: payload[0]?.photoURL,
//     watch_videos: [],
//     referral_code: referralCode
//   })
// }

// export const get_coins = async () => {
//   const userId = getUserID()?.toString()
//   return await userLogout?.doc(userId)?.get()
// };

// export const userDeatil = async () => {
//   const userId = await getUserID()?.toString()
//   return await (await userTableLogin.doc(userId).get()).data()
// }

// export const updateProfile = async (...payload: Array<object | string | undefined | any>) => {
//   const space = payload[0].indexOf(" ");
//   const firstName = payload[0].substring(0, space);
//   const lastname = payload[0].substring(space + 1);
//   await userTable?.update({
//     firstname: firstName,
//     lastname: lastname,
//     image: payload[1] != undefined && payload[1]
//   })
//   return { firstName, lastname }
// }
// export const createCampaign = async (...payload: Array<object | undefined | string | number>) => {
//   let uniqID = getUniqID();
//   let userID = getUserID()
//   let updateObj = {
//     coin: payload[4],
//     consumed_view: 0,
//     created: firestore.FieldValue.serverTimestamp(),
//     expected_view: payload[3],
//     id: uniqID,
//     remaining_view: payload[3],
//     require_duration: payload[2],
//     upload_by: userID,
//     video_Id: payload[1],
//     video_url: payload[0],
//     video_title: payload[5]
//   }
//   await WatchVideoList.doc(uniqID).set(updateObj)
//   return updateObj
// }

// export const payCoin = async (payload: string) => {
//   return await userTable?.update({
//     coin: parseInt(payload) - 10,
//   })
// };
// export const EarnCoin = async (payload: string) => {
//   console?.log(payload)
//   return await userTable?.update({
//     coin: parseInt(payload) + 100,
//   })
// };

// export const deleteRemainingVideo = async (payload: any) => {
//   return await historyCampaign?.add(payload)
// }


// export const bytesVideoListData = async (...params: Array<any>) => {
//   if (Object.keys(params[0]).length > 0) {
//     return await bytesVideoList.orderBy("created", "desc").startAfter(params[0]).limit(2).get().then((res: any) => res?._docs).catch((err: any) => err)
//   }
//   else {
//     return await bytesVideoList.orderBy("created", "desc").limit(2).get().then((res: any) => res?._docs).catch((err: any) => err)
//   }
// }

// export const GetVideoCampaign = async () => {
//   return await WatchVideoList?.orderBy("created", "desc")?.where("upload_by", "==", getUserID()?.toString())?.get()
// }

// export const deleteRemaining = async (payload: string | number | any) => {
//   await WatchVideoList.doc(payload).delete()
// }

// export const campaignHistory = async () => {
//   return await historyCampaign?.orderBy("created", "desc")?.where('upload_by', "==", getUserID()?.toString()).get().then((res: any) => res?._docs?.map((item: any) => item?._data))
// }

// export const addWatchUrl = async (...payload: Array<any | object>) => {
//   if (payload[3]) {
//     return await userTable.update({
//       coin: payload[2],
//     })
//   }
//   else {
//     return await userTable.update({
//       coin: payload[2],
//       watch_videos: payload[0]?.length > 0 ? [...payload[0], payload[1]] : [payload[1]]
//     })
//   }
// }
// export const getPlayVideoList = async (docId: any) => {

//   if (Object.keys(docId)?.length > 0) {
//     return await WatchVideoList?.orderBy("created", "asc").startAfter(docId).limit(5)?.get()
//   }
//   else {
//     return await WatchVideoList?.orderBy("created", "asc")?.limit(5).get()
//   }
// }


// export const getNewUpdatedViewCount = async (...params: Array<string | [] | undefined | object | number | any>) => {
//   let updateTable = params[5] ? bytesVideoList : WatchVideoList;
//   if (params[1] != 1) {
//     return await updateTable
//       .doc(params[0]).update({
//         remaining_view: params[1] - 1,
//         consumed_view: parseInt(params[2]) + 1
//       })
//   }
//   else {
//     const history = { ...params[4], consumed_view: params[3], remaining_view: 0 }
//     await WatchVideoList.doc(params[0]).delete()
//     await deleteRemainingVideo(history)
//   }

// }

// export const updateUserWallet = async (payload: number) => {
//   let userID = getUserID()?.toString()
//   userTableLogin.doc(userID).update({
//     coin: payload
//   })
//   return payload
// }


// export const referralEarning = async (params: string) => {
//   await userTableLogin.where("referral_code", "==", params).get().
//     then(async (foo: any) => {
//       if (foo?._docs?.length > 0) {
//         let { coin, userId } = foo?._docs[0]?._data
//         await userTableLogin.doc(userId).update({ coin: coin + 300 })
//       }
//     }).catch((err: any) => console.log("error", err))
// }