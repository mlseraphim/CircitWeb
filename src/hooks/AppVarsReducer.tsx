import { createSlice } from '@reduxjs/toolkit';
import { IApiResponseError, IAppVars } from '../Infrastructure/Interfaces';


const initialAppError: IApiResponseError = {
    HasError: false
};

const initialStateValue: IAppVars = {
    DataLoading: false,
    AppError: initialAppError,
};


export const AppVarsSlice = createSlice({
    name: 'appvars',
    initialState: { value: initialStateValue },
    reducers: {
        setDataLoading: (state, action) => {
            state.value.DataLoading = action.payload;
        },

        setAppError: (state, action) => {
            state.value.AppError = action.payload;
        },

        resetAppError: (state) => {
            state.value.AppError = initialAppError;
        }
    }
});

export const {
    setDataLoading,
    setAppError,
    resetAppError
} = AppVarsSlice.actions;

export default AppVarsSlice.reducer;