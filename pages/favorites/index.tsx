import Image from 'next/image';
import { Button } from '@mantine/core';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import VacanciesList from '../../components/VacanciesList/VacanciesList';
import {
  loadFavorites,
  selectFavoritesOnPage,
  selectFavoritesPage,
  selectFavoritesPageTotal,
  setFavoritesPage,
} from '../../features/favorites/favorites';
import style from './FavoritesPage.module.scss';

export default function FavoritesPage() {
  const favorites = useAppSelector(selectFavoritesOnPage);
  const favoritesPage = useAppSelector(selectFavoritesPage);
  const favoritesPageTotal = useAppSelector(selectFavoritesPageTotal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFavorites());
  }, []);

  function onVacanciesListPageChange(page: number) {
    dispatch(setFavoritesPage(page));
  }

  return (
    <div className={style.favoritePage}>
      {favorites.length === 0 ? (
        <div className={style.favoritePage__empty}>
          <Image src="../empty.svg" alt="empty" width={240} height={230.27} />
          <span className={style.favoritePage__emptyMessage}>Упс, здесь еще ничего нет!</span>
          <Button variant="light" radius="md">Поиск Вакансий</Button>
        </div>
      ) : (
        <VacanciesList
          vacancies={favorites}
          page={favoritesPage}
          pageTotal={favoritesPageTotal}
          onPageChange={onVacanciesListPageChange}
          isFavoritesPage
        />
      )}
    </div>
  );
}
