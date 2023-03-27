
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { referral_coupon_genrator } from './refeeral_coupon_genrate';
import { notificationSend } from './notificationSend';
import { person } from '../modules/View/increment';
import { String } from '../constants';
import { Anaylitics } from '../constants/analytics';
import { updatCampaignData } from '../modules/View/interface';
import { createCampaignRequest } from '../modules/MyCampaign';
const { congratulations, coins, Reward, completed, campaignCompleted } = String.Notification

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
    device_type: payload[0]?.device_type,
    // auto_play: false,
    // remaining_time: 1800
  })
}

export const userSession = async (token: string | number) => {
  const getCurrentUserID = getUserID()
  await userTable.doc(getCurrentUserID).set({ last_open: firestore.FieldValue.serverTimestamp(), device_token: token }, { merge: true })
}

export const setSessionAndAutoPlay = async (...payload: Array<object | string | undefined | any>) => {
  const getCurrentUserID = getUserID()
  await userTable.doc(getCurrentUserID).set({ last_open: firestore.FieldValue.serverTimestamp(), remaining_time: payload[0], auto_play: true }, { merge: true })
}

export const setAutoPlayAndTime = async (...payload: Array<object | string | undefined | any>) => {
  const getCurrentUserID = getUserID()
  await userTable.doc(getCurrentUserID).set({ auto_play: payload[0], remaining_time: payload[1] }, { mergeFields: ["auto_play", "remaining_time"] })
}

export const setAutoPlayAndTimeForAds = async (...payload: Array<object | string | undefined | any>) => {
  const getCurrentUserID = getUserID()
  await userTable.doc(getCurrentUserID).set({ auto_play: payload[0], remaining_time: payload[1], ads_watch: payload[2] }, { merge: true })
}

export const setAutoPlay = async (...payload: Array<object | string | undefined | any>) => {
  const getCurrentUserID = getUserID()
  await userTable.doc(getCurrentUserID).set({ auto_play: payload[0] }, { merge: true })
}

export const get_coins = async () => {
  const userId = getUserID()?.toString()
  return await userLogout?.doc(userId)?.get()
};

export const userDeatil = async () => {
  const userId = getUserID()?.toString()
  return await (await userTableLogin.doc(userId).get()).data()
}

export const updateProfile = async (payload: editProfile) => {
  const { fullName, image } = payload
  const space = fullName.indexOf(" ");
  const firstName = fullName.substring(0, space);
  const lastname = fullName.substring(space + 1);
  const userId = getUserID()?.toString()

  await userTable?.doc(userId).update({
    firstname: firstName,
    lastname: lastname,
    image: image != undefined && image
  })
  return { firstName, lastname }
}

