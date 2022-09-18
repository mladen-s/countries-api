import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://restcountries.com/v3.1/";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCountries: builder.query<any, void>({
      query: () => "all",
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
