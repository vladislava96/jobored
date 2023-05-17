import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { Catalogue } from '../../api/Superjob/interfaces';
import Api from '../../api/Superjob/Api';

export const cataloguesAdapter = createEntityAdapter<Catalogue>();

const initialState = cataloguesAdapter.getInitialState();

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

export const cataloguesSelectors = cataloguesAdapter.getSelectors();

export const cataloguesReducer = cataloguesSlice.reducer;
