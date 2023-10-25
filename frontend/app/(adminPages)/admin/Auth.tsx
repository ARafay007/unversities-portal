'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/atoms';

export default ({children}: {children: React.ReactNode}) => {
  let [token, setToken] = useState<string | null>();
  const router = useRouter();

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, []);

  if(!token){
    return(
      <>
        <h2>Something went wrong!</h2>
        <p>You are not logged in</p>
        <Button text="Try again" onClick={() => router.push('/login')} style={{width: '300px'}} />  
      </>
    );
  }

  return children;
}