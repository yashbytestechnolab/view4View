import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';

export default function Pin_Event_Planning(props: any) {
  return (
    <Svg width="44" height="45" viewBox="0 0 44 45" fill="none">
      <G>
        <Path
          d="M33.9724 7.38546C39.0904 13.1539 37.2779 22.196 31.885 27.7082C27.7205 31.9649 22.8963 35 22 35C21.1037 35 16.2795 31.9649 12.115 27.7082C6.72207 22.196 4.90965 13.1539 10.0276 7.38546C12.9587 4.08189 17.2362 2 22 2C26.7638 2 31.0413 4.08189 33.9724 7.38546Z"
          fill={props.BGcolor?props.BGcolor:"white"}
        />
      </G>
      <Path
        d="M24.6667 11.3333V14M19.3333 11.3333V14M17.3333 12.6667H26.6667C27.403 12.6667 28 13.2636 28 14V23.3333C28 24.0697 27.403 24.6667 26.6667 24.6667H17.3333C16.597 24.6667 16 24.0697 16 23.3333V14C16 13.2636 16.597 12.6667 17.3333 12.6667Z"
        stroke={props.color?props.color:"0F0742"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M24.6667 17.3333L21 21L19.3334 19.3333"
        stroke={props.color?props.color:"0F0742"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
