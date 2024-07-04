import React from 'react';
import Header from './components/Header';
import { PokemonData, PokemonsData } from './models/interfaces';
import { URLS } from './models/enums';
import PokemonCard from './components/PokemonCard';
import ErrorBoundary from './components/ErrorBoundary';

interface AppProps {
  isLoading: boolean;
  pokemons: PokemonData[];
  error: Error | null | unknown;
  errorMessage: string;
  itemsPerPage: number;
  searchQuery: string;
  isClichedErrorButton: boolean;
}

export default class App extends React.Component<object, AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isLoading: false,
      pokemons: [],
      error: null,
      errorMessage: '',
      itemsPerPage: 6,
      searchQuery: '',
      isClichedErrorButton: false,
    };

    this.getPokemonsList = this.getPokemonsList.bind(this);
    this.getPokemonsData = this.getPokemonsData.bind(this);
    this.getPokemons = this.getPokemons.bind(this);
    this.getSearchQuery = this.getSearchQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.throwError = this.throwError.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const searchQuery = localStorage.getItem('PockemonCo');
    if (searchQuery) {
      this.handleSearch();
      return;
    }

    this.getPokemons();
  }

  componentDidUpdate(_prevProps: AppProps, prevState: AppProps) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.handleSearch();
    }
  }

  async getPokemonsList() {
    const { itemsPerPage } = this.state;

    this.setState({ isLoading: true });

    try {
      const response = await fetch(`${URLS.POKEMONS}?limit=${itemsPerPage}`);

      const data: PokemonsData = await response.json();
      return data.results;
    } catch (error) {
      this.setState({
        error,
      });
    }
  }

  async getPokemonsData(url: string) {
    try {
      const response = await fetch(url);
      const pokemonData = await response.json();
      return pokemonData;
    } catch (error) {
      this.setState({
        error,
      });
    }
  }

  async getPokemons() {
    try {
      const pokemonList = await this.getPokemonsList();
      if (pokemonList) {
        const pokemonsPromises = pokemonList.map((pokemon) => this.getPokemonsData(pokemon.url));
        const pokemons = await Promise.all(pokemonsPromises);
        this.setState({
          pokemons: pokemons,
          isLoading: false,
          error: null,
          errorMessage: '',
        });
      }
    } catch (error) {
      this.setState({
        pokemons: [],
        isLoading: false,
        error,
        errorMessage: 'Data can not be downloaded',
      });
    }
  }

  getSearchQuery() {
    const searchQuery = localStorage.getItem('PockemonCo') || '';
    this.setState({ searchQuery });
    return searchQuery;
  }

  async handleSearch() {
    const searchQuery = this.getSearchQuery();
    const { pokemons } = this.state;

    if (!searchQuery) {
      this.setState({ errorMessage: '', error: null });
      if (!pokemons.length || !searchQuery) {
        this.getPokemons();
        return;
      }
      return;
    }

    this.setState({ isLoading: true });

    try {
      const response = await fetch(`${URLS.POKEMONS}/${searchQuery.toLowerCase()}`);
      const data = await response.json();
      this.setState({
        isLoading: false,
        pokemons: [data],
        error: null,
        errorMessage: '',
      });
    } catch (error) {
      console.log(`Pokemon ${searchQuery} not found:`, error);
      this.setState({
        isLoading: false,
        pokemons: [],
        error,
        errorMessage: `Pokemon "${searchQuery}" is not found, Please try searching for another one.`,
      });
    }
  }

  throwError() {
    this.setState({
      isClichedErrorButton: true
    })
    console.error("Error: The Error boundary button was triggered")
  }

  render() {
    const { pokemons, isLoading, errorMessage, isClichedErrorButton } = this.state;

    return (
      <>
        <ErrorBoundary isClichedErrorButton={isClichedErrorButton}>
          <Header value="" handleSearch={this.handleSearch} />
          <main className="m-auto px-0 py-4 md:container">
            {errorMessage ? (
              <div className="text-error text-center pt-4">
                <span>{errorMessage}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-end my-4">
                  <button className='btn btn-primary' onClick={this.throwError}>ErrorBoundary</button>
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
    );
  }
}
