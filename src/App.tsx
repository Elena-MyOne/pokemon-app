import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import { PokemonData, PokemonsData } from './models/interfaces';
import { URLS } from './models/enums';
import PokemonCard from './components/PokemonCard';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isClichedErrorButton, setIsClichedErrorButton] = useState<boolean>(false);

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('PockemonCo');
    if (savedSearchQuery) {
      handleSearch(savedSearchQuery);
    } else {
      getPokemons();
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  const getPokemonsList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URLS.POKEMONS}?limit=${itemsPerPage}`);
      const data: PokemonsData = await response.json();
      return data.results;
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  const getPokemonsData = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      const pokemonData = await response.json();
      return pokemonData;
    } catch (error) {
      setError(error);
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
        setError(null);
        setErrorMessage('');
      }
    } catch (error) {
      setPokemons([]);
      setIsLoading(false);
      setError(error);
      setErrorMessage('Data cannot be downloaded');
    }
  }, [getPokemonsList, getPokemonsData]);

  function getSearchQuery() {
    const saverdSearchQuery = localStorage.getItem('PockemonCo') || '';
    setSearchQuery(saverdSearchQuery);
    return saverdSearchQuery;
  }

  const handleSearch = useCallback(async (query: string) => {
    const searchQuery = query || getSearchQuery();

    if (!searchQuery) {
      setErrorMessage('');
      setError(null);
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
      setError(null);
      setErrorMessage('');
    } catch (error) {
      console.log(`Pokemon ${searchQuery} not found:`, error);
      setIsLoading(false);
      setPokemons([]);
      setError(error);
      setErrorMessage(`Pokemon "${searchQuery}" is not found, Please try searching for another one.`);
    }
  }, [pokemons.length, getPokemons]);

  function throwError() {
    setIsClichedErrorButton(true);
    console.error('Error: The Error boundary button was triggered');
  }

  return (
    <>
      <ErrorBoundary isClichedErrorButton={isClichedErrorButton}>
        <Header value="" handleSearch={handleSearch} />
        <main className="m-auto px-0 py-4 md:container">
          {errorMessage ? (
            <div className="text-error text-center pt-4">
              <span>{errorMessage}</span>
            </div>
          ) : (
            <>
              <div className="flex justify-end my-4">
                <button className="btn btn-primary" onClick={throwError}>
                  ErrorBoundary
                </button>
              </div>
              {isLoading && (
                <div className="text-center">
                  <span className="loading loading-spinner text-primary"></span>
                </div>
              )}
              <div className="grid grid-cols-3 grid-rows-2 gap-4 py-4">
                {pokemons.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            </>
          )}
        </main>
      </ErrorBoundary>
    </>
  )
}
