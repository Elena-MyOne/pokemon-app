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
      <div className="card">
        <h2 className="">{pokemon.name}</h2>
      </div>
    )
  }
}