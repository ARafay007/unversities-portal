import Link from "next/link";
import { Button } from "./button";
import styles from "./navbar.module.css";

export const Navbar = ({isPublic}: {isPublic: boolean}) => {
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
          <button className={styles.btn}>Logout</button>
        </>
      }
    </nav>
  );
};