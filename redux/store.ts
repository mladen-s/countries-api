import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { countriesApi } from "./countriesApi";
import countrySlice from "./countrySlice";

const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    country: countrySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
