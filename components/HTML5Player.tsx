import { useEffect, useRef, useState } from 'react';
import subtitles from '../public/media/video.vtt';
import { client, getCaptions } from './utils';

export const HTML5Player = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeA, setTimeA] = useState(0);
  const [timeB, setTimeB] = useState(0);
  const [captions, setCaptions] = useState<
    Array<{ start: number; end: number; caption: string }>
  >([]);

  const handleTimeUpdate = () => {
    if (!videoRef?.current?.currentTime) return;
    if (videoRef.current.currentTime >= timeB) {
      videoRef?.current?.pause();
    }
  };

  console.log({ subtitles });
  // Find where the currentTime is within the array (by getting all start times and see which interval currentTime is in)
  // then set the currentTime to the start time of that interval
  // make timeA = start and timeB = end
  useEffect(() => {
    // create a setInterval timer that checks the currentTime every 0.5 seconds
    const timer = setInterval(() => {
      console.log(videoRef?.current?.currentTime);
    }, 500);

    const currentCaption = captions.find((caption) => {
      if (videoRef?.current?.currentTime === undefined) return;
      const start = caption.start;
      const end = caption.end;
      return (
        videoRef?.current?.currentTime >= start &&
        videoRef?.current?.currentTime <= end
      );
    });
    setTimeA(currentCaption?.start || 0);
    setTimeB(currentCaption?.end || 0);

    // we dont need to keep counting when paused
    if (videoRef?.current?.paused) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [videoRef?.current?.currentTime]);

  // load subtitles on mount
  // successful!!
  useEffect(() => {
    client('media/video.vtt').then((res) => {
      console.log(res);
      // save each line of the subtitles in an array [{start, end, caption},{},{}]
      // when replay is clicked, check currentTime

      //TODO
      // split the res into each line of caption
      const captions = getCaptions(res);
      setCaptions(captions);
      console.log({ captions });
    });
  }, []);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [handleTimeUpdate]);

  if (videoRef.current) {
    videoRef.current.ontimeupdate = () => {
      console.log(videoRef?.current?.currentTime);
    };
  }

  const playOrPause = () => {
    if (videoRef?.current?.paused) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  };
  return (
    <>
      <video controls width="650px" ref={videoRef}>
        <source src="media/video.mp4" type="video/mp4" />
        <track label="English" kind="subtitles" srcLang="en" src={subtitles} />
      </video>
      <button id="play" onClick={playOrPause}>
        Play
      </button>
      <label htmlFor="input-A"></label>
      <input
        id="input-A"
        type="text"
        value={timeA}
        onChange={(e) => {
          setTimeA(Number(e.target.value));
          if (videoRef?.current?.currentTime) {
          }
        }}
      />
      <button
        onClick={() => {
          if (videoRef?.current) {
            videoRef.current.currentTime = timeA;
            playOrPause();
          }
        }}
      >
        RePlay between section A-B
      </button>

      <label htmlFor="input-B"></label>
      <input
        id="input-B"
        type="text"
        value={timeB}
        onChange={(e) => {
          setTimeB(Number(e.target.value));
        }}
      />
    </>
  );
};
