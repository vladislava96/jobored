import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <nav className={styles.header__nav}>
        <Link className={styles.logo} href="/" passHref title="Go to Jobored website">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
          <span>Jobored</span>
        </Link>
        <Link className={styles.header__link} href="/">Поиск вакансий</Link>
        <Link className={styles.header__link} href="/favorites">Избранное</Link>
      </nav>
    </div>
  );
}
