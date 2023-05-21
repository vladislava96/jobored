import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Vacancy } from '../../api/Superjob/interfaces';

const favoritesAdapter = createEntityAdapter<Vacancy>();

const initialState = favoritesAdapter.getInitialState({
  page: 1,
  count: 4,
});

type FavoritesState = typeof initialState;

interface StateWithFavorites {
  favorites: FavoritesState;
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadFavorites(state) {
      if (localStorage.getItem('favorites') !== null) {
        const localStorageData = localStorage.getItem('favorites');
        if (localStorageData !== null) {
          return JSON.parse(localStorageData) as FavoritesState;
        }
      }
      return state;
    },
    addFavorite(state, action: PayloadAction<Vacancy>) {
      favoritesAdapter.addOne(state, action.payload);
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    removeFavorite(state, action: PayloadAction<number>) {
      favoritesAdapter.removeOne(state, action.payload);
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    setFavoritesPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

const {
  selectAll,
  selectById,
} = favoritesAdapter.getSelectors((state: StateWithFavorites) => state.favorites);

export const selectAllFavorites = selectAll;

export const selectFavoritesOnPage = (state: StateWithFavorites) => {
  const { page, count } = state.favorites;
  const favorites = selectAllFavorites(state);

  const startIndex = (page - 1) * count;
  let endIndex = startIndex + count;

  if (endIndex > favorites.length) {
    endIndex = favorites.length;
  }
  return favorites.slice(startIndex, endIndex);
};

export const selectFavoritesPageTotal = (state: StateWithFavorites) => {
  const { count } = state.favorites;
  const favorites = selectAllFavorites(state);
  return Math.ceil(favorites.length / count);
};

export const selectIsVacancyFavorite =
  (id: number) => (state: StateWithFavorites) => selectById(state, id) !== undefined;

export const selectFavoritesPage = (state: StateWithFavorites) => state.favorites.page;

export const favoritesReducer = favoritesSlice.reducer;

export const {
  addFavorite,
  removeFavorite,
  setFavoritesPage,
  loadFavorites,
} = favoritesSlice.actions;
