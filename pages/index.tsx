import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import VacanciesList from '../components/VacanciesList/VacanciesList';
import { loadVacancies, selectAllVacancies, selectVacanciesKeyword, selectVacanciesPage, selectVacanciesPageTotal, setKeyword, setPage } from '../features/vacancies/vacancies';
import Searcher from '../components/Searcher/Searcher';
import Filter from '../components/Filter/Filter';
import styles from './index.module.scss';

export default function JobSearchPage() {
  const vacancies = useAppSelector(selectAllVacancies);
  const vacanciesKeyword = useAppSelector(selectVacanciesKeyword);
  const vacanciesPage = useAppSelector(selectVacanciesPage);
  const vacanciesPageTotal = useAppSelector(selectVacanciesPageTotal);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(loadVacancies());
  }, []);

  function onVacanciesListPageChange(page: number) {
    dispatch(setPage(page));
    dispatch(loadVacancies());
  }

  function onSearcherKeywordChange(value: string) {
    dispatch(setKeyword(value));
  }

  function onSearcherSubmit() {
    dispatch(loadVacancies());
  }

  return (
    <div className={styles.jobSearch}>
      <div className={styles.jobSearchFilter}>
        <Filter />
      </div>
      <div className={styles.jobSearchList}>
        <Searcher
          keyword={vacanciesKeyword}
          onKeywordChange={onSearcherKeywordChange}
          onSubmit={onSearcherSubmit}
        />
        <VacanciesList
          vacancies={vacancies}
          page={vacanciesPage}
          pageTotal={vacanciesPageTotal}
          onPageChange={onVacanciesListPageChange}
        />
      </div>
    </div>
  );
}
