import Image from 'next/image';
import Link from 'next/link';
import { KeyboardEvent } from 'react';
import style from './VacancyCard.module.scss';
import { Vacancy } from '../../api/Superjob/interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addFavorite, removeFavorite, selectIsVacancyFavorite } from '../../features/favorites/favorites';

export interface VacancyCardProps {
  vacancy: Vacancy;
  theme: string;
}

export default function VacancyCard(props: VacancyCardProps) {
  const { vacancy, theme } = props;
  const isFavoriteVacancy = useAppSelector(selectIsVacancyFavorite(vacancy.id));

  const vacancyStarClassName = isFavoriteVacancy ?
    `${style.vacancy__star} ${style.vacancy__star_active}` :
    style.vacancy__star;

  const vacancyTitleClassName = theme === 'vacancyPage' ?
    `${style.vacancy__title} ${style.vacancy__title_vacancyPage}` :
    style.vacancy__title;

  const vacancyPaymentClassName = theme === 'vacancyPage' ?
    `${style.vacancy__payment} ${style.vacancy__payment_vacancyPage}` :
    style.vacancy__payment;

  const dispatch = useAppDispatch();

  function toggleVacancyToFavorite(): void {
    if (!isFavoriteVacancy) {
      dispatch(addFavorite(vacancy));
    } else {
      dispatch(removeFavorite(vacancy.id));
    }
  }

  function onToggleButtonKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    if (event.key === ' ') {
      toggleVacancyToFavorite();
    }
  }

  function createPaymentMessage(): string {
    if (vacancy.payment_from === 0 && vacancy.payment_to === 0) {
      return 'в';
    }
    if (vacancy.payment_from !== 0 && vacancy.payment_to === 0) {
      return `от ${vacancy.payment_from}`;
    }
    if (vacancy.payment_from === 0 && vacancy.payment_to !== 0) {
      return `до ${vacancy.payment_to}`;
    }
    return 'в';
  }

  return (
    <div className={style.vacancy} data-elem={`vacancy-${vacancy.id}`}>
      <div className={style.vacancy__info}>
        <Link href={`vacancy/${vacancy.id}`} passHref>
          <div className={vacancyTitleClassName}>
            <strong>{vacancy.profession}</strong>
          </div>
        </Link>
        <div className={vacancyPaymentClassName}>
          <strong>
            з/п {createPaymentMessage()} {vacancy.currency}
          </strong>
          <span className={style.vacancy__delimiter}>•</span>
          {vacancy.type_of_work.title}
        </div>
        <div className={style.vacancy__location}>
          <Image src="/location.svg" alt="location" width={24} height={24} />
          <span className={style.vacancy__locationCity}>{vacancy.town.title}</span>
        </div>
      </div>
      <div
        data-elem={`vacancy-${vacancy.id}-shortlist-button`}
        role="button"
        tabIndex={0}
        className={vacancyStarClassName}
        onClick={toggleVacancyToFavorite}
        onKeyDown={onToggleButtonKeyDown}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z" stroke="#ACADB9" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}
