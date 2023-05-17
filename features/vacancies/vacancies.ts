import { createSlice, createEntityAdapter, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FilterParams, Vacancy } from '../../api/Superjob/interfaces';
import Api from '../../api/Superjob/Api';

export const vacanciesAdapter = createEntityAdapter<Vacancy>();

const initialFilterParams: FilterParams = {};

const initialState = vacanciesAdapter.getInitialState({
    page: 0,
    count: 5,
    filterParams: initialFilterParams,
});

type VacanciesState = typeof initialState;

interface StateWithVacancies {
    vacancies: VacanciesState;
}

export const loadVacancies = createAsyncThunk(
    'vacancies/load',
    async (_, thunkAPI) => {
        const { vacancies } = thunkAPI.getState() as StateWithVacancies;

        const options = {
            page: vacancies.page,
            count: vacancies.count,
            filterParams: vacancies.filterParams,
        };

        return Api.getInstance().getVacancies(options);
    }
);

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setFilterParam(state, action: PayloadAction<FilterParams>) {
            state.filterParams = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loadVacancies.fulfilled, (state, action) => {
                vacanciesAdapter.setMany(state, action.payload.objects);
            });
    },
});

export const vacanciesReducer = vacanciesSlice.reducer;

export const { setPage, setFilterParam } = vacanciesSlice.actions;
