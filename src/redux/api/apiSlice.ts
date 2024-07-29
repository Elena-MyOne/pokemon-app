import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharactersData } from '../../types/CharactersData';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharactersList: builder.query<CharactersData, void>({
      query: () => `character`,
    }),
  }),
});

export const { useGetCharactersListQuery } = apiSlice;
