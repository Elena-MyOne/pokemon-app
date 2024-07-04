import React from "react";
import { PokemonData } from "../models/interfaces";

interface PokemonCardProps {
  pokemon: PokemonData;
}

export default class PokemonCard extends React.Component<PokemonCardProps, { pokemon: PokemonData }> {
  constructor(props: PokemonCardProps) {
    super(props);
    this.state = ({
      pokemon: props.pokemon
    })
  }

  render() {
    const { pokemon } = this.state;

    return (
      <div className="card card-compact bg-base-100 w-56 hover:shadow-lg cursor-pointer duration-300 shadow-md">
        {pokemon.sprites.front_default ? (
          <figure className="h-36">
            <img
              src={pokemon.sprites.front_default}
              alt={`pokemon ${pokemon.name} image`} />
          </figure>
        ) : (
          <div className="w-full h-36 bg-secondary"></div>
        )}

        <div className="card-body items-center">
          <h2 className="card-title text-center">{pokemon.name}</h2>
          <p>Weight: {pokemon.weight}</p>
          <p>Height: {pokemon.height}</p>
          <p>Base Experience: {pokemon.base_experience}</p>
        </div>
      </div>
    )
  }
}