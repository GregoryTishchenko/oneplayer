import { useEffect, useRef, useState, FC } from 'react';
import RxPlayer from 'rx-player';
import MuteButton from './UI/controls/mute/MuteButton';

const VideoPreview: FC<IVideoProps> = ({ url, beginTimecode, endTimecode }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<RxPlayer | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = new RxPlayer({
      videoElement: videoRef.current,
    });

    playerRef.current.loadVideo({
      url: url,
      transport: 'directfile',
      autoPlay: true,
    });

    playerRef.current.seekTo(beginTimecode);
    playerRef.current.play();

    const onTimeUpdate = () => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getPosition();
        if (currentTime >= endTimecode) {
          playerRef.current.seekTo(beginTimecode);
          playerRef.current.play();
        }
      }
    };

    videoRef.current.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', onTimeUpdate);
      }
    };
  }, [url, beginTimecode, endTimecode]);

  const toggleMute = () => {
    if (videoRef.current) {
      setIsMuted((prev) => {
        videoRef.current!.muted = !prev;
        return !prev;
      });
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        autoPlay
        loop
        controls={false}
      />
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
    </div>
  );
};

export default VideoPreview;
