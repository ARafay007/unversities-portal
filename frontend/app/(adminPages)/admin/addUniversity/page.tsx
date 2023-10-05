'use client';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { Input, TextArea, Button, Dropdown, Loader } from "../../../../components";
import styles from "./page.module.css";
import { AddUniversity } from '../../../services/university';

export default () => {
  interface statesStructure {
    name: string,
    ranking: number,
    about: string,
    category: string,
  };
  interface course {
    id: string,
    fee: number,
    course: string,
  }

  interface courses extends Array<course> { }

  interface universityPOST{
    name: string;
    category: string;
    about: string;
    ranking: number;
    fee: number[];
    courses: string[];
  }

  const [values, setValue] = useState<statesStructure>({
    name: '',
    about: '',
    ranking: 0,
    category: '',
  });

  const [courseAndFeeValue, setCourseAndFeeValue] = useState<courses>([{
    id: Math.random().toString(36).slice(2),
    fee: 0,
    course: '',
  }]);

  const [isLoading, setIsLoading] = useState(false);

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
    const value = stateName === 'category' ? (stateValue?.target as HTMLSpanElement).innerText : (stateValue?.target as HTMLInputElement).value;
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

    const body: universityPOST = { 
      ...values,
      fee: courseAndFeeValue.map(el => el.fee),
      courses: courseAndFeeValue.map(el => el.course)
    }

    const loading = await AddUniversity(body)
    setIsLoading(loading);
  };

  return (
    <>
      {isLoading && <Loader />}
      <h2>Add University</h2>
      <hr className="hr" />
      <form style={{width: "560px"}} onSubmit={onSubmitForm}>
        <div className={styles.form_column}>
          <Input
            type="text"
            name="name"
            label="University Name"
            require={[false, 'this is require']}
            placeholder="University name..."
            onChange={(event) => onValuesChange('name', event)}
          />
          <Dropdown 
            categoryList={['Medical', 'Engineering', 'Business', 'Arts', 'General']} 
            value={values.category}
            onClick={(event) => onValuesChange('category', event)} 
          />
        </div>
        <div className={styles.form_column}>
          <Input
            type="number"
            name="ranking"
            label="Ranking"
            require={[false, 'this is require']}
            placeholder="Ranking..."
            onChange={(event) => onValuesChange('ranking', event)}
          />
          <TextArea
            label="About"
            name="about"
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