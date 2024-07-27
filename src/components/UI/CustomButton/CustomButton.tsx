import { FC } from 'react';

import styles from './CustomButton.module.scss';
import { ICustomButton } from './CustomButton.types';

const CustomButton: FC<ICustomButton> = ({ children, border, ...props }) => {
  const combinedClassName = border
    ? `${styles.button} ${styles.button__border}`
    : styles.button;

  return (
    <button {...props} className={combinedClassName}>
      {children}
    </button>
  );
};

export default CustomButton;
