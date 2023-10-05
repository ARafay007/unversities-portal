import { FC, ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  text: string,
}

export const Button: FC<buttonProps> = ({text, ...rest}) => {
  return (
    <div className={styles.btn_container}>
      <label>&nbsp;</label>
      <button className={styles.btn} {...rest}>{text}</button>
    </div>
  );
};