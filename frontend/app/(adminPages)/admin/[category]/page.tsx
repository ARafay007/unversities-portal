'use client';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {getUniverities, deleteUniversity} from '../../../services/university';
import { Loader } from '@/components/atoms';
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
  fee: number[],
  courses: string[],
  isActive: boolean,
  __v: number
};

export default ({params: {category}}: {params: {category: string}}) => {
  const [uniData, setUniData] = useState<uniObject[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    fetchUni();
  }, []);

  useEffect(() => {
    fetchUni();
  }, [isFetch]);

  const fetchUni = async () => {
    setIsLoading(true);
    const data = await getUniverities(category);
    setUniData(data);
    setIsLoading(false);
  }

  const fetchUniByCategoryAndProvince = async (province: string) => {
    setIsLoading(true);
    const data = await getUniverities(category, undefined, province);
    setUniData(data);
    setIsLoading(false);
  }

  const onDeleteUni = async (id: string) => {
    setIsLoading(true);
    await deleteUniversity(id);
    setIsLoading(false);
    setIsFetch(!isFetch);
  };
  
  return (
    <>
      <div className={styles.province_list}>
        <button onClick={() => fetchUniByCategoryAndProvince('undefined')} className={styles.province_list_item}>All</button>
        <button onClick={() => fetchUniByCategoryAndProvince('Sindh')} className={styles.province_list_item}>Sindh</button>
        <button onClick={() => fetchUniByCategoryAndProvince('Punjab')} className={styles.province_list_item}>Punjab</button>
        <button onClick={() => fetchUniByCategoryAndProvince('KPK')} className={styles.province_list_item}>KPK</button>
        <button onClick={() => fetchUniByCategoryAndProvince('Balochistan')} className={styles.province_list_item}>Balochhistan</button>
      </div>
      {isLoading && <Loader />}
      <div style={{height: "100%"}}>
        {
          uniData?.length && uniData?.map((uni: uniInterface) => (
            <div className={styles.university_details_container} key={uni._id}>
              <div className={styles.university_details}>
                <h3>{uni.name}</h3>
                <p>{uni.about}</p>
              </div>
              <div className={styles.university_detail_options}>
                <Link href={`/admin/${category}/${uni._id}`} title="Edit">
                  <Image src='/edit.png' width='20' height='20' alt='edit' />
                </Link>
                <span title="Delete University" onClick={() => onDeleteUni(uni._id)} style={{cursor: 'pointer'}}>
                  <Image src='/delete.png' width='20' height='20' alt='edit' />
                </span>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}