import React from 'react';
import Header from './components/Header';
import { PokemonData, PokemonsData } from './models/interfaces';
import { URLS } from './models/enums';
import PokemonCard from './components/PokemonCard';

interface AppProps {
  isLoading: boolean;
  pokemons: PokemonData[];
  error: Error | null | unknown;
  itemsPerPage: number;
}

export default class App extends React.Component<object, AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isLoading: false,
      pokemons: [],
      error: null,
      itemsPerPage: 6
    }

    this.getPokemonsList = this.getPokemonsList.bind(this);
    this.getPokemonsData = this.getPokemonsData.bind(this);
    this.getPokemons = this.getPokemons.bind(this);
  }

  async componentDidMount(): Promise<void> {
    this.getPokemons();
  }

  async getPokemonsList() {
    const { itemsPerPage } = this.state;

    this.setState({ isLoading: true });

    try {
      const response = await fetch(`${URLS.POKEMONS}?limit=${itemsPerPage}`);

      const data: PokemonsData = await response.json();
      return data.results
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  async getPokemonsData(url: string) {
    try {
      const response = await fetch(url);
      const pokemonData = await response.json();
      return pokemonData;
    } catch (error) {
      this.setState({
        error
      })
    }

  }

  async getPokemons() {
    try {
      const pokemonList = await this.getPokemonsList();
      if (pokemonList) {
        const pokemonsPromises = pokemonList.map(pokemon => this.getPokemonsData(pokemon.url));
        const pokemons = await Promise.all(pokemonsPromises);
        this.setState({
          pokemons: pokemons,
          isLoading: false
        })
      }
    } catch (error) {
      this.setState({
        pokemons: [],
        isLoading: false,
        error
      })
    }
  }

  render() {
    const { pokemons, isLoading } = this.state;

    return (
      <>
        <Header value='' />
        <main className="m-auto px-0 py-4 md:container">
          {(isLoading) ?
            (<div className='text-center'><span className="loading loading-spinner text-primary"></span></div>) : (
              <div className="grid grid-cols-3 grid-rows-2 gap-4 py-4">
                {pokemons.map(pokemon => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            )}
        </main>
      </>
    )
  }
}

