
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userId = auth()?.currentUser?.uid;
const newID = Math.random() * Date.now()
const randomIdGenrate = newID?.toString()?.split(".")?.join("")

export const UserListTable = firestore()?.collection('UserList')?.doc(userId?.toString())

export const WatchVideoTable = firestore()?.collection('WatchVideo')?.doc(randomIdGenrate?.toString())


export const WatchVideoList = firestore()?.collection("WatchVideo")

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

// export const createCampaign = async (payload: { videoUrl: string; splitUrl: string; }) => {
//   return await WatchVideoTable
//     .set({
//       videoUrl: payload?.videoUrl,
//       requireDuration: 25,
//       coin: 1000,
//       userId: userId,
//       expectedView: 3,
//       remiderView: 3,
//       uniquWatchVideoID: randomIdGenrate,
//       videoId: payload?.splitUrl,
//        created: firestore.FieldValue.serverTimestamp()
//     })
// }
export const createCampaign = async (payload: { videoUrl: string; splitUrl: string; }) => {
  return await WatchVideoTable
    .set({
      videoUrl: payload?.videoUrl,
      requireDuration: 25,
      coin: 1000,
      uploadBy: userId,
      expectedView: 3,
      remiderView: 3,
      uniquWatchVideoID: randomIdGenrate,
      videoId: payload?.splitUrl,
      created: firestore.FieldValue.serverTimestamp()
    })
}
export const payCoin = async (payload: string) => {
  return await UserListTable?.update({
    coin: parseInt(payload) - 10,
  })
};

export const GetVideoCampaign = async () => {
  return await WatchVideoList.where("userId", "==", userId?.toString())?.get()
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


