import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Deals(props: any) {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12.25 5.25H19.5V12.5L12.8035 19.1708C12.0044 19.9668 10.7056 19.945 9.93373 19.1226L5.53997 14.441C4.79045 13.6424 4.82269 12.3895 5.6123 11.6305L12.25 5.25Z"
        stroke={props.color ? props.color : '#0F0742'}
        fill={props.color ? props.color : ''}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        stroke={props.color ? 'white' : '#0F0742'}
        d="M15.25 10.5C15.8023 10.5 16.25 10.0523 16.25 9.5C16.25 8.94772 15.8023 8.5 15.25 8.5C14.6977 8.5 14.25 8.94772 14.25 9.5C14.25 10.0523 14.6977 10.5 15.25 10.5Z"
      />
    </Svg>
  );
}
