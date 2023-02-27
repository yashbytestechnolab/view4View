import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Health_Medical(props: any) {
  return (
    <Svg  width={props.width?props.width:"15"}
    height={props.height?props.height:"15"} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 7V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V7M12 11V15M12 15V19M12 15H8M12 15H16M4 7H20C21.1046 7 22 7.89543 22 9V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9C2 7.89543 2.89543 7 4 7Z"
        stroke={props.color?props.color:"#0F0742"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
