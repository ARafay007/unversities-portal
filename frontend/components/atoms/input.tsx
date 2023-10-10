import React, { FC, InputHTMLAttributes } from "react";
import styles from './input.module.css';

interface inputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  label: string;
  type: string;
  require: [boolean, string | 'This is required field'];
  // onMouseEnter: MouseEventHandler<HTMLInputElement> | undefined;
};

export const Input: FC<inputProps> = ({name, label, require, ...rest}) => {
  return (
    <div className={styles.input_div}>
      <label>{label}</label>
      <input id={name} {...rest} className={styles.input}/>
      {
        require[0] && <span>{require[1]}</span>
      }
    </div>
  );
}