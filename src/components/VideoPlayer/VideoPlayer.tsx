import { useEffect, useRef, useState, FC, ChangeEvent } from 'react';
import RxPlayer from 'rx-player';
import styles from './VideoPlayer.module.scss';
import ProgressBar from '../UI/controls/progressBar/ProgressBar';
import VolumeBar from '../UI/controls/volumeBar/VolumeBar';
import SceneList from '../SceneList/SceneList';
import CustomButton from '../UI/CustomButton/CustomButton';
import CustomButtonStyles from '../UI/CustomButton/CustomButton.module.scss';
import { IScene } from '../SceneList/SceneList.typees';

const scenes = [
  {
    id: 0,
    title: 'Génerique',
    beginTimecode: 0,
    endTimecode: 30,
  },
  {
    id: 1,
    title: 'Le réveil de Bunny',
    beginTimecode: 31,
    endTimecode: 73,
  },
  {
    id: 2,
    title: 'La chute du papillon',
    beginTimecode: 74,
    endTimecode: 103,
  },
  {
    id: 3,
    title: 'La rencontre',
    beginTimecode: 104,
    endTimecode: 146,
  },
  {
    id: 4,
    title: 'La diversion',
    beginTimecode: 147,
    endTimecode: 185,
  },
  {
    id: 5,
    title: 'Le crime',
    beginTimecode: 186,
    endTimecode: 241,
  },
  {
    id: 6,
    title: 'La vengeance est un plat qui se mange froid',
    beginTimecode: 242,
    endTimecode: 284,
  },
  {
    id: 7,
    title: 'Que fait Bunny ?',
    beginTimecode: 285,
    endTimecode: 299,
  },
  {
    id: 8,
    title: 'Bunny contre attaque',
    beginTimecode: 300,
    endTimecode: 339,
  },
  {
    id: 9,
    title: 'Gimerra et sa noisette',
    beginTimecode: 340,
    endTimecode: 376,
  },
  {
    id: 10,
    title: "Frank s'envole",
    beginTimecode: 377,
    endTimecode: 405,
  },
  {
    id: 11,
    title: "Le plan de Frank tombe à l'eau",
    beginTimecode: 406,
    endTimecode: 460,
  },
  {
    id: 12,
    title: 'Tout est bien qui finit bien',
    beginTimecode: 461,
    endTimecode: 489,
  },
  {
    id: 13,
    title: 'Crédits',
    beginTimecode: 490,
    endTimecode: 578,
  },
  {
    id: 14,
    title: 'Scène post crédits',
    beginTimecode: 579,
    endTimecode: 596,
  },
];

const VideoPlayer: FC<IVideo & { handleClose: () => void }> = ({
  url,
  handleClose,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<RxPlayer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentScene, setCurrentScene] = useState(scenes[0]);
  const [isSceneListVisible, setIsSceneListVisible] = useState(false);

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
      const scene = scenes.find(
        (scene) =>
          data.position >= scene.beginTimecode &&
          data.position <= scene.endTimecode
      );

      if (scene) {
        setCurrentScene(scene);
      }
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
    setCurrentScene(scene);
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
      <CustomButton onClick={handleClose} className="closeVideoPlayer">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 7H15C17.7614 7 20 9.23857 20 12C20 14.7614 17.7614 17 15 17M4 7L7 4M4 7L7 10M8.00001 17H11"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
          <span className="sr-only">Rewind 10 seconds</span>
        </CustomButton>

        <CustomButton
          className={`${CustomButtonStyles.button} ${CustomButtonStyles['button--forward']}`}
          onClick={forward10Seconds}
        >
          <span className="sr-only">Forward 10 seconds</span>
        </CustomButton>

        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onProgressChange={handleProgressChange}
        />

        <VolumeBar volume={volume} onVolumeChange={handleVolumeChange} />

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
      </div>

      {isSceneListVisible && (
        <SceneList
          scenes={scenes}
          onSceneClick={onSceneClick}
          onClose={() => setIsSceneListVisible(false)}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
