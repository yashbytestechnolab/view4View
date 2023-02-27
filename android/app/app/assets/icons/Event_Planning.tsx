import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from 'react-native-swiper-flatlist/src/themes';

export function Event_Planning(props: any) {
  return (
    <Svg width={props.width?props.width:"15"}
    height={props.height?props.height:"15"} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 2V6M8 2V6M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
        stroke={props.color?props.color:"#0F0742"}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16 11L10.5 16.5L8 14"
        stroke={props.color?props.color:"#0F0742"}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
