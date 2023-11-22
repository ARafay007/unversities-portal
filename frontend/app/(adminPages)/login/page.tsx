'use client';
import {ChangeEvent, useState} from 'react';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { AdminLogin } from '@/app/services/admin';
import { Loader } from '@/components/atoms';
import { useRouter } from 'next/navigation'
import styles from './page.module.css';

interface loginFields{
  email: string;
  password: string;
}

export default () => {
  const router = useRouter();
  const [loginField, setLoginField] = useState<loginFields>({
    email: '',
    password: '',
  });
  const [isCorrentCredentials, setIsCorrentCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeLoginField = (event: ChangeEvent, loginFieldName: string) => {
    setLoginField(prevValue => ({...prevValue, [loginFieldName]: (event?.target as HTMLInputElement).value}));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const data = await AdminLogin(loginField);
    if(data.status) setIsCorrentCredentials(true);
    else{
      setIsCorrentCredentials(false);
      sessionStorage.setItem('token', data.token);
      router.push('/admin');
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.login_container}>
      {isLoading && <Loader />}
      <div className={styles.login_fields_container}>
        <h2>Login</h2>
        <Input type='text' name='username' onChange={(event) => onChangeLoginField(event, 'email')} placeholder='Email...' label='Email' require={[false, '']} />
        <Input type='password' name='password' onChange={(event) => onChangeLoginField(event, 'password')} placeholder='Password...' label='Password' require={[false, '']} />
        {isCorrentCredentials && <span style={{color: 'red'}}>Email or password is incorrect!</span>}
        <Button text='Login' onClick={onSubmit} style={{
            width: '250px', 
            background: 'rgb(37,37,37)',
            color: '#fff'
          }} />
      </div>
    </div>
  );
}