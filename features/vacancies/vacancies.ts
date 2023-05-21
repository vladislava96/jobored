import { createSlice, createEntityAdapter, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FilterParams, Vacancy } from '../../api/Superjob/interfaces';
import Api from '../../api/Superjob/Api';

export const vacanciesAdapter = createEntityAdapter<Vacancy>();

const initialFilterParams: FilterParams = {};

const initialState = vacanciesAdapter.getInitialState({
  page: 1,
  pageTotal: 1,
  count: 4,
  keyword: '',
  loading: false,
  filterParams: initialFilterParams,
});

type VacanciesState = typeof initialState;

interface StateWithVacancies {
  vacancies: VacanciesState;
}

export const loadVacancy = createAsyncThunk(
  'vacancies/loadOne',
  async (id: number) => Api.getInstance().getVacancy(id)
);

export const loadVacancies = createAsyncThunk(
  'vacancies/load',
  async (_, thunkAPI) => {
    const { vacancies } = thunkAPI.getState() as StateWithVacancies;
    const keyword = vacancies.keyword === '' ? undefined : vacancies.keyword;
    const { page, count, filterParams } = vacancies;
    const options = { page, count, keyword, filterParams };

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
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setCatalogues(state, action: PayloadAction<number | undefined>) {
      state.filterParams.catalogues = action.payload;
    },
    setPaymentFrom(state, action: PayloadAction<number | undefined>) {
      state.filterParams.paymentFrom = action.payload;
    },
    setPaymentTo(state, action: PayloadAction<number | undefined>) {
      state.filterParams.paymentTo = action.payload;
    },
    startToLoad(state) {
      state.loading = true;
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
        state.loading = false;
      })
      .addCase(loadVacancies.rejected, (state, action) => {
        global.console.error('Vacancies loading error:', action.error);
        state.loading = false;
      })
      .addCase(loadVacancy.fulfilled, (state, action) => {
        vacanciesAdapter.setOne(state, action.payload);
        state.loading = false;
      })
      .addCase(loadVacancy.rejected, (state, action) => {
        global.console.error('Vacancy loading error:', action.error);
        state.loading = false;
      });
  },
});

const {
  selectAll: selectAllVacancies,
  selectById,
} = vacanciesAdapter.getSelectors((state: StateWithVacancies) => state.vacancies);

export { selectAllVacancies };
export const selectVacancyById =
  (id: number) => (state: StateWithVacancies) => selectById(state, id);

export const selectVacanciesPage = (state: StateWithVacancies) => state.vacancies.page;
export const selectVacanciesPageTotal = (state: StateWithVacancies) => state.vacancies.pageTotal;
export const selectVacanciesKeyword = (state: StateWithVacancies) => state.vacancies.keyword;
export const selectLoading = (state: StateWithVacancies) => state.vacancies.loading;

export const vacanciesReducer = vacanciesSlice.reducer;

export const {
  setPage,
  setFilterParam,
  setKeyword,
  setCatalogues,
  setPaymentFrom,
  setPaymentTo,
  startToLoad,
} = vacanciesSlice.actions;
