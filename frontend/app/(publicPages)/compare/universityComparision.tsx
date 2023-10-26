'use client';
import {useState} from 'react';
import { Dropdown } from '@/components/atoms';
import styles from './page.module.css';

interface universityList{
  _id: string;
  name: string;
  category: string;
  province: string;
  about: string;
  ranking: number;
  programs: {
    fee: string;
    course: string;
    discipline: string;
  }[];
  adminssionOpen: boolean;
  isActive: boolean;
  __v: number;
  universityLink: string;
  scholarship: boolean;
};

interface actionStructure{
  type: string;
  paylaod: string;
}

interface stateStructure{
  uni: string;
  discipline: string;
  course: string;
  details: {
    fee: string;
    course: string;
    discipline: string;
  }
}

// const reducer: (state: stateStructure[], action: actionStructure) => stateStructure[]  = (state: stateStructure[], action: actionStructure) => {
//   switch(action.type){
//     case '':
//       return state;
//   }
// }

export const UniversityComparision = ({data}: {data: universityList[]}) => {
  // const [comparisionDetails, dispatch] = useReducer(reducer, []);

  const [selectedUni_1, setSelectedUni_1] = useState<string | null>();
  const [selectedDiscipline_1, setSelectedDiscipline_1] = useState<string | null>('');
  const [selectedCourse_1, setSelectedCourse_1] = useState<string | null>('');
  const [courseDetails_1, setCourseDetails_1] = useState({
    fee: '',
    course: '',
    discipline: '',
  });

  const [selectedUni_2, setSelectedUni_2] = useState<string | null>();
  const [selectedDiscipline_2, setSelectedDiscipline_2] = useState<string | null>('');
  const [selectedCourse_2, setSelectedCourse_2] = useState<string | null>('');
  const [courseDetails_2, setCourseDetails_2] = useState({
    fee: '',
    course: '',
    discipline: '',
  });

  const onSelecting = (list: string, column: number, event: React.MouseEvent) => {
    if(column == 1){
      if(list === 'university') setSelectedUni_1((event.target as HTMLSpanElement).textContent);
      else if(list === 'discipline') setSelectedDiscipline_1((event.target as HTMLSpanElement).textContent);
      else if(list === 'field'){
      const courseText = (event.target as HTMLSpanElement).textContent 
      setSelectedCourse_1(courseText);

      for(let i=0; i<data.length; i++){
        if(data[i].name === selectedUni_1){
          for(let j=0; j<data[i].programs.length; j++){
            if(data[i].programs[j].course === courseText && data[i].programs[j].discipline === selectedDiscipline_1){
                setCourseDetails_1({
                  fee: data[i].programs[j].fee,
                  course: data[i].programs[j].course,
                  discipline: data[i].programs[j].discipline
                });
                break;
              }
            }
        }
      }
      }
    }
    else if(column == 2){
      if(list === 'university') setSelectedUni_2((event.target as HTMLSpanElement).textContent);
      else if(list === 'discipline') setSelectedDiscipline_2((event.target as HTMLSpanElement).textContent);
      else if(list === 'field'){
      const courseText = (event.target as HTMLSpanElement).textContent 
      setSelectedCourse_2(courseText);

      for(let i=0; i<data.length; i++){
        if(data[i].name === selectedUni_2){
          for(let j=0; j<data[i].programs.length; j++){
            if(data[i].programs[j].course === courseText && data[i].programs[j].discipline === selectedDiscipline_2){
                setCourseDetails_2({
                  fee: data[i].programs[j].fee,
                  course: data[i].programs[j].course,
                  discipline: data[i].programs[j].discipline
                });
                break;
              }
            }
        }
      }
      }
    }
  };

  const renderFieldsForColumn1 = () => {
      if(!selectedUni_1) return [];
      else {
        const university = data.find(uni => {
          if(uni.name === selectedUni_1) return uni;
        });
  
        const courses: string[] = [];
  
        university?.programs?.filter(el => {
          if(el.discipline === selectedDiscipline_1) courses.push(el.course);
        });
        return courses;
      }
  }
  const renderFieldsForColumn2 = () => {
    if(!selectedUni_2) return [];
    else {
      const university = data.find(uni => {
        if(uni.name === selectedUni_2) return uni;
      });

      const courses: string[] = [];

      university?.programs?.filter(el => {
        if(el.discipline === selectedDiscipline_2) courses.push(el.course);
      });
      return courses;
    }
  };

  return (
    <div className={styles.university_columns}>
      <div className={styles.column}>
        <Dropdown 
          label="University" 
          list={data.map(uni => uni.name)} 
          placeholder='Select University...' value={selectedUni_1 ? selectedUni_1 : ''} 
          onClick={(event) => onSelecting('university', 1, event)} 
        />
        <Dropdown 
          label="Discipline" 
          list={['Masters', 'Bachelors']} 
          placeholder='Select discipline...' 
          value={selectedDiscipline_1 ? selectedDiscipline_1 : ''} 
          onClick={(event) => onSelecting('discipline', 1, event)} 
        />
        <Dropdown 
          label="Field" 
          list={renderFieldsForColumn1()} 
          placeholder='Select field...' 
          value={selectedCourse_1 ? selectedCourse_1 : ''} 
          onClick={(event) => onSelecting('field', 1, event)}
        />
        <div className={styles.course_details}>
          <p><strong>Course:</strong> {courseDetails_1.course}</p>
          <p><strong>Fee:</strong> {courseDetails_1.fee}</p>
          <p><strong>Discpline:</strong> {courseDetails_1.discipline}</p>
        </div>
      </div>
      <div className={styles.column}>
        <Dropdown 
          label="University" 
          list={data.map(uni => uni.name)} 
          placeholder='Select University...' value={selectedUni_2 ? selectedUni_2 : ''} 
          onClick={(event) => onSelecting('university', 2, event)} 
        />
        <Dropdown 
          label="Discipline" 
          list={['Masters', 'Bachelors']} 
          placeholder='Select discipline...' 
          value={selectedDiscipline_2 ? selectedDiscipline_2 : ''} 
          onClick={(event) => onSelecting('discipline', 2, event)} 
        />
        <Dropdown 
          label="Field" 
          list={renderFieldsForColumn2()} 
          placeholder='Select field...' 
          value={selectedCourse_2 ? selectedCourse_2 : ''} 
          onClick={(event) => onSelecting('field', 2, event)}
        />
        <div className={styles.course_details}>
          <p><strong>Course:</strong> {courseDetails_2.course}</p>
          <p><strong>Fee:</strong> {courseDetails_2.fee}</p>
          <p><strong>Discpline:</strong> {courseDetails_2.discipline}</p>
        </div>
      </div>
    </div>
  );
}