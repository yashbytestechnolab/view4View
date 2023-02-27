import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Retail_OnlineShopping(props: any) {
  return (
    <Svg  width={props.width?props.width:"15"}
    height={props.height?props.height:"15"} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6L6 2H18L21 6M3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6M3 6H21M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
        stroke={props.color?props.color:"#0F0742"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
