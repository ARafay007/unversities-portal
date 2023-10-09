'use client';
import { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from 'react';
import { Input, TextArea, Button, Dropdown, Loader } from "../atoms";
import styles from "./addEditUniForm.module.css";
import { AddUniversity, getUniverities, updateUniversity } from '@/app/services/university';

interface statesStructure {
  id?: string;
  name: string,
  ranking: number,
  about: string,
  category: string,
  province: string,
};
interface course {
  id: string,
  fee: number,
  course: string,
}

interface courses extends Array<course> { }

interface universityPOST{
  id?: string;
  name: string;
  category: string;
  about: string;
  ranking: number;
  province: string;
  fee: number[];
  courses: string[];
}

export default ({isEditMode, category, id}: {isEditMode: boolean, category?: string, id?: string}) => { 

  const [values, setValue] = useState<statesStructure>({
    name: '',
    about: '',
    ranking: 0,
    category: '',
    province: '',
  });

  const [courseAndFeeValue, setCourseAndFeeValue] = useState<courses>([{
    id: Math.random().toString(36).slice(2),
    fee: 0,
    course: '',
  }]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(isEditMode){
      getUniversityDetail();
    }
  }, [])

  const getUniversityDetail = async () => {
    const {data} = await getUniverities(category as string, id as string);
    setValue({
      id: data[0]._id,
      name: data[0].name,
      about: data[0].about,
      ranking: data[0].ranking,
      category: data[0].category,
      province: 'Sindh',
    });
    const coursesAndFee: courses  = [];

    for(let i=0; i<data[0].fee.length; i++){
      coursesAndFee.push({
        id: Math.random().toString(36).slice(2),
        fee: data[0].fee[i] as number,
        course: data[0].courses[i] as string,
      });
    }

    setCourseAndFeeValue(coursesAndFee);
  }

  const addCourse = (event: MouseEvent) => {
    event.preventDefault();

    setCourseAndFeeValue([
      ...courseAndFeeValue,
      {
        id: Math.random().toString(36).slice(2),
        fee: 0,
        course: '',
      }]);
  };

  const removeCourse = (id: string, event: MouseEvent) => {
    event.preventDefault();
    if(courseAndFeeValue.length > 1){
      const courses = structuredClone(courseAndFeeValue);
      setCourseAndFeeValue(courses.filter(el => el.id !== id));
    }
  };

  const printCourseAndFeeFields = () => {
    const fields = courseAndFeeValue.map(el => {
      return (
        <div style={{ width: "530px" }} key={el.id}>
          <div className={styles.course_fee_container}>
            <Input
              type="text"
              name="name"
              label="Course"
              value={el.course}
              require={[false, 'this is require']}
              style={{marginRight: '10px'}}
              placeholder="Course..."
              onChange={(event) => onCourseAndFeeValuesChange(el.id, 'course', event)}
            />
            <Input
              type="number"
              name="fee"
              label="Fee"
              value={el.fee}
              require={[false, 'this is require']}
              placeholder="Fee..."
              onChange={(event) => onCourseAndFeeValuesChange(el.id, 'fee', event)}
            />
            <Button
              text="Remove"
              onClick={event => removeCourse(el.id, event)}
              style={{ backgroundImage: 'linear-gradient(to right, rgb(189, 189, 189), rgba(5, 5, 216, .2))' }}
            />
          </div>
          <Button
            text="Add new course"
            onClick={event => addCourse(event)}
            style={{ backgroundImage: 'linear-gradient(to right, rgb(189, 189, 189), rgba(5, 5, 216, .2))' }}
          />
        </div>
      );
    });
    return fields;
  };

  const onValuesChange: (stateName: string, stateValue: ChangeEvent | MouseEvent) => 
  void = (stateName: string, stateValue: ChangeEvent | MouseEvent) => {
    const value = stateName === 'category' || stateName === 'province' 
    ? (stateValue?.target as HTMLSpanElement).innerText : (stateValue?.target as HTMLInputElement).value;
    setValue(state => ({ ...state, [stateName]: value }));
  };

  const onCourseAndFeeValuesChange = (id: string, stateName: string, stateValue: ChangeEvent) => {
    let value = (stateValue.target as HTMLInputElement).value;
    const courses = structuredClone(courseAndFeeValue);

    setCourseAndFeeValue(courses.map((el, ind) => {
      if (el.id === id) {
        if (stateName === 'fee') el[stateName] = +value;
        if (stateName === 'course') el[stateName] = value;
        return el
      }
      return el;
    }));
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    let loading: boolean;

    if(isEditMode){
      const body: universityPOST = { 
        ...values,
        fee: courseAndFeeValue.map(el => el.fee),
        courses: courseAndFeeValue.map(el => el.course)
      }
      await updateUniversity(body);
      setIsLoading(false);
    }
    else{
      const body: universityPOST = { 
        ...values,
        fee: courseAndFeeValue.map(el => el.fee),
        courses: courseAndFeeValue.map(el => el.course)
      }
  
      loading = await AddUniversity(body)
      setIsLoading(loading);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <h2>{isEditMode ? "Edit University" : "Add University"}</h2>
      <hr className="hr" />
      <form style={{width: "560px"}} onSubmit={onSubmitForm}>
        <div className={styles.form_column}>
          <Input
            type="text"
            name="name"
            label="University Name"
            value={values.name}
            require={[false, 'this is require']}
            placeholder="University name..."
            onChange={(event) => onValuesChange('name', event)}
          />
          <Input
            type="number"
            name="ranking"
            label="Ranking"
            value={values.ranking}
            require={[false, 'this is require']}
            placeholder="Ranking..."
            onChange={(event) => onValuesChange('ranking', event)}
          />
        </div>
        <div className={styles.form_column}>
          <Dropdown 
            list={['Medical', 'Engineering', 'Business', 'Arts', 'General']} 
            value={values.category}
            onClick={(event) => onValuesChange('category', event)} 
          />
          <Dropdown 
            list={['Sindh', 'Punjab', 'KPK', 'Balochistan']} 
            value={values.province}
            onClick={(event) => onValuesChange('province', event)} 
          />
        </div>
        <div className={styles.form_column}>
          <TextArea
            label="About"
            name="about"
            value={values.about}
            require={[false, 'this is require']}
            placeholder="About university"
            onChange={(event) => onValuesChange('about', event)}
          />
        </div>
        {printCourseAndFeeFields()}
        <Button
          text="Add University"
          style={{ background: 'rgb(5, 5, 216)', color: '#fff', width: '200px' }}
        />
      </form>
    </>
  );
};