import { FC } from 'react';

import styles from './CustomButton.module.scss';
import { ICustomButton } from './CustomButton.types';

const CustomButton: FC<ICustomButton> = ({ children, className, ...props }) => {
  const combinedClassName = `${styles.button} ${className}`;

  return (
    <button {...props} className={combinedClassName}>
      {children}
    </button>
  );
};

export default CustomButton;
