"use client";
import { useState, useRef } from 'react';
import { Input, Button, Loader } from '../../components/atoms';
import { registerStudent } from '../services/student';
import styles from './page.module.css'

export const StudentRegister = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const onRegister = async () => {
    setIsLoading(true);
    const resp = await registerStudent(email);
    setIsLoading(resp);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.registration_div}>
        <p>Get News About Universities</p>
        <Input onChange={event => setEmail(event.target.value)} name="email" label="Email" type="text" require={[false, ""]} placeholder="Email..." />
        <Button text="Register" onClick={onRegister} style={{width: "250px"}} />
      </div>
    </>
  );
};