import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import VacanciesList from '../components/VacanciesList/VacanciesList';
import { loadVacancies, selectAllVacancies } from '../features/vacancies/vacancies';

export default function JobSearchPage() {
  const vacancies = useAppSelector(selectAllVacancies);
  const dispatch = useAppDispatch();

  useEffect(() => {
      console.log('useEffect');
      dispatch(loadVacancies());
  }, []);

  return (
    <VacanciesList vacancies={vacancies} />
  );
}
