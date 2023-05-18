import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { Catalogue } from '../../api/Superjob/interfaces';
import Api from '../../api/Superjob/Api';

export const cataloguesAdapter = createEntityAdapter<Catalogue>({
    selectId: (catalogue) => catalogue.key,
});

const initialState = cataloguesAdapter.getInitialState();

type CataloguesState = typeof initialState;

interface StateWithCatalogues {
    catalogues: CataloguesState;
}

export const loadCatalogues = createAsyncThunk(
    'catalogues/load',
    async () => Api.getInstance().getCatalogues()
);

const cataloguesSlice = createSlice({
    name: 'catalogues',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCatalogues.fulfilled, (state, action) =>
                cataloguesAdapter.setMany(state, action.payload)
            );
    },
});

export const {
    selectAll: selectAllCatalogues,
} = cataloguesAdapter.getSelectors((state: StateWithCatalogues) => state.catalogues);

export const cataloguesReducer = cataloguesSlice.reducer;
