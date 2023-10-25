'use client';
import { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from 'react';
import { Input, TextArea, Button, Dropdown, Loader, Divider } from "../atoms";
import Switch from "react-switch";
import styles from "./addEditUniForm.module.css";
import { AddUniversity, getUniverities, updateUniversity } from '@/app/services/university';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface statesStructure {
  id?: string;
  name: string,
  ranking: number,
  about: string,
  category: string,
  province: string,
  adminssionOpen: boolean,
  scholarship: boolean,
  universityLink: string,
};
interface course {
  id: string,
  fee: number,
  course: string,
  discipline: string,
}

interface courses extends Array<course> { }

interface universityPOST{
  id?: string;
  name: string;
  category: string;
  about: string;
  ranking: number;
  province: string;
  adminssionOpen: boolean,
  scholarship: boolean,
  universityLink: string,
  programs: {
    fee: number,
    course: string,
    discipline: string,
  }[],
}

export default ({isEditMode, category, id, router}: {isEditMode: boolean, category?: string, id?: string, router: AppRouterInstance}) => { 
  const [values, setValue] = useState<statesStructure>({
    name: '',
    about: '',
    ranking: 0,
    category: '',
    province: '',
    adminssionOpen: false,
    scholarship: false,
    universityLink: '',
  });
  
  const [courseAndFeeValue, setCourseAndFeeValue] = useState<courses>([{
    id: Math.random().toString(36).slice(2),
    fee: 0,
    course: '',
    discipline: '',
  }]);
  
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(true);
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(isEditMode){
      getUniversityDetail();
    }
  }, []);

  const getUniversityDetail = async () => {
    const {data} = await getUniverities(category as string, id as string);

    setValue({
      id: data[0]._id,
      name: data[0].name,
      about: data[0].about,
      ranking: data[0].ranking,
      category: data[0].category,
      province: data[0].province,
      adminssionOpen: data[0].adminssionOpen,
      scholarship: data[0].scholarship,
      universityLink: data[0].universityLink,
    });

    setIsAdmissionOpen(data[0].adminssionOpen);

    setCourseAndFeeValue(data[0].programs.map((el: {
      _id: string,
      course: string,
      fee: string,
      discipline: string,
    }) => ({
      id: el._id,
      course: el.course,
      fee: el.fee,
      discipline: el.discipline,
    })));
  }

  const addCourse = (event: MouseEvent) => {
    event.preventDefault();

    setCourseAndFeeValue([
      ...courseAndFeeValue,
      {
        id: Math.random().toString(36).slice(2),
        fee: 0,
        course: '',
        discipline: '',
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
              style={{marginRight: '10px'}}
            />
            <Dropdown 
              list={['Bachelors', 'Masters']} 
              label="Discipline"
              value={el.discipline}
              placeholder='Select Descipline'
              onClick={(event) => onCourseAndFeeValuesChange(el.id, 'discipline', event)} 
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

  const onCourseAndFeeValuesChange = (id: string, stateName: string, stateValue: ChangeEvent | MouseEvent) => {
    let value: string;

    if(stateName === 'discipline') value = (stateValue.target as HTMLSpanElement).innerText;
    else value = (stateValue.target as HTMLInputElement).value;
    
    const courses = structuredClone(courseAndFeeValue);
    
    setCourseAndFeeValue(courses.map((el) => {
      if (el.id === id) {
        if (stateName === 'fee' && typeof value === 'string') el[stateName] = +value;
        else if (stateName === 'course' && typeof value === 'string') el[stateName] = value;
        else if(stateName === 'discipline' && typeof value === 'string') el[stateName] = value;
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
        adminssionOpen: isAdmissionOpen,
        scholarship: isScholarshipOpen,
        programs: courseAndFeeValue.map(el => ({fee: el.fee, course: el.course, discipline: el.discipline}))
      }

      await updateUniversity(body);
      setIsLoading(false);
      router.push(`/admin/${values.category}`);
    }
    else{
      const body: universityPOST = { 
        ...values,
        adminssionOpen: isAdmissionOpen,
        scholarship: isScholarshipOpen,
        programs: courseAndFeeValue.map(el => ({fee: el.fee, course: el.course, discipline: el.discipline})),
      }

      loading = await AddUniversity(body)
      setIsLoading(loading);
      router.push(`/admin/${values.category}`);
    }
  };

  const onSwitchChhange = (admissionOrScholarship: boolean) => {
    admissionOrScholarship ? setIsScholarshipOpen(!isScholarshipOpen) : setIsAdmissionOpen(!isAdmissionOpen);
  };

  return (
    <>
      {isLoading && <Loader />}
      <h2>{isEditMode ? "Edit University" : "Add University"}</h2>
      <Divider />
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
            label="Category"
            placeholder='Select Category'
            value={values.category}
            onClick={(event) => onValuesChange('category', event)} 
          />
          <Dropdown 
            list={['Sindh', 'Punjab', 'KPK', 'Balochistan']} 
            label="Province"
            placeholder='Select Province'
            value={values.province}
            onClick={(event) => onValuesChange('province', event)} 
          />
        </div>
        <div className={styles.form_column}>
        <Input
            type="text"
            name="link"
            label="University Link"
            value={values.universityLink}
            require={[false, 'this is require']}
            placeholder="University link..."
            onChange={(event) => onValuesChange('universityLink', event)}
          />
          <div>
            <p>Admission</p>
            <Switch onChange={() => onSwitchChhange(false)} checked={isAdmissionOpen} />  
          </div>
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
          <div>
            <p>Schollarship</p>
            <Switch onChange={() => onSwitchChhange(true)} checked={isScholarshipOpen} />  
          </div>
        </div>
        {printCourseAndFeeFields()}
        <Button
          text={isEditMode ? "Edit University" : "Add University"}
          style={{ background: 'rgb(5, 5, 216)', color: '#fff', width: '200px' }}
        />
      </form>
    </>
  );
};