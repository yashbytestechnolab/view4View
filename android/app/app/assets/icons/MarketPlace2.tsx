import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function MarketPlace2(props: any) {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M13.6875 5.8125H4.3125V12.5625L3.5625 14.4375H14.4375L13.6875 12.5625V5.8125Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.6875 5.8125L12.1875 3.5625H5.8125L4.3125 5.8125"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.3125 8.0625V8.8125C7.3125 9.74445 8.06805 10.5 9 10.5C9.93195 10.5 10.6875 9.74445 10.6875 8.8125V8.0625"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
