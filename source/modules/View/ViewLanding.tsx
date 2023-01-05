import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ButtonComponent, Header, Loader } from '../../components';
import { String } from '../../constants';
import { styles } from './style';
import auth from '@react-native-firebase/auth';
import { addWatchUrl, getNewUpdatedViewCount, getPlayVideoList, get_coins } from '../../services/FireStoreServices';
import { Colors, F40014, F60024 } from '../../Theme';
import { CoinIcon, SecondsIcon } from '../../assets/icons';

interface myArray {
  coin: number
}
export const ViewLanding = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [playVideoList, setPlayVideoList] = useState();
  const controlRef = useRef<boolean>();
  const firstStart = useRef<boolean>(true);
  const [getWatchUniqId, setGetWatchUniqId] = useState([]);
  const [nextVideo, setNextVideo] = useState<number>(0);
  const [timer, setTimer] = useState<number>(
    playVideoList?.[nextVideo]?.requireDuration,
  );

  const userId = auth().currentUser?.uid;
  const GetCoins = async () => {
    let resCoinUpdate = 0;
    await get_coins().then((res) => {
      console.log(res)

      videoList(res?._data?.isWatchVideoId);
      resCoinUpdate = res?._data?.coin;
      setGetWatchUniqId(res?._data?.isWatchVideoId)
    })

    return resCoinUpdate;

  }

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }
    if (start) {
      controlRef.current = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        }
      }, 1000);
    } else {
      clearInterval(controlRef.current);
    }
    return () => clearInterval(controlRef.current);
  }, [start, controlRef, timer]);

  useEffect(() => {
    if (timer === 0) {
      GetEarning();
    }

  }, [timer]);
  const SetCoins = () => {
    return parseInt(playVideoList?.[nextVideo]?.requireDuration / 1.1);
  };

  const GetEarning = async () => {
    const getVideoId: string | number = playVideoList?.[nextVideo]?.uniquWatchVideoID;
    const remiderView: string | number = playVideoList?.[nextVideo]?.remiderView
    if (timer === 0) {
      GetCoins().then((res: number) => {
        setTimer(0);
        clearInterval(controlRef?.current);
        setPlaying(false);
        const totalAmount = res + SetCoins();

        addWatchUrl({ totalAmount, getWatchUniqId, getVideoId }).then(() => {
        }).catch(() => {
        })

      });
      getNewUpdatedViewCount({ getVideoId, remiderView }).then(() => { }).catch(() => {
      })

    }
  };

  const onStateChange = async (state: string) => {
    if (state === 'playing') {
      setPlaying(true);
      setStart(true);
    }
    if (state === 'ended') {
      setPlaying(false);
      setStart(false);
    }
    if (state === 'paused') {
      setPlaying(false);
      setStart(false);
    }
    if (state === 'buffering') {
      setPlaying(false);
      setStart(false);
    }
    if (state === 'unstarted') {
      setPlaying(false);
      setStart(false);
    }
    if (state === 'video cued') {
      setPlaying(false);
      setStart(false);
    }
  };

  useEffect(() => {
    GetCoins();
  }, []);

  const videoList = async (id: string) => {

    getPlayVideoList()
      .then((res: any) => {
        const add_Video_Url: Array<any> = []
        res._docs?.filter((res: any) => {
          if (res?._data?.userId !== userId && !id?.includes(res?._data?.uniquWatchVideoID)) {
            add_Video_Url.push(res?._data)
            return res?._data
          }
        });
        const sortListByCoin = add_Video_Url?.sort((res1: myArray, res2: myArray) => res2?.coin - res1?.coin);

        setPlayVideoList(sortListByCoin)
        setTimer(add_Video_Url[0]?.requireDuration);

      });
  };

  const NextVideoList = () => {
    if (nextVideo < playVideoList?.length - 1) {
      setNextVideo(nextVideo + 1);
      setTimer(playVideoList?.[nextVideo + 1]?.requireDuration);
    }
  };

  return (
    <>
    <SafeAreaView style={styles.safearea}/>
      <StatusBar backgroundColor={Colors?.gradient1} barStyle={String?.StatusBar?.lightContent} />
      <View style={styles.container}>
        <Header title={String?.headerTitle?.view4view} />
        <ScrollView style={styles.main}>
          <View style={styles.videoWrapper}>
            <YoutubePlayer
              height={270}
              videoId={playVideoList?.[nextVideo]?.videoId[0]}
              ref={controlRef}
              play={playing}
              onChangeState={onStateChange}
            />

          </View>
          <View style={styles.iconRow}>
            <View style={styles.iconWrapper}>
              <SecondsIcon />
              <View style={styles.marginLeft}>
                <Text numberOfLines={1} style={[F60024.textStyle, { color: Colors?.primaryRed }]}>{timer}</Text>
                <Text style={F40014?.main}>{String?.viewTab?.second}</Text>
              </View>
            </View>
            <View style={styles.iconWrapper}>
              <CoinIcon />
              <View style={styles.marginLeft}>
                <Text numberOfLines={1} style={[F60024.textStyle, { color: Colors?.primaryRed }]}>{SetCoins()}</Text>
                <Text style={F40014?.main}>{String?.viewTab?.coin}</Text>
              </View>
            </View>
          </View>
          <ButtonComponent onPrees={() => { NextVideoList() }} wrapperStyle={styles.marginTop} buttonTitle={String?.viewTab?.nextVideo} />
        </ScrollView>
      </View>
      {playVideoList?.[nextVideo]?.videoId[0] == undefined && <Loader />}
    </>
  );
};
{/* <WebView source={{ uri: 'https://youtu.be/NUyT3uhbS0g' }} /> */ }
