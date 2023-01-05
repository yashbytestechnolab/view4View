
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userId = auth()?.currentUser?.uid;

function getUniqID() {
  const newID = Math.random() * Date.now()
  const randomIdGenrate = newID?.toString()?.split(".")?.join("")
  return randomIdGenrate
}

export const UserListTable = firestore()?.collection('UserList')?.doc(userId?.toString())

export const WatchVideoList = firestore()?.collection("campaign")

export const loginUser = async (payload: { email: string; uid: string; }, userName: string) => {
  return await UserListTable.set({
    email: payload?.email,
    userId: payload?.uid,
    coin: 0,
    videoUrl: '',
    isWatchVideoId: [],
    userName: userName
  })

}
export const get_coins = async () => {
  return await UserListTable?.get()
};

export const createCampaign = async (...payload: Array<object | undefined | string | number>) => {
  let uniqID = getUniqID();
  let updateObj = {
    coin: payload[4],
    consumed_view: 0,
    created: firestore.FieldValue.serverTimestamp(),
    expected_view: payload[3],
    remaining_view: payload[3],
    require_duration: payload[2],
    id: uniqID,
    upload_by: userId,
    video_Id: payload[1],
    video_url: payload[0],
  }
  await WatchVideoList.doc(uniqID).set(updateObj)
  return updateObj
}

export const payCoin = async (payload: string) => {
  return await UserListTable?.update({
    coin: parseInt(payload) - 10,
  })
};

export const GetVideoCampaign = async () => {
  console.log("userId",userId);
  return await WatchVideoList.where("upload_by", "==", userId?.toString())?.get()
}

export const addWatchUrl = async (payload: { totalAmount: string | number; getWatchUniqId: string; getVideoId: string | number; }) => {
  return await UserListTable.update({
    coin: payload?.totalAmount,
    isWatchVideoId: [...payload.getWatchUniqId, payload?.getVideoId]
  })

}
export const getPlayVideoList = async () => {
  return await WatchVideoList
    .where("remiderView", ">", 0)
    .get()
}

export const getNewUpdatedViewCount = async (payload: { getVideoId: string; remiderView: number; }) => {
  return await WatchVideoList
    .doc(payload?.getVideoId).update({
      remiderView: payload?.remiderView - 1
    })
}


