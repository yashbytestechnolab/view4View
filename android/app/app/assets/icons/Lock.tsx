import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export function Lock(props: any) {
  return (
    <View style={{ marginLeft: 15 }}>
      <Svg width="15" height="16" viewBox="0 0 18 20" fill="none">
        <Path
          d="M4.83333 9.16699V5.83366C4.83333 4.72859 5.27232 3.66878 6.05372 2.88738C6.83512 2.10598 7.89493 1.66699 9 1.66699C10.1051 1.66699 11.1649 2.10598 11.9463 2.88738C12.7277 3.66878 13.1667 4.72859 13.1667 5.83366V9.16699M3.16667 9.16699H14.8333C15.7538 9.16699 16.5 9.91318 16.5 10.8337V16.667C16.5 17.5875 15.7538 18.3337 14.8333 18.3337H3.16667C2.24619 18.3337 1.5 17.5875 1.5 16.667V10.8337C1.5 9.91318 2.24619 9.16699 3.16667 9.16699Z"
          stroke="#667085"
          strokeWidth={1.66667}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}
