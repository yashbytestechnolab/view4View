import React from 'react';
import { Platform, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export function Email(props: any) {  
  return (
    <View style={{ marginLeft: 15, marginTop: Platform.OS === 'android' ? 8 : 5 }}>
      <Svg width="17" height="14" viewBox="0 0 20 16" fill="none">
        <Path
          d="M18.3334 2.99967C18.3334 2.08301 17.5834 1.33301 16.6667 1.33301H3.33341C2.41675 1.33301 1.66675 2.08301 1.66675 2.99967M18.3334 2.99967V12.9997C18.3334 13.9163 17.5834 14.6663 16.6667 14.6663H3.33341C2.41675 14.6663 1.66675 13.9163 1.66675 12.9997V2.99967M18.3334 2.99967L10.0001 8.83301L1.66675 2.99967"
          stroke="#667085"
          strokeWidth={1.66667}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}
