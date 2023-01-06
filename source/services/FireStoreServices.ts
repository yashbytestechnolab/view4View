
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


function getUserID() {
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

export const GetVideoCampaign = async () => {
  return await WatchVideoList?.where("upload_by", "==", getUserID()?.toString())?.orderBy("created", "desc")?.get()
}

// export const addWatchUrl = async (payload: { totalAmount: string | number; getWatchUniqId: string; getVideoId: string | number; }) => {
//   return await userTable.update({
//     coin: payload?.totalAmount,
//     isWatchVideoId: [...payload.getWatchUniqId, payload?.getVideoId]
//   })

// }

export const addWatchUrl = async (payload: string | number | object | Array<undefined>) => {
  return await userTable.update({
    coin: payload?.totalAmount,
    watch_videos: [...payload.getWatchUniqId, payload?.getVideoId[0]]
  })

}
export const getPlayVideoList = async () => {
  return await WatchVideoList?.where("remaining_view", ">", 0)?.get()
}


// export const getNewUpdatedViewCount = async (payload: { getVideoId: string; remiderView: number; }) => {
//   return await WatchVideoList
//     .doc(payload?.getVideoId).update({
//       remiderView: payload?.remiderView - 1
//     })
// }

export const getNewUpdatedViewCount = async (payload: string | number) => {
  return await WatchVideoList
    .doc(payload?.getCampaignId).update({
      remaining_view: payload?.remiderView - 1,
      consumed_view: parseInt(payload?.consumed_view) + 1
    })
}

export const updateUserWallet = async (payload: number) => {
  userTableLogin.doc(getUserID()?.toString()).update({
    coin: payload
  })
  return payload
}


