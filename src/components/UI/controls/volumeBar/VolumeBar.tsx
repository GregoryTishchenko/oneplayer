import { FC } from 'react';
import { IVolumeBar } from './VolumeBar.types';
import styles from './VolumeBar.module.scss';
import CustomRange from '../../CustomRange/CustomRange';
import CustomButton from '../../CustomButton/CustomButton';
import CustomButtonStyles from '../../CustomButton/CustomButton.module.scss';

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
      <CustomButton
        className={`${CustomButtonStyles.button} ${CustomButtonStyles['button--quieter']}`}
        onClick={handleDecreaseVolume}
      >
        <span className="sr-only">Rendre plus silencieux</span>
      </CustomButton>

      <CustomRange
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume.toString()}
        onChange={onVolumeChange}
      />

      <CustomButton
        className={`${CustomButtonStyles.button} ${CustomButtonStyles['button--louder']}`}
        onClick={handleIncreaseVolume}
      >
        <span className="sr-only">Rendre plus fort</span>
      </CustomButton>
    </div>
  );
};

export default VolumeBar;
