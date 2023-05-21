import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import VacanciesList from '../components/VacanciesList/VacanciesList';
import { loadVacancies, selectAllVacancies, selectLoading, selectVacanciesKeyword, selectVacanciesPage, selectVacanciesPageTotal, setKeyword, setPage, startToLoad } from '../features/vacancies/vacancies';
import Searcher from '../components/Searcher/Searcher';
import Filter from '../components/Filter/Filter';
import styles from './index.module.scss';
import Loader from '../components/Loader/Loader';

export default function JobSearchPage() {
  const vacancies = useAppSelector(selectAllVacancies);
  const vacanciesKeyword = useAppSelector(selectVacanciesKeyword);
  const vacanciesPage = useAppSelector(selectVacanciesPage);
  const vacanciesPageTotal = useAppSelector(selectVacanciesPageTotal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startToLoad());
    dispatch(loadVacancies());
  }, []);

  const loading = useAppSelector(selectLoading);

  function onVacanciesListPageChange(page: number) {
    dispatch(setPage(page));
    dispatch(startToLoad());
    dispatch(loadVacancies());
  }

  function onSearcherKeywordChange(value: string) {
    dispatch(setKeyword(value));
  }

  function onSearcherSubmit() {
    dispatch(startToLoad());
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
        {
          loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <VacanciesList
              vacancies={vacancies}
              page={vacanciesPage}
              pageTotal={vacanciesPageTotal}
              onPageChange={onVacanciesListPageChange}
              isFavoritesPage={false}
            />
          )
        }
      </div>
    </div>
  );
}
