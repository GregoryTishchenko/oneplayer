import { ForwardedRef, forwardRef } from 'react';
import styles from './CustomRange.module.scss';
import { ICustomRange } from './CustomRange.types';

const CustomRange = forwardRef<HTMLInputElement, ICustomRange>(
  ({ ...props }, ref: ForwardedRef<HTMLInputElement>) => {
    return <input ref={ref} className={styles.range} {...props} />;
  }
);

export default CustomRange;
