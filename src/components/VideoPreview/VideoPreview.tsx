import { useEffect, useRef, useState, FC } from 'react';
import RxPlayer from 'rx-player';

import styles from './VideoPreview.module.scss';
import { IVideoPreview } from './VideoPreview.types';

import CustomButton from '../UI/CustomButton/CustomButton';
import CustomButtonStyles from '../UI/CustomButton/CustomButton.module.scss';
import CrewList from '../CrewList/CrewList';
import ApiServices from '../../Api/ApiServices';
import useFetch from '../../hooks/useFetch';
import { ICrew } from '../CrewList/CrewList.types';

const VideoPreview: FC<IVideoPreview> = ({
  title,
  description,
  logo,
  url,
  beginTimecode,
  endTimecode,
  crewApi,
  onPlayVideo,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<RxPlayer | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const [crew, setCrew] = useState<ICrew[]>([]);
  const [isCrewListVisible, setIsCrewListVisible] = useState(false);

  const [fetchCrew, isLoading, error] = useFetch(async () => {
    if (crewApi) {
      const response = await ApiServices.getCrew(crewApi);
      setCrew(response);
    } else {
      setCrew([]);
    }
  });

  useEffect(() => {
    fetchCrew();
  }, [url]);

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
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', onTimeUpdate);
      }

      if (currentPlayer) {
        currentPlayer.stop();
        currentPlayer.dispose();
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

  const toggleCrewList = () => {
    setIsCrewListVisible((prev) => !prev);
  };

  return (
    <div className={styles.videoPreview}>
      <div className={styles.description}>
        {logo ? <img src={logo} alt={title} /> : <h2>{title}</h2>}
        <p>{description}</p>
        <div className={styles.controls}>
          <CustomButton
            className={CustomButtonStyles['button--border']}
            onClick={onPlayVideo}
          >
            Voir la vidéo
          </CustomButton>

          {crew.length > 0 && (
            <CustomButton
              className={CustomButtonStyles['button--border']}
              onClick={toggleCrewList}
            >
              Plus d'info
            </CustomButton>
          )}

          <CustomButton
            className={`${CustomButtonStyles.button} ${
              CustomButtonStyles['button--mute']
            } ${isMuted ? CustomButtonStyles.active : ''}`}
            onClick={toggleMute}
          >
            <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
          </CustomButton>
        </div>
      </div>

      <video ref={videoRef} autoPlay loop muted={isMuted} controls={false} />

      {isCrewListVisible && crew.length > 0 && (
        <CrewList
          loading={isLoading}
          error={error}
          crew={crew}
          onClose={() => setIsCrewListVisible(false)}
        />
      )}
    </div>
  );
};

export default VideoPreview;
