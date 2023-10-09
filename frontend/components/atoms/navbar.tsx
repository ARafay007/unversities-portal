import Link from "next/link";
import styles from "./navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
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
    </nav>
  );
};