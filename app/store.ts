import { configureStore } from '@reduxjs/toolkit';
import { vacanciesReducer } from '../features/vacancies/vacancies';

const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
