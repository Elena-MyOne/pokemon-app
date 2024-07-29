import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterData } from '../../types/CharacterData';
import { RootState } from '../store';

export interface CharactersState {
  savedValue: string;
  characters: CharacterData[];
  pages: number;
  currentPage: number | null;
}

const initialState: CharactersState = {
  savedValue: '',
  characters: [],
  pages: 1,
  currentPage: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSavedValue(state, action: PayloadAction<string>) {
      state.savedValue = action.payload;
    },
    setCharacters(state, action: PayloadAction<CharacterData[]>) {
      state.characters = action.payload;
    },
    setPages(state, action: PayloadAction<number>) {
      state.pages = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const selectCharacters = (state: RootState): CharactersState => state.characters;

export const { setSavedValue, setCharacters, setPages, setCurrentPage } = charactersSlice.actions;
export default charactersSlice.reducer;
