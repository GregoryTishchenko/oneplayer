import { ChangeEvent } from 'react';

export interface IVolumeBar {
  volume: number;
  onVolumeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
