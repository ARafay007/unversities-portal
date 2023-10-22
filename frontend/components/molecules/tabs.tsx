'use client';
import { ButtonHTMLAttributes, FC } from "react";
import { getUniverities } from "@/app/services/university";
import styles from "./tabs.module.css";

interface TabsProps {
  textAndCategory: {text: string, category: string}[],
}

export const Tabs: FC<TabsProps> = ({textAndCategory, ...rest}) => {

  const fetchUniByCategoryAndProvince = async (category: string, province: string) => {
    const {data} = await getUniverities(category, undefined, province);
  };

  return (
    <div className={styles.province_list}>
      {
        textAndCategory.map((el: {text: string, category: string}) => (
          <button 
            onClick={() => fetchUniByCategoryAndProvince('Sindh', 'undefined')} 
            className={styles.province_list_item}>{el.text}
          </button>
        ))
      }
      {/* <button
        // onClick={() => fetchUniByCategoryAndProvince('undefined')} 
        className={styles.province_list_item}>All
      </button>
      <button 
        // onClick={() => fetchUniByCategoryAndProvince('Sindh')} 
        className={styles.province_list_item}>Sindh
      </button>
      <button 
        // onClick={() => fetchUniByCategoryAndProvince('Punjab')} 
        className={styles.province_list_item}>Punjab
      </button>
      <button 
        // onClick={() => fetchUniByCategoryAndProvince('KPK')} 
        className={styles.province_list_item}>KPK
      </button>
      <button 
        // onClick={() => fetchUniByCategoryAndProvince('Balochistan')} 
        className={styles.province_list_item}>Balochhistan
      </button> */}
    </div>
  );
}