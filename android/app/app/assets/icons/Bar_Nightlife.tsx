import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from 'react-native-swiper-flatlist/src/themes';

export function Bar_Nightlife(props: any) {
  return (
    <Svg width={props.width?props.width:"15"}
    height={props.height?props.height:"15"} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.5 18.668C15.5365 14.6795 20.5 8.006 20.5 7C20.5 6.592 20.498 6.3165 17.2905 6.1955L20.433 0.75L19.5665 0.25L16.1565 6.162C15.066 6.1375 13.7065 6.125 12 6.125C3.5 6.125 3.5 6.4355 3.5 7C3.5 8.006 8.464 14.6795 11.5 18.668L11.5005 23H8.5V24H15.5V23H12.5005L12.5 18.668ZM16.7175 7.1905C17.949 7.2295 18.841 7.2835 19.338 7.339C19.056 7.8685 18.437 8.8135 17.6145 10H15.097L16.7175 7.1905ZM4.6495 7.341C5.639 7.2265 8.2405 7.125 12 7.125C13.3505 7.125 14.5495 7.1375 15.58 7.16L13.942 10H6.3805C5.546 8.8 4.923 7.8525 4.6495 7.341ZM7.084 11H13.365L12.0665 13.25L12.9325 13.75L14.519 11H16.9125C15.5225 12.963 13.7435 15.374 11.9995 17.674C10.2545 15.373 8.474 12.959 7.084 11Z"
        fill={props.color ? props.color : '#0F0742'}
      />
    </Svg>
  );
}
