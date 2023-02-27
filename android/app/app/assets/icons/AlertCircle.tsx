import React from 'react';
import Svg, {Path} from 'react-native-svg';
import { colors } from 'react-native-swiper-flatlist/src/themes';

export function AlertCircle(props: any) {
  return (
    <Svg width={props.width?props.width:"30"} height={props.height?props.height:"30"} viewBox="0 0 30 30" fill="none">
      <Path
        d="M14.9998 9.66675V15.0001M14.9998 20.3334H15.0132M28.3332 15.0001C28.3332 22.3639 22.3636 28.3334 14.9998 28.3334C7.63604 28.3334 1.6665 22.3639 1.6665 15.0001C1.6665 7.63628 7.63604 1.66675 14.9998 1.66675C22.3636 1.66675 28.3332 7.63628 28.3332 15.0001Z"
        stroke={props.color?props.color:"#D92D20"}
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
