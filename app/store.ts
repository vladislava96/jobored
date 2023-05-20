import { configureStore } from '@reduxjs/toolkit';
import { vacanciesReducer } from '../features/vacancies/vacancies';
import { cataloguesReducer } from '../features/catalogues/catalogues';
import { favoritesReducer } from '../features/favorites/favorites';

const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
    catalogues: cataloguesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
