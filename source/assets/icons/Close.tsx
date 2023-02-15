import React from "react";
import Svg, { Path } from "react-native-svg";

export const Close =(props:any)=> {
  return (
    <Svg
      width={props?.width?props?.width:"28"}
      height={props?.width?props?.width:"28"}
      viewBox="0 0 28 28"
      fill="none">
      <Path
        d="M7.37012 20.6289L20.6284 7.37065"
        stroke={props?.color?props?.color:"#1F1F1F"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.37012 7.37109L20.6284 20.6293"
        stroke={props?.color?props?.color:"#1F1F1F"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
