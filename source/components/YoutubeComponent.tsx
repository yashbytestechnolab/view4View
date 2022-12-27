import React from 'react';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
interface IyoutubeProps {
  height?: number;
  play?: boolean;
  videoId?: string;
  onChangeState?: Function;
}
export const YoutubeComponent = React.forwardRef(
  (props: IyoutubeProps, controlRef: any) => {
    const {onChangeState, height, play, videoId}: any = props;

    return (
      <YoutubePlayer
        height={height}
        ref={controlRef}
        play={play}
        videoId={videoId}
        onChangeState={() => {
          onChangeState();
        }}
      />
    );
  },
);
