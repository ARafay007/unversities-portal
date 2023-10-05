import Link from "next/link";
import styles from "./navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_ul}>
        <Link href="/admin/addUniversity" className={styles.nav_link}>
          <li className={styles.nav_li}>Add University</li>
        </Link>
        <Link href="/admin/medical" className={styles.nav_link}>
          <li className={styles.nav_li}>Medical</li>
        </Link>
        <Link href="/admin/" className={styles.nav_link}>
          <li className={styles.nav_li}>Engineering</li>
        </Link>
        <Link href="/admin/" className={styles.nav_link}>
          <li className={styles.nav_li}>Business</li>
        </Link>
      </ul>
    </nav>
  );
};