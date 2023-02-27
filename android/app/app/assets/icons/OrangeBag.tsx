import React from 'react';
import Svg, {Path, Rect, G, Defs, ClipPath} from 'react-native-svg';

export function OrangeBag(props: any) {
  return (
    <Svg width="125" height="125" viewBox="0 0 125 125" fill="none">
      <G clip-path="url(#clip0_2_124088)">
        <Rect width="125" height="125" rx="18" fill="#FF8F50" />
        <Path
          d="M39.4995 61.9989L53.9995 42.6655L112 42.6655L126.5 61.9989M39.4995 61.9989L39.4995 129.666C39.4995 132.229 40.518 134.688 42.3308 136.501C44.1437 138.314 46.6024 139.332 49.1662 139.332H116.833C119.397 139.332 121.855 138.314 123.668 136.501C125.481 134.688 126.5 132.229 126.5 129.666V61.9989M39.4995 61.9989H126.5M102.333 81.3322C102.333 86.4597 100.296 91.3772 96.6703 95.0029C93.0445 98.6286 88.127 100.666 82.9995 100.666C77.872 100.666 72.9545 98.6286 69.3288 95.0029C65.7031 91.3772 63.6662 86.4597 63.6662 81.3322"
          stroke="#0F0742"
          //stroke-width={10}
          strokeWidth={10}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2_124088">
          <Rect width="125" height="125" rx="18" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
