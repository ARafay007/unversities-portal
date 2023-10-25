'use client';
import {useState} from 'react';
import { Dropdown } from '@/components/atoms';
import styles from './page.module.css';

export const UniversityComparision = () => {
  return (
    <div className={styles.university_columns}>
      <div className={styles.column}>
        <Dropdown label="University" list={["Sindh", "LUMHS", "MUET", "ISRA"]} placeholder='Select University...' value="" onClick={() => {}} />
        <Dropdown label="Field" list={["IT", "Software", "Electronics", "IT", "Software", "Electronics"]} placeholder='Select field...' value="" onClick={() => {}}/>
      </div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
    </div>
  );
}