
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userId = auth()?.currentUser?.uid;

export const UserListTable = firestore()?.collection('UserList')?.doc(userId?.toString())
export const userTable = firestore()?.collection('users')?.doc(userId?.toString())

export const WatchVideoList = firestore()?.collection("campaign")

//   })

// }
export const userLogin = async (...payload: Array<object | string | undefined>) => {
  let fullname = payload[0]?.displayName == null ? payload[1] : payload[0]?.displayName;
  const space = fullname.indexOf(" ");
  const firstName = fullname.substring(0, space);
  const lastname = fullname.substring(space + 1);

  return await userTable.set({
    coin: 0,
    email: payload[0]?.email,
    userId: payload[0]?.uid,
    firstname: firstName,
    lastname: lastname,
    videoUrl: '',
    image: payload[0]?.photoURL,
    watch_videos: [],

  })

}
export const get_coins = async () => {
  return await userTable?.get()
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
  return await userTable?.update({
    coin: parseInt(payload) - 10,
  })
};

export const GetVideoCampaign = async () => {
  console.log("userId",userId);
  return await WatchVideoList.where("upload_by", "==", userId?.toString())?.get()
}

export const addWatchUrl = async (payload: { totalAmount: string | number; getWatchUniqId: string; getVideoId: string | number; }) => {
  return await userTable.update({
    coin: payload?.totalAmount,
    isWatchVideoId: [...payload.getWatchUniqId, payload?.getVideoId]
  })

}
export const getPlayVideoList = async () => {
  return await WatchVideoList
    .where("remaining_view", ">", 0)
    .get()
}

export const getNewUpdatedViewCount = async (payload: { getVideoId: string; remiderView: number; }) => {
  return await WatchVideoList
    .doc(payload?.getVideoId).update({
      remiderView: payload?.remiderView - 1
    })
}


