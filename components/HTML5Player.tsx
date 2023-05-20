import { useEffect, useRef, useState } from 'react';

export const HTML5Player = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeA, setTimeA] = useState(0);
  const [timeB, setTimeB] = useState(0);

  const handleTimeUpdate = () => {
    if (!videoRef?.current?.currentTime) return;
    if (videoRef.current.currentTime >= timeB) {
      videoRef?.current?.pause();
    }
  };

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
          }
        }}
      >
        Get Time A
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
