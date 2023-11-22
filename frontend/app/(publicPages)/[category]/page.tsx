'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {getUniverities} from '../../services/university';
import styles from './page.module.css';

interface uniObject{
  _id: string,
  name: string,
  category: string,
  about: string,
  ranking: number,
  fee: number[],
  courses: string[],
  isActive: boolean,
  __v: number
};

interface uniInterface{
  _id: string,
  name: string,
  category: string,
  about: string,
  ranking: number,
  programs: {fee: string, course: string, discipline: string, _id: string}[];
  isActive: boolean,
  __v: number
};

interface universityData {
  about: string;
  adminssionOpen: boolean;
  category: string;
  isActive: boolean;
  name: string;
  programs: {fee: string, course: string, discipline: string, _id: string}[];
  province: string;
  ranking: number;
  __v: number;
  _id: string;
};

export default ({params: {category}}: {params: {category: string}}) => {
  const [data, setData] = useState<universityData[]>();

  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => {
    const data = await getUniverities(category);
    setData(data);
  }

  const fetchUniByCategoryAndProvince = async (province: string) => {
    const data = await getUniverities(category, undefined, province);
    setData(data);
  };
  
  return (
    <div className="center_div">
      <div className={styles.province_list}>
        <button onClick={() => fetchUniByCategoryAndProvince('undefined')} className={styles.province_list_item}>All</button>
        <button onClick={() => fetchUniByCategoryAndProvince('Sindh')} className={styles.province_list_item}>Sindh</button>
        <button onClick={() => fetchUniByCategoryAndProvince('Punjab')} className={styles.province_list_item}>Punjab</button>
        <button onClick={() => fetchUniByCategoryAndProvince('KPK')} className={styles.province_list_item}>KPK</button>
        <button onClick={() => fetchUniByCategoryAndProvince('Balochistan')} className={styles.province_list_item}>Balochhistan</button>
      </div>
      <div style={{height: "100%"}} >
        {
          !data?.length ? <></> : data?.map((uni: uniInterface) => (
            <div className={styles.university_details_container} key={uni._id}>
              <div className={styles.university_details}>
                <h3>{uni.name}</h3>
                <p>{uni.about}</p>
              </div>
              <div className={styles.university_detail_options}>
                <Link href={`/${category}/${uni._id}`} title="Edit">
                  Details
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}