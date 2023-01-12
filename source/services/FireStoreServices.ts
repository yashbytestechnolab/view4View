
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export function getUserID() {
  const userId = auth()?.currentUser?.uid;
  return userId
}

function getUniqID() {
  const newID = Math.random() * Date.now()
  const randomIdGenrate = newID?.toString()?.split(".")?.join("")
  return randomIdGenrate
}

export const UserListTable = firestore()?.collection('UserList')?.doc(getUserID()?.toString())
export const userTable = firestore()?.collection('users')?.doc(getUserID()?.toString())
export const userTableLogin = firestore()?.collection('users')
export const WatchVideoList = firestore()?.collection("campaign")
export const bytesVideoList = firestore()?.collection("bytes_video_list")
export const historyCampaign = firestore()?.collection("campaign_history")

export const userLogin = async (...payload: Array<object | string | undefined | any>) => {
  let fullname = payload[0]?.displayName == null ? payload[1] : payload[0]?.displayName;
  const space = fullname.indexOf(" ");
  const firstName = fullname.substring(0, space);
  const lastname = fullname.substring(space + 1);
  const getCurrentUserID = getUserID()
  return await userTableLogin.doc(getCurrentUserID).set({
    coin: 0,
    email: payload[0]?.email,
    userId: payload[0]?.uid,
    firstname: firstName?.length == 0 ? lastname : firstName,
    lastname: firstName?.length == 0 ? "" : lastname,
    videoUrl: '',
    image: payload[0]?.photoURL,
    watch_videos: [],
  })
}

export const get_coins = async () => {
  return await userTable?.get()
};
export const updateProfile = async (...payload: Array<object | string | undefined | any>) => {
  const space = payload[0].indexOf(" ");
  const firstName = payload[0].substring(0, space);
  const lastname = payload[0].substring(space + 1);
  return await userTable?.update({
    firstname: firstName,
    lastname: lastname,
    image: payload[1] != undefined && payload[1]
  })

}
export const createCampaign = async (...payload: Array<object | undefined | string | number>) => {
  let uniqID = getUniqID();
  let updateObj = {
    coin: payload[4],
    consumed_view: 0,
    created: firestore.FieldValue.serverTimestamp(),
    expected_view: payload[3],
    id: uniqID,
    remaining_view: payload[3],
    require_duration: payload[2],
    upload_by: getUserID(),
    video_Id: payload[1],
    video_url: payload[0],
    video_title: payload[5]
  }
  await WatchVideoList.doc(uniqID).set(updateObj)
  return updateObj
}

export const payCoin = async (payload: string) => {
  return await userTable?.update({
    coin: parseInt(payload) - 10,
  })
};

export const deleteRemainingVideo = async (payload: any) => {
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
  if (payload[3]) {
    return await userTable.update({
      coin: payload[2],
    })
  }
  else {
    return await userTable.update({
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
  let updateTable = params[5] ? bytesVideoList : WatchVideoList;
  if (params[1] != 1) {
    return await updateTable
      .doc(params[0]).update({
        remaining_view: params[1] - 1,
        consumed_view: parseInt(params[2]) + 1
      })
  }
  else {
    await WatchVideoList.doc(params[0]).update({ expected_view: params[4] })
    await WatchVideoList.doc(params[0]).delete()
    await deleteRemainingVideo(params[3])
  }

}

export const updateUserWallet = async (payload: number) => {
  userTableLogin.doc(getUserID()?.toString()).update({
    coin: payload
  })
  return payload
}


