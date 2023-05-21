import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

export default function Header() {
  const pathname = usePathname();
  const isFavoritesPage = pathname.startsWith('/favorites');

  return (
    <div className={styles.header}>
      <nav className={styles.header__nav}>
        <Link className={styles.logo} href="/" passHref title="Go to Jobored website">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
          <span>Jobored</span>
        </Link>
        <Link
          className={!isFavoritesPage ?
            `${styles.header__link} ${styles.header__link_active}` :
            styles.header__link
          }
          href="/"
        >
          Поиск вакансий
        </Link>
        <Link
          className={isFavoritesPage ?
            `${styles.header__link} ${styles.header__link_active}` :
            styles.header__link
          }
          href="/favorites"
        >
          Избранное
        </Link>
      </nav>
    </div>
  );
}
