import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadVacancy, selectVacancyById } from '../../features/vacancies/vacancies';
import style from './VacancyPage.module.scss';

function transformQueryParamToId(id: string[] | string | undefined): number {
  if (Array.isArray(id)) {
    [id] = id;
  }

  return id === undefined ? 0 : Number(id);
}

export default function VacancyPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const vacancyId = transformQueryParamToId(router.query.id);
  const vacancy = useAppSelector(selectVacancyById(vacancyId));

  useEffect(() => {
    dispatch(loadVacancy(vacancyId));
  }, []);

  const candidat = (vacancy?.candidat.split('\n') ?? [])
    .map((line) => {
      if (/^(Требования|Обязанности|Условия):\s*$/i.test(line)) {
        return <h3>{line}</h3>;
      }

      return <>{line}<br /></>;
    });

  return (
    <div className={style.vacancyPage}>
      <div className={style.vacancyPage__vacancy}>
        <div className={style.vacancyPage__info}>
          <div className={style.vacancyPage__title}>
            <h2>{vacancy?.profession}</h2>
          </div>
          <div className={style.vacancyPage__payment}>
            <strong>з/п {vacancy?.payment_from} - {vacancy?.payment_to} {vacancy?.currency}</strong>
            <span className={style.vacancyPage__delimiter}>•</span>
            {vacancy?.type_of_work.title}
          </div>
          <div className={style.vacancyPage__location}>
            <Image src="../location.svg" alt="location" width={24} height={24} />
            <span className={style.vacancyPage__locationCity}>{vacancy?.town.title}</span>
          </div>
        </div>
        <div className={style.vacancyPage__star}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z" stroke="#ACADB9" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className={style.vacancyPage__description}>
        {candidat}
      </div>
    </div>
  );
}
