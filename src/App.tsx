import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import { PokemonData, PokemonsData } from './models/interfaces';
import { URLS } from './models/enums';
import PokemonCard from './components/PokemonCard';
import ErrorBoundary from './components/ErrorBoundary';
import { ITEMS_PER_PAGE } from './constants/api';
import Pagination from './components/Pagination';
import Loader from './components/Loader';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isClichedErrorButton, setIsClichedErrorButton] = useState<boolean>(false);
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

  function throwError() {
    setIsClichedErrorButton(true);
    console.error('Error: The Error boundary button was triggered');
  }

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

  return (
    <>
      <ErrorBoundary isClichedErrorButton={isClichedErrorButton}>
        <Header handleSearch={handleSearch} />
        <main className="m-auto px-0 py-4 md:container">
          {errorMessage ? (
            <div className="text-red-500 text-center pt-4">
              <span>{errorMessage}</span>
            </div>
          ) : (
            <>
              <div className="flex justify-end my-4">
                <button
                  className="bg-yellow-300 hover:bg-yellow-400 duration-300 px-4 py-2"
                  onClick={throwError}
                >
                  ErrorBoundary
                </button>
              </div>
              {isLoading && <Loader />}
              {!isLoading && (
                <>
                  <div className="grid grid-cols-4 grid-rows-2 gap-6 py-4">
                    {pokemons.map((pokemon) => (
                      <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                  </div>
                  {pokemons.length > 0 && (
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
                  )}
                </>
              )}
            </>
          )}
        </main>
      </ErrorBoundary>
    </>
  );
}
