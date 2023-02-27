import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Real_Estate(props: any) {
  return (
    <Svg  width={props.width?props.width:"15"}
    height={props.height?props.height:"15"} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 22H15M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
        stroke={props.color?props.color:"#0F0742"}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.2727 7V19M15 9.18182H10.9091C10.4028 9.18182 9.91718 9.38295 9.55916 9.74098C9.20114 10.099 9 10.5846 9 11.0909C9 11.5972 9.20114 12.0828 9.55916 12.4408C9.91718 12.7989 10.4028 13 10.9091 13H13.6364C14.1427 13 14.6283 13.2011 14.9863 13.5592C15.3443 13.9172 15.5455 14.4028 15.5455 14.9091C15.5455 15.4154 15.3443 15.901 14.9863 16.259C14.6283 16.617 14.1427 16.8182 13.6364 16.8182H9"
        stroke={props.color?props.color:"#0F0742"}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
