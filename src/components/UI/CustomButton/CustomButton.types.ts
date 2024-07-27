import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ICustomButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}