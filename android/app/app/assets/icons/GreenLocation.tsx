import React from 'react';
import Svg, {Path, Rect, G, Defs, ClipPath} from 'react-native-svg';

export function GreenLocation(props: any) {
  return (
    <Svg width="125" height="125" viewBox="0 0 125 125" fill="none">
      <G clip-path="url(#clip0_2_124079)">
        <Rect width="125" height="125" rx="18" fill="#52FF9A" />
        <Path
          d="M-5.43311 57.1286C-5.43311 87.3211 32.4336 125.531 34.0427 127.149C34.4849 127.593 35.0103 127.944 35.5887 128.184C36.1671 128.424 36.7871 128.548 37.4133 128.548C38.0395 128.548 38.6595 128.424 39.2379 128.184C39.8163 127.944 40.3417 127.593 40.7839 127.149C42.393 125.531 80.2597 87.3211 80.2597 57.1286C80.2597 45.7651 75.7455 34.8669 67.7103 26.8316C59.675 18.7964 48.7769 14.2822 37.4133 14.2822C26.0497 14.2822 15.1516 18.7964 7.11632 26.8316C-0.91894 34.8669 -5.43311 45.7651 -5.43311 57.1286ZM51.6954 57.1286C51.6954 59.9534 50.8578 62.7147 49.2885 65.0634C47.7191 67.412 45.4886 69.2426 42.8788 70.3236C40.2691 71.4046 37.3975 71.6874 34.627 71.1363C31.8565 70.5853 29.3117 69.225 27.3143 67.2276C25.3169 65.2302 23.9567 62.6854 23.4056 59.9149C22.8545 57.1445 23.1373 54.2728 24.2183 51.6631C25.2993 49.0534 27.1299 46.8228 29.4786 45.2535C31.8273 43.6841 34.5886 42.8465 37.4133 42.8465C41.2012 42.8465 44.8339 44.3512 47.5123 47.0296C50.1907 49.7081 51.6954 53.3408 51.6954 57.1286Z"
          fill="#0F0742"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2_124079">
          <Rect width="125" height="125" rx="18" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