export const createCampaign = async (payload: createCampaignRequest) => {
  const { addVideoUrl = "", splitUrl = "", timeSecond = 0, views = 0, totalCost = 0, thumbnail_url = "", title = "", token = "" } = payload

  let uniqID = getUniqID();
  let userID = getUserID()

  let updateObj = {
    coin: totalCost,
    consumed_view: 0,
    device_token: token,
    created: firestore.FieldValue.serverTimestamp(),
    expected_view: views,
    id: uniqID,
    remaining_view: views,
    require_duration: timeSecond,
    upload_by: userID,
    youtube_video_id: splitUrl,
    video_url: addVideoUrl,
    video_title: title,
    thumbnail_url: thumbnail_url,
    user_views: [userID]
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
export const EarnCoin = async (payload: rewardShare) => {
  const { getBalance = 0, adsCount = 0, reward = 0 }: rewardShare = payload
  const userId = getUserID()?.toString()
  return await userTable?.doc(userId)?.set({
    coin: Number(getBalance) + Number(reward),
    ads_watch: Number(adsCount || 0) + 1
  }, { mergeFields: ["coin", "ads_watch"] })
};

export const getUserToken = async (id?: string | any) => {
  return (await userTableLogin.doc(id).get()).data()
}

export const deleteRemainingVideo = async (payload: any, id: string | any) => {
  const userToken = await getUserToken(id);
  (userToken?.device_token?.length > 0) && (await notificationSend(userToken?.device_token, campaignCompleted(payload?.video_title), completed))
  return await historyCampaign?.add(payload)
}


export const bytesVideoListData = async (params: Array<any>) => {
  if (Object.keys(params).length > 0) {
    return await bytesVideoList.orderBy("created", "desc").startAfter(params).limit(2).get().then((res: any) => res?._docs).catch((err: any) => err)
  }
  else {
    return await bytesVideoList.orderBy("created", "desc").limit(2).get().then((res: any) => res?._docs).catch((err: any) => err)
  }
}

export const GetVideoCampaign = async () => {
  return await WatchVideoList?.orderBy("created", "desc")?.where("upload_by", "==", getUserID()?.toString())?.get()
}

export const GetCurrentPlayCampaign = async (id: number | string, isBytesVideoLoading: boolean) => {
  const getVideoDataById = isBytesVideoLoading ? bytesVideoList : WatchVideoList
  return await getVideoDataById?.doc(id)?.get()
}

export const deleteRemaining = async (payload: string | number | any) => {
  await WatchVideoList.doc(payload).delete()
}

export const campaignHistory = async () => {
  return await historyCampaign?.orderBy("created", "desc")?.where('upload_by', "==", getUserID()?.toString()).get().then((res: any) => res?._docs?.map((item: any) => item?._data))
}

export const newAddWatchUrl = async (coin: number | string, countVideo: number | string) => {
  const userId = getUserID()?.toString()
  return await userTable?.doc(userId)?.set({
    coin: coin,
    video_watch_count: Number(countVideo) + 1,
  }, { mergeFields: ["video_watch_count", "coin"] })
}

// export const addWatchUrl = async (...payload: Array<any | object>) => {
//   const userId = getUserID()?.toString()
//   if (payload[3]) {
//     return await userTable?.doc(userId)?.update({
//       coin: payload[2],
//     })
//   }
//   else {
//     return await userTable?.doc(userId)?.update({
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

export const getUnkonwnCampaign = async (docId: any) => {
  if (Object.keys(docId)?.length > 0) {
    return await WatchVideoList?.orderBy("created", "asc").startAfter(docId).limit(5)?.get()
  }
  else {
    return await WatchVideoList?.orderBy("created", "asc")?.limit(5).get()
  }
}

export const updateCampaignViews = async (params: updatCampaignData) => {
  let { addFiled, id, remaining_view, consumed_view, expected_view, videoData, isBytesVideoLoading, getAppendUserId, upload_by, videoWatchUpdateCount }: any = params
  let updateTable = isBytesVideoLoading ? bytesVideoList : WatchVideoList;
  if (remaining_view != 1) {
    if (addFiled) {
      return await updateTable
        .doc(id).set({
          remaining_view: remaining_view - 1,
          consumed_view: parseInt(consumed_view) + 1,
          // user_views: getAppendUserId,
        }, { mergeFields: ["remaining_view", "consumed_view"] })
    } else {
      return await updateTable
        .doc(id).update({
          remaining_view: remaining_view - 1,
          consumed_view: parseInt(consumed_view) + 1,
          // user_views: getAppendUserId,
        })
    }
  }
  else {
    const history = { ...videoData, consumed_view: expected_view, remaining_view: 0 }
    await WatchVideoList.doc(id).delete()
    await deleteRemainingVideo(history, upload_by)
  }
}

// export const getNewUpdatedViewCount = async (...params: Array<string | [] | undefined | object | number | any>) => {
//   // prams[0]:id,prams[1] :remaining_view ,prams[2]:consumed_view,prams[3] :expected_view ,prams[4]:videoData:prams[5] :isBytesVideoLoading ,params[6]:token
//   let updateTable = params[5] ? bytesVideoList : WatchVideoList;
//   if (params[1] != 1) {
//     return await updateTable
//       .doc(params[0]).update({
//         remaining_view: params[1] - 1,
//         consumed_view: parseInt(params[2]) + 1,
//       })
//   }
//   else {
//     const history = { ...params[4], consumed_view: params[3], remaining_view: 0 }
//     await WatchVideoList.doc(params[0]).delete()
//     await deleteRemainingVideo(history)
//   }
// }


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
        let { coin, userId, device_token }: any = foo?._docs[0]?._data
        await userTableLogin.doc(userId).update({ coin: coin + referReward || 300 })
        Anaylitics("referral earn", { user_id: userId, current_user_coin: coin, earnreferral_coin: coin + referReward });
        // This function Will Push notification for user he recvied 300 coin end other
        device_token?.length > 0 && (await notificationSend(device_token, `${congratulations} ${referReward || 300} ${coins}`, `${Reward}`))
      }
    }).catch((err: any) => console.log("error", err))
}


export const getCampaign = async () => {
  let userID = getUserID()
  return await WatchVideoList?.where("upload_by", "==", userID).get()
}

export const deleteAccoutCampaign = async (deleteId: number | string | any) => {
  await WatchVideoList.doc(deleteId).delete()
}

export const firebaseAccountDelete = async () => {
  let userID = getUserID()
  Anaylitics("delete_account_user", { delete_id: userID })
  await userTable.doc(userID).delete()
}