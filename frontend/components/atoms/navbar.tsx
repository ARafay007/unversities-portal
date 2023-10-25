'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from ".";
import styles from "./navbar.module.css";

export const Navbar = ({isPublic}: {isPublic: boolean}) => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
        {
          isPublic ? 
          <ul className={styles.nav_ul}>
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
            <Link href="/compare" className={styles.nav_link}>
              <li className={styles.nav_li}>Compare</li>
            </Link>
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