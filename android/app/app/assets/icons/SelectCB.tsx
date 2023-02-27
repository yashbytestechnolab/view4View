import React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

export function SelectCB(props: any) {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" >
    <Rect x="0.5" y="1" width="19" height="19" rx="9.5" fill="#E7E6EC"/>
    <Circle cx="10" cy="10.5" r="4" fill="#0F0742"/>
    <Rect x="0.5" y="1" width="19" height="19" rx="9.5" stroke="#0F0742"/>
    </Svg>
  );
}
