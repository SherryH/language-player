import loadScript from 'load-script';
import { useEffect, useRef, useState } from 'react';

export const YoutubePlayer = () => {
  // load youtube sdk with load-script library
  // start with hardcoding everything to load 1 video
  const playerRef = useRef(null);
  const [player, setPlayer] = useState();
  console.log({ window });
  useEffect(() => {
    loadScript('https://www.youtube.com/iframe_api', (err, script) => {
      if (err) {
        console.error(err);
      } else {
        // sdk loaded
        // 1. then write test to make sure sdk is only loaded once
        // https://github.com/cookpete/react-player/blob/master/src/utils.js
        // https://github.com/gajus/youtube-player/blob/main/src/loadYouTubeIframeApi.js
        // 2. load youtube sdk
        console.log(script.src);
        if (!window.onYouTubeIframeAPIReady) {
          window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        } else {
          console.log(window.onYouTubeIframeAPIReady);
          console.log(window.YT);
        }
      }
    });
    // when sdk is loaded, onYouTubeIframeAPIReady is called
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started

    console.log(window.onYouTubeIframeAPIReady);
  }, [window.onYouTubeIframeAPIReady, window.YT]);
  const onYouTubeIframeAPIReady = () => {
    const player = new window.YT.Player('playerDOM', {
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: () => console.log('ready'),
        onStateChange: () => console.log('state change'),
      },
    });
    setPlayer(player);
    playerRef.current = player;
  };

  return (
    <div ref={playerRef} id="playerDOM">
      {' '}
    </div>
  );
};
