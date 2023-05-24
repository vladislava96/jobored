import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadVacancy, selectVacancyById } from '../../features/vacancies/vacancies';
import style from './VacancyPage.module.scss';
import VacancyCard from '../../components/VacancyCard/VacancyCatd';

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
      { vacancy && <VacancyCard vacancy={vacancy} theme="vacancyPage" /> }
      <div className={style.vacancyPage__description}>
        {candidat}
      </div>
    </div>
  );
}
