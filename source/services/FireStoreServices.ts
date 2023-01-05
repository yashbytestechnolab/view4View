
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userId = auth()?.currentUser?.uid;
const newID = Math.random() * Date.now()
const randomIdGenrate = newID?.toString()?.split(".")?.join("")

export const UserListTable = firestore()?.collection('UserList')?.doc(userId?.toString())
export const userTable = firestore()?.collection('users')?.doc(userId?.toString())

// export const WatchVideoTable = firestore()?.collection('WatchVideo')?.doc(randomIdGenrate?.toString())
export const WatchVideoTable = firestore()?.collection('campaign')?.doc(randomIdGenrate?.toString())


export const WatchVideoList = firestore()?.collection("campaign")

// export const loginUser = async (payload: { email: string; uid: string; }, userName: string) => {
//   return await UserListTable.set({
//     coin: 0,
//     email: payload?.email,
//     userId: payload?.uid,
//     firstname: userName,
//     lastname: "",
//     videoUrl: '',
//     image: "",
//     watch_videos: [],

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
  return await userTable?.update({
    coin: parseInt(payload) - 10,
  })
};

export const GetVideoCampaign = async () => {
  return await WatchVideoList.where("userId", "==", userId?.toString())?.get()
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


