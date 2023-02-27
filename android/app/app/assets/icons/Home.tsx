import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Home(props: any) {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M6.75024 19.75H17.2502C18.3548 19.75 19.2502 18.8546 19.2502 17.75V10.25L12.0002 5.25L4.75024 10.25V17.75C4.75024 18.8546 5.64568 19.75 6.75024 19.75Z"
        stroke={props.color ? props.color : '#0F0742'}
        fill={props.color ? props.color : 'white'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.74951 16.2495C9.74951 15.1449 10.645 14.2495 11.7495 14.2495H12.2495C13.3541 14.2495 14.2495 15.1449 14.2495 16.2495V19.7495H9.74951V16.2495Z"
        stroke={props.color ? 'white' : '#0F0742'}
        fill={props.color ? 'white' : ''}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
