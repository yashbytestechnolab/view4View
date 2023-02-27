import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';

export default function Pin_Education(props: any) {
  return (
    <Svg
      width="44"
      height="45"
      viewBox="0 0 44 45"
      fill="none"
      >
      <G>
        <Path
          d="M33.9724 7.38546C39.0904 13.1539 37.2779 22.196 31.885 27.7082C27.7205 31.9649 22.8963 35 22 35C21.1037 35 16.2795 31.9649 12.115 27.7082C6.72207 22.196 4.90965 13.1539 10.0276 7.38546C12.9587 4.08189 17.2362 2 22 2C26.7638 2 31.0413 4.08189 33.9724 7.38546Z"
          fill={props.BGcolor?props.BGcolor:"white"}
        />
      </G>
      <Path
        d="M22 14.6667C22 13.9594 21.7191 13.2811 21.219 12.781C20.7189 12.281 20.0406 12 19.3334 12H15.3334V22H20C20.5305 22 21.0392 22.2107 21.4143 22.5858C21.7893 22.9609 22 23.4696 22 24M22 14.6667V24M22 14.6667C22 13.9594 22.281 13.2811 22.7811 12.781C23.2812 12.281 23.9595 12 24.6667 12H28.6667V22H24C23.4696 22 22.9609 22.2107 22.5858 22.5858C22.2108 22.9609 22 23.4696 22 24"
        stroke={props.color?props.color:"0F0742"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
