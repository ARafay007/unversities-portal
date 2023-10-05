import { FC, TextareaHTMLAttributes } from "react";
import styles from "./input.module.css";

interface textAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  label: string,
  name: string,
  require: [boolean, string | 'This is required.']
}

export const TextArea: FC<textAreaProps> = ({label, name, require, ...res}) => {
  return (
    <div className={styles.input_div}>
      <label>{label}</label>
      <textarea id={name} {...res} className={styles.input} rows={10} cols={30}></textarea>
      {
        require[0] && <span>{require[1]}</span>
      }
    </div>
  );
}