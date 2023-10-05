import { FC, MouseEventHandler, useState} from "react";
import { Input } from ".";
import styles from './dropdown.module.css';

interface dropdownProps{
  categoryList: string[];
  value: string;
  onClick: MouseEventHandler<HTMLSpanElement>;
}

export const Dropdown: FC<dropdownProps> = ({categoryList, value, ...rest}) => {
  const [onHoverDiv, setOnhoverDiv] = useState(false);

  return (
    <div 
      style={{width: '260px'}}
      onMouseEnter={() => setOnhoverDiv(true)}
      onMouseLeave={() => setOnhoverDiv(false)}  
    >
      <Input 
        type="text" 
        label="University Category" 
        name="universityCategory" 
        placeholder="Select university category..."
        require={[false, '']} 
        disabled
        value={value}
      />
      <div className={onHoverDiv ? styles.dropdown : styles.dropdown_hide} >
        {categoryList.map((el: string, index) => (
          <span key={index} {...rest} className={styles.dropdown_items}>{el}</span>
        ))}
      </div>
    </div>
  );
};