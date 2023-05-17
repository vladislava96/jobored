import { Pagination } from '@mantine/core';
import VacancyCard from '../Vacancy/VacancyCatd';
import style from './VacanciesList.module.scss';
import { Vacancy } from '../../api/Superjob/interfaces';

export interface VacanciesListProps {
  vacancies: Vacancy[]
}

export default function VacanciesList(props: VacanciesListProps) {
  const { vacancies } = props;

  return (
    <div className={style.vacanciesList}>
      {vacancies.map((vacancy) => (
        <VacancyCard vacancy={vacancy} />
      ))}
      <Pagination total={4} />
    </div>
  );
}
