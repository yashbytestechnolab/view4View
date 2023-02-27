import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Markerplace(props: any) {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <Path
        d="M19 8.25H6.5V17.25L5.5 19.75H20L19 17.25V8.25Z"
        fill={props.color ? props.color : ''}
        stroke={props.color ? props.color : '#0F0742'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19 8.25L17 5.25H8.5L6.5 8.25"
        stroke={props.color ? props.color : '#0F0742'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.5 11.25V12.25C10.5 13.4926 11.5074 14.5 12.75 14.5C13.9926 14.5 15 13.4926 15 12.25V11.25"
        stroke={props.color ? 'white' : '#0F0742'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
