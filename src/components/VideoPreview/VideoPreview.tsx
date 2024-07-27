import { useEffect, useRef, useState, FC } from 'react';
import RxPlayer from 'rx-player';
import styles from './VideoPreview.module.scss';

import MuteButton from '../UI/controls/mute/MuteButton';

const VideoPreview: FC<IVideo> = ({
  title,
  description,
  logo,
  url,
  beginTimecode,
  endTimecode,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<RxPlayer | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize RxPlayer
    const currentPlayer = new RxPlayer({
      videoElement: videoRef.current,
    });

    playerRef.current = currentPlayer;

    // Load video
    currentPlayer.loadVideo({
      url: url,
      transport: 'directfile',
      autoPlay: true,
      startAt: {
        position: beginTimecode,
      },
    });

    // Handle time update,
    // check if video on endTimecode, loop to beginTimecode
    const onTimeUpdate = () => {
      if (currentPlayer) {
        const currentTime = currentPlayer.getPosition();
        if (currentTime >= endTimecode) {
          currentPlayer.seekTo(beginTimecode);
          currentPlayer.play().catch((error) => {
            console.error('Error during video replay:', error);
          });
        }
      }
    };

    // Event listener for time update
    videoRef.current.addEventListener('timeupdate', onTimeUpdate);

    // Clean resources on unmount
    return () => {
      if (currentPlayer) {
        currentPlayer.stop();
        currentPlayer.dispose();
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
    <div className={styles.videoPreview}>
      <div className={styles.description}>
        {logo ? <img src={logo} alt={title} /> : <h2>{title}</h2>}
        <p>{description}</p>
        <div className={styles.controls}>
          <button>Voir</button>
          <button>Plus d'info</button>
          <MuteButton isMuted={isMuted} onToggle={toggleMute} />
        </div>
      </div>
      <video ref={videoRef} autoPlay loop muted={isMuted} controls={false} />
    </div>
  );
};

export default VideoPreview;
