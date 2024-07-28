import { useEffect, useRef, useState, FC, ChangeEvent } from 'react';
import RxPlayer from 'rx-player';
import styles from './VideoPlayer.module.scss';
import ProgressBar from '../UI/controls/progressBar/ProgressBar';
import VolumeBar from '../UI/controls/volumeBar/VolumeBar';
import SceneList from '../SceneList/SceneList';
import CustomButton from '../UI/CustomButton/CustomButton';
import CustomButtonStyles from '../UI/CustomButton/CustomButton.module.scss';
import { IScene } from '../SceneList/SceneList.typees';
import { IVideoPlayer } from './VideoPlayer.types';
import ApiServices from '../../Api/ApiServices';
import useFetch from '../../hooks/useFetch';

const VideoPlayer: FC<IVideoPlayer> = ({
  url,
  scenesApi,
  sceneDetailsApi,
  handleClose,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<RxPlayer | null>(null);

  const [scenes, setScenes] = useState<IScene[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isSceneListVisible, setIsSceneListVisible] = useState(false);

  const [fetchScenes, isLoading, error] = useFetch(async () => {
    if (scenesApi) {
      const response = await ApiServices.getScenes(scenesApi);
      setScenes(response);
    }
  });

  useEffect(() => {
    if (!videoRef.current) return;

    fetchScenes();

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
    });

    const updatePlayerState = () => {
      if (!playerRef.current) return;
      setIsPlaying(playerRef.current.getPlayerState() === 'PLAYING');
    };

    const handlePositionUpdate = (data: {
      position: number;
      duration: number;
    }) => {
      setCurrentTime(data.position);
      setDuration(data.duration || 0);

      // Update the current scene based on the current time
      scenes.find(
        (scene) =>
          data.position >= scene.beginTimecode &&
          data.position <= scene.endTimecode
      );
    };

    playerRef.current?.addEventListener('playerStateChange', updatePlayerState);
    playerRef.current?.addEventListener('positionUpdate', handlePositionUpdate);

    // Clean resources on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.removeEventListener(
          'playerStateChange',
          updatePlayerState
        );
        playerRef.current.removeEventListener(
          'positionUpdate',
          handlePositionUpdate
        );
      }

      if (currentPlayer) {
        currentPlayer.stop();
        currentPlayer.dispose();
      }
    };
  }, [url]);

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!playerRef.current) return;

    const newTime = parseFloat(e.target.value);
    playerRef.current.seekTo(newTime);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const onSceneClick = (scene: IScene) => {
    if (playerRef.current) {
      playerRef.current.seekTo(scene.beginTimecode);
      playerRef.current.play();
    }
    setIsSceneListVisible(false);
  };

  const toggleSceneList = () => {
    setIsSceneListVisible((prev) => !prev);
  };

  const rewind10Seconds = () => {
    if (playerRef.current) {
      const newTime = Math.max(0, currentTime - 10);
      playerRef.current.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const forward10Seconds = () => {
    if (playerRef.current) {
      const newTime = Math.min(duration, currentTime + 10);
      playerRef.current.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  return (
    <div className={styles.videoPlayer}>
      <CustomButton
        className={`${CustomButtonStyles.button} ${CustomButtonStyles['button--back']}`}
        onClick={handleClose}
      >
        <span className="sr-only">Retour</span>
      </CustomButton>

      <video ref={videoRef} controls={false} onClick={togglePlayPause} />

      <div className={styles.controls}>
        <CustomButton
          className={`${CustomButtonStyles.button} ${
            CustomButtonStyles['button--play']
          } ${isPlaying ? CustomButtonStyles.active : ''}`}
          onClick={togglePlayPause}
        >
          <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
        </CustomButton>

        <CustomButton
          className={`${CustomButtonStyles.button} ${CustomButtonStyles['button--rewind']}`}
          onClick={rewind10Seconds}
        >
          <span className="sr-only">Rembobiner de 10 secondes</span>
        </CustomButton>

        <CustomButton
          className={`${CustomButtonStyles.button} ${CustomButtonStyles['button--forward']}`}
          onClick={forward10Seconds}
        >
          <span className="sr-only">Avancer de 10 secondes</span>
        </CustomButton>

        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onProgressChange={handleProgressChange}
        />

        <VolumeBar volume={volume} onVolumeChange={handleVolumeChange} />

        {scenes.length > 0 && (
          <CustomButton
            className={`${CustomButtonStyles.button} ${
              CustomButtonStyles['button--scenec']
            } ${isPlaying ? CustomButtonStyles.active : ''}`}
            onClick={toggleSceneList}
          >
            <span className="sr-only">
              {isSceneListVisible ? 'Hide' : 'Show'}
            </span>
          </CustomButton>
        )}
      </div>

      {isSceneListVisible && (
        <SceneList
          loading={isLoading}
          error={error}
          scenes={scenes}
          onSceneClick={onSceneClick}
          onClose={() => setIsSceneListVisible(false)}
          sceneDetailsApi={sceneDetailsApi}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
