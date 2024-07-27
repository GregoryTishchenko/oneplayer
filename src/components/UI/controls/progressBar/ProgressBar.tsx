import { FC } from 'react';
import styles from './ProgressBar.module.scss';
import { IProgressBar } from './ProgressBar.types';
import CustomRange from '../../CustomRange/CustomRange';

const ProgressBar: FC<IProgressBar> = ({
  currentTime,
  duration,
  onProgressChange,
}) => {
  return (
    <div className={styles.progressBarContainer}>
      <CustomRange
        type="range"
        min="0"
        max={duration.toString()}
        value={currentTime.toString()}
        onChange={onProgressChange}
      />

      <div className={styles.timeInfo}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

export default ProgressBar;

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
