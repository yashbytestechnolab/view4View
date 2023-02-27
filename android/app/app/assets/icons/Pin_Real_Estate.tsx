import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import { Colour } from '../../theme';

export default function Pin_Real_Estate(props: any) {
  return (
    <Svg width="44" height="45" viewBox="0 0 44 45" fill="none">
      <G>
        <Path
          d="M33.9724 7.38546C39.0904 13.1539 37.2779 22.196 31.885 27.7082C27.7205 31.9649 22.8963 35 22 35C21.1037 35 16.2795 31.9649 12.115 27.7082C6.72207 22.196 4.90965 13.1539 10.0276 7.38546C12.9587 4.08189 17.2362 2 22 2C26.7638 2 31.0413 4.08189 33.9724 7.38546Z"
          fill={props.BGcolor?props.BGcolor:"white"}
        />
      </G>
      <Path
        d="M20 24.6666H24M16 16L22 11.3333L28 16V23.3333C28 23.6869 27.8595 24.0261 27.6095 24.2761C27.3594 24.5262 27.0203 24.6666 26.6667 24.6666H17.3333C16.9797 24.6666 16.6406 24.5262 16.3905 24.2761C16.1405 24.0261 16 23.6869 16 23.3333V16Z"
        stroke={props.color?props.color:Colour.PrimaryBlue}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.1818 14.6667V22.6667M24 16.1212H21.2727C20.9352 16.1212 20.6115 16.2553 20.3728 16.494C20.1341 16.7327 20 17.0564 20 17.394C20 17.7315 20.1341 18.0552 20.3728 18.2939C20.6115 18.5326 20.9352 18.6667 21.2727 18.6667H23.0909C23.4285 18.6667 23.7522 18.8008 23.9909 19.0395C24.2295 19.2781 24.3636 19.6019 24.3636 19.9394C24.3636 20.277 24.2295 20.6007 23.9909 20.8394C23.7522 21.0781 23.4285 21.2121 23.0909 21.2121H20"
        stroke={props.color?props.color:Colour.PrimaryBlue}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
