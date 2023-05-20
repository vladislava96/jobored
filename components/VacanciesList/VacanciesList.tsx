import { Pagination } from '@mantine/core';
import VacancyCard from '../VacancyCard/VacancyCatd';
import style from './VacanciesList.module.scss';
import { Vacancy } from '../../api/Superjob/interfaces';
// import { useAppDispatch } from '../../app/hooks';
// import { setPage } from '../../features/vacancies/vacancies';

export interface VacanciesListProps {
  vacancies: Vacancy[];
  page: number;
  pageTotal: number;
  onPageChange: (page: number) => void;
  isFavoritePage: boolean;
}

export default function VacanciesList(props: VacanciesListProps) {
  const { vacancies, page, pageTotal, onPageChange, isFavoritePage } = props;
  let vacanciesListClassName = style.vacanciesList;
  if (isFavoritePage) {
    vacanciesListClassName = `${vacanciesListClassName} ${style.vacanciesListFavoritePage}`;
  }

  return (
    <div className={vacanciesListClassName}>
      <div className={style.vacanciesListItems}>
        {vacancies.map((vacancy) => (
          <VacancyCard data-elem={`vacancy-${vacancy.id}`} key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
      <Pagination value={page} onChange={onPageChange} total={pageTotal} />
    </div>
  );
}
