import { useCallback, useEffect, useState } from 'react';
import { PokemonData, PokemonsData } from './models/interfaces';
import { ROUTE_PATHS, URLS } from './models/enums';
import { ITEMS_PER_PAGE } from './constants/api';
import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getPokemonsList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URLS.POKEMONS}?limit=${ITEMS_PER_PAGE}`);
      const data: PokemonsData = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  const getPokemonsData = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      const pokemonData = await response.json();
      return pokemonData;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getPokemons = useCallback(async () => {
    try {
      const pokemonList = await getPokemonsList();
      if (pokemonList) {
        const pokemonsPromises = pokemonList.map((pokemon) => getPokemonsData(pokemon.url));
        const pokemons = await Promise.all(pokemonsPromises);
        setPokemons(pokemons);
        setIsLoading(false);
        setErrorMessage('');
      }
    } catch (error) {
      setPokemons([]);
      setIsLoading(false);
      console.error(error);
      setErrorMessage('Data cannot be downloaded');
    }
  }, [getPokemonsList, getPokemonsData]);

  function getSearchQuery() {
    const savedSearchQuery = localStorage.getItem('PockemonCo') || '';
    setSearchQuery(savedSearchQuery);
    return savedSearchQuery;
  }

  const handleSearch = useCallback(
    async (query: string) => {
      const searchQuery = query || getSearchQuery();

      if (!searchQuery) {
        setErrorMessage('');

        if (!pokemons.length || !searchQuery) {
          getPokemons();
          return;
        }
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(`${URLS.POKEMONS}/${searchQuery.toLowerCase()}`);
        const data = await response.json();
        setPokemons([data]);
        setIsLoading(false);
        setErrorMessage('');
      } catch (error) {
        console.log(`Pokemon ${searchQuery} not found:`, error);
        setIsLoading(false);
        setPokemons([]);
        console.error(error);
        setErrorMessage(
          `Pokemon "${searchQuery}" is not found, Please try searching for another one.`
        );
      }
    },
    [pokemons.length, getPokemons]
  );

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery, handleSearch]);

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('PockemonCo');
    if (savedSearchQuery) {
      handleSearch(savedSearchQuery);
    } else {
      getPokemons();
    }
  }, [getPokemons, handleSearch]);

  const getMainPageProps = () => ({
    errorMessage,
    isLoading,
    pokemons,
    currentPage,
    setCurrentPage,
  });

  return (
    <Routes>
      <Route path={ROUTE_PATHS.MAIN} element={<Layout handleSearch={handleSearch} />}>
        <Route index element={<MainPage {...getMainPageProps()} />} />
      </Route>
    </Routes>
  );
}
