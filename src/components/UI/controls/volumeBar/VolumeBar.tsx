import { FC } from 'react';
import { IVolumeBar } from './VolumeBar.types';
import styles from './VolumeBar.module.scss';
import CustomRange from '../../CustomRange/CustomRange';
import CustomButton from '../../CustomButton/CustomButton';

const VolumeBar: FC<IVolumeBar> = ({ volume, onVolumeChange }) => {
  const handleIncreaseVolume = () => {
    const newVolume = Math.min(volume + 0.05, 1);
    onVolumeChange({
      target: { value: newVolume.toString() },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDecreaseVolume = () => {
    const newVolume = Math.max(volume - 0.05, 0);
    onVolumeChange({
      target: { value: newVolume.toString() },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={styles.volumeBarContainer}>
      <CustomButton onClick={handleDecreaseVolume}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 9C18 9 18.5 9.9 18.5 12C18.5 14.1 18 15 18 15"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1.95863 8.57679C2.24482 8.04563 2.79239 7.53042 3.33997 7.27707C3.9393 6.99979 4.62626 6.99979 6.00018 6.99979C6.51225 6.99979 6.76828 6.99979 7.01629 6.95791C7.26147 6.9165 7.50056 6.84478 7.72804 6.74438C7.95815 6.64283 8.1719 6.50189 8.59941 6.22002L8.81835 6.07566C11.3613 4.39898 12.6328 3.56063 13.7001 3.92487C13.9048 3.9947 14.1029 4.09551 14.2798 4.21984C15.2025 4.86829 15.2726 6.37699 15.4128 9.3944C15.4647 10.5117 15.5001 11.4679 15.5001 11.9998C15.5001 12.5317 15.4647 13.4879 15.4128 14.6052C15.2726 17.6226 15.2025 19.1313 14.2798 19.7797C14.1029 19.9041 13.9048 20.0049 13.7001 20.0747C12.6328 20.4389 11.3613 19.6006 8.81834 17.9239L8.59941 17.7796C8.1719 17.4977 7.95815 17.3567 7.72804 17.2552C7.50056 17.1548 7.26147 17.0831 7.01629 17.0417C6.76828 16.9998 6.51225 16.9998 6.00018 16.9998C4.62626 16.9998 3.9393 16.9998 3.33997 16.7225C2.79239 16.4692 2.24482 15.9539 1.95863 15.4228C1.6454 14.8414 1.60856 14.237 1.53488 13.0282C1.52396 12.849 1.51525 12.6722 1.50928 12.4998"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </CustomButton>
      <CustomRange
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume.toString()}
        onChange={onVolumeChange}
      />
      <CustomButton onClick={handleIncreaseVolume}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6C20 6 21.5 7.8 21.5 12C21.5 16.2 20 18 20 18"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M18 9C18 9 18.5 9.9 18.5 12C18.5 14.1 18 15 18 15"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1.95863 8.57679C2.24482 8.04563 2.79239 7.53042 3.33997 7.27707C3.9393 6.99979 4.62626 6.99979 6.00018 6.99979C6.51225 6.99979 6.76828 6.99979 7.01629 6.95791C7.26147 6.9165 7.50056 6.84478 7.72804 6.74438C7.95815 6.64283 8.1719 6.50189 8.59941 6.22002L8.81835 6.07566C11.3613 4.39898 12.6328 3.56063 13.7001 3.92487C13.9048 3.9947 14.1029 4.09551 14.2798 4.21984C15.2025 4.86829 15.2726 6.37699 15.4128 9.3944C15.4647 10.5117 15.5001 11.4679 15.5001 11.9998C15.5001 12.5317 15.4647 13.4879 15.4128 14.6052C15.2726 17.6226 15.2025 19.1313 14.2798 19.7797C14.1029 19.9041 13.9048 20.0049 13.7001 20.0747C12.6328 20.4389 11.3613 19.6006 8.81834 17.9239L8.59941 17.7796C8.1719 17.4977 7.95815 17.3567 7.72804 17.2552C7.50056 17.1548 7.26147 17.0831 7.01629 17.0417C6.76828 16.9998 6.51225 16.9998 6.00018 16.9998C4.62626 16.9998 3.9393 16.9998 3.33997 16.7225C2.79239 16.4692 2.24482 15.9539 1.95863 15.4228C1.6454 14.8414 1.60856 14.237 1.53488 13.0282C1.52396 12.849 1.51525 12.6722 1.50928 12.4998"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </CustomButton>
    </div>
  );
};

export default VolumeBar;
