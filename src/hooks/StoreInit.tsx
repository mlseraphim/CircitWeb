import { configureStore } from '@reduxjs/toolkit';
import AppVarsReducer from './AppVarsReducer';


export const Store = configureStore({
    reducer: {
        appVars: AppVarsReducer
    }
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;