import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { Vacancy } from '../../api/Superjob/interfaces';

export const cataloguesAdapter = createEntityAdapter<Vacancy>();

const initialState = cataloguesAdapter.getInitialState();

const cataloguesSlice = createSlice({
    name: 'catalogues',
    initialState,
    reducers: {},
});

export const cataloguesReducer = cataloguesSlice.reducer;
