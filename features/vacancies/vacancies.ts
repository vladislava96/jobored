import { createSlice, createEntityAdapter, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FilterParams, Vacancy } from '../../api/Superjob/interfaces';
import Api from '../../api/Superjob/Api';

export const vacanciesAdapter = createEntityAdapter<Vacancy>();

const initialFilterParams: FilterParams = {};

const initialState = vacanciesAdapter.getInitialState({
    page: 0,
    pageTotal: 1,
    count: 4,
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
                state.pageTotal = Math.ceil(action.payload.total / state.count);
                if (state.pageTotal > 125) {
                    state.pageTotal = 125;
                }
                vacanciesAdapter.setAll(state, action.payload.objects);
            })
            .addCase(loadVacancies.rejected, (state, action) => {
                global.console.error('Vacancies loading error:', action.error);
            });
    },
});

export const {
    selectAll: selectAllVacancies,
} = vacanciesAdapter.getSelectors((state: StateWithVacancies) => state.vacancies);

export const selectVacanciesPage = (state: StateWithVacancies) => state.vacancies.page;
export const selectVacanciesPageTotal = (state: StateWithVacancies) => state.vacancies.pageTotal;

export const vacanciesReducer = vacanciesSlice.reducer;

export const { setPage, setFilterParam } = vacanciesSlice.actions;
