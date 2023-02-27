import React from 'react';
import Svg, {G, Mask, Path} from 'react-native-svg';

export default function Pin_Local_Services_Repair(props: any) {
  return (
    <Svg width="44" height="45" viewBox="0 0 44 45" fill="none">
      <G>
        <Path
          d="M33.9724 7.38546C39.0904 13.1539 37.2779 22.196 31.885 27.7082C27.7205 31.9649 22.8963 35 22 35C21.1037 35 16.2795 31.9649 12.115 27.7082C6.72207 22.196 4.90965 13.1539 10.0276 7.38546C12.9587 4.08189 17.2362 2 22 2C26.7638 2 31.0413 4.08189 33.9724 7.38546Z"
          fill={props.BGcolor ? props.BGcolor : 'white'}
        />
      </G>
      <Path
        d="M23.8 14.2C23.6779 14.3246 23.6095 14.4922 23.6095 14.6667C23.6095 14.8412 23.6779 15.0087 23.8 15.1334L24.8667 16.2C24.9913 16.3222 25.1589 16.3906 25.3334 16.3906C25.5079 16.3906 25.6754 16.3222 25.8 16.2L28.3134 13.6867C28.6486 14.4275 28.7501 15.2528 28.6043 16.0528C28.4586 16.8527 28.0725 17.5893 27.4975 18.1642C26.9226 18.7392 26.1861 19.1252 25.3861 19.271C24.5862 19.4167 23.7608 19.3153 23.02 18.98L18.4134 23.5867C18.1481 23.8519 17.7884 24.0009 17.4134 24.0009C17.0383 24.0009 16.6786 23.8519 16.4134 23.5867C16.1481 23.3215 15.9991 22.9618 15.9991 22.5867C15.9991 22.2116 16.1481 21.8519 16.4134 21.5867L21.02 16.98C20.6848 16.2392 20.5833 15.4139 20.7291 14.6139C20.8748 13.814 21.2609 13.0775 21.8358 12.5025C22.4108 11.9276 23.1473 11.5415 23.9473 11.3957C24.7472 11.25 25.5726 11.3515 26.3134 11.6867L23.8067 14.1934L23.8 14.2Z"
        stroke={props.color ? props.color : '#0F0742'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
