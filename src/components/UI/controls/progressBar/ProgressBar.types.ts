import { ChangeEvent } from 'react';

export interface IProgressBar {
  currentTime: number;
  duration: number;
  onProgressChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
