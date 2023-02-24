import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export const ViewLanding = () => {
  return (
    <View style={style.main}>
      <Text>Comming soon</Text>
    </View>

  );
};

const style = StyleSheet.create({
  main: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }
})
