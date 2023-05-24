import { Pagination } from '@mantine/core';
import VacancyCard from '../VacancyCard/VacancyCatd';
import style from './VacanciesList.module.scss';
import { Vacancy } from '../../api/Superjob/interfaces';

export interface VacanciesListProps {
  vacancies: Vacancy[];
  page: number;
  pageTotal: number;
  onPageChange: (page: number) => void;
  isFavoritesPage: boolean;
}

export default function VacanciesList(props: VacanciesListProps) {
  const { vacancies, page, pageTotal, onPageChange, isFavoritesPage } = props;

  let vacanciesListClassName = style.vacanciesList;

  if (isFavoritesPage) {
    vacanciesListClassName = `${vacanciesListClassName} ${style.vacanciesListFavoritePage}`;
  }

  return (
    <div className={vacanciesListClassName}>
      <div className={style.vacanciesListItems}>
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} theme="JobSearchPage" />
        ))}
      </div>
      <Pagination
        value={page}
        onChange={onPageChange}
        total={pageTotal}
        styles={() => ({
          control: {
            '&[data-active]': {
              backgroundColor: '#5E96FC',
            },
          },
        })}
      />
    </div>
  );
}
