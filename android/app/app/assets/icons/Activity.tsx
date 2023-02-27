import React from 'react';
import {View} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import {colors} from 'react-native-swiper-flatlist/src/themes';

export function Activity(props: any) {
  return (
    <Svg
      width={props.width?props.width:"15"}
      height={props.height?props.height:"15"}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M11 1C5.48591 1 1 5.48591 1 11C1 16.5141 5.48591 21 11 21C16.5141 21 21 16.5141 21 11C21 5.48591 16.5141 1 11 1ZM20.0664 10.5214C15.4368 10.2782 11.7227 6.56273 11.48 1.93318C16.1095 2.17727 19.8236 5.89182 20.0664 10.5214ZM1.93364 11.4832C6.56318 11.7264 10.2786 15.4373 10.5218 20.0673C5.89273 19.8236 2.17864 16.1109 1.93364 11.4832ZM11.4305 20.0686C11.1873 14.9355 7.06409 10.8127 1.93091 10.5695C2.15091 5.90409 5.895 2.15682 10.5582 1.93136C10.8009 7.06636 14.9332 11.2 20.0686 11.4423C19.8423 16.1055 16.0955 19.8486 11.4305 20.0686Z"
        fill={props.color?props.color:"#0F0742"}
        stroke={props.color?props.color:"#0F0742"}
      />
    </Svg>
  );
}
