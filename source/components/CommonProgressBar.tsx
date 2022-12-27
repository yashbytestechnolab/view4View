import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Animated, Button} from 'react-native';

export const CommonProgressBar = () => {
  const counter: any = useRef(new Animated.Value(0)).current;
  const countInterval: any = useRef(null);
  const [count, setCount]: any = useState(100);

  useEffect(() => {
    countInterval.current = setInterval(
      () => setCount((old: any) => old - 5),
      1000,
    );
    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    load(count);
    if (count >= 100) {
      setCount(100);
      clearInterval(countInterval);
    }
  }, [count]);

  const load = (count: any) => {
    Animated.timing(counter, {
      toValue: count,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Text>Loading....</Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={{backgroundColor: '#8BED4F', width:width}}></Animated.View>
      </View>

      <Text>{count}%</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  progressBar: {
    height: 20,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
});
