import { Pagination } from '@mantine/core';
import VacancyCard from '../VacancyCard/VacancyCatd';
import style from './VacanciesList.module.scss';
import { Vacancy } from '../../api/Superjob/interfaces';
// import { useAppDispatch } from '../../app/hooks';
// import { setPage } from '../../features/vacancies/vacancies';

export interface VacanciesListProps {
  vacancies: Vacancy[],
  page: number,
  pageTotal: number,
  onPageChange: (page: number) => void,
}

export default function VacanciesList(props: VacanciesListProps) {
  const { vacancies, page, pageTotal, onPageChange } = props;

  return (
    <div className={style.vacanciesList}>
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}
      <Pagination value={page} onChange={onPageChange} total={pageTotal} />
    </div>
  );
}
