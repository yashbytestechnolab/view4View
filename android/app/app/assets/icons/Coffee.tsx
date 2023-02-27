import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Coffee(props: any) {
  return (
    <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <Path
        d="M7.49992 3.33317H7.91659C8.35861 3.33317 8.78254 3.50877 9.0951 3.82133C9.40766 4.13389 9.58325 4.55781 9.58325 4.99984C9.58325 5.44186 9.40766 5.86579 9.0951 6.17835C8.78254 6.49091 8.35861 6.6665 7.91659 6.6665H7.49992M7.49992 3.33317H0.833252V7.08317C0.833252 7.5252 1.00885 7.94912 1.32141 8.26168C1.63397 8.57424 2.05789 8.74984 2.49992 8.74984H5.83325C6.27528 8.74984 6.6992 8.57424 7.01176 8.26168C7.32432 7.94912 7.49992 7.5252 7.49992 7.08317V3.33317ZM2.49992 0.416504V1.6665M4.16659 0.416504V1.6665M5.83325 0.416504V1.6665"
        stroke={props.color?props.color:"#0F0742"}
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
