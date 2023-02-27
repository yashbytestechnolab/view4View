import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Account(props: any) {
  return (
    <Svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 11.75C13.7949 11.75 15.25 10.2949 15.25 8.5C15.25 6.70507 13.7949 5.25 12 5.25C10.2051 5.25 8.75 6.70507 8.75 8.5C8.75 10.2949 10.2051 11.75 12 11.75Z"
        fill={props.color ? props.color :""}
        stroke={props.color ? props.color :"#0F0742"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.84747 19.75H17.1525C18.2944 19.75 19.174 18.7681 18.6408 17.7584C17.8563 16.2731 16.068 14.5 12 14.5C7.93198 14.5 6.14364 16.2731 5.35921 17.7584C4.82594 18.7681 5.70555 19.75 6.84747 19.75Z"
        fill={props.color ? props.color :""}
        stroke={props.color ? props.color :"#0F0742"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
