import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { Vacancy } from '../../api/Superjob/interfaces';

export const vacanciesAdapter = createEntityAdapter<Vacancy>();

const initialState = vacanciesAdapter.getInitialState();

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {},
});

export const vacanciesReducer = vacanciesSlice.reducer;
