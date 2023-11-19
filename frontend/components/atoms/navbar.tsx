'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from ".";
import Image from 'next/image';
import styles from "./navbar.module.css";

export const Navbar = ({isPublic}: {isPublic: boolean}) => {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <nav className={hide ? styles.nav : styles.hide_nav}>
      <div className={styles.caret} onClick={() => setHide(!hide)}>
        <span className={styles.nav_heading}>Universities Portal</span>
        <Image src={hide ? '/caret-up.png' : '/caret-down.png'} width={30} height={30} alt="caret-up-down" />
      </div>
        {
          isPublic ? 
          <ul className={!hide && width < 436 ? styles.hide_nav_ul : styles.nav_ul}>
            <Link href="/" className={styles.nav_link}>
              <li className={styles.nav_li}>Home</li>
            </Link>
            <Link href="/Medical" className={styles.nav_link}>
              <li className={styles.nav_li}>Medical</li>
            </Link>
            <Link href="/Engineering" className={styles.nav_link}>
              <li className={styles.nav_li}>Engineering</li>
            </Link>
            <Link href="/Business" className={styles.nav_link}>
              <li className={styles.nav_li}>Business</li>
            </Link>
            <Link href="/General" className={styles.nav_link}>
              <li className={styles.nav_li}>General</li>
            </Link>
            {/* <Link href="/compare" className={styles.nav_link}>
              <li className={styles.nav_li}>Compare</li>
            </Link> */}
        </ul>
          : 
        <>
          <ul className={styles.nav_ul}>
            <Link href="/admin/addUniversity" className={styles.nav_link}>
              <li className={styles.nav_li}>Add University</li>
            </Link>
            <Link href="/admin/Medical" className={styles.nav_link}>
              <li className={styles.nav_li}>Medical</li>
            </Link>
            <Link href="/admin/Engineering" className={styles.nav_link}>
              <li className={styles.nav_li}>Engineering</li>
            </Link>
            <Link href="/admin/Business" className={styles.nav_link}>
              <li className={styles.nav_li}>Business</li>
            </Link>
            <Link href="/admin/General" className={styles.nav_link}>
              <li className={styles.nav_li}>General</li>
            </Link>
          </ul>
          <Button 
            onClick={() => {sessionStorage.clear(); router.push('/login');}} 
            style={{background: "transparent", color: '#fff', fontSize: '18px'}} 
            text="Logout" />
        </>
      }
    </nav>
  );
};