import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import VacanciesList from '../components/VacanciesList/VacanciesList';
import { loadVacancies, selectAllVacancies, selectVacanciesPage, selectVacanciesPageTotal, setPage } from '../features/vacancies/vacancies';

export default function JobSearchPage() {
  const vacancies = useAppSelector(selectAllVacancies);
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

  return (
    <VacanciesList
      vacancies={vacancies}
      page={vacanciesPage}
      pageTotal={vacanciesPageTotal}
      onPageChange={onVacanciesListPageChange}
    />
  );
}
